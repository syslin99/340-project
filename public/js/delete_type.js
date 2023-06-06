let deleteTypeForm = document.getElementById('delete-type-form');
let delTypeModal = document.getElementById('confirmation-container')
let idInput = document.getElementById('input-id-delete')
let descInput = document.getElementById('delete-name')
let deleteTypeConf = document.getElementById('confirmation-container')

deleteTypeConf.addEventListener('submit', function (e) {
    e.preventDefault()

    delTypeModalBg = document.getElementById('modal-container-types')

    let idInput = document.getElementById('input-id-delete')
    let idValue = idInput.value;
    delTypeModalBg.setAttribute("hidden", true)
    deleteType(idValue)

})

// On press of 'Delete' button, delete entry
deleteTypeForm.addEventListener('submit', function(e) {
    e.preventDefault()

    console.log("no more hidden?")
    delTypeModalBg = document.getElementById('modal-container-types')
    // delTypeModalBg.setAttribute("hidden")
    delTypeModalBg.removeAttribute("hidden");

});


function deleteType (typeID) {
    
    // Package data into JS object
    let data = {
        id_type: typeID
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-type', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data from the table
            deleteRow(typeID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    idInput.value = ""
    descInput.innerText = ""

    // Send AJAX request
    xhttp.send(JSON.stringify(data));

}


// Delete row from Types table
function deleteRow (typeID) {
    let currentTable = document.getElementById('types-table');
    // Iterate through rows
    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        // Find row to be deleted
        if (currentTable.rows[i].getAttribute('data-value') == typeID) {
            currentTable.deleteRow(i);
            break;
        }
    }
}

deleteTypeForm.addEventListener('reset', function(e) {
    descInput.innerText = ""
    idInput.innerText = ""
})


function updateForm () {
    let deleteForm = document.getElementById('input-id-delete')
    let typeID = deleteForm.value
    let updatedField = document.getElementById('delete-name')
    let currentTable = document.getElementById('types-table')
    let specVal = ""
    
    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == typeID) {
            let specRow = currentTable.getElementsByTagName('tr')[i]
            specVal = specRow.getElementsByTagName('td')[1].textContent
        }
    }
    
    updatedField.innerText = specVal
}

function deleteModalCancel () {
    let modal = document.getElementById('modal-container-types')
    console.log("We're out")
    modal.setAttribute("hidden", true)


}

