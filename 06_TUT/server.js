const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// rendering pages
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
app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html")); //definiramo status 404
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

