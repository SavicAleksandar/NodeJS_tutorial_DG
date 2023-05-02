const User = require("../model/User");

const handleLogout = async (req, res) => {
    // on client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);  //no content to send back
    const refreshToken = cookies.jwt;

    // is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { http: true, sameSite: "None", secure: true});
        return res.sendStatus(204); //succesfull status with no content
    }

    // delete refreshToken in DB
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true}); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }