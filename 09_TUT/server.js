const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("../09_TUT/middleware/logEvents");
const corsOptions = require("./config/corsOptions");
const { errorHandler } = require("../09_TUT/middleware/errorHandler");
const { error } = require("console");
const PORT = process.env.PORT || 3500;


// custom middleware logger
// app.use((req, res, next) => {
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//     console.log(`${req.method}, ${req.path}`);
//     next();
// });
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions)); // cross origin resource sharing

// built-in middleware to handle urlcoded data
// in other words, form data:
// "content-type: application/x-www-form-urlcoded"
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

// 404
// app.use("/")
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html")); //definiramo status 404
    } else if (req.accepts("json")) {
        res.json({error: "404 Not found"});
    } else {
        res.type("txt").send("404 Not Found");
    }  
});

// error handler
// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send(err.message);
// })

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

