const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("../07_TUT/middleware/logEvents");
const { errorHandler } = require("../07_TUT/middleware/errorHandler");
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
const whitelist = ["https://www.yoursite.com", "http://127.0.0.1:5500", "http://localhost:3500"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccesStatus: 200
}
app.use(cors(corsOptions)); // cross origin resource sharing

// built-in middleware to handle urlcoded data
// in other words, form data:
// "content-type: application/x-www-form-urlcoded"
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
    //res.sendFile("./views/index.html", {root: __dirname});
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html"); //302 by default, ce dodamo 301 je potem ta koda definirana
});

// Route handlers
app.get("/hello(.html)?", (req, res, next) => {
    console.log("attempted to load hello.html");
    next()
}, (req, res) => {
    res.send("Hello world");
});

// chaining route handlers
const one = (req, res, next) => {
    console.log("one");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res) => {
    console.log("three");
    res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three]);

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

