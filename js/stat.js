'use strict';

window.renderStatistics = function (ctx, names, times) {
  var COORDINATES_CLOUD = [100, 10];
  var HEIGHT_RECT = 270;
  var WIDTH_RECT = 420;
  var LINGHT_SHADOW = 10;
  var MARGIN_X = 35;
  var GAP = 50;
  var CLOUD_GAP = 10;
  var WIDTH_BAR = 40;
  var MAX_HEIGHT_BAR = 150;
  var TEXT_X = 135;
  var TEXT_Y = 266;
  var BAR_X = 135;
  var BAR_Y = 246;
  var COLOR_RECT = ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'];
  var COLOR_TEXT = '#000';
  var FONT_TEXT = '16px PT Mono';
  var TEXT = ['Ура! Вы победили!', 'Список результатов: '];
  var maxTime = Math.max.apply(null, times);

  renderCloud(COORDINATES_CLOUD[0] + LINGHT_SHADOW, COORDINATES_CLOUD[1] + LINGHT_SHADOW, WIDTH_RECT, HEIGHT_RECT, COLOR_RECT[0]);
  renderCloud(COORDINATES_CLOUD[0], COORDINATES_CLOUD[1], WIDTH_RECT, HEIGHT_RECT, COLOR_RECT[1]);
  renderText(TEXT);
  renderBars(names);

  function renderCloud(X, Y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, width, height);
  }

  function renderText(textArray) {
    ctx.fillStyle = COLOR_TEXT;
    ctx.font = FONT_TEXT;

    for (var i = 0; i < textArray.length; i++) {
      var gapY = i ? 25 : 30;
      ctx.fillText(textArray[i], COORDINATES_CLOUD[0] + MARGIN_X, COORDINATES_CLOUD[1] + (i + 1) * gapY);
    }
  }

  function renderBars(namesArray) {
    function getRandomColor(colorArray) {
      return colorArray[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgb( 0, 0, ' + (Math.floor(Math.random() * 255)) + ')';
    }
    for (var i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = COLOR_TEXT;
      ctx.fillText(names[i], TEXT_X + (WIDTH_BAR + GAP) * i, TEXT_Y);
      ctx.fillText(Math.round(times[i]), TEXT_X + (WIDTH_BAR + GAP) * i, (BAR_Y - CLOUD_GAP - (times[i] * MAX_HEIGHT_BAR / maxTime)));
      ctx.fillStyle = getRandomColor(names);
      ctx.fillRect(BAR_X + (WIDTH_BAR + GAP) * i, BAR_Y, WIDTH_BAR, -(times[i] * MAX_HEIGHT_BAR / maxTime));
    }
  }
};
