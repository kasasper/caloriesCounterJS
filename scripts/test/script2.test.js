describe('Elements', () => {
	beforeEach(() => {
		clearAll();
	});

	it('Generate 2 sample data elements', () => {
		generateSample(sampleData);

		const sampleDataResult = document.querySelectorAll('.old-element');

		expect(sampleDataResult).to.have.lengthOf(2);
	});

	it('Remove all button in elements section works', () => {
		generateSample(sampleData);
		clearAll();

		const sampleDataResult = document.querySelectorAll('.old-element');

		expect(sampleDataResult).to.have.lengthOf(0);
	});

	it('New element displays in elements base', () => {
		newElement.dispatchEvent(new Event('click'));
		// const button = document.querySelector('button#add');
		const pname = document.querySelector('input#pname');
		pname.value = 'Banana';
		const calories = document.querySelector('input#calories');
		calories.value = '285';
		let size = document.querySelector('select#size');
		size.value = 'package';
		addButton.dispatchEvent(new Event('click'));

		const sampleDataResult = document.querySelectorAll('.old-element');
		expect(sampleDataResult).to.have.lengthOf(1);
	});
});

describe('New element form', () => {
	beforeEach(() => {
		clearAll();
		newElement.dispatchEvent(new Event('click'));
	});

	it('Opened form have proper class', () => {
		const formParent = document.querySelector('#myform').parentElement;
		expect(formParent.className).to.be.equal('form-active');
	});

	it('Closed form have proper class', () => {
		const formParent = document.querySelector('#myform').parentElement;
		expect(formParent.className).to.be.equal('form');
	});

	it('Closing a form, clears the inputs', () => {
		const pname = document.querySelector('input#pname');
		pname.value = 'Banana';
		const calories = document.querySelector('input#calories');
		calories.value = '285';
		newElement.dispatchEvent(new Event('click'));
		expect(pname.value).to.be.equal('');
		expect(calories.value).to.be.equal('');
	});

	it('Calories field have to be a number', () => {
		const calories = document.querySelector('input#calories');
		calories.value = '285';
		addButton.dispatchEvent(new Event('click'));
		let error = document.querySelector('#error-calories');
		expect(error.textContent).to.be.equal('');
		calories.value = 'acb';
		addButton.dispatchEvent(new Event('click'));
		expect(error.textContent).to.be.equal('Enter positive numeric value only');
	});
});

describe('Counter', () => {
	beforeEach(() => {
		clearAll();
		generateSample(sampleData);
		const elements = document.querySelectorAll('.old-element');
		elements.forEach((e) => {
			e.dispatchEvent(new Event('click'));
		});
	});

	it('Click on element, adds it to counter', () => {
		const counter = document.querySelectorAll('ul.added_elements > li');
		expect(counter.length).to.be.equal(2);
	});

	it('The total of the counter is displayed', () => {
		const result = document.querySelector('.result');
		expect(result.innerText).to.be.equal('SUM: 1500 kcal');
	});

	it('Remove all button in counter section works', () => {
		const removeButton = document.querySelector('#clearCounter');
		removeButton.dispatchEvent(new Event('click'));

		const counter = document.querySelectorAll('ul.added_elements > li');
		expect(counter.length).to.be.equal(0);
	});

	it('Remove all button in elements section, clears also counter', () => {
		const removeButton = document.querySelector('#clearLocalStorage');
		removeButton.dispatchEvent(new Event('click'));

		const counter = document.querySelectorAll('ul.added_elements > li');
		expect(counter.length).to.be.equal(0);
	});

	// 	//TODO
	// 	it('Most caloric food should be highlighted', () => {
	// 		expect(false).to.be.true();
	// 	});
});

//TODO
describe('Calories goal', () => {
	beforeEach(() => {
		window.localStorage.removeItem('goal');
		initGoal();
	});

	it('Default there is 2000kcal', () => {
		expect(getFromLocalStorage('goal')).to.not.be.null;
	});

	it('User can specific daily calories goal', () => {
		settings.dispatchEvent(new Event('click'));
		const goal = document.querySelector('#goal');
		goal.value = 2500;
		settingsSave.dispatchEvent(new Event('click'));
		expect(document.querySelector('.yourGoal').innerText).to.be.equal('Your goal: 2500 kcal');
	});

	it("If sum of calories is over daily goal, it's highlighted", () => {
		const newCounterItem = document.createElement('li');
		newCounterItem.innerHTML = `<span class="counter-name">Test</span>
                    <span class="counter-cal">3000</span><span class="counter-cal-base hidden">3000</span>
                    <input class="counter-size" value=100><span class="counter-size-pack">g</span>`;
		counterBase.appendChild(newCounterItem);
		sumCalories();
		expect(counterResult.className).to.be.equal('result error-message');
	});

	it('There is displayed difference between goal and result', () => {
		clearCounterText();
		const newCounterItem = document.createElement('li');
		newCounterItem.innerHTML = `<span class="counter-name">Test 2</span>
                    <span class="counter-cal">1000</span><span class="counter-cal-base hidden">1000</span>
                    <input class="counter-size" value=100><span class="counter-size-pack">g</span>`;
		counterBase.appendChild(newCounterItem);
		sumCalories();
		expect(goalDifferenceTxt.innerText).to.be.equal('You can eat 1000 more kcal.');
	});
});

//TODO
// describe('Search field', () => {
// 	it('Displays result', () => {
// 		generateSample(sampleData);
// 		searchBar.value = '1';
// 		searchBar.dispatchEvent(new Event('keypress'));
// 	});
// });
