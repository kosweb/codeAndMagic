'use strict';

// const hello = function () {
// 	console.log('hello', this);
// }


// const person = {
// 	name: 'Kos',
// 	age: 31,
// 	logInfo: function () {
// 		console.group(`${this.name} info:`)
// 		console.log(`My name is ${this.name}`)
// 		console.log(`My age is ${this.age}`)
// 		console.groupEnd()
// 	}
// }

// const person2 = {
// 	name: 'Lena',
// 	age: 26
// 	}

// person.logInfo.bind(person2)()
















// FETCH <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const requestURL = 'https://jsonplaceholder.typicode.com/users';

// function sendRequest(method, url, body = null) {
// 	return fetch(url).then(response => {
// 		return response.json();
// 	});
// };

// const body = {
// 	name: 'kos',
// 	age: 31
// };

// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.error(err))

// XML <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const requestURL = 'https://jsonplaceholder.typicode.com/users';

// function sendRequest(method, url, body = null) {
// 	return new Promise((resolve, reject) => {

// 		const xhr = new XMLHttpRequest();

// 		xhr.responseType = 'json';
// 		xhr.timeout = 10000;

// 		xhr.addEventListener('load', () => {
// 			if (xhr.status === 200) {
// 				resolve(xhr.response);
// 			} else {
// 				reject(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
// 			}
// 		});

// 		xhr.addEventListener('error', () => {
// 			reject('Произошла ошибка соединения с сервером');
// 		});

// 		xhr.addEventListener('timeout', () => {
// 			reject(`Запрос не успел выполниться за ${xhr.timeout} мс`);
// 		});

// 		xhr.open(method, url);
// 		xhr.setRequestHeader('Content-Type', 'application/json');
// 		xhr.send(JSON.stringify(body));
// 	});
// };

// const body = {
// 	name: 'kos',
// 	age: 31
// };

// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.error(err))

// sendRequest('POST', requestURL, body)
// .then(data => console.log(data))
// .catch(err => console.log(err))


// PROMISES TEST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const pro = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log('Preparing data..');

// 		const backendData = {
// 			server: 'aws',
// 			port: 6000,
// 			status: 'working'
// 		};

// 		resolve(backendData);
// 	}, 2000);
// });

// pro.then(data => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			data.modified = true;
// 			resolve(data);
// 		}, 2000);
// 	});
// }).then(clientData => {
// 	clientData.sasipencil = true;
// 	return clientData;
// }).then(data => {
// 	console.log('DONE', data);
// });
