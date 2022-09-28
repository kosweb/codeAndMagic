'use strict';


// OPTIONS

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
const WIZARD_COAT_COLORS = ['rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(241, 43, 107)', 'rgb(101, 137, 164)', 'rgb(0, 0, 0)', 'rgb(56, 159, 117)'];
const WIZARD_EYE_COLORS = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple', 'black'];
const wizardFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


const getRank = (wizard) => {
	let rank = 0;

	if (wizard.colorCoat === (coatColor || 'rgb(101, 137, 164)')) {
		rank += 4;
	}
	if (wizard.colorEyes === (eyesColor || 'black')) {
		rank += 2;
	}
	if (wizard.colorFireball === (fireballColor || '#ee4830')) {
		rank += 1;
	}
	return rank;
};

const wizardsComparator = function (left, right) {
	const rankDiff = getRank(right) - getRank(left);
	return rankDiff;
};

const renderSimilarList = (wizards) => {
	const similarListFragment = document.createDocumentFragment();

		wizards
			.slice()
			.sort(wizardsComparator)
			.slice(0, 4)
			.forEach(element => {
				const wizardClone = similarWizardTemplate.cloneNode('true');
				wizardClone.querySelector('.setup-similar-label').textContent = element.name;
				wizardClone.querySelector('.wizard-coat').style.fill = element.colorCoat;
				wizardClone.querySelector('.wizard-eyes').style.fill = element.colorEyes;
				similarListFragment.appendChild(wizardClone);
			});

	similarList.innerHTML = '';
	similarList.appendChild(similarListFragment);
};

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
	document.addEventListener('keydown', onPopupEscPress);
};

const closeUserModal = () => {
	userModalElement.classList.add('hidden');
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


// -----------------------------------------------------------------------------
const getRequestURL = 'https://24.javascript.pages.academy/code-and-magick/data';
const postRequestURL = 'https://24.javascript.pages.academy/code-and-magick';
const form = document.querySelector('.setup-wizard-form');

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

let fireballColor;
let coatColor;
let eyesColor;

// const updateWizards = (wizards) => {
// 	const sameCoatAndEyesWizards = wizards.filter(element => {
// 		return element.colorCoat === coatColor && element.colorEyes === eyesColor;
// 	});

// 	const sameCoatWizards = wizards.filter(element => {
// 		return element.colorCoat === coatColor;
// 	});

// 	const sameEyesWizards = wizards.filter(element => {
// 		return element.colorEyes === eyesColor;
// 	});

// 	const filteredWizards = sameCoatAndEyesWizards;
// 	filteredWizards.concat(sameCoatWizards).concat(sameEyesWizards).concat(wizards)

// 	const uniqueWizards = filteredWizards.filter((element, i) => {
// 		return filteredWizards.indexOf(element) === i;
// 	});


// 	renderSimilarList();
// };


// const namesComparator = (left, right) => {
// 	if (left > right) {
// 		return 1;
// 	} else if (left < right) {
// 		return -1;
// 	} else {
// 		return 0;
// 	}
// };


function debounce(fn, ms) {
  let timeout;
  return function() {
    const fnCall = () => { fn.apply(this, arguments) }
		clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}


const setFireballClick = (cb) => {
	fireballWrapper.addEventListener('click', (evt) => {
		evt.preventDefault();
		const newColor = getFireballNewColor();
		fireballWrapper.style.backgroundColor = newColor;
		fireballColor = newColor;
		cb();
	});
};

const setCoatClick = (cb) => {
	wizardCoat.addEventListener('click', (evt) => {
		evt.preventDefault();
		const newColor = getCoatNewColor();
		wizardCoat.style.fill = newColor;
		coatColor = newColor;
		cb();
	});
};

const setEyesClick = (cb) => {
	wizardEyes.addEventListener('click', (evt) => {
		evt.preventDefault();
		const newColor = getEyeNewColor();
		wizardEyes.style.fill = newColor;
		eyesColor = newColor;
		cb();
	});
};


// -----------------------------------------------------------------------------


const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 21;

userNameInput.addEventListener('input', (evt) => {
	const valueLength = evt.target.value.length;

	if (valueLength < MIN_NAME_LENGTH) {
		userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
	} else if (valueLength > MAX_NAME_LENGTH) {
		userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
	} else {
		userNameInput.setCustomValidity('');
	}

	userNameInput.reportValidity();
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


// ОБРАБОТЧИКИ ФОРМЫ

// SERVER


function sendRequest(method, url, body = null) {
	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();

		xhr.responseType = 'json';
		xhr.timeout = 10000;

		xhr.addEventListener('load', () => {
			if (xhr.status >= 400) {
				reject(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
			} else {
				resolve(xhr.response);
			}
		});

		xhr.addEventListener('error', () => {
			reject('Произошла ошибка соединения с сервером');
		});

		xhr.addEventListener('timeout', () => {
			reject(`Запрос не успел выполниться за ${xhr.timeout} мс`);
		});

		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(body));
	});
};

form.addEventListener('submit', (evt) => {
	sendRequest('POST', postRequestURL, new FormData(form))
	.then(data => console.log(data))
	.catch(err => console.log(err));
	evt.preventDefault();
	closeUserModal();
});

sendRequest('GET', getRequestURL)
.then(data => {
	renderSimilarList(data);

	const updateWizards = () => {
		renderSimilarList(data);
	};
	const updateWizardsDebaunce = debounce(updateWizards, 500);
	setFireballClick(updateWizardsDebaunce);
	setCoatClick(updateWizardsDebaunce);
	setEyesClick(updateWizardsDebaunce);
})
.catch(err => console.error(err))
