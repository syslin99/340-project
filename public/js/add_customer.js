let addCustomerForm = document.getElementById('add-customer-form')

addCustomerForm.addEventListener('submit', function(e) {
    e.preventDefault()

    let nameInput = document.getElementById('input-name')
    let nameValue = nameInput.value
    let emailInput = document.getElementById('input-email')
    let emailValue = emailInput.value

    let data = {
        name: nameValue,
        email: emailValue
    }

    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/add-customer', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response)

            nameInput.value = ''
            emailInput.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input")
        }
    }

    xhttp.send(JSON.stringify(data))
})

addCustomerForm.addEventListener('reset', function(e) {
    let nameInput = document.getElementById('input-name')
    let emailInput = document.getElementById('input-email')

    nameInput.innerText = ""
    emailInput.innerText = ""
})

addRowToTable = (data) => {
    let currentTable = document.getElementById('customers-table');

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1]

    // Create row and cells
    let row = document.createElement('tr')
    let idCell = document.createElement('td')
    let nameCell = document.createElement('td')
    let emailCell = document.createElement('td')

    // Fill the cells
    idCell.innerText = newRow.id_customer
    nameCell.innerText = newRow.name
    emailCell.innerText = newRow.email

    // Add the cells to the row
    row.appendChild(idCell)
    row.appendChild(nameCell)
    row.appendChild(emailCell)
    
    // Add a row attribute so deleteRow can find the newly added row
    row.setAttribute('data-value', newRow.id_customer)

    // Add the row to the table
    currentTable.appendChild(row);

}