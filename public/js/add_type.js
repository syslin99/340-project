let addTypeForm = document.getElementById('add-type-form');

addTypeForm.addEventListener('submit', function (e) {

    // Prevent form submission
    e.preventDefault();

    // Get form fields
    let descriptionInput = document.getElementById('input-description');
    // Get values from form fields
    let descriptionValue = descriptionInput.value; 

    // Package data into JS object
    let data = {
        description: descriptionValue
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-type', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            descriptionInput.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});


// Create new row in Types table
addRowToTable = (data) => {
    let currentTable = document.getElementById('types-table');
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create row and cells
    let row = document.createElement('tr');
    let idCell = document.createElement('td');
    let descriptionCell = document.createElement('td');
    let deleteCell = document.createElement('td');

    // Fill the cells
    idCell.innerText = newRow.id_type;
    descriptionCell.innerText = newRow.description;
    deleteCell = document.createElement('button');
    deleteCell.innerHTML = 'Delete';
    deleteCell.onclick = function() {
        deletePerson(newRow.id_type);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    // Add a row attribute so deleteRow can find the newly added row
    row.setAttribute('data-value', newRow.id_type);

    // Add the row to the table
    currentTable.appendChild(row);

}
