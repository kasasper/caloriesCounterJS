const elementsContainer: Element = document.querySelector('#base');
const newElement: Element = document.querySelector('.new-element');
const addButton: Element = document.querySelector('button#add');
const sampleDataButton: Element = document.querySelector('button#sampleDataButton');
const sampleDataButton2: Element = document.querySelector('button#sampleDataButton2');
const removeAll: Element = document.querySelector('button#clearLocalStorage');
const counterBase: Element = document.querySelector('.added_elements');
const clearCounter: Element = document.querySelector('#clearCounter');
const counterResult: HTMLInputElement = document.querySelector('.result');
const searchBar: Element = document.querySelector('#search-element-input');
const settings: Element = document.querySelector('#settingsGoal');
const settingsGoal: Element = document.querySelector('#goal');
const settingsSave: Element = document.querySelector('#settingsSave');
const goalDifferenceTxt: HTMLInputElement = document.querySelector('.goalDifference');
const yourGoalTxt: HTMLInputElement = document.querySelector('.yourGoal');

let userGoal: number = 0;
let actualSum: number = 0;

interface product {
	product: string;
	calories: string;
	size: string;
	sizeType: string;
}

const sampleData: product[] = [
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

const sampleData2: product[] = [
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

function toggleForm(id = (window.event.target as HTMLInputElement).closest('form').id) {
	const form = document.querySelector(`form#${id}`);
	if (form.parentElement.className === 'form') {
		form.parentElement.setAttribute('class', 'form-active');
		const target = window.event.target as HTMLInputElement;
		target.classList.add('active');
	}
	else {
		form.parentElement.setAttribute('class', 'form');
		let inputs = document.querySelectorAll(`form#${id} input`);
		for (let input of inputs) {
			(input as HTMLInputElement).value = '';
		}
		const target = window.event.target;
		(target as HTMLInputElement).classList.remove('active');
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

function getFromLocalStorage(item: string) {
	const localStorageItem = localStorage.getItem(item);
	return localStorageItem ? JSON.parse(localStorageItem) : null;
}

function setToLocalStorage(string: string, items: any) {
	localStorage.setItem(string, JSON.stringify(items));
}

function addToLocalStorage(string: string, newItem) {
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
		const pname: HTMLInputElement = document.querySelector('input#pname');
		const calories: HTMLInputElement = document.querySelector('input#calories');
		let sizeElement: HTMLSelectElement = document.querySelector('select#size');
		let sizeTxt: string = sizeElement.options[sizeElement.selectedIndex].text.trim();
		let sizeArray: string[] = sizeTxt.split(' ');

		let newItem: product = {
			product: pname.value.trim(),
			calories: calories.value.trim(),
			size: sizeTxt[0],
			sizeType: sizeTxt[1]
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
		span.onclick = () => {
			const div: HTMLInputElement = this.closest('li');
			div.innerHTML = '';
			div.style.display = 'none';
			sumCalories();
		};
		newCounterItem.appendChild(span);
	});
}

function changeCalories() {
	let e = window.event;
	const target = (e.target as HTMLInputElement).closest('li');
	let size: number = +(target.querySelector('.counter-size') as HTMLInputElement).value;
	if (size < 0 || isNaN(size)) size = 0;
	const pack = (target.querySelector('.counter-size-pack') as HTMLInputElement).innerText;
	const cal = +(target.querySelector('.counter-cal-base') as HTMLInputElement).innerText;
	if (pack === 'g') size = size / 100;
	(target.querySelector('.counter-cal') as HTMLInputElement).innerText = String(Math.round(size * cal));
	sumCalories();
}

function clearCounterText() {
	counterBase.innerHTML = '';
	sumCalories();
}

function sumCalories() {
	let sum = 0;
	for (let kcal of document.querySelectorAll('.counter-cal')) {
		sum += +(kcal as HTMLInputElement).innerText.split(' ')[0];
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
	const pname = (document.querySelector('#pname') as HTMLInputElement).value;
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
	const num: string = (document.querySelector(`#${id}`) as HTMLInputElement).value;
	if (num == '') {
		document.getElementById(`error-${id}`).innerHTML = 'Field cannot be blank<br>';
		return false;
	}
	else {
		if (isNaN(+num)) {
			document.getElementById(`error-${id}`).innerHTML = 'Enter numeric value only<br>';
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
		name.toLowerCase().indexOf(term) == -1
			? ((e as HTMLElement).style.display = 'none')
			: ((e as HTMLElement).style.display = 'inline-table');
	});
}

function saveGoal() {
	if (isValidNumber('goal')) {
		let userGoalCheck: string = (settingsGoal as HTMLInputElement).value;
		setToLocalStorage('goal', userGoalCheck);
		yourGoalTxt.innerText = `Your goal: ${userGoal} kcal`;
		toggleForm();
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
