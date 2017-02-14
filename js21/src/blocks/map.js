/**
 * Created by Zerk on 14-Feb-17.
 */

'use strict';

try {

} catch (e) {
}

let mapImg,
    centerLat = 0,
    centerLon = 0,
    mapZoom = 1,
    earthquakesList;

function preload() {
    mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-0,0,' + mapZoom + ',0,0/1024x512?access_token=pk.eyJ1IjoiemVyayIsImEiOiJjaXo1Z2d6dncwMDQ0MzJwanZjOGMyeGdnIn0.O4xkhmw6oAFEzRHosnGxLw');

    // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv');
    earthquakesList = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function setup() {
    createCanvas(1024, 512);
    translate(width / 2, height / 2);

    imageMode(CENTER);
    image(mapImg, 0, 0);

    render(earthquakesList);
}

// Получает список землетрясений и разбирает его на координаты
function render(data) {

    // Центр нашей карты
    let centerX = mercX(centerLon, mapZoom),
        centerY = mercY(centerLat, mapZoom);

    for (let value of data) {
        let arr = value.split(/,/);

        let currentLat = arr[1], // текщая широта
            currentLon = arr[2], // текущая долгота
            magnitude = arr[4]; // сила текущего землетрясения по шкале Рихтера

        //Преобразуем силу землетрясения из шкалы Рихтера, для более визуального представления, по другому точки слишком маленькие т.к. землетрясения в основном слабые
        magnitude = pow(10, magnitude);
        magnitude = sqrt(magnitude);

        // широта\долгота текущего землетрясения относительно нашей карты
        let x = mercX(currentLon, mapZoom) - centerX,
            y = mercY(currentLat, mapZoom) - centerY;

        // Считаем размер елипса относительно силы землетрясения
        let magnitudeMax = sqrt(pow(10, 10)),
            diameter = map(magnitude, 0, magnitudeMax, 0, 180);

        draw(x, y, diameter);
    }
}

// Рисует елипс по координатам и диаметру
function draw(coordX, coordY, diameter) {
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(coordX, coordY, diameter, diameter);
}

// рассчет X по https://en.wikipedia.org/wiki/Web_Mercator
function mercX(lon, zoomLevel) {
    lon = radians(lon);

    let a = (256 / PI) * pow(2, zoomLevel),
        b = lon + PI;

    return a * b;
}

// рассчет Y по https://en.wikipedia.org/wiki/Web_Mercator
function mercY(lat, zoomLevel) {
    lat = radians(lat);

    let a = (256 / PI) * pow(2, zoomLevel),
        b = tan(PI / 4 + lat / 2),
        c = PI - log(b);

    return a * c;
}