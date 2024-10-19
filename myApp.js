let express = require('express');
let app = express();

app.get("/root", (req, res)=>{
    res.send("Hello Express")
})

console.log("Hello World")

exports.default = app;


































 module.exports = app;
