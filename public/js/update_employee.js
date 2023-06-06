let updateEmployeeForm = document.getElementById('update-employee-form')

updateEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault()

    let idInputEmployee = document.getElementById('input-id-update')
    let nameInputEmployee = document.getElementById('input-name-update')
    let rateInputEmployee = document.getElementById('input-rate-update')
    let hoursInputEmployee = document.getElementById('input-hours-update')
    let salesInputEmployee = document.getElementById('input-sales-update')

    let idValue = idInputEmployee.value
    let nameValue = nameInputEmployee.value
    let rateValue = rateInputEmployee.value
    let hoursValue = hoursInputEmployee.value
    let salesValue = salesInputEmployee.value

    let data = {
        id_employee: idValue,
        name: nameValue,
        hourly_rate: rateValue,
        hours_worked: hoursValue,
        total_sales: salesValue
    }

        // Set up AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('PUT', '/update-employee', true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        // Define resolution of AJAX request
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
    
                // Update the data in the table
                updateRow(xhttp.response, idValue);
    
                // Clear fields
                idInputEmployee.value = ''
                nameInputEmployee.value = ''
                rateInputEmployee.value = ''
                hoursInputEmployee.value = ''
                salesInputEmployee.value = ''

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }
        // Send AJAX request
        xhttp.send(JSON.stringify(data));
    
})

updateEmployeeForm.addEventListener('reset', function (e) {
    let idInputEmployee = document.getElementById('input-id-update')
    let nameInputEmployee = document.getElementById('input-name-update')
    let rateInputEmployee = document.getElementById('input-rate-update')
    let hoursInputEmployee = document.getElementById('input-hours-update')
    let salesInputEmployee = document.getElementById('input-sales-update')


    idInputEmployee.innerText = ""
    nameInputEmployee.innerText = ""
    rateInputEmployee.innerText = ""
    hoursInputEmployee.innerText = ""
    salesInputEmployee.innerText = ""
})

function updateRow(data, employeeID) {
    let parsedData = JSON.parse(data)
    let currentTable = document.getElementById('employees-table')

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == employeeID) {
            let updateRowIndex = currentTable.getElementsByTagName('tr')[i]
            let tdName = updateRowIndex.getElementsByTagName('td')[1]
            let tdRate = updateRowIndex.getElementsByTagName('td')[2]
            let tdHours = updateRowIndex.getElementsByTagName('td')[3]
            let tdSales = updateRowIndex.getElementsByTagName('td')[4]

            tdName.innerHTML = parsedData[0].name
            tdRate.innerHTML = parsedData[0].hourly_rate
            tdHours.innerHTML = parsedData[0].hours_worked
            tdSales.innerHTML = parsedData[0].total_sales
        }
    }
}

function updateUpGroupForm () {
    let deleteForm = document.getElementById('input-id-update')
    let employeeID = deleteForm.value
    let updatedName = document.getElementById('input-name-update')
    let updatedRate = document.getElementById('input-rate-update')
    let updatedHours = document.getElementById('input-hours-update')
    let updatedSales = document.getElementById('input-sales-update')

    let currentTable = document.getElementById('employees-table')
    let specName = ""
    let specRate = ""
    let specHours = ""
    let specSales = ""

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == employeeID) {
            let specRow = currentTable.getElementsByTagName('tr')[i]
            specName = specRow.getElementsByTagName('td')[1].textContent
            specRate = specRow.getElementsByTagName('td')[2].textContent
            specHours = specRow.getElementsByTagName('td')[3].textContent
            specSales = specRow.getElementsByTagName('td')[4].textContent

        }
    }

    updatedName.value = specName
    updatedRate.value = specRate
    updatedHours.value = specHours
    updatedSales.value = specSales

    updatedName.ariaPlaceholder = updatedName.value
}
