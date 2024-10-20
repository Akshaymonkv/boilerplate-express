require('dotenv').config()
let express = require('express');
let app = express();


app.use("/", (req, res, next)=>{
    console.log(req.method,req.path, "-", req.ip)
    next()
})

app.get("/root", (req, res)=>{
    res.send("Hello Express")
})


app.use("/public",express.static(__dirname + '/public'))

absolutePath = __dirname + '/views/index.html'
console.log(absolutePath)

app.get("/",(req, res)=>{
    res.sendFile(absolutePath)
})

app.get("/json",(req, res)=>{
    let ms = process.env.MESSAGE_STYLE
    if (ms == "uppercase"){
        res.json({
            "message": "HELLO JSON"
        })
    }
    else {
    res.json({
        "message": "Hello json"
    })}


})

app.get("/now",(req, res, next)=>{
    req.time = new Date()
    next()
},
    (req, res)=>{
        res.json({
            time: req.time
        })
    }
)

app.get("/:word/echo",(req, res)=>{
    res.json({
        echo: req.params.word
    })
})

exports.default = app;


































 module.exports = app;
