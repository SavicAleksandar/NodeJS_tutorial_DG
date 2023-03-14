const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"))

console.log(uuid())

// za package.json, ce je spredaj carrot ^ bo updatalo minor verzijo (druga stevilka), ce je spredaj tilda ~ bo updatalo patch (tretja stevilka), ce damo zvezdo * bo updatalo vse, ce spredaj ni nic se lahko uporablja le tista specificna verzija "npm install uuid@verzija" - ni priporocljivo

// npm update, naredi update modulov
// npm rm nodemon -D, odstrani nodemon vendar ne odstrani iz scripte

