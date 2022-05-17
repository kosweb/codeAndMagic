'use strict';

var fireballSize = 22;
var wizardSpeed = 3;
var wizardWidth = 70;


var getFireballSpeed = (left) => {
  return left ? 5 : 2;
};

var getWizardHeight = () => {
  return 1.337 * wizardWidth;
};

var getWizardX = (width) => {
  return width / 2 - wizardWidth / 2;
}

var getWizardY = (height) => {
  return height / 3 * 2 - getWizardHeight();
}


// ГИСТОГРАММА


var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 140;
var CLOUD_Y = 10;
var GAP = 10;
var PADDING = 20;
var TEXT_HEIGHT = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 140;

var renderCloud = (ctx, x, y, color) => {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = (ctx, x, y, color, text) => {
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
};

var getMaxElement = (arr) => {
	var maxElement = arr[0];

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}

	return maxElement;
};

var getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

var renderStatistics = (ctx, players, times) => {
	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0,0,0,0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

	renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING + GAP, '#000', 'Ура, вы победили!');
	renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING + GAP + TEXT_HEIGHT, '#000', 'Список результатов:');

	var maxTime = getMaxElement(times);

	for (var i = 0; i < players.length; i++) {
		renderText(ctx, CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i),
		CLOUD_Y + PADDING + GAP + TEXT_HEIGHT * 2 + GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime)),
		'#000', Math.floor(times[i]));

		ctx.fillStyle = `hsl(223, ${getRandomInt(100)}%, 50%)`;

		if (players[i] === "Вы") {
			ctx.fillStyle = 'rgba(255,0,0,1)';
		}

		ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i),
		CLOUD_Y + PADDING + GAP + TEXT_HEIGHT * 2 + GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime)) + GAP,
		BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);

		renderText(ctx, CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + BAR_GAP) * i),
		CLOUD_HEIGHT - GAP, '#000', players[i]);
	}
};


// SETUP
