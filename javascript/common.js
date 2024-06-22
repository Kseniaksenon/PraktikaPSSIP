$(document).ready(function() {
    // Показывать кнопку при прокрутке страницы
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    // Плавный скроллинг к началу страницы при нажатии на кнопку
    $('#scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    // Существующий код
    // Подсветить любые найденные ошибки
    $('.text-danger').each(function() {
        var element = $(this).parent().parent();

        // Добавить класс 'has-error' к родительскому элементу form-group
        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });

    // Валюта
    $('#form-currency .currency-select').on('click', function(e) {
        e.preventDefault();

        // Установить выбранный код валюты и отправить форму
        $('#form-currency input[name=\'code\']').val($(this).attr('name'));
        $('#form-currency').submit();
    });

    // Язык
    $('#form-language .language-select').on('click', function(e) {
        e.preventDefault();

        // Установить выбранный код языка и отправить форму
        $('#form-language input[name=\'code\']').val($(this).attr('name'));
        $('#form-language').submit();
    });

    /* Поиск */
    $('#search input[name=\'search\']').parent().find('button').on('click', function() {
        var url = $('base').attr('href') + 'index.php?route=product/search';

        // Получить значение поиска и перенаправить на страницу результатов
        var value = $('header #search input[name=\'search\']').val();
        if (value) {
            url += '&search=' + encodeURIComponent(value);
        }
        location = url;
    });

    $('#search input[name=\'search\']').on('keydown', function(e) {
        if (e.keyCode == 13) {
            $('header #search input[name=\'search\']').parent().find('button').trigger('click');
        }
    });

    // Меню
    $('#menu .dropdown-menu').each(function() {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();

        // Подкорректировать позицию выпадающего меню, если оно выходит за границы
        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
        if (i > 0) {
            $(this).css('margin-left', '-' + (i + 10) + 'px');
        }
    });

    // Список продуктов
    $('#list-view').click(function() {
        $('#content .product-grid > .clearfix').remove();
        $('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
        $('#grid-view').removeClass('active');
        $('#list-view').addClass('active');

        localStorage.setItem('display', 'list');
    });

    // Сетка продуктов
    $('#grid-view').click(function() {
        // Динамически задать количество колонок
        var cols = $('#column-right, #column-left').length;
        if (cols == 2) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
        } else if (cols == 1) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
        } else {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
        }

        $('#list-view').removeClass('active');
        $('#grid-view').addClass('active');
        localStorage.setItem('display', 'grid');
    });

    // Восстановить режим отображения из localStorage
    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');
        $('#list-view').addClass('active');
    } else {
        $('#grid-view').trigger('click');
        $('#grid-view').addClass('active');
    }

    // Оформление заказа: отправить форму при нажатии Enter
    $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
        if (e.keyCode == 13) {
            $('#collapse-checkout-option #button-login').trigger('click');
        }
    });

    // Всплывающие подсказки при наведении
    jQuery('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});

    // Обновить всплывающие подсказки для контента, загруженного через AJAX
    $(document).ajaxStop(function() {
        $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
    });
});

