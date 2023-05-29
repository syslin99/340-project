let addEmployeeForm = document.getElementById('add-employee-form')
let nameInput = document.getElementById('input-name')
let rateInput = document.getElementById('input-rate')
let hoursInput = document.getElementById('input-hours')
let salesInput = document.getElementById('input-sales')

addEmployeeForm.addEventListener('submit', function(e) {
    e.preventDefault()

    let nameValue = nameInput.value
    let rateValue = rateInput.value
    let hoursValue = hoursInput.value
    let salesValue = salesInput.value

    let data = {
        name: nameValue,
        hourly_rate: rateValue,
        hours_worked: hoursValue,
        total_sales: salesValue
    }

    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/add-employee', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response)

            nameInput.value = ''
            rateInput.value = ''
            hoursInput.value = ''
            salesInput.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input")
        }

    }
    xhttp.send(JSON.stringify(data))
})

addEmployeeForm.addEventListener('reset', function(e) {
    nameInput.innerText = ""
    rateInput.innerText = ""
    hoursInput.innerText = ""
    salesInput.innerText = ""
})


addRowToTable = (data) => {
    let currentTable = document.getElementById('employees-table')

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1]

    // Create row and cells
    let row = document.createElement('tr')
    let idCell = document.createElement('td')
    let nameCell = document.createElement('td')
    let rateCell = document.createElement('td')
    let hoursCell = document.createElement('td')
    let salesCell = document.createElement('td')

    // Fill the cells
    idCell.innerText = newRow.id_employee
    nameCell.innerText = newRow.name
    rateCell.innerText = newRow.hourly_rate
    hoursCell.innerText = newRow.hours_worked
    salesCell.innerText = newRow.total_sales

    // Add the cells to the row
    row.appendChild(idCell)
    row.appendChild(nameCell)
    row.appendChild(rateCell)
    row.appendChild(hoursCell)
    row.appendChild(salesCell)

    // Add a row attribute so deleteRow can find the newly added row
    row.setAttribute('data-value', newRow.id_employee)

    // Add the row to the table
    currentTable.appendChild(row);

}