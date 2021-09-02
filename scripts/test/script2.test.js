describe('Elements', () => {
	beforeEach(() => {
		clearAll();
	});

	it('Generate 2 sample data elements', () => {
		generateSample();

		const sampleData = document.querySelectorAll('.old-element');

		expect(sampleData).to.have.lengthOf(2);
	});

	it('Remove all button in elements section works', () => {
		generateSample();
		clearAll();

		const sampleData = document.querySelectorAll('.old-element');

		expect(sampleData).to.have.lengthOf(0);
	});

	it('New element displays in elements base', () => {
		const button = document.querySelector('button#add');
		const pname = document.querySelector('input#pname');
		pname.value = 'Banana';
		const calories = document.querySelector('input#calories');
		calories.value = '285';
		let size = document.querySelector('select#size');
		size.value = 'package';
		button.dispatchEvent(new Event('click'));

		const sampleData = document.querySelectorAll('.old-element');
		expect(sampleData).to.have.lengthOf(1);
	});
});

describe('New element form', () => {
	beforeEach(() => {
		clearAll();
	});

	it('Opened form have proper class', () => {
		openForm();
		const formParent = document.querySelector('form').parentElement;

		expect(formParent.className).to.be.equal('form-active');
	});

	it('Closed form have proper class', () => {
		closeForm();
		const formParent = document.querySelector('form').parentElement;

		expect(formParent.className).to.be.equal('form');
	});

	it('Closing a form, clears the inputs', () => {
		const pname = document.querySelector('input#pname');
		pname.value = 'Banana';
		const calories = document.querySelector('input#calories');
		calories.value = '285';
		closeForm();
		expect(pname.value).to.be.equal('');
		expect(calories.value).to.be.equal('');
	});

	//TODO
	it('Calories field have to be a number', () => {
		expect(false).to.be.true()
	});
});

describe('Counter', () => {
	beforeEach(() => {
		clearAll();
		generateSample();
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

	//TODO
	it('Most caloric food should be highlighted', () => {
		expect(false).to.be.true()
	});

//TODO
describe('Calories goal', () => {
	it('Default there is 2000kcal', () => {
		expect(false).to.be.true()
	});

	it('User can specific daily calories goal', () => {
		expect(false).to.be.true()
	});

	it('If sum of calories is over daily goal, it\'s highlighted', () => {
		expect(false).to.be.true()
	});

	it('There is displayed difference between goal and result', () => {
		expect(false).to.be.true()
	});
})

//TODO
describe('Search field', () => {
	it('Displays result', () => {
		expect(false).to.be.true()
	});
})
});
