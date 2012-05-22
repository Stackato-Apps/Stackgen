var stackgen = require('../lib/stackgen');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '' })
};

exports.about = function(req, res){
  res.render('about', { title: ' - About' })
};

exports.example = function(req, res){
  res.render('examples', { title: ' - Examples' })
};

exports.generate = function(req, res){
  res.render('generate', { title: ' - Generate' })
};

exports.postGenerate = function(req, res){
  var pyyaml = require('pyyaml');
  var fileID = stackgen.randomString(12);
  var filename= fileID + '.yaml';

  stackgen.process(req.body, function(err, data){

    pyyaml.dump(data, 'public/yamls/'+filename, function(err) {      
        console.log(err ? 'dump failed' : 'dump successful');      
    });

    
    var file = '/yamls/'+filename  
    res.render('postGenerate', { title: ' - Generated', ymlfile: file, appName: data.name, id: fileID })

  });
};

exports.viewYaml = function(req, res){
  
  var file = '/yamls/'+req.params.id+'.yaml';
  var fileID = req.params.id

  pyyaml.load(__dirname+'/../public/yamls/'+req.params.id+'.yaml', function(err, data) {
      if (err) throw err;
        console.log('load successful: ' + JSON.stringify(data));  

        res.render('viewYaml', { title: ' - view', ymlfile: file, appName: data.name, id: fileID });

  });
  };

exports.viewExample = function(req, res){
  

  pyyaml.load(__dirname+'/../public/examples/'+req.params.lang+ '/' + req.params.name + '.yaml', function(err, data) {
      if (err) throw err;
        console.log('load successful: ' + JSON.stringify(data));  

        var ymlfile = "/examples/"+req.params.lang+ '/' + req.params.name + '.yaml';

        res.render('viewExample', { title: ' - view', ymlfile: ymlfile, appName: data.name });

  });
  };


