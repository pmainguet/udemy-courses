$(document).ready(function () {

    var link = $('.nav-link');
    brand = $('.navbar-brand ');


    /* navigation bar color change */
    var changeColor = function () {
        var scroll_start = 0;
        var startchange = $('#home');
        var offset = startchange.offset();
        if (startchange.length) {
            $(document).scroll(function () {
                scroll_start = $(this).scrollTop();
                if (scroll_start > offset.top) {
                    $(".navbar").addClass('bg-light')
                    link.removeClass('white')
                    brand.removeClass('white')
                    link.addClass('text-dark')
                    brand.addClass('text-dark')

                } else {
                    $(".navbar").removeClass('bg-light')
                    link.addClass('white')
                    link.removeClass('text-dark')
                    brand.addClass('white')
                    brand.removeClass('text-dark')
                }
            });
        }
    }

    /* page scroll on click */
    var scroll = function () {
        $('.page-scroll a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });
    }

    changeColor();
    scroll()

});