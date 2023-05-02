const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
    // on client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);  //no content to send back
    const refreshToken = cookies.jwt;

    // is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie("jwt", { http: true, sameSite: "None", secure: true});
        return res.sendStatus(204); //succesfull status with no content
    }
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );

    // delete refreshToken in DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: ""};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true}); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }