
// functions


$(document).ready(function () {


    

    //check element for initializing
    function checkElement(selector) {
        if (selector.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // just send navigation element as parameter which
    // has data-carousel set to carousel name to change
    // and data-forward set to nav forward
    function changeSlider(element, changeAnother, anotherElement) {
        var selector = changeAnother == true ? anotherElement : $('.' + element.data('carousel'));
        var toward = element.data('toward');
        selector.trigger('' + toward + '.owl.carousel');
    }


   

    $('.news-preview').slick({
        vertical: true,
        arrows: false,
        asNavFor: '.all-news',
        slidesToScroll: 1,
        cssEase: 'linear',
        draggable: false

    });

    $('.graduate-list').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300

    });

 
    //side-menu in classes page

    $(window).on('scroll', function () {
        $('.will_scroll').each(function (index, element) {
            var scroll = $(window).scrollTop();
            if (scroll > $(element).offset().top && scroll < $(element).offset().top + $(element).height()) {
                if (!$('.side-menu .menu ul>li[data-section="' + $(element).data('id') + '"]').hasClass('active')) {
                    $('.side-menu .menu ul>li').removeClass('active');
                    $('.side-menu .menu ul>li[data-section="' + $(element).data('id') + '"]').addClass('active');
                }
            }
        });
    });

    if ($('.side-menu').length > 0) {
        if ($(document).innerWidth() > 1024) {
            $('.side-menu').css('width', $('.side-menu').width() + 'px');
            $('.side-menu ul>li').each(function (index, element) {
                $(element).attr('data-section', index);
            });
            $('.will_scroll').each(function (index, element) {
                $(element).attr('data-id', index);
            });
            $('.side-menu ul>li').click(function () {
                //event.preventDefault();
                var offset = $('.will_scroll[data-id="' + $(this).attr('data-section') + '"]').offset().top;
                $('body,html').animate({
                    scrollTop: offset + 1 + 'px'
                }, 600);
                $('.side-menu ul>li').removeClass('active');
                $(this).addClass('active');
            });
        }
    }

    if ($('.side-menu').length > 0) {
        var side_menu_top = $('.side-menu').offset().top;
        if (window.innerWidth > 1024) {
            $(window).on('scroll load', function () {
                if ($(window).scrollTop() > side_menu_top) {
                    $('.side-menu').addClass('fixed');
                } else {
                    $('.side-menu').removeClass('fixed');
                }
                if ($('.side-menu .menu').offset().top + $('.side-menu .menu').height() > $('#contact').offset().top - 90) {
                    $('.side-menu').css('opacity', '0');
                } else {
                    $('.side-menu').css('opacity', '1');
                }
            });
        }
    }

    //Apply 

    if ($('a.apply').length > 0) {
        $('#contact').height($('#contact').height());
        $('a.apply').click(function () {
            event.preventDefault();
            $.when($('#contact').addClass('activated')).done(function () {
                $('body, html').animate({
                    scrollTop: $('#contact').offset().top + 'px'
                }, 500);
            });
        });
    }

    if ($('.navigation-bar').length > 0) {
        var length = $('.navigation-bar li').length;
        $('.navigation-bar li').each(function (index, element) {
            if (index < length - 1) {
                $(element).after('<li class=\'seperator\'>></li>');
            }
        });
    }

    if ($('.tab-list').length > 0) {
        $('.menu-tab ul>li').each(function (index, element) {
            $(element).attr('data-tab-id', index);
            // index == 0W ? $(element).addClass('active') : 0;
        });
        $('.tab-list .tab').each(function (index, element) {
            $(element).attr('data-tab', index);
            index == 0 ? $(element).addClass('active') : 0;
        });
        $('.menu-tab ul>li').click(function (e) {
            // e.preventDefault();
            var tab_id = $(this).data('tab-id');
            $('.menu-tab ul>li').not($(this)).removeClass('active');
            $('.menu-tab ul>li[data-tab-id="' + tab_id + '"]').addClass('active');
            $.when($('.tab-list .tab').fadeOut('slow')).then(function (e) {
                $('.tab-list .tab').hide();
                $('.tab-list .tab[data-tab="' + tab_id + '"]').fadeIn(600);
            });
        });
    }

    $('.list-slider').owlCarousel({
        items: 1,
        dots: true,
        autoplay: true,
        loop: true
    });

    //Then they said remove this 
    if ($('.events-list').length > 0) {
        var colors_list = ['#0086cd', '#f0812b', '#873996', '#00a65a', '#ec3824', '#ffc90a'];
        $('.events-list .event').each(function (index, element) {
            var color_index = index < colors_list.length ? index : index % (colors_list.length - 1);
            $(element).find('span.background').css('background-color', colors_list[color_index]);
        });
        $('.events-list .event-frame').slick({
            vertical: true,
            slidesToShow: 5,
            infinite:false,
        });
    }
    //take care of this function

    if (checkElement($('.news-list'))) {
        $('.news-list').slick({
            dots: true,
            autoplay: true,
            infinite: true
        });
    }

    if (checkElement($('.all-news'))) {
        var slick_init = false;
        $(window).on('resize load', function () {
            if (window.innerWidth > 880 && slick_init == false) {
                $('.all-news').slick({
                    vertical: true,
                    slidesToShow: 4,
                    infinite: false,
                    autoplay: true,
                    autoplaySpeed: 9000
                });
                slick_init = true;
            } else if (window.innerWidth <= 880 && slick_init == true && news_list_init == false) {
                $('.all-news').slick('unslick');
            }
        });
    }

    if (checkElement($('.main-img'))) {
        $('.main-img').owlCarousel({
            items: 1,
            animateOut: 'fadeIn',
            animateIn: 'fadeOut',
            mouseDrag: false
        });
    }

    if (checkElement($('.img-gallery'))) {
        $('.img-gallery .gallery-item').each(function (index, element) {
            $(element).attr('data-index', index);
        });
        $('.img-gallery').owlCarousel({
            items: 5,
            margin: 10
        });
        $('.img-gallery .gallery-item').click(function () {
            $('.main-img').trigger('to.owl.carousel', [$(this).data('index'), 500]);
        });
    }

    if (checkElement($('.select_education'))) {
        if ($(window).width() < 1071) {
            $('.select_education').click(function () {
                $(this).toggleClass("open");
                $(this).next().slideToggle();
            });
        }
    }

    $('.navs>div').click(function () {
        changeSlider($(this), false, false);
    });

    $('.img-list .navs>div').click(function () {
        // changeSlider($(this), true, $('.main-img'));
        // $('.gallery-item.active').closest('.owl-item').next().children('.gallery-item').addClass('active')
        // $('.gallery-item.active').removeClass('active');
    });
    $('.teacher-list .teacher').hover(function () {
        $(this).find('img[data-value="initial"]').removeClass('active');
        $(this).find('img[data-value="onhover"]').addClass('active');
    }, function () {
        $(this).find('img[data-value="initial"]').addClass('active');
        $(this).find('img[data-value="onhover"]').removeClass('active');
    });

    $('.img-gallery .owl-item>.gallery-item').click(function (e) {
        $('.gallery-item').removeClass('active');
        $(this).addClass('active');
    });

    //appeal
    var date = $('.date');
    var time = $('.time');
    if (checkElement(date) && checkElement(time)) {
        date.datetimepicker({
            format: 'DD/MM/YYYY',
            minDate: moment()
        });
        time.datetimepicker({
            format: 'HH:mm',
            minDate: moment({h:10}),
            maxDate: moment({h:19})
        });
    }

    if (checkElement($('.choose-question'))) {
        $(window).click(function (e) {
            if ($(e.target).closest('.choose-question').length == 0) {
                $('.choose-question').removeClass('active');
            }
        });
        $('.choose-question').click(function () {
            $(this).toggleClass('active');
        });
        $('.option').click(function () {
            $(this).closest('.choose-question').find('input[type="hidden"]').attr('value', $(this).attr('data-value'));
            $('.option-target').html($(this).html());
        });
    }
    //appeal end


    if (checkElement($(".questions_popup .close_popup"))) {
        $(".questions_popup .close_popup").click(function () {
            $(".questions_popup").fadeOut();
        });
    }

    if (Cookies.get("appeal") == undefined && localStorage.isSeenPopup == undefined) {
        var intPopup = setInterval(function () {
            if (getSpentTime() >= 60) {
                localStorage.clear();
                localStorage.isSeenPopup = true;
                $('.questions_popup').fadeIn().css("display", "flex");
                clearInterval(intPopup);
            }
        },1000);
    }

    //Store
    if (localStorage.entertime == undefined) {
        localStorage.entertime = new Date().getTime();
    }

    function getSpentTime() {
        var spent = (new Date().getTime() - localStorage.entertime) / 1000;
        return spent;
    }

    $(".setCookie").submit(function () {
        Cookies.set('appeal', 'done');
    });
    


    // general Clear Button
    if (checkElement($('.js-clear'))) {
        $('.js-clear').click(function () {
            $(this).closest('form').find('input').val('').removeClass('valid');
            if (checkElement($(this).closest('form').find('.choose-question'))) {
                $(this).closest('form').find('.option-target').html($(this).closest('form').find('.choose-question').attr('data-default-text'));
                $(this).closest('form').find('input[type="hidden"]').attr('data-value', '');
            }
        });
    }
    // general clear button end


    //toggle for order list
    $('.category-list').siblings('a').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.category-list').slideToggle('slow');
        $(this).closest('.drop-list').toggleClass('expanded');
    });

    //home page toggle events list
    var news_list_init = false;
    $('.mobile-events-handler').click(function () {
        $(this).siblings('.news-holder').slideToggle('fast');
        $(this).find('.fa.arrow').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
        if (!news_list_init) {
            $.when(news_list_init = true).then(function () {
                $('.all-news').slick({
                    vertical: true,
                    slidesToShow: 4,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 9000
                });
            });
        }
    });

    //responsive sidebar
    $('.hamburger').click(function () {
        $('.hamburger').not('.close').toggleClass('is-active');
        $('nav .menu').toggleClass('expanded');
    });
    $('.menu.expanded li.dropdown').click(function () {
        $(this).find('.heading').slideToggle(200);
    });

    //toaster initialization for forms
    $.toaster({
        settings: {
            toast: {
                'css': {
                    'position': 'fixed',
                    'bottom': '10px',
                    'background-color': '#00a65a',
                    'color': 'white'
                },
                fade: { in: 'fast', out: 'slow' }

            }
        }
    });
    $('.dropdown-trigger').click(function () {
        $(this).toggleClass('active');
        $(this).siblings('ul').toggleClass('active');
    })
    $(window).on('resize', function () {
        if ($(window).innerWidth() > 1070) {
            $('.dropdown-trigger+ul.active').removeClass('active');
        }
    })

    if ($(window).innerWidth() > 1024) {
        $('nav .dropdown').hover(function () {
            $(this).children('.dropdown-content').fadeIn(300).css("display", "flex");
        }, function () {
            $(this).children('.dropdown-content').fadeOut(300);
           })
    }

    //search form validation
    var search_input = $('header .search-bar input[type="text"]');
    search_input.focusin(function () {
        $(this).siblings('button[type="submit"]').addClass('invalid');
    });
    search_input.focusout(function (e) {
        if ($(e.explicitOriginalTarget).closest('button[type="submit"]').length==0){
            $(this).siblings('button[type="submit"]').removeClass('invalid');
        }
    })
    search_input.on('input focusout', function () {
        var value = $(this).val();
        var submit_button = $(this).siblings('button[type="submit"]');
        if (validator.required(value)) {
            submit_button.removeClass('invalid');
            submit_button.prop('disabled', false);
           
        } else {
            submit_button.addClass('invalid');
            submit_button.prop('disabled', true);
        }
    })

    $('.phone-input .phone-prefix select').on('change', function () {
        var input = $(this).closest('.phone-input').find('[name="number"]');
        input.attr('data-prefix', '('+$(this).val()+")-");
        input.val(input.attr('data-prefix') + input.attr('data-value'))
    })

    $('.phone-input .phone-value input').on('change focusin focusout input', function () {
        var input = $(this).parents('.phone-input').find('[name="number"]');
        if ($(this).hasClass('valid')) {
            input.attr('data-value', $(this).val());
            input.val(input.attr('data-prefix') + input.attr('data-value'))
        }
    })
    //input validations

    var validator = {
        required: function (val, input_name) {
            if (val.length <= 0) {
                return input_name+ " bölməsini daxil etmək mütləqdir";
            }
            return true;
        },
        full_name: function (val, input_name) {
            if (String(val).trim().split(/\s+/).length <= 1) {
                return input_name+" minimum iki sözdən ibarət olmalıdır";
            }
            return true;
        },
        isEmail: function (val, input_name) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val) == true ? true : input_name + " düzgün daxil edin" ;
        },
        isNumber: function (val, input_name) {
            var value = val.slice(0,15);
            var regex = /^\d{3}\-\d{2}\-\d{2}$/;
            if (!regex.test(value)) {
                return input_name + " bölməsini tam doldurun";
            }
            return true;
        },

        char_limit: function (val, input_name) {
            var length = val.length;
            if (length >=500) {
                return input_name + " bölməsinin xarakter limiti 500-dür";
            }
            return true;
        }
    }

    var object_validations = {
        'name': ['required'],
        'surname': ['required'],
        'fullname': ['required', 'full_name'],
        'email': ['required', 'isEmail'],
        'number': ['required', 'isNumber'],
        'message': ['required', 'char_limit'],
        'date': ['required'],
        'message':['required'],
    }


    function validate(validate_type, value,input_name) {
        var validate_rules = object_validations[validate_type];
        var error_messages = [];
        var isValid = true;
        for (var rule in validate_rules) {
            if (validator[validate_rules[rule]] && validator[validate_rules[rule]](value, input_name) !== true) {
                isValid = false;
                error_messages.push(validator[validate_rules[rule]](value, input_name));
            }
        }
        return { valid: isValid, messages: error_messages };
    }

    var form_messages = [];
    var form_list = [];
    var form_valid = false;
    $('input.validate').on('input focusin focusout keydown', function (e) {
 
        var input = $(this);
        var input_wrapper = input.closest('.input-wrapper');
        var validate_type = $(this).attr('name') || $(this).attr('data-validate-name');
        var value = $(this).val();
        var input_name = $(this).attr('data-name');
        var form_index = Number($(this).closest('form').attr('data-form'));
        if (e.keyCode == 13 && !form_list[form_index].valid ) {
            return false;
        }
        $(this).closest('.form').find('.message').removeClass('valid').fadeOut();
        if (validate(validate_type, value, input_name).valid != true) {
            input.removeClass('valid').addClass('invalid');
            input_wrapper.addClass('invalid');
            form_list[form_index]['list'][validate_type].valid = false;
        } else {
            input.removeClass('invalid').addClass('valid');
            input_wrapper.removeClass('invalid');
            form_list[form_index]['list'][validate_type].valid = true;
        }
        for (var input in form_list[form_index]['list']) {
            if (form_list[form_index]['list'][input].valid) {
                form_list[form_index]['valid'] = true;
            } else {
                form_list[form_index]['valid'] = false;
                break;
            }

        }
        if (form_list[form_index]['valid'] != true) {
            $(this).closest('form').removeClass('valid').addClass('invalid');
        } else {
            $(this).closest('form').removeClass('invalid').addClass('valid');
        }
    })

    $('form.validator').each(function (i, el) {
        form_list[i] = {};
        form_list[i]['list'] = {};
        form_list[i]['valid'] = false;
        $(el).attr('data-form',i);
        $(el).find('input.validate').each(function (index, element) {
            form_list[i]['list'][$(element).attr('name') || $(element).attr('data-validate-name')] = { valid: false };
        })
    })
    //phone-number formatter
    if ($('input[data-mask="number"]').length > 0) {
        $('input[data-mask="number"]').toArray().forEach(function (el) {
            new Cleave(el, {
                delimiters: ['-', '-', '-'],
                blocks: [ 3, 2, 2],
            })
        })
    }


    if (checkElement($('.videoembed'))) {
        function videoRadio() {
            var radio = $('.videoembed').data("radio").split("x");
            var width = $('.content').width();
            var heigth = (Number(radio[1]) * width) / Number(radio[0]);

            $('.videoembed').find("iframe").css({
                "width": width,
                "height": heigth
            });
        }

        videoRadio();
        $(window).resize(function () {
            videoRadio();
        });
    }

   

   
});
//# sourceMappingURL=main.js.map


