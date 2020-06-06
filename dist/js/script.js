// Slick-slider
$(document).ready(function(){
	$('.carousel').slick({
		infinite: true,
		speed: 1000,
		autoplay: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		//  responsive: [
		//     {
		//         breakpoint: 991,
		//         settings: {
		//             dots: true,
		//             arrows: false
		//         }

		//     }
		// ]
	});

	new WOW().init();

	//тут скрипт для модальных окон "консультация"
    //открытие
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    //закрытие крестиком
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });
    //закрытие кликом вне окна
    $('.overlay').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });


	//валидация форм

	function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя.",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой адрес електронной почты.",
                    email: "Неверный формат адреса."
                }
            }
        });
    };

    valideForms('#consultation-form form');
    valideForms('#modal-form form');
    valideForms('#question-form form');

    //маска ввода у форм

    $('input[name=phone]').mask("+7 (999) 99-99-999");

    //настройка отправки писем

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // navigation panel

    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > 100) {
    //         $('.navigation').fadeIn();
    //     } else {
    //         $('.navigation').fadeOut();
    //     }
    // });

    //скрипт плавной прокрутки до якоря

    $("body").on('click', '[href*="#"]', function(e){
        const fixed_offset = 50;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
        e.preventDefault();
      });
});

// Hamburger

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
        })
    })
});
