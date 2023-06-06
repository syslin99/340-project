let deleteCustomerForm = document.getElementById('delete-customer-form')
let idInput = document.getElementById('input-id-delete')
let nameCustomer = document.getElementById('delete-name')
let emailCustomer = document.getElementById('delete-email')
let deleteCustomerConf = document.getElementById('confirmation-container')

deleteCustomerConf.addEventListener('submit', function (e) {
    e.preventDefault()

    delCustomerModalBg = document.getElementById('modal-container-customers')

    let idInput = document.getElementById('input-id-delete')
    let idValue = idInput.value
    delCustomerModalBg.setAttribute("hidden", true)
    deleteCustomer(idValue)
})

deleteCustomerForm.addEventListener('submit', function(e) {
    e.preventDefault()


    delCustomerModalBg = document.getElementById('modal-container-customers')
    delCustomerModalBg.removeAttribute('hidden')
    // console.log(idInput.value)
    // let idValue = idInput.value

    // deleteCustomer(idValue)
})


function deleteCustomer (customerID) {
    
    // Package data into JS object
    let data = {
        id_customer: customerID
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-customer', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data from the table
            deleteRow(customerID);

            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    
    idInput.value = ""
    nameCustomer.innerText = ""
    emailCustomer.innerText = ""
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

}


// Delete row from Customers table
function deleteRow (customerID) {
    let currentTable = document.getElementById('customers-table');
    // Iterate through rows
    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        // Find row to be deleted
        if (currentTable.rows[i].getAttribute('data-value') == customerID) {
            currentTable.deleteRow(i);
            break;
        }
    }
}

deleteCustomerForm.addEventListener('reset', function(e) {
    idInput.innerText = ""
    nameCustomer.innerText = ""
    emailCustomer.innerText = ""
})


function updateForm () {
    let deleteForm = document.getElementById('input-id-delete')
    let customerID = deleteForm.value
    let updatedName = document.getElementById('delete-name')
    let updatedEmail = document.getElementById('delete-email')
    let currentTable = document.getElementById('customers-table')
    let specName = ""
    let specEmail = ""

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == customerID) {
            let specRow = currentTable.getElementsByTagName('tr')[i]
            specName = specRow.getElementsByTagName('td')[1].textContent
            specEmail = specRow.getElementsByTagName('td')[2].textContent
        }
    }

    updatedName.innerText = specName
    updatedEmail.innerText = specEmail
}

function deleteModalCancel () {
    let modal = document.getElementById('modal-container-customers')
    modal.setAttribute('hidden', true)

}


