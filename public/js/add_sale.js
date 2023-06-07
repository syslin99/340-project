let addSaleForm = document.getElementById('add-sale-form');


// Submit Form
addSaleForm.addEventListener('submit', function(e) {

    // Prevent form submission
    e.preventDefault();

    // Get form fields
    let dateInput = document.getElementById('input-date');
    let customerInput = document.getElementById('input-customer');
    let employeeInput = document.getElementById('input-employee');
    // Get values of form fields
    let dateValue = dateInput.value;
    let customerValue = customerInput.value;
    let employeeValue = employeeInput.value;
    // TODO: CALCULATE TOTAL PRICE FROM PRODUCTS, set to 1.23 temporarily
    let priceValue = 1.23;
    
    // Package data into JS object
    let data = {
        date: dateValue,
        total_price: priceValue,
        id_customer: customerValue,
        id_employee: employeeValue
    }

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-sale', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to table
            addRowToTable(xhttp.response);

            // Clear input fields for another transaction
            dateInput.value = '';
            customerInput.value = '';
            employeeInput.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.')
        }
    }
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});

// Reset Form
addSaleForm.addEventListener('reset', function(e) {

    // Get form fields
    let dateInput = document.getElementById('input-date');
    let customerInput = document.getElementById('input-customer');
    let employeeInput = document.getElementById('input-employee');

    // Clear input fields
    dateInput.value = '';
    customerInput.value = '';
    employeeInput.value = '';

});


// Create a row in the Sale Table
addRowToTable = (data) => {

    // Retrieve Sales table
    let salesTable = document.getElementById('sales-table');
    // Retrieve new row data
    let parsedData = JSON.parse(data);
    let newSaleRow = parsedData[parsedData.length - 1];

    // Create a row and cells
    let saleRow = document.createElement('tr');
    let idCell = document.createElement('td');
    let dateCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let customerCell = document.createElement('td');
    let employeeCell = document.createElement('td');
    // Fill cells with new row data
    idCell.innerText = newSaleRow.id_sale;
    dateCell.innerText = newSaleRow.date;
    priceCell.innerText = newSaleRow.total_price;
    customerCell.innerText = newSaleRow.customer;
    employeeCell.innerText = newSaleRow.employee;

    // Add cells to the row
    saleRow.appendChild(idCell);
    saleRow.appendChild(dateCell);
    saleRow.appendChild(priceCell);
    saleRow.appendChild(customerCell);
    saleRow.appendChild(employeeCell);

    // Add a row attribute so updateRow can find the newly added row
    saleRow.setAttribute('data-value', newSaleRow.id_sale)

    // Add row to the table
    salesTable.appendChild(saleRow);

}

function addProductButton (tableID) {

    var table = document.getElementById(tableID)
    var row = document.getElementById('sample-row')
    var cloneRow = row.cloneNode(true)
    cloneRow.removeAttribute('hidden')
    table.appendChild(cloneRow)
    
}
