var express = require('express')
var bodyParser = require('body-parser')
var errorMessage = { error: "Could not decode request: JSON parsing failed"}
var app = express()

app.use(bodyParser.json())

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
      return res.status(400).send(errorMessage);
  } else {
    next();
  }
});

app.get('/', function (req, res) {
  res.send('mi9-coding-challenge');
})

app.post('/', function (req, res) {


    if (!req.body) return res.set.status(400).send(errorMessage);
    if (!('payload' in req.body)) return res.status(400).send(errorMessage);


    var shows = req.body['payload']
    var showsFiltered = shows.filter(function(show){

        //(drm: true) and at least one episode (episodeCount > 0)
        return (show.drm==true && show.episodeCount>0)

    }); 
    

    var showsFormatted = []
  
    showsFiltered.forEach(function(show) {
  
          var showOutputFormat = { image: show.image.showImage,
                                   slug: show.slug,
                                   title: show.title
                                 }
      
          showsFormatted.push(showOutputFormat)
  
  
    })
  
  
   console.log({response: showsFormatted})
   res.send({response: showsFormatted})

})




var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('mi9-coding-challenge listening at http://%s:%s', host, port)

})