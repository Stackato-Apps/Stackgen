pyyaml = require('pyyaml');

exports.randomString = function(length){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

exports.process = function(formData, cb) {

  var data = {};
  var error = false;

  console.log(formData);

  if(formData.appName){
    data.name = formData.appName;
  }

  if(formData.appURL){
    data.url = formData.appURL;
  }

  if(formData.appFramework){
    data.framework = {};
    data.framework.type = formData.appFramework;

    switch(data.framework.type){
      case "perl":
        data.framework.runtime = "perl514";
        break
    }
  }

  if(formData.appRuntime){
    if(formData.appRuntime != "none")
      data.framework.runtime = formData.appRuntime;
  }

  if(formData.appMem){
    data.mem = parseInt(formData.appMem) + 'M';

  }

  if(formData.numInstances){
    data.instances = parseInt(formData.numInstances);
  }

  if(formData.preStagingHooks){
    if(formData.preStagingHooks.length > 0){
      data.hooks = {}
      data.hooks['pre-staging'] = formData.preStagingHooks; 
    }
  }

  if(formData.postStagingHooks){
    if(formData.postStagingHooks.length > 0){
      if( typeof(data.hooks) == 'undefined') data.hooks = {};
      data.hooks['post-staging'] = formData.postStagingHooks;
    }
  }
  
  if(formData.preRunningHooks){
    if(formData.preRunningHooks.length > 0){
      if( typeof(data.hooks) == 'undefined') data.hooks = {};
      data.hooks['pre-running'] = formData.preRunningHooks;
    }
  }

  if(formData.services){
    if(formData.services.length > 0){
      data.services = [];
      for (var i = formData.services.length-1; i > -1; i--) {
        console.log(formData.services[i]);

        var serviceArr = {};

        var service = formData.services[i].split(':');
        serviceArr[service[0]] = service[1];
        data.services.push(serviceArr);
        
      }
    }
  }

  if(formData.envs){
    var envs = formData.envs.split(',');
    if(envs.length > 1){
      data.env = {}
      for (var i = envs.length-1; i > -1; i--) {
        var tmpEnv = envs[i].split("=");
        tmpEnv[0] = tmpEnv[0].replace(' ', '');
        data.env[tmpEnv[0]] = tmpEnv[1];
        
      }
    }
  }

  if(formData.ignores){
    var ignores = formData.ignores.split(',');

    if(ignores.length > 1){
      data.ignores = [];
      for (var i = ignores.length-1; i > -1; i--) {
        data.ignores.push(ignores[i]);
      }

    }
  }
  
  console.log(data);
  cb(error, data);
};
