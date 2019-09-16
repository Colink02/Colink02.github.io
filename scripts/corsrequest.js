// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}


// Make the actual CORS request.
function makeCorsRequest(url, callback) {
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json', //change the datatype to 'jsonp' works in most cases
    success: (res) => {
      var text = res;
    }
  });
  //var xhr = createCORSRequest('GET', url);
  // Response handlers.
  //xhr.onload = function() {
  //  var text = xhr.responseText;
  //  callback(JSON.parse(text).players);
  //};
  //xhr.onerror = function() {
  //};
  //xhr.send();
  return;
}
