const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"))

console.log(uuid())

// za package.json, ce je spredaj carrot ^ bo updatalo minor verzijo (druga stevilka), ce je spredaj tilda ~ bo updatalo patch (tretja stevilka), ce damo zvezdo * bo updatalo vse, ce spredaj ni nic se lahko uporablja le tista specificna verzija "npm install uuid@verzija" - ni priporocljivo

// npm update, naredi update modulov
// npm rm nodemon -D, odstrani nodemon vendar ne odstrani iz scripte

