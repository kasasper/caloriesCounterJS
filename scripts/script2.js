const elementsContainer = document.querySelector('#base');
const newElement = document.querySelector('.new-element');
const addButton = document.querySelector('button#add');
const sampleDataButton = document.querySelector('button#sampleDataButton');
const sampleDataButton2 = document.querySelector('button#sampleDataButton2');
const removeAll = document.querySelector('button#clearLocalStorage');
const counterBase = document.querySelector('.added_elements');
const clearCounter = document.querySelector('#clearCounter');
const counterResult = document.querySelector('.result');
const searchBar = document.querySelector('#search-element-input');
const settings = document.querySelector('#settingsGoal');
const settingsGoal = document.querySelector('#goal');
const settingsSave = document.querySelector('#settingsSave');
const goalDifferenceTxt = document.querySelector('.goalDifference');
const yourGoalTxt = document.querySelector('.yourGoal');

let userGoal = 0;
let actualSum = 0;

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

const sampleData2 = [
	{
		product: 'Bagel',
		calories: '310',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Chapatis',
		calories: '300',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Cream crackers',
		calories: '440',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Macaroni boiled',
		calories: '95',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Potatoes roast',
		calories: '420',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Fish fingers',
		calories: '220',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Ham',
		calories: '240',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Kiwi',
		calories: '40',
		size: '1',
		sizeType: 'package'
	},

	{
		product: 'Spinach',
		calories: '8',
		size: '1',
		sizeType: 'portion'
	},

	{
		product: 'Egg L',
		calories: '90',
		size: '1',
		sizeType: 'package'
	},

	{
		product: 'Yogurt natural',
		calories: '60',
		size: '100',
		sizeType: 'g'
	},

	{
		product: 'Butter',
		calories: '750',
		size: '100',
		sizeType: 'g'
	}
];

function toggleForm(id = window.event.target.closest('form').id) {
	const form = document.querySelector(`form#${id}`);
	if (form.parentElement.className === 'form') {
		form.parentElement.setAttribute('class', 'form-active');
		const target = window.event.target;
		target.classList.add('active');
	}
	else {
		form.parentElement.setAttribute('class', 'form');
		let inputs = document.querySelectorAll(`form#${id} input`);
		for (let input of inputs) {
			input.value = '';
		}
		const target = window.event.target;
		target.classList.remove('active');
		let errorMessages = document.querySelectorAll(`form#${id} span[id*="error-"]`);
		for (let error of errorMessages) {
			error.innerHTML = '';
		}
	}
}

function init() {
	return getFromLocalStorage('app') || setToLocalStorage('app', []);
}

function initGoal() {
	if (getFromLocalStorage('goal') != null) {
		return (userGoal = getFromLocalStorage('goal'));
	}
	else {
		setToLocalStorage('goal', 2000);
		return (userGoal = 2000);
	}
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

function generateSample(data) {
	const localStorage = getFromLocalStorage('app');
	let res = [];
	for (let i of data) {
		for (let l of localStorage) res.push(l.product);
		res.findIndex((str) => str === i.product) === -1
			? localStorage.push(i)
			: console.log(i.product + ' is in base');
	}
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
		toggleForm();
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
		//it could be in newCounterItem.innerHTML, but I wanted to do it in another way
		const span = document.createElement('SPAN');
		const txt = document.createTextNode('\u00D7');
		span.className = 'close';
		span.appendChild(txt);
		span.onclick = function() {
			const div = this.closest('li');
			div.innerHTML = '';
			div.style.display = 'none';
			sumCalories();
		};
		newCounterItem.appendChild(span);
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
	for (let kcal of document.querySelectorAll('.counter-cal')) {
		sum += parseInt(kcal.innerText.split(' ')[0]);
	}
	counterResult.innerText = `SUM: ${sum} kcal`;
	actualSum = sum;
	goalDifference();
}

function validate() {
	const valpname = isValidName();
	const valcalories = isValidNumber('calories');
	return valpname && valcalories ? true : false;
}

function isValidName() {
	const pname = document.querySelector('#pname').value;
	const letters = /^[a-zA-Z ]+$/;
	if (pname == '') {
		document.getElementById('error-pname').innerHTML = 'Field cannot be blank<br>';
		return false;
	}
	else {
		if (searchInElementsBase(pname)) {
			document.getElementById('error-pname').innerHTML = 'Name have to be unique<br>';
			return false;
		}
		else {
			if (pname.match(letters)) {
				document.getElementById('error-pname').innerHTML = '';
				return true;
			}
			else {
				document.getElementById('error-pname').innerHTML = 'Enter A-z  value only<br>';
				return false;
			}
		}
	}
}

function isValidNumber(id) {
	const num = document.querySelector(`#${id}`).value;
	if (num == '') {
		document.getElementById(`error-${id}`).innerHTML = 'Field cannot be blank<br>';
		return false;
	}
	else {
		if (isNaN(num || num <= 0)) {
			document.getElementById(`error-${id}`).innerHTML = 'Enter positive numeric value only<br>';
			return false;
		}
		else {
			document.getElementById(`error-${id}`).innerHTML = '';
			return true;
		}
	}
}

function searchInElementsBase(stringSearch) {
	let localStorageCheck = getFromLocalStorage('app');
	for (let l of localStorageCheck) {
		if (stringSearch.trim() == l.product.toLowerCase()) {
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

function saveGoal() {
	if (isValidNumber('goal')) {
		userGoal = settingsGoal.value;
		setToLocalStorage('goal', userGoal);
		yourGoalTxt.innerText = `Your goal: ${userGoal} kcal`;
		toggleForm();
		goalDifference();
	}
}

function goalDifference() {
	const difference = userGoal - actualSum;
	if (difference > 0) {
		counterResult.classList.remove('error-message');
		goalDifferenceTxt.classList.remove('error-message');
		goalDifferenceTxt.innerText = `You can eat ${difference} more kcal.`;
	}
	else if (difference == 0) {
		counterResult.classList.remove('error-message');
		goalDifferenceTxt.classList.remove('error-message');
		goalDifferenceTxt.innerText = `Perfect. You have reached your goal.`;
	}
	else if (difference < 0) {
		counterResult.classList.add('error-message');
		goalDifferenceTxt.classList.add('error-message');
		goalDifferenceTxt.innerText = `You have ate ${Math.abs(difference)} kcal too much.`;
	}
	else {
		goalDifferenceTxt.classList.add('error-message');
		goalDifferenceTxt.innerText = `Something were wrong.`;
	}
}

window.onload = function() {
	init();
	initGoal();
	generateHTML();
	yourGoalTxt.innerText = `Your goal: ${userGoal} kcal`;
};

newElement.addEventListener('click', () => toggleForm('myform'));
settings.addEventListener('click', () => toggleForm('settings'));
addButton.addEventListener('click', addNewItem);
sampleDataButton.addEventListener('click', () => generateSample(sampleData));
sampleDataButton2.addEventListener('click', () => generateSample(sampleData2));
removeAll.addEventListener('click', clearAll);
clearCounter.addEventListener('click', clearCounterText);
searchBar.addEventListener('keyup', searchElement);
settingsSave.addEventListener('click', saveGoal);
