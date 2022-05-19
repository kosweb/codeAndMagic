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

var setupWindow = document.querySelector('.setup').classList.remove('hidden');

var setupSimilarWindow = document.querySelector('.setup-similar').classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

var createWizzard = () => {
	return {
		name: getRandomIndex(WIZARD_NAMES) + ' ' + getRandomIndex(WIZARD_SECOND_NAMES),
		coatColor: getRandomIndex(WIZARD_COAT_COLORS),
		eyeColor: getRandomIndex(WIZARD_EYE_COLORS)
	}
};

var similarWizards = new Array(4).fill(null).map(() => createWizzard());

var renderWizard = function(wizard) {
  var wizardClone = similarWizardTemplate.cloneNode('true');
  wizardClone.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardClone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardClone.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardClone;
};

var fragment = document.createDocumentFragment();
for (let i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(renderWizard(similarWizards[i]));
};

similarList.appendChild(fragment);
setupSimilarWindow.classList.remove('hidden');
