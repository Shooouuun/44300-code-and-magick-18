'use strict';

window.renderStatistics = function (ctx, names, times) {
  const COORDINATES_CLOUD = [100, 10];
  const HEIGHT_RECT = 270;
  const WIDTH_RECT = 420;
  const LINGHT_SHADOW = 10;
  const MARGIN_X = 35;
  const GAP = 50;
  const CLOUD_GAP = 10;
  const WIDTH_BAR = 40;
  const MAX_HEIGHT_BAR = 150;
  const TEXT_X = 135;
  const TEXT_Y = 266;
  const BAR_X = 135;
  const BAR_Y = 246;
  const COLOR_RECT = ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'];
  const COLOR_TEXT = '#000';
  const FONT_TEXT = '16px PT Mono';
  const TEXT = ['Ура! Вы победили!', 'Список результатов: '];

  renderCloud(COORDINATES_CLOUD[0] + LINGHT_SHADOW, COORDINATES_CLOUD[1] + LINGHT_SHADOW, WIDTH_RECT, HEIGHT_RECT, COLOR_RECT[0]);
  renderCloud(COORDINATES_CLOUD[0], COORDINATES_CLOUD[1], WIDTH_RECT, HEIGHT_RECT, COLOR_RECT[1]);
  renderText(TEXT);

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

  function getRandomColor(arr) {
    return arr[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgb( 0, 0, ' + (Math.floor(Math.random() * 255)) + ')';
  };

  for (var i = 0; i < names.length; i++) {
    let maxTime = Math.max.apply(null, times);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], TEXT_X + (WIDTH_BAR + GAP) * i, TEXT_Y);
    ctx.fillText(Math.round(times[i]), TEXT_X + (WIDTH_BAR + GAP) * i, (BAR_Y - CLOUD_GAP - (times[i] * MAX_HEIGHT_BAR / maxTime)));
    ctx.fillStyle = getRandomColor(names);
    ctx.fillRect(BAR_X + (WIDTH_BAR + GAP) * i, BAR_Y, WIDTH_BAR, -(times[i] * MAX_HEIGHT_BAR / maxTime));
  }
};
