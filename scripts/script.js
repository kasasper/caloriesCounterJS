var elementsContainer = document.querySelector('#base');
var newElement = document.querySelector('.new-element');
var newCounter = document.querySelectorAll('.old-element');
var counterBase = document.querySelector('.added_elements');
var form = document.querySelector('.form');
var addButton = document.querySelector('button#add')

newElement.addEventListener('click', openForm)
addButton.addEventListener('click', addNewItem)

function openForm() {
    form.setAttribute('class','form-active')
}

function addNewItem() {
    const newElementItem = document.createElement('span');
    newElementItem.setAttribute('class', 'btn-element old-element')

    const newElementName = document.createElement('p');
    newElementName.setAttribute('class', 'btn-element-name')
    const pname = document.querySelector('input#pname')
    newElementName.innerText = pname.value

    const newElementCal = document.createElement('p');
    newElementCal.setAttribute('class', 'btn-element-cal')
    const calories = document.querySelector('input#calories')
    newElementCal.innerText = calories.value + ' kcal'

    const newElementSize = document.createElement('p');
    newElementSize.setAttribute('class', 'btn-element-size')
    const size = document.querySelector('select#size')
    newElementSize.innerText = size.options[size.selectedIndex].text
    
    elementsContainer.appendChild(newElementItem)
    newElementItem.appendChild(newElementName)
    newElementItem.appendChild(newElementCal)
    newElementItem.appendChild(newElementSize)
    addCounterEventForBox(newElementItem)
    form.setAttribute('class','form')
    pname.value = ''
    calories.value = ''

}

function addCounterEventForBox(element) {
    element.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target.closest('.old-element')
        const text = target.textContent || target.innerText;  
        const newCounterItem = document.createElement('li')
        newCounterItem.innerText = text
        counterBase.appendChild(newCounterItem)
    })
}

for (const box of newCounter) {
    addCounterEventForBox(box)
}
