'use strict';

window.renderStatistics = function (ctx, names, times) {
  var dataCloud = {
    coordinatesCloud: [100, 10],
    heightRect: 270,
    widthRect: 420,
    lenghtShadow: 10,
    marginX: 35,
    gap: 50,
    cloudGap: 10,
    widthBar: 40,
    maxHeightBar: 150,
    textX: 135,
    textY: 266,
    barX: 135,
    barY: 246,
    colorRect: ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'],
    colorText: '#000',
    fontText: '16px PT Mono',
    text: ['Ура! Вы победили!', 'Список результатов: ']
  };

  /* вывод */
  renderCloud(dataCloud.coordinatesCloud[0] + dataCloud.lenghtShadow, dataCloud.coordinatesCloud[1] + dataCloud.lenghtShadow, dataCloud.widthRect, dataCloud.heightRect, dataCloud.colorRect[0]);
  renderCloud(dataCloud.coordinatesCloud[0], dataCloud.coordinatesCloud[1], dataCloud.widthRect, dataCloud.heightRect, dataCloud.colorRect[1]);
  renderText(dataCloud.text);

  function renderCloud(X, Y, width, height, colorRect) { // рендеринг холста с подставкой параметров
    ctx.fillStyle = colorRect;
    ctx.fillRect(X, Y, width, height);
  }

  function renderText(textArray) { // рендеринг текста
    ctx.fillStyle = dataCloud.colorText;
    ctx.font = dataCloud.fontText;

    for (var i = 0; i < textArray.length; i++) { // смещает каждый последующий текст в массиве вниз
      var gapY = i ? 25 : 30;
      ctx.fillText(textArray[i], dataCloud.coordinatesCloud[0] + dataCloud.marginX, dataCloud.coordinatesCloud[1] + (i + 1) * gapY);
    }
  }

  /*
    корневой цикл для генерации рандомного значения параметров,
    поиска максимального значения из массива времени, и, рендерит
    шкалы результатов в внутреннем цикле(*) исходя из полученных данных корневого цикла.
  */
  for (var i = 0; i < names.length; i++) {
    var maxTime = Math.max.apply(null, times);// переменная с максимальным значением из массива времени

    var getRandom = function (min, max) { // функция вернёт рандомные параметры на основе введённых значений
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    };

    for (var j = 0; j < names.length; j++) { // цикл рендерит шкалу результатов, время и имена*
      var randomColor = 'rgb( 0, 0, ' + getRandom(50, 255) + ')';
      ctx.fillStyle = '#000';
      ctx.fillText(names[j], dataCloud.textX + (dataCloud.widthBar + dataCloud.gap) * j, dataCloud.textY);
      ctx.fillText(Math.round(times[j]), dataCloud.textX + (dataCloud.widthBar + dataCloud.gap) * j, (dataCloud.barY - dataCloud.cloudGap - (times[j] * dataCloud.maxHeightBar / maxTime)));
      ctx.fillStyle = (names[j] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomColor;
      ctx.fillRect(dataCloud.barX + (dataCloud.widthBar + dataCloud.gap) * j, dataCloud.barY, dataCloud.widthBar, -(times[j] * dataCloud.maxHeightBar / maxTime));
    }
  }
};
