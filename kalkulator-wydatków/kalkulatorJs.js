const inputIncome = document.querySelector('.input-income')
const inputExpenses = document.querySelector('.input-expenses')
const containerListOfExpenses = document.querySelector('.container-list-of-expenses')
const container = document.querySelector('.container')
const circle = document.querySelector('.circle')
const incomes = document.querySelector('.incomes')
const selectCategory = document.querySelector('.select-category')

const categories = [
	{
		id: 1,
		name: 'Wydatki podstawowe',
	},
	{
		id: 2,
		name: 'Opłaty miesięczne',
	},
	{
		id: 3,
		name: 'Wydatki dodatkowe',
	},
]
const state = {
	income: 0,
	expanses: [],
}

const sumOfExpanses = state.expanses.reduce(function (sum, expanses) {
	return sum + expanses.amount
}, 0)

let unicalId = 1

function renderIncome() {
	incomes.innerHTML = ''
	const p = document.createElement('p')
	incomes.appendChild(p)
	p.textContent = `${inputIncome.value} zł/ ${state.expanses.reduce(function (sum, expanses) {
		return sum + expanses.amount
	}, 0)} zł`
}

function renderExpenses() {
	containerListOfExpenses.innerHTML = ''

	categories.forEach(function (category) {
		// stworzenie struktury wyświetlania kategori
		const div = document.createElement('div')
		const p = document.createElement('p')
		const ul = document.createElement('ul')
		const strong = document.createElement('strong')

		containerListOfExpenses.appendChild(div)
		div.appendChild(p)
		div.appendChild(ul)
		div.appendChild(strong)
		p.textContent = category.name

		strong.classList.add('sum-of-expanses-in-category')

		// state.expanses zostało przefiltrowane na 3 różne tablice (tyle ile jest kategori) po id - te same id z kategori i wydatków trafia zwraca true i trafia do tablicy z odpowiednim id
		const filteredExpanses = state.expanses.filter(function (expanse) {
			if (expanse.id === category.id) {
				return true
			}
			return false
		})
		// }).map(function(expanse) { return ({...expanse}) })

		// przeiterowanie po nowych tablicach rozdzielonych na kategorie i wypisanie wydatków
		filteredExpanses.forEach(function (expanse) {
			const li = document.createElement('li')
			const button = document.createElement('button')
			ul.appendChild(li)
			li.textContent = `${expanse.amount} zł`
			li.appendChild(button)
			button.textContent = 'X'

			button.addEventListener('click', function () {
				const array = state.expanses.filter(function (stateExpanse) {
					if (stateExpanse.unicalId === expanse.unicalId) {
						return false
					}
					return true
				})
				state.expanses = array
				renderExpenses()
			})
		})

		// suma wydatków w poszczególnej kategori
		const sumOfExpansesInCategory = filteredExpanses.reduce(function (sum, amount) {
			return sum + amount.amount
		}, 0)

		strong.textContent = `${sumOfExpansesInCategory} zł`
	})

	renderIncome()
}

function setIncome(income) {
	if (state.income === 0) {
		state.income = income
	}
}

function addExpanse(amount, id, unicalId) {
	if (id === '0') {
		alert('Wybierz kategorię')
	} else {
		state.expanses.push({ amount, id: parseInt(id), unicalId })
	}
}

function renderCategories() {
	categories.forEach(function (element) {
		const option = document.createElement('option')
		option.textContent = element.name
		option.setAttribute('value', element.id)
		selectCategory.appendChild(option)
	})
}
renderCategories()

inputExpenses.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		addExpanse(parseFloat(inputExpenses.value), selectCategory.value, unicalId++)
		renderExpenses()
	}
})

inputIncome.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		setIncome(parseFloat(inputIncome.value))
		renderIncome()
	}
})

//chciałbym do buttona dodac ikone z font awesome jak ja dodac ?
//jak zmienic tlo na rozwijajacej sie liscie w katgoriach
//wyswietlanie buttona usuwania przy najechaniu na kwote

// dodac unikalne id do kazdego wydatku 82 druga linijka , zeby nie porownywac obiektow do siebie
//do czego sluzy map
