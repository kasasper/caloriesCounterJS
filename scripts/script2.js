const elementsContainer = document.querySelector('#base');
const newElement = document.querySelector('.new-element');
const form = document.querySelector('.form');
const addButton = document.querySelector('button#add');
const sampleDataButton = document.querySelector('button#sampleDataButton');
const removeAll = document.querySelector('button#clearLocalStorage');
const newCounter = document.querySelectorAll('.old-element');
const counterBase = document.querySelector('.added_elements');
const clearCounter = document.querySelector('#clearCounter');
const counterResult = document.querySelector('.result');
const counterElementCal = document.querySelector('.counter-size');
const searchBar = document.querySelector('#search-element-input');

function openForm() {
	form.setAttribute('class', 'form-active');
	newElement.removeEventListener('click', openForm);
	newElement.addEventListener('click', closeForm);
	newElement.classList.add('active');
}

function init() {
	return getFromLocalStorage('app') || setToLocalStorage('app', []);
}

function getFromLocalStorage(item) {
	const localStorageItem = localStorage.getItem(item);
	return localStorageItem ? JSON.parse(localStorageItem) : null;
}

function setToLocalStorage(string, items) {
	localStorage.setItem(string, JSON.stringify(items));
}

function addToLocalStorage(string, newItem) {
	let localStorage = getFromLocalStorage(string);
	localStorage.push(newItem);
	setToLocalStorage(string, localStorage);
}

const sampleData = [
	{
		product: 'Sample 1',
		calories: '1000',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Sample 2',
		calories: '500',
		size: '100',
		sizeType: 'g'
	}
];

function generateSample(data) {
	let localStorage = getFromLocalStorage('app');
	for (i of data) localStorage.push(i);
	setToLocalStorage('app', localStorage);
	generateHTML();
}

function generateHTML() {
	const localStorage = getFromLocalStorage('app');
	removeElements();
	localStorage.forEach(function(i) {
		let HTML = `<p class="btn-element-name">${i.product}</p>
		<p class="btn-element-cal">${i.calories} kcal</p>
		<p class="btn-element-size">${i.size} ${i.sizeType}</p>`;
		const newItem = document.createElement('span');
		newItem.setAttribute('class', 'btn-element old-element');
		newItem.innerHTML = HTML;
		elementsContainer.appendChild(newItem);
		addCounterEventForBox(newItem);
	});
}

function clearAll() {
	setToLocalStorage('app', []);
	removeElements();
	clearCounterText();
}

function removeElements() {
	elementsContainer.innerHTML = '';
}

function closeForm() {
	form.setAttribute('class', 'form');
	pname.value = '';
	calories.value = '';
	newElement.addEventListener('click', openForm);
	newElement.classList.remove('active');
	let errorMessages = document.querySelectorAll('form#myform span[id*="error-"]');
	for (error of errorMessages) {
		error.innerHTML = '';
	}
}

function addNewItem() {
	// validate
	if (validate()) {
		// create new element
		const pname = document.querySelector('input#pname');
		const calories = document.querySelector('input#calories');
		let size = document.querySelector('select#size');
		size = size.options[size.selectedIndex].text.trim();
		size = size.split(' ');

		let newItem = {
			product: pname.value.trim(),
			calories: calories.value.trim(),
			size: size[0],
			sizeType: size[1]
		};
		//add it to localstorage
		addToLocalStorage('app', newItem);
		// generate html
		generateHTML();
		// close form
		closeForm();
	}
}

function addCounterEventForBox(element) {
	element.addEventListener('click', function(e) {
		e = e || window.event;
		console.log(e);
		const target = e.target.closest('.old-element');
		console.log(target);
		const newCounterItem = document.createElement('li');
		newCounterItem.innerHTML = `<span class="counter-name">${target.querySelector('.btn-element-name')
			.innerText}</span>
                    <span class="counter-cal">${target
						.querySelector('.btn-element-cal')
						.innerText.split(' ')[0]}</span><span class="counter-cal-base hidden">${target
			.querySelector('.btn-element-cal')
			.innerText.split(' ')[0]}</span>
                    <input class="counter-size" value=${target
						.querySelector('.btn-element-size')
						.innerText.split(' ')[0]} 
						><span class="counter-size-pack">${target.querySelector('.btn-element-size').innerText.split(' ')[1]}</span>`;
		counterBase.appendChild(newCounterItem);
		newCounterItem.querySelector('.counter-size').addEventListener('change', changeCalories);
		sumCalories();
	});
}

function changeCalories() {
	let e = window.event;
	const target = e.target.closest('li');
	let size = target.querySelector('.counter-size').value;
	if (size < 0 || isNaN(size)) size = 0;
	const pack = target.querySelector('.counter-size-pack').innerText;
	const cal = target.querySelector('.counter-cal-base').innerText;
	if (pack === 'g') size = size / 100;
	target.querySelector('.counter-cal').innerText = Math.round(size * cal);
	sumCalories();
}

function clearCounterText() {
	counterBase.innerHTML = '';
	sumCalories();
}

function sumCalories() {
	let sum = 0;
	for (kcal of document.querySelectorAll('.counter-cal')) {
		sum += parseInt(kcal.innerText.split(' ')[0]);
	}
	counterResult.innerText = `SUM: ${sum} kcal`;
}

function validate() {
	const valpname = isValidName();
	const valcalories = isValidNumber();
	return valpname && valcalories ? true : false;
}

function isValidName() {
	const pname = document.querySelector('#pname').value;
	const letters = /^[a-zA-Z ]+$/;
	if (pname == '') {
		document.getElementById('error-pname').innerHTML = 'Field cannot be blank <br>';
		return false;
	}
	else {
		if (searchInElementsBase(pname)) {
			document.getElementById('error-pname').innerHTML = 'Name have to be unique <br>';
			return false;
		}
		else {
			if (pname.match(letters)) {
				document.getElementById('error-pname').innerHTML = '';
				return true;
			}
			else {
				document.getElementById('error-pname').innerHTML = 'Enter A-z  value only <br>';
				return false;
			}
		}
	}
}

function isValidNumber() {
	const num = document.querySelector('#calories').value;
	if (num == '') {
		document.getElementById('error-calories').innerHTML = 'Field cannot be blank <br>';
		return false;
	}
	else {
		if (isNaN(num)) {
			document.getElementById('error-calories').innerHTML = 'Enter numeric value only <br>';
			return false;
		}
		else {
			document.getElementById('error-calories').innerHTML = '';
			return true;
		}
	}
}

function searchInElementsBase(stringSearch) {
	let localStorage = getFromLocalStorage('app');
	for (i of localStorage) {
		if (stringSearch.trim() == i.product.toLowerCase()) {
			return true;
		}
	}
	return false;
}

function searchElement(e) {
	const term = e.target.value.toLowerCase();
	const elements = document.querySelectorAll('.old-element');
	elements.forEach((e) => {
		const name = e.firstElementChild.textContent;
		name.toLowerCase().indexOf(term) == -1 ? (e.style.display = 'none') : (e.style.display = 'inline-table');
	});
}

window.onload = function() {
	init();
	generateHTML();
};

newElement.addEventListener('click', openForm);
addButton.addEventListener('click', addNewItem);
sampleDataButton.addEventListener('click', () => generateSample(sampleData));
removeAll.addEventListener('click', clearAll);
clearCounter.addEventListener('click', clearCounterText);
searchBar.addEventListener('keyup', searchElement);
