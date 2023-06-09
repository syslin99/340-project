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
    let priceValue = 0;

    let productSaleData = [];
    // Get products
    productCards = document.getElementById('add-product-table-body')
    products = productCards.getElementsByTagName('tr');
    for (let i = 0, product; product = products[i]; i++) {
        // Get values of form fields
        specProduct = product.getElementsByTagName('td');
        specID = specProduct[0].getElementsByTagName('select')[0].value;
        specPrice = specProduct[1].innerText;
        specQuantity = specProduct[2].getElementsByTagName('input')[0].value;
        // Update total price of Sale
        productTotal = specPrice *specQuantity;
        priceValue += (productTotal);
        // Create Product_Sale entry
        let productSale = {
            id_product: specID,
            quantity: specQuantity
        }
        productSaleData.push(productSale);
    }
    
    console.log(dateValue)

    // Package data into JS object
    let saleData = {
        date: dateValue,
        total_price: priceValue,
        id_customer: customerValue,
        id_employee: employeeValue
    }
    let data = [saleData, productSaleData]

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-sale', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            response = JSON.parse(xhttp.response)
            sale = response[0]
            saleID = sale[sale.length - 1].id_sale;
            productsales = response[1]

            // Add new data to sales table
            addRowToSalesTable(sale);

            // Add new data to product sales table
            addRowsToProductSalesTable(productsales, saleID)

            // Clear input fields for another transaction
            dateInput.value = '';
            customerInput.value = '';
            employeeInput.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.')
        }
    }

    // Eliminate product fields from table
    var table_body = document.getElementById('add-product-table-body')
    var children_body = table_body.children

    for (var i = children_body.length - 1; i > 0; i--) {
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

    // Clear table entries
    let tableBody = document.getElementById('add-product-table-body')
    let children = tableBody.children
    for (var i = children.length - 1; i > 0; i--) {
        children[i].remove()
    }

    // Clear the initial product entry
    var prods = document.getElementById('product-name')
    var price = document.getElementById('product-price')
    var quantity = document.getElementById('product-quantity')

    prods.value = ''
    price.innerText = ''
    quantity.value = ''
});


// Create a row in the Sales Table
addRowToSalesTable = (data) => {

    // Retrieve Sales table
    let salesTable = document.getElementById('sales-table');
    // Retrieve new row data
    let newSaleRow = data[data.length - 1];

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

// Create rows in the Product Sales table
addRowsToProductSalesTable = (data, saleID) => {

    // Retrieve Product Sales table
    let productSalesTable = document.getElementById('product-sales-table');
    // Retrieve new row data
    let newProductSaleRows = data.filter((productsale) => productsale.id_sale == saleID);

    // Iterate through each Product Sale
    for (let i = 0, productsale; productsale = newProductSaleRows[i]; i++) {

        // Create a row and cells
        let productsaleRow = document.createElement('tr');
        let idCell = document.createElement('td');
        let saleCell = document.createElement('td');
        let productCell = document.createElement('td');
        let quantityCell = document.createElement('td');
        // Fill cells with new row data
        idCell.innerText = productsale.id_product_sale;
        saleCell.innerText = productsale.id_sale;
        productCell.innerText = productsale.name;
        quantityCell.innerText = productsale.quantity;

        // Add cells to the row
        productsaleRow.appendChild(idCell);
        productsaleRow.appendChild(saleCell);
        productsaleRow.appendChild(productCell);
        productsaleRow.appendChild(quantityCell);

        // Add row to the table
        productSalesTable.appendChild(productsaleRow);

    }


}


function addProductButton (tableID) {

    var table = document.getElementById(tableID)
    var row = document.getElementById('sample-row')
    var cloneRow = row.cloneNode(true)
    rowEntries = cloneRow.children

    clonedSelect = rowEntries[0].children[0]
    clonedTd = rowEntries[1]
    clonedInput = rowEntries[2].children[0]

    clonedSelect.value = ''
    clonedTd.innerText  = ''
    clonedInput.value = ''

    table.appendChild(cloneRow)
    
}


function updateUpProductCard(selection, products) {

    let productID = selection.value;
    let specPrice;

    for (let i = 0, entry; entry = products[i]; i++) {
        if (entry.id_product == productID) {
            specPrice = entry.price
        }
    }

    productRow = selection.parentElement.parentElement;
    priceCell = productRow.getElementsByTagName('td')[1];
    priceCell.innerText = specPrice;

}

function populateSalesForm() {
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

    for (let i = 0, row; row = salesTable.rows[i]; i++) {
        if (salesTable.rows[i].getAttribute('data-value') == idValue) {
            let specRow = salesTable.getElementsByTagName('tr')[i]
            specDate = specRow.getElementsByTagName('td')[1].textContent
            specCust = specRow.getElementsByTagName('td')[3].textContent
            specEmp = specRow.getElementsByTagName('td')[4].textContent
        }
    }

    // for (let i = 0, row; row = prodSalesTable.rows[i]; i++) {
    //     specRow = prodSalesTable.getElementsByTagName('tr')[i]
    //     rowEntries = specRow.getElementsByTagName('td')
    //     // Continue search for sale id...

    // }

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