$(".dot").slideDown(10000000)
while(true) {    
  var element = document.getElementById('foo');
  var positionInfo = element.getBoundingClientRect();
  var height = positionInfo.height;
  var width = positionInfo.width;
  if(height > window.innerHeight) {
    document.getElementById("dot").style.height = "0px";
  }
}
