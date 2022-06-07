'use strict';

var fireballSize = 24;
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


const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 140;
const CLOUD_Y = 10;
const GAP = 10;
const PADDING = 20;
const TEXT_HEIGHT = 20;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 140;

const renderCloud = (ctx, x, y, color) => {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = (ctx, x, y, color, text) => {
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
};

const getMaxElement = (arr) => {
	let maxElement = arr[0];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}

	return maxElement;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

var renderStatistics = (ctx, players, times) => {
	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0,0,0,0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

	renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING + GAP, '#000', 'Ура, вы победили!');
	renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING + GAP + TEXT_HEIGHT, '#000', 'Список результатов:');

	let maxTime = getMaxElement(times);

	for (let i = 0; i < players.length; i++) {
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

const setupSimilarWindow = document.querySelector('.setup-similar').classList.remove('hidden');
const similarList = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
const WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Нионго', 'Ирвинг'];
const WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

const createWizzard = () => {
	return {
		name: getRandomIndex(WIZARD_NAMES) + ' ' + getRandomIndex(WIZARD_SECOND_NAMES),
		coatColor: getRandomIndex(WIZARD_COAT_COLORS),
		eyeColor: getRandomIndex(WIZARD_EYE_COLORS)
	}
};

const createWizzards = () => new Array(4).fill(null).map(() => createWizzard());

const similarWizards = createWizzards();

const renderSimilarList = () => {
	const similarListFragment = document.createDocumentFragment();

	similarWizards.forEach((wizard) => {
		const wizardClone = similarWizardTemplate.cloneNode('true');
		wizardClone.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardClone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
		wizardClone.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
		similarListFragment.appendChild(wizardClone);
	});

	similarList.appendChild(similarListFragment);
};

const clearSimilarList = () => {
	similarList.innerHTML = '';
}


// ОБРАБОТЧИКИ


const userModalElement = document.querySelector('.setup');
const userModalOpenElement = document.querySelector('.setup-open');
const userModalCloseElement = document.querySelector('.setup-close');
const userNameSetupInput = document.querySelector('.setup-user-name');

const onPopupEscPress = (evt) => {
	if (userNameSetupInput === document.activeElement) {
		return evt;
	} else if (evt.key === ('Escape' || 'Esc')) {
		evt.preventDefault();
		closeUserModal();
	}
};

const openUserModal = () => {
	userModalElement.classList.remove('hidden');
	renderSimilarList();

	document.addEventListener('keydown', onPopupEscPress);
};

const closeUserModal = () => {
	userModalElement.classList.add('hidden');
	clearSimilarList();

	document.removeEventListener('keydown', onPopupEscPress);
};

userModalOpenElement.addEventListener('click', () => {
	openUserModal();
});

userModalOpenElement.addEventListener('keydown', (evt) =>{
	if (evt.key === 'Enter') {
		openUserModal();
	}
});

userModalCloseElement.addEventListener('click', () => {
	closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
	if (evt.key === 'Enter') {
		closeUserModal();
	}
});

const fireballWrapper = document.querySelector('.setup-fireball-wrap');
const wizardCoat = document.querySelector('.wizard-coat');
const wizardEyes = document.querySelector('.wizard-eyes');

const getFireballNewColor = (function(arr) {
  let count = 0;
  return () => {
    return arr[++count % arr.length];
  }
}(WIZARD_FIREBALL_COLORS));

const getCoatNewColor = (function(arr) {
  let count = 0;
  return () => {
    return arr[++count % arr.length];
  }
}(WIZARD_COAT_COLORS));

const getEyeNewColor = (function(arr) {
  let count = 0;
  return () => {
    return arr[++count % arr.length];
  }
}(WIZARD_EYE_COLORS));

fireballWrapper.addEventListener('click', (evt) => {
	evt.preventDefault();
	fireballWrapper.style.backgroundColor = getFireballNewColor();
});

wizardCoat.addEventListener('click', (evt) => {
	evt.preventDefault();
	wizardCoat.style.fill = getCoatNewColor();
});

wizardEyes.addEventListener('click', (evt) => {
	evt.preventDefault();
	wizardEyes.style.fill = getEyeNewColor();
});
