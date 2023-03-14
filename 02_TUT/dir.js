const fs = require("fs");

if (!fs.existsSync("./new")) {
    // create new directory
    fs.mkdir("./new", (err) => {
        if (err) throw (err);
        console.log("directory created");
    })
}  

if (fs.existsSync("./new")) {
    // remove directory
    fs.rmdir("./new", (err) => {
        if (err) throw (err);
        console.log("directory removed");
    })
} 