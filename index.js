var express = require('express'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    fs = require('fs');

var app = express();

var mongoose = require('mongoose');           
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); 

mongoose.connect('mongodb://localhost/jobs');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

// MODEL
var Job = mongoose.model('Job', {
    jobID: String,
    url: String,
    source : String
});

// KUE
var kue = require('kue');
var jobs = kue.createQueue();
app.use('/queue', kue.app);

jobs.process('new job', function (job, done){
    
setTimeout(function() {
    thisURL= job.data.url;
    console.log('url: '+thisURL);
    // determine if it is HTTPS or not
    var isHTTPS = thisURL.includes('https');
    var protocalType='http';
    if (isHTTPS) {
        var protocalType='https';
    }
    
    // use appropriate protocol to fetch the HTML
    function download(url, callback) {
        
        if (protocalType=="https") {
            https.get(url, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    callback(data);
                });
            }).on("error", function() {
                callback(null);
            });
        } else {
            http.get(url, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    callback(data);
                });
            }).on("error", function() {
                callback(null);
            });       
        }
      
    }
    
    // insert into the db
    download(thisURL, function(data) {
        Job.create({
            jobID : job.id,
            url : thisURL,
            source: data,
            done : false
        }, function(err, job) {
            if (err)
                console.log(err)
        });
    });

    done && done();
}, 10000);
   
}); // end job proccess

// ROUTES

// get html
app.get('/api/html/:id', function(req, res) {
    console.log(req.params.id)
    Job.findOne({'jobID': req.params.id}, function(err, jobs) {
        if (err)
            res.send(err);
        res.json(jobs);
    });
});

var staticRoot = __dirname + '/';
app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));
app.use(function(req, res, next){

    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});
