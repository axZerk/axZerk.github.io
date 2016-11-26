// Initialising primary slider controls clickability
var primarySlider = {
    el: {
        primarySlider: $(".slider_role_main"),
        sliderNav: $(".slider_role_main .slider__nav"),
        allNavButtons: $(".slider_role_main .slider__control")
    },

    init: function() {
        this.bindUIEvents();
    },

    bindUIEvents: function() {
        this.el.sliderNav.on("click", ".slider__control", function(event) {
            primarySlider.handleNavClick(event, this);
        });
    },

    handleNavClick: function(event, el) {
        event.preventDefault();
        this.changeActiveNav(el);
    },

    changeActiveNav: function(el) {
        this.el.allNavButtons.removeClass("slider__control_active");
        $(el).addClass("slider__control_active");
    }
};

primarySlider.init();

// Initialising secondary slider controls clickability
var testimonialsSlider = {
    el: {
        testimonialsSlider: $(".b-content__slider"),
        sliderNav: $(".b-content__slider .slider__nav"),
        allNavButtons: $(".b-content__slider .slider__control")
    },

    init: function() {
        this.bindUIEvents();
    },

    bindUIEvents: function() {
        this.el.sliderNav.on("click", ".slider__control", function(event) {
            testimonialsSlider.handleNavClick(event, this);
        });
    },

    handleNavClick: function(event, el) {
        event.preventDefault();
        this.changeActiveNav(el);
    },

    changeActiveNav: function(el) {
        this.el.allNavButtons.removeClass("slider__control_active");
        $(el).addClass("slider__control_active");
    }
};

testimonialsSlider.init();

// Adding\removing nav class modifier on window resize
function jqUpdateSize() {
    var wSize = $(window).width();
    var src = ($('#slider-img').attr("src") === "img/iphone.png");
        if ($(this).width() >= 768) {
            $('#main-nav')
                .removeClass('nav_view_vertical')
                .addClass('nav_view_horizontal');
            $('#slider-img').attr("src", "img/iphone-flash.png");
        } else {
            $('#main-nav')
                .removeClass('nav_view_horizontal')
                .addClass('nav_view_vertical');
            $('#slider-img').attr("src", "img/iphone.png");
        }
};

// $(".slider-item__img").bind("click", function() {
//       var src = ($(this).attr("src") === "img/iphone.png")
//                     ? "img/iphone-flash.png"
//                     : "img/iphone.png";
//       $(this).attr("src", src);
// });

$(document).ready(jqUpdateSize);
$(window).resize(jqUpdateSize);
