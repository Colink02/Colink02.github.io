$().ready(function (){
  var token = '';
  var pinger = setInterval(function (){
    
    $.ajax({
      cache: false,
      data: {
        token: token,
      },
      timeout: 2500,
      type: 'GET',
      url: 'home',
      dataType: 'json',
      success: function (data, status, jqXHR){
        $('#userCount').text(data.userCount);
        token = data.token;
      }
    });
    
  }, 5000);
});
