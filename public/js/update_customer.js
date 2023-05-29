let updateCustomerForm = document.getElementById('update-customer-form');

updateCustomerForm.addEventListener('submit', function (e) {
    
    // Prevent form submission
    e.preventDefault()

    // Get form fields
    let idInput = document.getElementById('input-id-update')
    let nameInput = document.getElementById('input-name-update')
    let emailInput = document.getElementById('input-email-update')
    // Get values from form fields
    let idValue = idInput.value
    let nameValue = nameInput.value
    let emailValue = emailInput.value
        
    
    // Package data into JS object
    let data = {
        id_customer: idValue,
        name: nameValue,
        email: emailValue
    }
    
    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-customer', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the data in the table
            updateRow(xhttp.response, idValue);

            // Clear fields
            idInput.value = ''
            nameInput.value = ''
            emailInput.value = ''

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});

updateCustomerForm.addEventListener('reset', function(e) {
    let idInput = document.getElementById('input-id-update');
    let nameInput = document.getElementById('input-name-update')
    let emailInput = document.getElementById('input-email-update')

    idInput.innerText = ""
    nameInput.innerText = ""
    emailInput.innerText = ""
})

// Update row in Types table
function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);
    let currentTable = document.getElementById('customers-table');

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == customerID) {
            let updateRowIndex = currentTable.getElementsByTagName('tr')[i]
            let tdName = updateRowIndex.getElementsByTagName('td')[1]
            let tdEmail = updateRowIndex.getElementsByTagName('td')[2]

            tdName.innerHTML = parsedData[0].name
            tdEmail.innerHTML = parsedData[0].email
        }
    }
}
