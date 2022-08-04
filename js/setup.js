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
const wizardFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
const userNameInput = document.querySelector('.setup-user-name');

const isEnterPress = (evt) => {
	return evt.key === 'Enter';
};

const isEscPress = (evt) => {
	return evt.key === ('Escape' || 'Esc');
};

const onPopupEscPress = (evt) => {
	if (userNameInput === document.activeElement) {
		return evt;
	} else if (isEscPress(evt)) {
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
	userModalElement.style.top = '';
	userModalElement.style.left = '';

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
	if (isEnterPress(evt)) {
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
}(wizardFireballColors));

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

userNameInput.addEventListener('invalid', (evt) => {
	if (userNameInput.validity.tooShort) {
		userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
	}
});


// ОБРАБОТЧИКИ ПЕРЕТАСКИВАНИЯ

const userPicSetup = document.querySelector('.upload');

userPicSetup.addEventListener('mousedown', (evt) => {
	evt.preventDefault();

	let startCoords = {
		x: evt.clientX,
		y: evt.clientY
	};

	let dragged = false;

	let onMouseMove = (moveEvt) => {
		moveEvt.preventDefault();
		dragged = true;

		let shift = {
			x: startCoords.x - moveEvt.clientX,
			y: startCoords.y - moveEvt.clientY
		};

		startCoords = {
			x: moveEvt.clientX,
			y: moveEvt.clientY
		}

		userModalElement.style.top = (userModalElement.offsetTop - shift.y) + 'px';
		userModalElement.style.left = (userModalElement.offsetLeft - shift.x) + 'px';
	};

	let onMouseUp = (upEvt) => {
		upEvt.preventDefault();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);

		if (dragged) {
			let inputTypefile = userPicSetup.querySelector('input');
			let onClickPreventDefault = (evt) => {
				evt.preventDefault();
				inputTypefile.removeEventListener('click', onClickPreventDefault);
			};
			inputTypefile.addEventListener('click', onClickPreventDefault);
		}
	};

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
});
