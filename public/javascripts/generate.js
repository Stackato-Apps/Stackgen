$(function() {

  // initialise form dials
  $(".knob").knob();

  // buttons for adding extra hooks
  $("#addPreStagingHook").click(function(){
    var ptag = $('<p>', {})
    $('<label> Hook</label>').appendTo(ptag);
    $('<input />',  { type : 'preStagingHooks[]', value : '' }).clone().appendTo(ptag)
    ptag.appendTo("#preStagingCont");  
    $('#collapseOne').collapse('show');
  });

  $("#addPostStagingHook").click(function(){
    var ptag = $('<p>', {})
    $('<label> Hook</label>').appendTo(ptag);
    $('<input />',  { type : 'postStagingHooks[]', value : '' }).clone().appendTo(ptag)
    ptag.appendTo("#postStagingCont");  
    $('#collapseTwo').collapse('show');
  });

  $("#addPreRunningHook").click(function(){
    var ptag = $('<p>', {})
    $('<label> Hook</label>').appendTo(ptag);
    $('<input />',  { type : 'preRunningHooks[]', value : '' }).clone().appendTo(ptag)
    ptag.appendTo("#preRunningCont");  
    $('#collapseThree').collapse('show');
  });


  // services
  $('#addService').click(function(){
    
    var service = $('#serviceChoices').val();
    var serviceName = $("#serviceName").val();

    if(serviceName == "") return;

    serviceID = 'service-' + randomString(6);


    var newServiceCont = $('<div/>', {id: "cont-"+serviceID, class: "service", style: "text-align:left", html: '<h3>' + serviceName + '</h3> <br/><b>Service Type:</b> '+ service });
    var newServiceHidden = $("<input/>", {id: serviceID, name: "services[]", type: "hidden", value: serviceName+':'+service});
    var newServiceLink = $('<a/>', {id: serviceID, class: "serviceBtn btn", html: "<i class=\"icon-remove\"></i> remove", style: "float:right"});

    newServiceLink.prependTo(newServiceCont);
    newServiceHidden.appendTo(newServiceCont);
    newServiceCont.appendTo("#servicesCont");

    $('#serviceName').val("");

  });

  $(".serviceBtn").live("click", function(){
  
    $("#cont-"+$(this).attr('id')).remove();


  });





  // utils
  function randomString(length) {
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
});
