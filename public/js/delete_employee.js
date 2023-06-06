let deleteEmployeeForm = document.getElementById('delete-employee-form')
// let nameInput = document.getElementById('delete-name')


let deleteEmployeeConf = document.getElementById('confirmation-container')

deleteEmployeeConf.addEventListener('submit', function(e) {
    e.preventDefault()

    delEmployeeModalBg = document.getElementById('modal-container-employees')
    let idInput = document.getElementById('input-id-delete')
    let idValue = idInput.value
    console.log(idValue)
    delEmployeeModalBg.setAttribute('hidden', true)
    deleteEmployee(idValue)

})


deleteEmployeeForm.addEventListener('submit', function(e) {
    let idInput = document.getElementById('input-id-delete')
    e.preventDefault()

    delProductModalBg = document.getElementById('modal-container-employees')
    document.getElementById('header').scrollIntoView()
    delProductModalBg.removeAttribute('hidden')
})

function deleteEmployee (employeeID) {
    let idInput = document.getElementById('input-id-delete')
    let nameEmployee = document.getElementById('delete-name')
    let rateEmployee = document.getElementById('delete-rate')
    let hoursEmployee = document.getElementById('delete-hours')
    let salesEmployee = document.getElementById('delete-sales')

    // Package data into JS object
    let data = {
        id_employee: employeeID
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-employee', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data from the table
            deleteRow(employeeID);

            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    
    idInput.value = ""
    nameEmployee.innerText = ""
    rateEmployee.innerText = ""
    hoursEmployee.innerText = ""
    salesEmployee.innerText = ""

    // Send AJAX request
    xhttp.send(JSON.stringify(data));

}


// Delete row from Customers table
function deleteRow (employeeID) {
    let currentTable = document.getElementById('employees-table');
    // Iterate through rows
    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        // Find row to be deleted
        if (currentTable.rows[i].getAttribute('data-value') == employeeID) {
            currentTable.deleteRow(i);
            break;
        }
    }
}

deleteEmployeeForm.addEventListener('reset', function(e) {
    let idInput = document.getElementById('input-id-delete')
    let nameEmployee = document.getElementById('delete-name')
    let rateEmployee = document.getElementById('delete-rate')
    let hoursEmployee = document.getElementById('delete-hours')
    let salesEmployee = document.getElementById('delete-sales')


    idInput.innerText = ""
    nameEmployee.innerText = ""
    rateEmployee.innerText = ""
    hoursEmployee.innerText = ""
    salesEmployee.innerText = ""
})


function updateForm () {
    let deleteForm = document.getElementById('input-id-delete')
    let employeeID = deleteForm.value
    let updatedName = document.getElementById('delete-name')
    let updatedRate = document.getElementById('delete-rate')
    let updatedHours = document.getElementById('delete-hours')
    let updatedSales = document.getElementById('delete-sales')

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

    updatedName.innerText = specName
    updatedRate.innerText = specRate
    updatedHours.innerText = specHours
    updatedSales.innerText = specSales
}

function deleteModalCancel () {
    let modal = document.getElementById('modal-container-employees')
    modal.setAttribute('hidden', true)
}
