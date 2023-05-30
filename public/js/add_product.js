let addProductForm = document.getElementById('add-product-form');

// Submit Form
addProductForm.addEventListener('submit', function (e) {

    // Prevent form submission
    e.preventDefault();
    
    // Get form fields
    let nameInput = document.getElementById('input-name');
    let priceInput = document.getElementById('input-price');
    let stockInput = document.getElementById('input-stock');
    let typeInput = document.getElementById('input-type');
    // Get values of form fields
    let nameValue = nameInput.value;
    let priceValue = priceInput.value;
    let stockValue = stockInput.value;
    let typeValue = typeInput.value;

    // Package data into JS object
    let data = {
        name: nameValue,
        price: priceValue,
        stock: stockValue,
        id_type: typeValue
    }

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-product', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to table
            addRowToTable(xhttp.response);

            // Clear input fields for another transaction
            nameInput.value = '';
            priceInput.value = '';
            stockInput.value = '';
            typeInput.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.')
        }
    }
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

});

// Reset Form
addProductForm.addEventListener('reset', function (e) {

    // Get form fields
    let nameInput = document.getElementById('input-name');
    let priceInput = document.getElementById('input-price');
    let stockInput = document.getElementById('input-stock');
    let typeInput = document.getElementById('input-type');

    // Clear input fields
    nameInput.value = '';
    priceInput.value = '';
    stockInput.value = '';
    typeInput.value = '';

});


// Create a new row in the Products Table
addRowToTable = (data) => {

    // Retrieve Products table
    let productsTable = document.getElementById('products-table');
    // Retrieve new row data
    let parsedData = JSON.parse(data);
    let newProductRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let productRow = document.createElement('tr');
    let idCell = document.createElement('td');
    let nameCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let stockCell = document.createElement('td');
    let typeCell = document.createElement('td');
    // Fill cells with new row data
    idCell.innerText = newProductRow.id_product;
    nameCell.innerText = newProductRow.name;
    priceCell.innerText = newProductRow.price;
    stockCell.innerText = newProductRow.stock;
    typeCell.innerText = newProductRow.type;

    // Add cells to the row
    productRow.appendChild(idCell);
    productRow.appendChild(nameCell);
    productRow.appendChild(priceCell);
    productRow.appendChild(stockCell);
    productRow.appendChild(typeCell);

    // Add a row attribute so deleteRow can find the newly added row
    productRow.setAttribute('data-value', newProductRow.id_product)

    // Add row to the table
    productsTable.appendChild(productRow);

}
