require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

staticAssets = __dirname + '/public';
absolutePath = __dirname + '/views/index.html';
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});
app.use('/public',express.static(staticAssets));
app.get('/now',(req,res,next)=>{
    req.time = new Date().toString();
    next();
}, (req,res)=>{
    res.json({"time":req.time});
});
app.get('/:word/echo',(req,res)=>{
    res.json({"echo":req.params.word});
});
app.post('/name',(req,res)=>{
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`});
});
app.get('/name',(req,res)=>{
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({
        name:`${firstName} ${lastName}`
    });
});
app.get('/',(req,res)=>{res.sendFile(absolutePath)});
app.get('/json',(req,res)=>{
    if(process.env.MESSAGE_STYLE == 'uppercase')
    {
        res.json({"message":"HELLO JSON"});
    }
    else{
        res.json({"message":"Hello json"});
    }
    });




























 module.exports = app;
