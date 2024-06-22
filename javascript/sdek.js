var pvzlist; // Объявляем переменную для хранения списка пунктов выдачи заказов (ПВЗ)
var selected_tariff; // Объявляем переменную для хранения выбранного тарифа

// Функция, вызываемая при клике на ПВЗ
function cdekPvzClick(tariff, tariff_type) {
    var selectedTarif = $('input[type=radio][name=shipping_method]:checked').val(); // Получаем значение выбранного метода доставки

    if(selectedTarif != 'cdek.'+tariff) {
        var inputVal = 'cdek.'+tariff;
        $("input[value='"+inputVal+"']").click(); // Кликаем на нужный input, если выбранный тариф не совпадает
    }

    getPvzList(tariff_type); // Получаем список ПВЗ для данного типа тарифа

    selected_tariff = tariff; // Сохраняем выбранный тариф

    cdekymap.ready(initMap(tariff_type)); // Инициализируем карту после готовности библиотеки cdekymap
}

// Функция инициализации карты
function initMap(pvzType) {   
    if (!pvzlist) {
        return false; // Если список ПВЗ пуст, выходим из функции
    }

    mapShow(0); // Показываем карту
    mapShow(1);

    var mapcenter = [pvzlist[0].coordY, pvzlist[0].coordX]; // Центрируем карту на первом ПВЗ
    myMap = new cdekymap.Map('cdek_map', {
        center: mapcenter,
        zoom: 10,
        controls: ['zoomControl','fullscreenControl']
    }, {
        searchControlProvider: 'yandex#search'
    });   

    var iname = 1; // Инициализируем счётчик для меток
    pvzlist.forEach(function(item, i, arr) {
        var description = item.Address+'<BR>'+item.Phone+'<BR>'+item.WorkTime+'<BR>'; // Формируем описание для метки
        var myGeoObject = new cdekymap.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [item.coordY, item.coordX]
            },
            properties: {
                iconContent: iname,
                hintContent: description
            }
        }, {
            preset: 'islands#blueIcon',
            draggable: false
        });
        iname = iname + 1;
        myGeoObject.events.add('click', function() { 
            selectPvz(item.Code); // Добавляем обработчик клика для выбора ПВЗ
        });
        myMap.geoObjects.add(myGeoObject); // Добавляем метку на карту
    });
    myMap.geoObjects.options.set("openBalloonOnClick", false); // Отключаем открытие балуна при клике на метку
}

// Функция отображения карты
function mapShow(status) {
    if(!$('#cdek_map').length) {
        var mapBlock_html = '<div class="cdek_map_container" id="cdek_map_contaner" style="dispaly:none">';
        mapBlock_html += '<div class="cdek_map_container_map" id="cdek_map"></div>';
        mapBlock_html += '<div class="cdek_map_container_map_control"><a href="javascript:mapShow(0)" class="control_button">Закрыть</a></div>';
        mapBlock_html += '</div>';
        $('body').append(mapBlock_html); // Добавляем HTML блок для карты, если его нет
    }

    if(status == 1) {
        $('#cdek_map_contaner').show(); // Показываем контейнер карты
    } else {
        $('#cdek_map_contaner').hide(); // Скрываем контейнер карты
        $('#cdek_map').html(''); // Очищаем содержимое контейнера карты
    }
}

// Функция выбора ПВЗ
function selectPvz(pvz_code) {
    mapShow(0); // Скрываем карту

    $.ajax ({
        async: false,
        url: 'index.php?route=extension/shipping/cdek/selectPvz',
        type:  'POST',
        dataType:  'json',
        data: ({
            pvz_code: pvz_code,
            tariff: selected_tariff
        }),
        success: function(json) {
            if(json.status) {
                $('.cdek_selectedPvzInfo').html('');
                $('#cdek_selectedPvzInfo_'+selected_tariff).html(json.data.address); // Обновляем информацию о выбранном ПВЗ
            }
        },
        error: function(data) {
            console.log('selectPvz error', data); // Логируем ошибку
        }
    });
}

// Функция получения списка ПВЗ
function getPvzList(tariff_type) {
    $.ajax ({
        async: false,
        url: 'index.php?route=extension/shipping/cdek/getPvzList',
        type:  'POST',
        dataType:  'json',
        data: ({
            tariff_type: tariff_type
        }),
        success: function(json) {
            if(json.status) {
                pvzlist = json.data; // Сохраняем список ПВЗ
            } else {
                alertMessage(json.message, false); // Показываем сообщение об ошибке
            }
        },
        error: function(data) {
            console.log('getPvzList error', data); // Логируем ошибку
        }
    });
}

// Функция проверки тарифа ПВЗ
function checkTariffPvz() {
    var status = true;

    $.ajax ({
        async: false,
        url: 'index.php?route=extension/shipping/cdek/checkTariffPvz',
        type:  'POST',
        dataType:  'json',
        data: ({
            tariff: $('input[type=radio][name=shipping_method]:checked').val()
        }),
        success: function(json){
            if(json.status) {
                status = true; // Тариф валиден
            } else {
                alertMessage(json.message, false); // Показываем сообщение об ошибке
                status = false; // Тариф не валиден
            }
        },
        error: function(data) {
            console.log('checkTariffPvz error', data); // Логируем ошибку
            status = true;
        }
    });

    return status; // Возвращаем статус проверки
}

// Функция показа сообщений
function alertMessage(message, status) {
    if(status) {
        alert(message); // Показываем сообщение об успехе
    } else {
        alert(message); // Показываем сообщение об ошибке
    }
}
