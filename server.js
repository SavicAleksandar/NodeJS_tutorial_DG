// node runs on a server - not in a browser (backend not frontend)
// the console is the terminal window
console.log("hello world")

// global object instead of window object
console.log(global);

// has common core modules that we will explore
const os = require ("os")
const path = require("path")

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))

console.log(path.parse(__filename))

// commonJS modules instead of ES6 modules
const math = require("./math")

console.log(math.add(2, 2))
console.log(math.substract(2, 2))
console.log(math.multiply(2, 2))
console.log(math.divide(2, 2))

// missing some JS APIs like fetch
