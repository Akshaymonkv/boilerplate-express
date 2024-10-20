require('dotenv').config()   //to call in the environment variable
let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use("/", (req, res, next)=>{
    console.log(req.method,req.path, "-", req.ip)
    next()
})

app.get("/root", (req, res)=>{
    res.send("Hello Express")
})


app.use("/public",express.static(__dirname + '/public')) //using a middleware to serve the static css file

absolutePath = __dirname + '/views/index.html'
console.log(absolutePath)

//server the index.html file (http server) on request
app.get("/",(req, res)=>{
    res.sendFile(absolutePath)
})

//giving API output based on the value on the env varaible, example on how to call env variables
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

//Getting the system date and time ans using nested middleware 
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

//to test and display request parameters
app.get("/:word/echo",(req, res)=>{
    res.json({
        echo: req.params.word
    })
})


//to test and display query parameters
app.get("/name",(req, res)=>{
    console.log(req.query.first, req.query.last)
    res.json({
        name: req.query.first +" "+ req.query.last
    })
})
//using the bosyparser middleware
app.use(bodyParser.urlencoded({extended: false}));

//handling a post request
app.post("/name",(req, res)=>{
//    console.log("Inside post")
//    console.log(req.body.first)
res.json({
    name: req.body.first +" "+ req.body.last
})
})

exports.default = app;


































 module.exports = app;
