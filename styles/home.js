//$(function onPageLoad() {
//     $("#logo").animate({opacity: '1.0'});
//});
window.onload = function () {
     let fyre = document.getElementById("name");
     setTimeout(function () {
          fyre.text = "";
          Finaltext = "Colink02 Dev";
          Finaltext.split('').forEach(function (c) {
               setTimeout(function () {
                    fyre.text += c;
               }, 1500);
          });
     }, 5000);
};