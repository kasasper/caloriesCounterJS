const elementsContainer = document.querySelector('#base');
const newElement = document.querySelector('.new-element');
const form = document.querySelector('.form');
// const addButton = document.querySelector('input#add');
const addButton = document.querySelector('button#add');
const sampleDataButton = document.querySelector('button#sampleDataButton');
const removeAll = document.querySelector('button#clearLocalStorage');
const newCounter = document.querySelectorAll('.old-element');
const counterBase = document.querySelector('.added_elements');
const clearCounter = document.querySelector('#clearCounter');
const counterResult = document.querySelector('.result');
const counterElementCal = document.querySelector('.counter-size');

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

function generateSample() {
	let localStorage = getFromLocalStorage('app');
	localStorage.push(sampleData[0]);
	localStorage.push(sampleData[1]);
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
}

function addNewItem() {
	// validate
	if (validate()) {
		// create new element
		const pname = document.querySelector('input#pname');
		const calories = document.querySelector('input#calories');
		let size = document.querySelector('select#size');
		size = size.options[size.selectedIndex].text;
		size = size.split(' ');

		let newItem = {
			product: pname.value,
			calories: calories.value,
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
	const size = target.querySelector('.counter-size').value;
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
	const num = document.querySelector('#calories').value;
	if (isNaN(num)) {
		document.getElementById('error-calories').innerHTML = 'Enter numeric value only <br>';
		return false;
	}
	else {
		return true;
	}
}

window.onload = function() {
	init();
	generateHTML();
};

newElement.addEventListener('click', openForm);
// addButton.addEventListener('submit', addNewItem);
addButton.addEventListener('click', addNewItem);
sampleDataButton.addEventListener('click', generateSample);
removeAll.addEventListener('click', clearAll);
clearCounter.addEventListener('click', clearCounterText);
