$(document).ready(function() { 


 
      var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });





$('.slider_footer').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
   dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
   dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.slider_footer_one').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
   dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
   dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


$('.block_slider_portfolio').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  rows: 2,
  responsive: [
    {
      breakpoint: 600,
      settings: {
  slidesToShow: 2,
  slidesToScroll: 1,
  rows: 3,
   dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
  slidesToShow: 2,
  slidesToScroll: 1,
  rows: 3,
   dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.block_slider_rew').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
    responsive: [
    {
      breakpoint: 600,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
  slidesToShow: 1,
  slidesToScroll: 1,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


$('.pl_but,.vizov_diz,.ost_zayvka,.button_diz_carta_tovara').click(function() { 
$('body').addClass('modal_block');
$('#overlay').fadeIn('slow');
});
$('.close_modal').click(function() {	
$('body').removeClass('modal_block');
$('#overlay').fadeOut('slow');
});


$('#menu_burger').click(function() {

$('.hidden_menu_overlay').fadeIn('slow');	
	
});


$('.close_menu_h').click(function() {

$('.hidden_menu_overlay').fadeOut('slow');	
	
});

$('.hidden_menu_overlay').click(function() {

$('.hidden_menu_overlay').fadeOut('slow');	
	
});


$('#menu a, .block_hidden_menu a, #footer_menu a').on('click', function() {

    let href = $(this).attr('href');
$('.hidden_menu_overlay').fadeOut('slow');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 370,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});



   $(".form_modal").submit(function(){ // перехватываем все при событии отправки
		var form = $(this); // запишем форму, чтобы потом не было проблем с this
		var error = false; // предварительно ошибок нет
		form.find('input[type="text"]').each( function(){
		if ($(this).val() == '') {
		$(this).addClass('error-place');
		$(this).attr('placeholder', 'Заполните поле');
		error = true;
		}
		});
		if (!error) { // если ошибки нет
						var data = form.serialize();
						console.log(data);
						$.ajax({ // инициализируем ajax запрос
						   type: 'POST', // отправляем в POST формате, можно GET
						   url: '/form.php', // путь до обработчика, у нас он лежит в той же папке
						   dataType: 'json', // ответ ждем в json формате
						   data: data, // данные для отправки
						   beforeSend: function(data) { // событие до отправки
								form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
							  },
						   success: function(data){ // событие после удачного обращения к серверу и получения ответа
							
							
									//alert('Заявка принята! Мы свяжемся с вами в ближайшее время'); // пишем что все ок
									$('.modal_form').trigger( 'reset' );
alert('Ваша заявка успешно отправлена!');

								
							 },
						   error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
$('.modal_form').trigger( 'reset' );
alert('Ваша заявка успешно отправлена!');

						   
							 },
						   complete: function(data) { // событие после любого исхода
								form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
							 }
	});
		}
		return false; // вырубаем стандартную отправку формы
	});



 $(".main_block_form form").submit(function(){ // перехватываем все при событии отправки
		var form = $(this); // запишем форму, чтобы потом не было проблем с this
		var error = false; // предварительно ошибок нет
		form.find('input[type="text"]').each( function(){
		if ($(this).val() == '') {
		$(this).addClass('error-place');
		$(this).attr('placeholder', 'Заполните поле');
		error = true;
		}
		});
		if (!error) { // если ошибки нет
						var data = form.serialize();
						console.log(data);
						$.ajax({ // инициализируем ajax запрос
						   type: 'POST', // отправляем в POST формате, можно GET
						   url: '/form.php', // путь до обработчика, у нас он лежит в той же папке
						   dataType: 'json', // ответ ждем в json формате
						   data: data, // данные для отправки
						   beforeSend: function(data) { // событие до отправки
								form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
							  },
						   success: function(data){ // событие после удачного обращения к серверу и получения ответа
							
							
									//alert('Заявка принята! Мы свяжемся с вами в ближайшее время'); // пишем что все ок
									$('.modal_form').trigger( 'reset' );
alert('Ваша заявка успешно отправлена!');

								
							 },
						   error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
$('.modal_form').trigger( 'reset' );
alert('Ваша заявка успешно отправлена!');

						   
							 },
						   complete: function(data) { // событие после любого исхода
								form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
							 }
	});
		}
		return false; // вырубаем стандартную отправку формы
	});

});