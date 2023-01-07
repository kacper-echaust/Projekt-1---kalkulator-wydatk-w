const inputIncome = document.querySelector('.input-income')
const inputExpenses = document.querySelector('.input-expenses')
const listOfExpenses = document.querySelector('.list-of-expenses')
const container = document.querySelector('.container')
const summaryExpenses = document.querySelector('.summary-expenses')
const circle = document.querySelector('.circle')
const incomes = document.querySelector('.incomes')

const state = {
	income: 0,
	expanses: [0],
}

function renderIncome() {
	incomes.innerHTML = ''
	const p = document.createElement('p')
	incomes.appendChild(p)
	p.textContent = inputIncome.value + ' zł/ ' + state.expanses.reduce(sumOfExpanses) + ' zł'
}
function renderExpenses() {
	const li = document.createElement('li')
	const button = document.createElement('button')
	summaryExpenses.style.borderTop = '2px solid white'
	for (let i = 0; i < state.expanses.length; i++) {
		listOfExpenses.appendChild(li).appendChild(button)
		li.textContent = inputExpenses.value + ' zł'
		button.textContent = 'x'
		summaryExpenses.textContent = state.expanses.reduce(sumOfExpanses) + ' zł'
	}
	renderIncome()
}

function sumOfExpanses(total, amount) {
	total += amount
	return total
}

function setIncome(income) {
	if (state.income === 0) {
		state.income = income
	}
}

function addExpanse(expanse) {
	state.expanses.push(expanse)
}

inputExpenses.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		addExpanse(parseFloat(inputExpenses.value))
		renderExpenses()
	}
})

inputIncome.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		setIncome(parseFloat(inputIncome.value))
		renderIncome()
	}
})
