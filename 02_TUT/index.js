const fsPromisses = require("fs").promises;
const path = require("path");

const fileOps = async() => {
    try{
        const data = await fsPromisses.readFile(path.join(__dirname, "files", "starter.txt"), "utf-8");
        console.log(data);
        await fsPromisses.unlink(path.join(__dirname, "files", "starter.txt"), data);   // delete a file
        await fsPromisses.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
        await fsPromisses.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\n\nNice to meet you");
        await fsPromisses.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
        const newData = await fsPromisses.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf-8");
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
}

fileOps();

// // read file
// fs.readFile(path.join(__dirname, "files", "starter.txt"), "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })

// // create new file with text
// fs.writeFile(path.join(__dirname, "files", "reply.txt"), "nice to meet you", (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     // updating a file with content
//     fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\nYes it is.", (err) => {
//         if (err) throw err;
//         console.log("append complete");
 
//         // rename file
//         fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "new_file.txt"), (err) => {
//             if (err) throw err;
//             console.log("rename complete");
//         })
//     })
// })




// exit on uncaught errors
process.on("uncaughtException", err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})