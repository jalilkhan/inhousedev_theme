//JQuery Module Pattern

// An object literal
var app = {
  init: function() {
    app.functionOne();
  },
  functionOne: function () {
  }
};
(function($, Drupal) {
  $("document").ready(function () {
    app.init();

    var Menu = {

      el: {
        ham: $('.menu-icon'),
        menuTop: $('.menu-top'),
        menuMiddle: $('.menu-middle'),
        menuBottom: $('.menu-bottom')
      },

      init: function() {
        Menu.bindUIactions();
      },

      bindUIactions: function() {
        Menu.el.ham
            .on(
                'click',
                function(event) {
                  Menu.activateMenu(event);
                  event.preventDefault();
                }
            );
      },

      activateMenu: function() {
        Menu.el.menuTop.toggleClass('menu-top-click');
        Menu.el.menuMiddle.toggleClass('menu-middle-click');
        Menu.el.menuBottom.toggleClass('menu-bottom-click');
      }
    };

    Menu.init();


  // RIPPLE BUTTON EFFECT
  $('.btn-ripple').on('click', function (event) {
    event.preventDefault();

    var $div = $('<div/>'),
        btnOffset = $(this).offset(),
        xPos = event.pageX - btnOffset.left,
        yPos = event.pageY - btnOffset.top;

      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");

      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
          .css({
            top: yPos - ($ripple.height()/2),
            left: xPos - ($ripple.width()/2),
            background: $(this).data("ripple-color")
          })
          .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });

    // STAGE BOX HOVER
    var mq = window.matchMedia( "(max-width: 767px)" );
    if (mq.matches) {
      $('.stages-boxes-container .field--name-field-panel-items > .field__item').addClass('stage-box-active');
    }
    else {
      $('.stages-boxes-container .field--name-field-panel-items > .field__item:first-child').addClass('stage-box-active');

    }
    $('.stages-boxes-container .field--name-field-panel-items > .field__item').mouseenter(function () {
      $('.stages-boxes-container .field--name-field-panel-items > .field__item').removeClass('stage-box-active');
      $(this).addClass('stage-box-active');
    });

    $('.video-trigger.youtube .trigger-icon').click(function(){
      $('.video-embed-field-launch-modal').trigger('click');
    })
	// TESTIMONIAL SLIDER
    if($('.testimonials-slider').length){
      $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 700,
        autoplay:true,
        autoplaySpeed: 2000,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }


  // CAPABILITIES TRIGGER
  $('.card .btn').click(function () {
    $('.card .btn .accordion-trigger-icon').removeClass('accordion-trigger-icon-active');
    $(' .accordion-trigger-icon', this).toggleClass('accordion-trigger-icon-active');
  });

  // CONTACT FORM FIELDS ANIMATION
  //  $('form .form-group .form-control').trigger('focusin');

  $('form .form-group .form-control').focusin(function () {

    if($(this).hasClass('form-textarea')){
      $(this).parent().parent().addClass('element-focus-in');
    }
    else{
      $(this).parent().addClass('element-focus-in');
    }
    var field_length = $(this).val().length;
    console.log(field_length);
    if (field_length < 1) {
      if($(this).hasClass('form-textarea')){
        $(this).parent().parent().addClass('field-focused');
      }
      else{
        $(this).parent().addClass('field-focused');
      }
    }
    else{
    }
  });
  $('form .form-group .form-control').focusout(function () {
    $(this).parent().removeClass('element-focus-in');
    var field_length = $(this).val().length;
    console.log(field_length);
    if (field_length < 1) {
      if($(this).hasClass('form-textarea')){
        $(this).parent().parent().removeClass('field-focused');
      }
      else{
        $(this).parent().removeClass('field-focused');
      }
    }
    else{
      if($(this).hasClass('form-textarea')){
        $(this).parent().parent().addClass('field-focused');
        $(this).parent().parent().addClass('field-successful');
      }
      else{
        $(this).parent().addClass('field-focused');
        $(this).parent().addClass('field-successful');
      }
    }
  });

  setTimeout(function () {
    $('form .form-group .form-control').trigger('focusout');
  },300);
  // MAIN NAVIGATION
  $('.menu-icon').click(function () {
    $('.main-navigation').toggleClass('hide-navigation');
  });

  // STICKY MENU
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 159) {
      $("#header.header").addClass("header-fixed");
    } else {
      $("#header.header").removeClass("header-fixed");
    }
  });
  var dotsCount = 0;
    var ulDotsCheck = setInterval(function () {
      if($('.slick-dots li').length){
        dotsCount = $('.slick-dots li').length;
        var html = '<ul class="slick-dots" style="" role="tablist"><i class="fas fa-angle-left"></i><span>'+1+'/'+dotsCount+'</span><i class="fas fa-angle-right"></i></ul>';
        $('.slick-dots').html(html);

        clearTimeout(ulDotsCheck);

      }
    },300);
    $('#slick-views-testimonial-slider-block-1-1').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      var totalSlides = dotsCount;

      $('.slick-dots span').html(i+'/'+totalSlides)
    });
    $('body').on('click','.slick-dots .fas.fa-angle-left',function () {
      $('.slick__arrow .slick-prev').trigger('click');
    })
    $('body').on('click','.slick-dots .fas.fa-angle-right',function () {
      $('.slick__arrow .slick-next').trigger('click');
    })


    $('.view-capabilities-accordian-listing .views-field-description__value').slideUp();

    $('.view-capabilities-accordian-listing .views-field-name').click(function (event) {
      event.preventDefault();
      $('.view-capabilities-accordian-listing .views-field-name').removeClass('active-accordian');
      $('.view-capabilities-accordian-listing .views-field-description__value').slideUp('300');
      if( ! ($(this).parent().find('.views-field-description__value').is(':visible'))){
        $(this).parent().find('.views-field-description__value').slideDown('300', function() {
          $(this).parent().find('.views-field-name').addClass('active-accordian');
        });
      }
    })


  });
})(jQuery, Drupal);
