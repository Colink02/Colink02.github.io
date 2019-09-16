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

  var xhr = createCORSRequest('GET', url);
  // Response handlers.
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onload = function() {
    var text = xhr.responseText;
    callback(JSON.parse(text).players);
  };

  xhr.onerror = function() {
  };

  xhr.send();
  return;
}
