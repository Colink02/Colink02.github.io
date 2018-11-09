function on_page_load() {
    $(".post").hide()
    $(".post")
    .css("margin-left",-$(this).width())
    .animate({
        marginLeft:0
    }, 700);
    $(".post").show()
} 
