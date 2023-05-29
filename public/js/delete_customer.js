let deleteCustomerForm = document.getElementById('delete-customer-form')
let idInput = document.getElementById('input-id-delete')
// let nameCustomer = document.getElementById('input-name-delete')
// let emailCustomer = document.getElementById('input-email-delete')

deleteCustomerForm.addEventListener('submit', function(e) {
    e.preventDefault()

    console.log(idInput.value)
    let idValue = idInput.value

    deleteCustomer(idValue)
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
    // descInput.innerText = ""

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
})

// Not being used YET.

// function updateForm () {
//     let deleteForm = document.getElementById('input-id-delete')
//     let customerID = deleteForm.value
//     let updatedField = document.getElementById('delete-name')
//     let currentTable = document.getElementById('types-table')
//     let specVal = ""

//     for (let i = 0, row; row = currentTable.rows[i]; i++) {
//         if (currentTable.rows[i].getAttribute('data-value') == customerID) {
//             let specRow = currentTable.getElementsByTagName('tr')[i]
//             specVal = specRow.getElementsByTagName('td')[1].textContent
//         }
//     }

//     updatedField.innerText = specVal
// }