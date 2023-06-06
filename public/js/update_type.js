let updateTypeForm = document.getElementById('update-type-form');

updateTypeForm.addEventListener('submit', function (e) {
    
    // Prevent form submission
    e.preventDefault();

    // Get form fields
    let idInput = document.getElementById('input-id-update');
    let descriptionInput = document.getElementById('input-description-update');
    // Get values from form fields
    let idValue = idInput.value;
    let descriptionValue = descriptionInput.value;

    // Package data into JS object
    let data = {
        id_type: idValue,
        description: descriptionValue
    }

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-type', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the data in the table
            updateRow(xhttp.response, idValue);

            // Clear fields
            idInput.value = '';
            descriptionInput.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});

updateTypeForm.addEventListener('reset', function(e) {
    let idInput = document.getElementById('input-id-update');
    let descriptionInput = document.getElementById('input-description-update')

    idInput.innerText = ""
    descriptionInput.innerText = ""

})

// Update row in Types table
function updateRow(data, typeID) {
    let parsedData = JSON.parse(data);
    let currentTable = document.getElementById('types-table');

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == typeID) {
            let updateRowIndex = currentTable.getElementsByTagName('tr')[i];
            let td = updateRowIndex.getElementsByTagName('td')[1];
            td.innerHTML = parsedData[0].description;
        }
    }
}


function updateUpGroupForm () {
    let deleteForm = document.getElementById('input-id-update')
    let typeID = deleteForm.value
    let updatedField = document.getElementById('input-description-update')
    let currentTable = document.getElementById('types-table')
    let specVal = ""

    for (let i = 0, row; row = currentTable.rows[i]; i++) {
        if (currentTable.rows[i].getAttribute('data-value') == typeID) {
            let specRow = currentTable.getElementsByTagName('tr')[i]
            specVal = specRow.getElementsByTagName('td')[1].textContent
        }
    }

    updatedField.value = specVal
}
