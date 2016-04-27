
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

// database

if (process.env.VCAP_SERVICES){
    srv = JSON.parse(process.env.VCAP_SERVICES);
    cred = (srv['mongodb'] || srv['mongodb-1.8'])[0].credentials;
    console.log(cred);

    mongoose.connect('mongodb://' + cred.username + ':' + cred.password + '@' + cred.hostname + ':' + cred.port + '/' + cred.db);

}

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(express.bodyParser());
  app.use( express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.session({ secret: "Nicolas Tesla is smarter than you" }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/examples', routes.example);
app.get('/generate', routes.generate);
app.post('/generate', routes.postGenerate);
app.get('/view/:id', routes.viewYaml);
app.get('/example/:lang/:name', routes.viewExample);

app.listen( process.env.VCAP_APP_PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
