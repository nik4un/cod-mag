'use strict';

// поиск максимального значения в массиве чисел
var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

//  прямоугольник со скругленными углами
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fill();
}

//  вывод результатов игры
window.renderStatistics = function (ctx, names, times) {
  //  параметры области печати результатов
  var background = {
    initialX: 135,
    initialY: 10,
    height: 250,
    width: 420,
    color: 'rgba(255, 255, 255, 1)',
    shadowOffset: 10,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    scroll: {
      paper: {
        width: 30,
      },
      spool: {
        ledge: 2,
        heigth: 4
      }
    }
  };

  //  параметры заголовка
  var title = {
    initialX: (printAreaX + widthPrintArea / 2),
    initialY: (printAreaY),
    font: '16px PT Mono',
    lineHeight: 21,
    color: 'rgba(0, 0, 0, 1)',
    align: 'center',
    firstLineText: 'Ура вы победили!',
    secondLineText: 'Список результатов:',
  };

  //  параметры диаграммы
  var diagram = {
    initialX: (printAreaX + widthPrintArea / 2),
    initialY: (printAreaY + title.lineHeight * 2),
    font: '16px PT Mono',
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 1)',
    align: 'center',
    widthRatio: 1.3,
    indentRatio: 1.5,
    barHeight: 130,
    mainColor: 'rgba(255, 52, 241, 1)',
    secondaryColor: 'rgba(91, 201, 255, 1)',
    verticalIndent: 5
  };

  // ширина катушки;
  var spoolWidth = background.scroll.paper.width + background.scroll.spool.ledge * 2;

  //  ширина и высота печатной области
  var widthPrintArea = background.width - background.scroll.spool.ledge * 2 -
    background.scroll.paper.width * 2 - background.shadowOffset;
  var heightPrintArea = background.height - background.scroll.spool.heigth * 2 - background.shadowOffset;

  //  координаты печатной области
  var printAreaX = background.initialX + background.scroll.spool.ledge + background.scroll.paper.width;
  var printAreaY = background.initialY + background.scroll.spool.heigth;

  //  заливка для левой катушки свитка
  background.scroll.spool.leftСolor =
    ctx.createLinearGradient(
        background.initialX,
        background.initialY,
        background.initialX + spoolWidth,
        background.initialY);
  background.scroll.spool.leftСolor.addColorStop(1, 'rgba(77, 31, 6, 1)');
  background.scroll.spool.leftСolor.addColorStop(0.6, 'rgba(140, 52, 19, 1)');
  background.scroll.spool.leftСolor.addColorStop(0.55, 'rgba(125, 45, 16, 1)');
  background.scroll.spool.leftСolor.addColorStop(0.2, 'rgba(68, 27, 5, 1)');
  background.scroll.spool.leftСolor.addColorStop(0, 'rgba(33, 14, 3, 1)');

  //  заливка для правой катушки свитка
  background.scroll.spool.rightСolor =
    ctx.createLinearGradient(
        printAreaX + widthPrintArea - background.scroll.spool.ledge,
        background.initialY,
        printAreaX + widthPrintArea - background.scroll.spool.ledge + spoolWidth,
        background.initialY);
  background.scroll.spool.rightСolor.addColorStop(0, 'rgba(77, 31, 6, 1)');
  background.scroll.spool.rightСolor.addColorStop(0.4, 'rgba(140, 52, 19, 1)');
  background.scroll.spool.rightСolor.addColorStop(0.45, 'rgba(125, 45, 16, 1)');
  background.scroll.spool.rightСolor.addColorStop(0.8, 'rgba(68, 27, 5, 1)');
  background.scroll.spool.rightСolor.addColorStop(1, 'rgba(33, 14, 3, 1)');

  //  заливка для левого свитка
  background.scroll.paper.leftСolor =
    ctx.createLinearGradient(
        background.initialX + background.scroll.spool.ledge,
        background.initialY,
        background.initialX + background.scroll.spool.ledge + background.scroll.paper.width,
        background.initialY);
  background.scroll.paper.leftСolor.addColorStop(1, 'rgba(127, 127, 127, 1)');
  background.scroll.paper.leftСolor.addColorStop(0.6, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.leftСolor.addColorStop(0.55, 'rgba(238, 238, 238, 1)');
  background.scroll.paper.leftСolor.addColorStop(0.2, 'rgba(100, 100, 100, 1)');
  background.scroll.paper.leftСolor.addColorStop(0, 'rgba(20, 20, 20, 1)');

  //  заливка для правого свитка
  background.scroll.paper.rightСolor =
    ctx.createLinearGradient(
        printAreaX + widthPrintArea,
        background.initialY,
        printAreaX + widthPrintArea + background.scroll.paper.width,
        background.initialY);
  background.scroll.paper.rightСolor.addColorStop(0, 'rgba(127, 127, 127, 1)');
  background.scroll.paper.rightСolor.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.rightСolor.addColorStop(0.45, 'rgba(238, 238, 238, 1)');
  background.scroll.paper.rightСolor.addColorStop(0.8, 'rgba(100, 100, 100, 1)');
  background.scroll.paper.rightСolor.addColorStop(1, 'rgba(20, 20, 20, 1)');

  //  тень от свитка
  background.scrollShadow =
    ctx.createLinearGradient(
        printAreaX,
        background.initialY,
        printAreaX + widthPrintArea,
        background.initialY);
  background.scrollShadow.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
  background.scrollShadow.addColorStop(0.07, 'rgba(0, 0, 0, 0.15)');
  background.scrollShadow.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
  background.scrollShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
  background.scrollShadow.addColorStop(0.93, 'rgba(0, 0, 0, 0.15)');
  background.scrollShadow.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

  //  тень от левой катушки
  ctx.fillStyle = background.shadowColor;
  drawRoundedRect(ctx,
      background.initialX + background.shadowOffset,
      background.initialY + background.shadowOffset,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);
  drawRoundedRect(ctx,
      background.initialX + background.shadowOffset,
      printAreaY + heightPrintArea + background.shadowOffset,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);

  //  тень от правой катушки
  drawRoundedRect(ctx,
      printAreaX + widthPrintArea - background.scroll.spool.ledge + background.shadowOffset,
      background.initialY + background.shadowOffset,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);
  drawRoundedRect(ctx,
      printAreaX + widthPrintArea - background.scroll.spool.ledge + background.shadowOffset,
      printAreaY + heightPrintArea + background.shadowOffset,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);

  //  тень от свитков и печатной области
  ctx.fillRect(background.initialX + background.scroll.spool.ledge + background.shadowOffset,
      printAreaY + background.shadowOffset,
      background.scroll.paper.width * 2 + widthPrintArea,
      heightPrintArea);

  //  левая катушка свитка
  ctx.fillStyle = background.scroll.spool.leftСolor;
  drawRoundedRect(ctx,
      background.initialX,
      background.initialY,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);
  drawRoundedRect(ctx,
      background.initialX,
      printAreaY + heightPrintArea,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);

  //  правая катушка свитка
  ctx.fillStyle = background.scroll.spool.rightСolor;
  drawRoundedRect(ctx,
      printAreaX + widthPrintArea - background.scroll.spool.ledge,
      background.initialY,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);
  drawRoundedRect(ctx,
      printAreaX + widthPrintArea - background.scroll.spool.ledge,
      printAreaY + heightPrintArea,
      spoolWidth,
      background.scroll.spool.heigth,
      background.scroll.spool.heigth / 2);

  //  левый свиток
  ctx.fillStyle = background.scroll.paper.leftСolor;
  ctx.fillRect(background.initialX + background.scroll.spool.ledge,
      printAreaY,
      background.scroll.paper.width,
      heightPrintArea);

  //  правый свиток
  ctx.fillStyle = background.scroll.paper.rightСolor;
  ctx.fillRect(printAreaX + widthPrintArea,
      printAreaY,
      background.scroll.paper.width,
      heightPrintArea);

  //  печатная область
  ctx.fillStyle = background.color;
  ctx.fillRect(printAreaX, printAreaY, widthPrintArea, heightPrintArea);

  //  печать заголовка
  ctx.fillStyle = title.color;
  ctx.font = title.font;
  ctx.textAlign = title.align;
  // ctx.textBaseline = 'top';
  ctx.fillText(title.firstLineText, title.initialX, title.initialY + title.lineHeight);
  ctx.fillText(title.secondLineText, title.initialX, title.initialY + title.lineHeight * 2);

  var buildDiagram = function (gamerName, score, centerPosition, barWidth, barHeight, barColor) {
    var bottom = printAreaY + heightPrintArea;
    // имя игрока
    ctx.fillStyle = diagram.color;
    ctx.font = diagram.font;
    ctx.textAlign = diagram.align;
    ctx.textBaseline = 'top';
    var namePosition = bottom - title.lineHeight;
    ctx.fillText(gamerName, centerPosition, namePosition);
    // баллы игрока
    ctx.textBaseline = 'alphabetic';
    var scorePosition = namePosition - barHeight - diagram.verticalIndent * 2;
    ctx.fillText(score, centerPosition, scorePosition);
    //  колонка диаграммы
    var barPosition = namePosition - barHeight - diagram.verticalIndent;
    ctx.fillStyle = barColor;
    ctx.fillRect(centerPosition - barWidth / 2, barPosition, barWidth, barHeight);
  };

  //  вывод столбцов диаграммы
  var heightOfBar;
  var colorOfBar;
  var gameTime;
  var maxTime = Math.round(getMaxElement(times));
  var barSum = names.length;
  var barSpace = widthPrintArea / (diagram.indentRatio * 2 + barSum * diagram.widthRatio + barSum - 1);
  var barWidth = barSpace * diagram.widthRatio;
  var position = printAreaX + barSpace * diagram.indentRatio + barWidth / 2;
  for (var i = 0; i < names.length; i += 1) {
    heightOfBar = diagram.barHeight * times[i] / maxTime;
    colorOfBar = (names[i] === 'Вы') ? diagram.mainColor : diagram.secondaryColor;
    gameTime = Math.round(times[i]);
    buildDiagram(names[i], String(gameTime), position, barWidth, heightOfBar, colorOfBar);
    position = position + barSpace + barWidth;
  }

  //  тень от свитка на печатную область
  ctx.fillStyle = background.scrollShadow;
  ctx.fillRect(printAreaX, printAreaY, widthPrintArea, heightPrintArea);
};
