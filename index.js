var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public' ));
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


//////////////mongoose///////////
mongoose.connect('mongodb://renu:18reenu1999@ds163918.mlab.com:63918/codedata');

////database setup////
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
}); 
/////model setup/////
var urlSchema = mongoose.Schema({
    url: String,
    key: String,
});


var Url = mongoose.model('Url', urlSchema);
////////////////end//////////////////

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///////////////Route///////////////

app.get('/',function(req,res){
		res.sendFile('urlshortner.html',{
	root:__dirname});
})

app.listen(process.env.PORT || 5000,function(){
  console.log('Server is up and running');
});


app.post('/short',function(req,res)
{
  var url = req.body.url;
  var key = req.body.key;

var newUrl = new Url({ url: url,key: key})

newUrl.save(function (err, testEvent) {
  if (err) return console.error("err");
  console.log("Short Url Created!!");
});
 console.log( url + "     " + key + " " );
 });


app.post('/create',function (req, res)
{
  var k = req.body.key;
  console.log('checking for ' + k );
    Url.find({key:k},function (err, url)
    {
        if(url.length>0)
        {
          res.send('true');
        }
        else
          res.send('false');
      if (err) return console.error('///////////////there was an error/////////////');
    });

});

app.get('/:url',function(req,res){
	 var key = req.params.url;
  console.log(key);
  Url.findOne({key:key},function (err, url) {
    if (err) return console.error("eError");
    if(url)
      res.redirect(url.url);
    else
    console.log( "Error on URL ");
    });
});


