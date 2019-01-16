function onPageLoad() {
    $(".post").hide().animate({left: '-100%'}, 0).show();
    $(".post").animate({left: '0'}, 1000);
} 
