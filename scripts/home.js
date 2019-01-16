function onPageLoad() {
    $(".post").hide().show();
    $(".post")
    .css("margin-left",-$(this).width())
    .animate({
        marginLeft:0
    }, 700);
} 
