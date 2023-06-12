let addSaleForm = document.getElementById('add-sale-form');
var AddedProducts = []
var UpdatedProducts = []

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
        productTotal = specPrice * specQuantity;
        priceValue += (productTotal);
        // Create Product_Sale entry
        let productSale = {
            id_product: specID,
            quantity: specQuantity
        }
        productSaleData.push(productSale);
    }
    
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

    // Reset disabled options
    AddedProducts.length = 0
    resetSelOptions('add-product-table-body')

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
    
    // Find the first select component
    let select = children[0].children[0].children[0]
    
    for (var i = children.length - 1; i > 0; i--) {
        children[i].remove()
    }

    // Clear the initial product entry
    var prods = document.getElementById('product-name')
    var price = document.getElementById('product-price')
    var quantity = document.getElementById('product-quantity')

    // Reset disabled options
    AddedProducts.length = 0
    resetSelOptions('add-product-table-body')

    prods.value = ''
    price.innerText = ''
    quantity.value = ''
});


function resetSelOptions (tableID) {
    // Find the table and its child rows
    let tableBody = document.getElementById(tableID)
    let children = tableBody.children
    // Find the first select component
    let select = children[0].children[0].children[0]

    // Remove all disabled attributes
    for (var option of select.options) {
        option.removeAttribute('disabled')
    }
}

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

        // Add a row attribute so updateRow can find the newly added row
        productsaleRow.setAttribute('data-value', productsale.id_product_sale);

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

    for (var option of clonedSelect.options) {
        option.removeAttribute('disabled')
    }

    clonedSelect.value = ''
    clonedTd.innerText  = ''
    clonedInput.value = ''

    table.appendChild(cloneRow)

    updateSelOptions(clonedSelect)
    
}

// Update the select options' disabled state
function updateSelOptions(select) {

    // Get the table of entries
    var table_body = select.parentElement.parentElement.parentElement

    // Loop through the table to retrieve the products in use -> store in array
    var counter = 0
    for (var row of table_body.children) {
        let td = row.children[0]
        let idxSelect = td.children[0]

        // Separate by table ids
        if (table_body.getAttribute('id') == 'add-product-table-body') {
            AddedProducts[counter] = idxSelect.options[idxSelect.selectedIndex].text
            AddedProducts.length = counter + 1
        } else {
            UpdatedProducts[counter] = idxSelect.options[idxSelect.selectedIndex].text
            UpdatedProducts.length = counter + 1

        }
        counter += 1 
    }

    console.log("Added Products: ", AddedProducts)
    console.log("Updated Products: ", UpdatedProducts)



    // For each select, remove the options that have already been selected
    for (var rows of table_body.children) {
        let td = rows.children[0]
        let idxSelect = td.children[0]
        // let idxValue = idxSelect.options[idxSelect.selectedIndex].text
        let options = idxSelect.options

        // Evaluate all possible products
        for (var option of options) {
            var usedFlag = false

            // Compare the options to those that are being used
            if (table_body.getAttribute('id') == 'add-product-table-body') {
                usedFlag = disableOptions(option, AddedProducts)
            } else {
                usedFlag = disableOptions(option, UpdatedProducts)
            }

            // If the option is not being used remove the disabled tag
            if (!usedFlag || option.text == "Select a Product") {
                option.removeAttribute('disabled')
            }
        }
    }

}

function disableOptions(option, array) {
    for (var usedProd of array) {

        // If the any of the used values match, disable the option
        if (option.text == usedProd) {
            option.setAttribute('disabled', true)
            return true
        }
    }

    // The option was not found in the used array
    return false
}


function updateUpProductCard(selection, products) {

    let productID = selection.value;
    let specPrice;

    for (let i = 0, entry; entry = products[i]; i++) {
        if (entry.id_product == productID) {
            specPrice = entry.price
        }
    }

    if (selection.options[selection.selectedIndex].text == "Select a Product") {
        specPrice = ''
    }

    productRow = selection.parentElement.parentElement;
    priceCell = productRow.getElementsByTagName('td')[1];
    priceCell.innerText = specPrice;

}
