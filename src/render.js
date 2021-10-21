'use strict'

// Блоки.
const printDataInner = document.querySelector('.print-data-inner')
const printDataFront = document.querySelector('.print-data-front')
// Модальное окно для работы с вакцинами.
const modalVaccine = document.querySelector('.modal-vaccine')
// Модальное окно для работы с врачами.
const modal = document.querySelector('.modal')

/* Инпуты. */
// Паспортные данные.
const surnameInput = document.querySelector('[name="surname"]')
const forenameInput = document.querySelector('[name="forename"]')
const patronymicInput = document.querySelector('[name="patronymic"]')
const lastNameInput = document.querySelector('[name="last-name"]')
const firstNameInput = document.querySelector('[name="first-name"]')
const fatherNameInput = document.querySelector('[name="father-name"]')
const dateInput = document.querySelector('[name="date"]')
const passportInput = document.querySelector('[name="passport"]')
const personalNumberInput = document.querySelector('[name="personal-number"]')
// Наименование вакцины.
const vaccineInput = document.querySelector('[name="vaccine"]')
// 1-ая вакцина
const firstDateInput = document.querySelector('[name="first-date"]')
const firstVaccineInput = document.querySelector('[name="first-vaccine"]')
const firstDoctorInput = document.querySelector('[name="first-doctor"]')
// 2-ая вакцина
const secondDateInput = document.querySelector('[name="second-date"]')
const isNotSubjectTo = document.getElementById('is-not-subject-to')
const secondVaccineInput = document.querySelector('[name="second-vaccine"]')
const secondDoctorInput = document.querySelector('[name="second-doctor"]')

// Инпуты модальных окон.
const vaccineInputs = Array.from(modalVaccine.querySelectorAll('textarea'))
const doctorInput = modal.querySelector('textarea')

/* Надписи на внутренней стороне. */
// Паспортные данные.
const familyName = document.querySelector('#family-name')
const firstName = document.querySelector('#first-name')
const middleName = document.querySelector('#middle-name')
const birth = document.querySelector('#birth')
const passport = document.querySelector('#passport')
const personalNumber = document.querySelector('#personal-number')
// 1-ая вакцина
const dateFirstVaccination = document.querySelector('#date-first-vaccination')
const firstVaccine = document.querySelector('#first-vaccine')
const firstDoctor = document.querySelector('#first-doctor')
// 2-ая вакцина
const dateSecondVaccination = document.querySelector('#date-second-vaccination')
const secondVaccine = document.querySelector('#second-vaccine')
const secondDoctor = document.querySelector('#second-doctor')

// Кнопки.
const addVaccineButton = document.querySelector('.addVaccine')
const removeVaccineButton = document.querySelector('.removeVaccine')
const addDoctorButton = document.querySelector('.addDoctor')
const removeDoctorButton = document.querySelector('.removeDoctor')
const qrCodeButton = document.querySelector('#qr-code')
const emptyPageButton = document.querySelector('#empty-page')
const innerSideButton = document.querySelector('#inner-side')
const frontSideButton = document.querySelector('#front-side')

// Кнопки модального окна для работы с вакцинами.
const addNewVaccine = document.getElementById('addNewVaccine')
const cancelAddingNewVaccine = document.getElementById('cancelAddingNewVaccine')
const deleteVaccine = document.getElementById('deleteVaccine')
const cancelDeleteVaccine = document.getElementById('cancelDeleteVaccine')

// Кнопки модального окна для работы с врачами.
const addNewDoctor = document.getElementById('addNewDoctor')
const cancelAddingNewDoctor = document.getElementById('cancelAddingNewDoctor')
const deleteDoctor = document.getElementById('deleteDoctor')
const cancelDeleteDoctor = document.getElementById('cancelDeleteDoctor')

// Переменные.
let db = null
let dbObject = null
let newDoctor = ''

// const electron = require('@electron/remote')
const fs = require('fs')
const { readFileSync, writeFileSync } = fs
const path = require('path')

const getDB = () => {
	db = readFileSync(path.join(__dirname, 'database.json'), 'utf8')
	dbObject = JSON.parse(db)
}
getDB()

const writeDB = () => {
	const db = JSON.stringify(dbObject)
	writeFileSync(path.join(__dirname, 'database.json'), db)
}

// Функция заполняет поле "Наименование вакцины" на бланке.
const getFullVaccineName = vaccineName => {
	const rusVaccineName = dbObject.vaccines[vaccineName][0]
	const engVaccineName = dbObject.vaccines[vaccineName][1]

	firstVaccine.textContent = `${rusVaccineName}, `
	firstVaccine.textContent +=
		firstVaccineInput.value.trim().toUpperCase() + ' / '
	firstVaccine.textContent += `${engVaccineName}, `
	firstVaccine.textContent += firstVaccineInput.value.trim().toUpperCase()

	if (secondDateInput.valueAsNumber && !isNotSubjectTo.checked) {
		secondVaccine.textContent = `${rusVaccineName}, `
		secondVaccine.textContent +=
			secondVaccineInput.value.trim().toUpperCase() + ' / '
		secondVaccine.textContent += `${engVaccineName}, `
		secondVaccine.textContent += secondVaccineInput.value
			.trim()
			.toUpperCase()
	} else {
		secondVaccine.textContent = ''
	}
}

// Заполнение селекта с вакцинами.
const fillVaccines = () => {
	vaccineInput.textContent = ''

	dbObject.vaccines.forEach((vaccine, index) => {
		const optionText = `<option value=${index}>${vaccine[0]} / ${vaccine[1]}</option>`
		vaccineInput.innerHTML += optionText
	})
}
fillVaccines()

// Заполнение селектов с врачами.
const fillDoctors = () => {
	firstDoctorInput.textContent = ''
	secondDoctorInput.textContent = ''
	dbObject.doctors.forEach(doctor => {
		const optionText = `<option>${doctor}</option>`
		firstDoctorInput.innerHTML += optionText
		secondDoctorInput.innerHTML += optionText
	})
}
fillDoctors()

const getDoctors = () => {
	firstDoctor.textContent = firstDoctorInput.value
	if (secondDateInput.valueAsNumber && !isNotSubjectTo.checked) {
		secondDoctor.textContent = secondDoctorInput.value
	} else {
		secondDoctor.textContent = ''
	}
}

getFullVaccineName(vaccineInput.value)

getDoctors()

const closeModal = () => {
	doctorInput.value = ''
	vaccineInputs.forEach(item => (item.value = ''))
	modalVaccine.style.display = 'none'
	modal.style.display = 'none'
}

surnameInput.addEventListener('keyup', e => {
	familyName.textContent =
		e.target.value.trim() + ' / ' + lastNameInput.value.trim()
})

forenameInput.addEventListener('keyup', e => {
	firstName.textContent =
		e.target.value.trim() + ' / ' + firstNameInput.value.trim()
})

patronymicInput.addEventListener('keyup', e => {
	middleName.textContent =
		e.target.value.trim() + ' / ' + fatherNameInput.value.trim()
})

lastNameInput.addEventListener('keyup', e => {
	familyName.textContent =
		surnameInput.value.trim() + ' / ' + e.target.value.trim()
})

firstNameInput.addEventListener('keyup', e => {
	firstName.textContent =
		forenameInput.value.trim() + ' / ' + e.target.value.trim()
})

fatherNameInput.addEventListener('keyup', e => {
	middleName.textContent =
		patronymicInput.value.trim() + ' / ' + e.target.value.trim()
})

dateInput.addEventListener('change', e => {
	birth.textContent = new Date(e.target.valueAsNumber).toLocaleDateString(
		'ru'
	)
})

passportInput.addEventListener('keyup', e => {
	passport.textContent = e.target.value.trim()
})

personalNumberInput.addEventListener('keyup', e => {
	personalNumber.textContent = e.target.value.trim()
})

vaccineInput.addEventListener('change', e => {
	getFullVaccineName(e.target.value)
})

firstDateInput.addEventListener('change', e => {
	dateFirstVaccination.textContent = new Date(
		e.target.valueAsNumber
	).toLocaleDateString('ru')
})

// Изменение номера партии 1-ой вакцины.
firstVaccineInput.addEventListener('keyup', e => {
	getFullVaccineName(vaccineInput.value)
})

firstDoctorInput.addEventListener('change', e => {
	firstDoctor.textContent = e.target.value
})

const getSecondDate = () => {
	if (secondDateInput.valueAsNumber && !isNotSubjectTo.checked) {
		dateSecondVaccination.textContent = new Date(
			secondDateInput.valueAsNumber
		).toLocaleDateString('ru')
	} else if (isNotSubjectTo.checked) {
		dateSecondVaccination.textContent = 'не подлежит'
	} else {
		dateSecondVaccination.textContent = ''
	}

	getFullVaccineName(vaccineInput.value)
	getDoctors()
}

secondDateInput.addEventListener('change', getSecondDate)

isNotSubjectTo.addEventListener('change', () => {
	console.log('не подлежит')

	getSecondDate()
})

// Изменение номера партии 2-ой вакцины.
secondVaccineInput.addEventListener('keyup', e => {
	getFullVaccineName(vaccineInput.value)

	getDoctors()
})

secondDoctorInput.addEventListener('change', e => {
	getDoctors()
})

addVaccineButton.addEventListener('click', () => {
	const modalInnerAdd = modalVaccine.querySelector('.modal-inner-add')
	const modalInnerRemove = modalVaccine.querySelector('.modal-inner-remove')
	modalVaccine.style.display = 'flex'
	modalInnerAdd.style.display = 'flex'
	modalInnerRemove.style.display = 'none'
	vaccineInputs[0].focus()
})

removeVaccineButton.addEventListener('click', () => {
	const modalInnerAdd = modalVaccine.querySelector('.modal-inner-add')
	const modalInnerRemove = modalVaccine.querySelector('.modal-inner-remove')
	modalVaccine.style.display = 'flex'
	modalInnerAdd.style.display = 'none'
	modalInnerRemove.style.display = 'flex'

	const deletedVaccine = `${dbObject.vaccines[vaccineInput.value][0]} / ${
		dbObject.vaccines[vaccineInput.value][1]
	}`

	const headerCaptionVaccine = modalInnerRemove.querySelector('span')
	headerCaptionVaccine.innerText = deletedVaccine
})

addDoctorButton.addEventListener('click', e => {
	const modalInnerAdd = modal.querySelector('.modal-inner-add')
	const modalInnerRemove = modal.querySelector('.modal-inner-remove')
	modal.style.display = 'flex'
	modalInnerAdd.style.display = 'flex'
	modalInnerRemove.style.display = 'none'
	doctorInput.focus()
})

removeDoctorButton.addEventListener('click', e => {
	const modalInnerAdd = modal.querySelector('.modal-inner-add')
	const modalInnerRemove = modal.querySelector('.modal-inner-remove')
	modal.style.display = 'flex'
	modalInnerAdd.style.display = 'none'
	modalInnerRemove.style.display = 'flex'

	const deletedDoctor = firstDoctorInput.value

	const headerCaptionDoctor = modalInnerRemove.querySelector('span')
	headerCaptionDoctor.innerText = deletedDoctor
})

qrCodeButton.addEventListener('click', () => {
	let vaccine = dbObject.vaccines[vaccineInput.value][1]

	let text = `Учреждение здравоохранения
«Березинская центральная районная больница»
HEALTH CARE INSTITUTION
«BEREZINSKAYA CENTRAL DISTRICT HOSPITAL»\n`
	text += lastNameInput.value.trim().toUpperCase() + ' '
	text += firstNameInput.value.trim().toUpperCase() + ', '
	text += birth.textContent + '\n'
	text += passport.textContent.toUpperCase() + ', '
	text += personalNumber.textContent.toUpperCase() + '\n'
	text += vaccine + '\n'
	text += dateFirstVaccination.textContent + ', '
	text += firstVaccineInput.value.trim().toUpperCase() + '\n'

	if (secondDateInput.valueAsNumber && !isNotSubjectTo.checked) {
		text += dateSecondVaccination.textContent + ', '
		text += secondVaccineInput.value.trim().toUpperCase() + '\n'
	}

	if (isNotSubjectTo.checked) {
		text += 'не подлежит'
	}

	const container = document.querySelector('.qr-container')
	container.textContent = ''

	QRCode.toCanvas(
		text,
		{ errorCorrectionLevel: 'H' },
		function (err, canvas) {
			if (err) throw err

			container.appendChild(canvas)
		}
	)
})

emptyPageButton.addEventListener('click', () => {
	printDataInner.classList.add('no-print')
	printDataFront.classList.add('no-print')
	window.print()
})

innerSideButton.addEventListener('click', () => {
	printDataInner.classList.remove('no-print')
	printDataFront.classList.add('no-print')
	window.print()
})

frontSideButton.addEventListener('click', () => {
	printDataInner.classList.add('no-print')
	printDataFront.classList.remove('no-print')
	window.print()
})

addNewVaccine.addEventListener('click', () => {
	let newRusVaccine = vaccineInputs[0].value.trim()
	let newEngVaccine = vaccineInputs[1].value.trim()
	modalVaccine.style.display = 'none'
	vaccineInputs.forEach(item => (item.value = ''))

	if (newRusVaccine && newEngVaccine) {
		// Если такой вакцины ещё нет в БД:
		let isThereSuchVaccine = false

		dbObject.vaccines.forEach(vaccine => {
			if (vaccine[0] === newRusVaccine && vaccine[1] === newEngVaccine) {
				isThereSuchVaccine = true
			}
		})

		if (!isThereSuchVaccine) {
			const newVaccine = [newRusVaccine, newEngVaccine]
			dbObject.vaccines.push(newVaccine)

			writeDB()
			getDB()
			fillVaccines()
			getFullVaccineName(0)
		}
	}
})

deleteVaccine.addEventListener('click', () => {
	let deletableVaccine = Number(vaccineInput.value)
	console.log('deletableVaccine: ', deletableVaccine)
	modalVaccine.style.display = 'none'

	const newVaccines = dbObject.vaccines.filter(
		(_, index) => deletableVaccine !== index
	)

	console.log('newVaccines: ', newVaccines)
	dbObject.vaccines = newVaccines

	writeDB()
	getDB()
	fillVaccines()
	getFullVaccineName(0)
})

addNewDoctor.addEventListener('click', () => {
	newDoctor = doctorInput.value.trim()
	modal.style.display = 'none'
	doctorInput.value = ''

	if (newDoctor && !dbObject.doctors.includes(newDoctor)) {
		dbObject.doctors.push(newDoctor)

		writeDB()
		getDB()
		fillDoctors()
		getDoctors()
	}
})

deleteDoctor.addEventListener('click', () => {
	modal.style.display = 'none'

	const deletedDoctor = firstDoctorInput.value

	const newDoctors = dbObject.doctors.filter(
		doctor => doctor !== deletedDoctor
	)

	dbObject.doctors = newDoctors

	writeDB()
	getDB()
	fillDoctors()
	getDoctors()
})

// Отмена действий в модальных окнах и их закрытие.
cancelAddingNewVaccine.addEventListener('click', closeModal)
cancelDeleteVaccine.addEventListener('click', closeModal)
cancelAddingNewDoctor.addEventListener('click', closeModal)
cancelDeleteDoctor.addEventListener('click', closeModal)
