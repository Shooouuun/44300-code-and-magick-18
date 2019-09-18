'use strict';

window.renderStatistics = function (ctx, names, times) {
  var coordinatesCloud = [100, 10];
  var heightRect = 270;
  var widthRect = 420;
  var lenghtShadow = 10;
  var marginX = 35;
  var gap = 50;
  var cloudGap = 10;
  var widthBar = 40;
  var maxHeightBar = 150;
  var textX = 135;
  var textY = 266;
  var barX = 135;
  var barY = 246;
  var colorRect = ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'];
  var colorText = '#000';
  var fontText = '16px PT Mono';
  var text = ['Ура! Вы победили!', 'Список результатов: '];

  var maxTime = Math.max.apply(null, times);

  renderCloud(coordinatesCloud[0] + lenghtShadow, coordinatesCloud[1] + lenghtShadow, widthRect, heightRect, colorRect[0]);
  renderCloud(coordinatesCloud[0], coordinatesCloud[1], widthRect, heightRect, colorRect[1]);
  renderText(text);

  function renderCloud(X, Y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, width, height);
  }

  function renderText(textArray) {
    ctx.fillStyle = colorText;
    ctx.font = fontText;

    for (var i = 0; i < textArray.length; i++) {
      var gapY = i ? 25 : 30;
      ctx.fillText(textArray[i], coordinatesCloud[0] + marginX, coordinatesCloud[1] + (i + 1) * gapY);
    }
  }

  var getRandomColor = function (arr) {
    return arr[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgb( 0, 0, ' + (Math.floor(Math.random() * 255)) + ')';
  };

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], textX + (widthBar + gap) * i, textY);
    ctx.fillText(Math.round(times[i]), textX + (widthBar + gap) * i, (barY - cloudGap - (times[i] * maxHeightBar / maxTime)));
    ctx.fillStyle = getRandomColor(names);
    ctx.fillRect(barX + (widthBar + gap) * i, barY, widthBar, -(times[i] * maxHeightBar / maxTime));
  }
};
