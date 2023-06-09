let updateSaleForm = document.getElementById('update-sale-form');


// Submit form
updateSaleForm.addEventListener('submit', function(e) {

    // Prevent form submission
    e.preventDefault();

    // Get form fields
    let idInput = document.getElementById('input-id-update');
    let dateInput = document.getElementById('input-date-update');
    let customerInput = document.getElementById('input-customer-update');
    let employeeInput = document.getElementById('input-employee-update');
    // Get values of form fields
    let idValue = idInput.value;
    let dateValue = dateInput.value;
    let customerValue = customerInput.value;
    let employeeValue = employeeInput.value;
    // TODO: CALCULATE TOTAL PRICE FROM PRODUCTS, set to 3.45 temporarily
    let priceValue = 3.45;

    // Package data into JS object
    let data = {
        id_sale: idValue,
        date: dateValue,
        total_price: priceValue,
        id_customer: customerValue,
        id_employee: employeeValue
    }

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-sale', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the data in the table
            updateRow(xhttp.response, idValue)

            // Clear the input fields for another transaction
            idInput.value = '';
            dateInput.value = '';
            customerInput.value = '';
            employeeInput.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.')
        }
    }

    // Eliminate product fields from table
    var table_body = document.getElementById('update-product-table-body')
    var children_body = table_body.children

    for (var i = children_body.length - 1; i >= 0; i--) {
        children_body[i].remove()
    }

    var prods = document.getElementById('product-name')
    var price = document.getElementById('product-price')
    var quantity = document.getElementById('product-quantity')

    prods.value = ''
    price.innerText = ''
    quantity.value = ''
    


    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});

// Reset form
updateSaleForm.addEventListener('reset', function(e) {

    // Get form fields
    let idInput = document.getElementById('input-id-update');
    let dateInput = document.getElementById('input-date-update');
    let customerInput = document.getElementById('input-customer-update');
    let employeeInput = document.getElementById('input-employee-update');

    // Clear input fields
    idInput.value = '';
    dateInput.value = '';
    customerInput.value = '';
    employeeInput.value = '';

    // Clear table entries
    let tableBody = document.getElementById('update-product-table-body')
    let children = tableBody.children
    for (var i = children.length - 1; i >= 0; i--) {
        children[i].remove()
    }    

});


// Update the row in the Sales table
function updateRow(data, saleID) {

    // Retrieve Sales table
    let salesTable = document.getElementById('sales-table');
    // Retrieve updated row data
    let parsedData = JSON.parse(data);

    // Iterate through rows
    for (let i = 0, row; row = salesTable.rows[i]; i++) {
        // Find row to be updated
        if (salesTable.rows[i].getAttribute('data-value') == saleID) {
            // Retrieve row and cells
            let updateRowIndex = salesTable.getElementsByTagName('tr')[i];
            let dateTD = updateRowIndex.getElementsByTagName('td')[1];
            let priceTD = updateRowIndex.getElementsByTagName('td')[2];
            let customerTD = updateRowIndex.getElementsByTagName('td')[3];
            let employeeTD = updateRowIndex.getElementsByTagName('td')[4];
            // Update row
            dateTD.innerHTML = parsedData[0].date;
            priceTD.innerHTML = parsedData[0].total_price;
            customerTD.innerHTML = parsedData[0].customer;
            employeeTD.innerHTML = parsedData[0].employee;
        }
    }

}


function populateSalesForm(products) {
    var inputID = document.getElementById('input-id-update')
    var idValue = inputID.value
    var inputDate = document.getElementById('input-date-update')
    var inputCust = document.getElementById('input-customer-update')
    var inputEmp = document.getElementById('input-employee-update')

    var salesTable = document.getElementById('sales-table')
    var prodSalesTable = document.getElementById('product-sales-table')
    var specDate = ''
    var specCust = ''
    var specEmp = ''

    // Get the relevant data
    for (let i = 0, row; row = salesTable.rows[i]; i++) {
        if (salesTable.rows[i].getAttribute('data-value') == idValue) {
            let specRow = salesTable.getElementsByTagName('tr')[i]
            specDate = specRow.getElementsByTagName('td')[1].textContent
            specCust = specRow.getElementsByTagName('td')[3].textContent
            specEmp = specRow.getElementsByTagName('td')[4].textContent
        }
    }

    // Clear table entries in preparation for new entries
    let tableBody = document.getElementById('update-product-table-body')
    let children = tableBody.children
    for (var i = children.length - 1; i >= 0; i--) {
        children[i].remove()
    }
    

    var numProducts = 0
    for (let i = 0, row; row = prodSalesTable.rows[i]; i++) {
        specRow = prodSalesTable.getElementsByTagName('tr')[i]
        rowEntries = specRow.children
        
        console.log(rowEntries.length)

        // Continue search for sale id...
        if (rowEntries[1].textContent == idValue) {
            var prodName = rowEntries[2].textContent
            var prodQuant = rowEntries[3].textContent
            
            // Add a table entry to the products table
            addProductButton('update-product-table-body')
            
            // Populate the fields of the table
            populateFields(numProducts, prodName, prodQuant, products)
            numProducts += 1
        }

    }

    // Populate the customer dropdown
    let count = 0
    for (var option of inputCust.options) {
        if (specCust == option.innerHTML) {
            inputCust.options[count].selected = true
            break
        } else {
            inputCust.options[0].selected = true
        }
        count += 1
    }

    // Populate the employee dropdown
    count = 0
    for (var option of inputEmp.options) {
        if (specEmp == option.innerHTML) {
            inputEmp.options[count].selected = true
            break
        } else {
            inputEmp.options[0].selected = true
        }
        count += 1
    }

    // Populate the inputs
    inputDate.value = specDate
}


// Fills out the fields within each row
function populateFields(rowIndex, name, quant, products) {

    let tableBody = document.getElementById('update-product-table-body')
    let tableRows = tableBody.children
    let tableTds = tableRows[rowIndex].children
    let prodSelect = tableTds[0].children[0]
    let prodQuant = tableTds[2].children[0]

    let count = 0
    for (var option of prodSelect.options) {
        if (name == option.innerHTML) {
            prodSelect.options[count].selected = true
            break
        } else {
            prodSelect.options[0].selected = true
        }
        count += 1
    }

    prodQuant.value = quant

    // Use existing function to update the price field
    updateUpProductCard(prodSelect, products)


}