var slider_pag = 0;

function changeSlider() {
    $("#slider_container .slider_imgs_container .slider_imgs").css("margin-left", "-" + slider_pag*640 + "px");
}

$("#slider_container .slider_left").click(e => {
    slider_pag = slider_pag > 0 ? slider_pag-1 : 2;

    changeSlider();
});

$("#slider_container .slider_right").click(e => {
    slider_pag = slider_pag < 2 ? slider_pag+1 : 0;

    changeSlider();
});