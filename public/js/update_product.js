let updateProductForm = document.getElementById('update-product-form');


// Submit Form
updateProductForm.addEventListener('submit', function (e) {
    
    // Prevent form submission
    e.preventDefault();

    // Get form fields
    let idInput = document.getElementById('input-id-update');
    let nameInput = document.getElementById('input-name-update');
    let priceInput = document.getElementById('input-price-update');
    let stockInput = document.getElementById('input-stock-update');
    let typeInput = document.getElementById('input-type-update');
    // Get values of form fields
    let idValue = idInput.value;
    let nameValue = nameInput.value;
    let priceValue = priceInput.value;
    let stockValue = stockInput.value;
    let typeValue = typeInput.value;

    // Package data into JS object
    let data = {
        id_product: idValue,
        name: nameValue,
        price: priceValue,
        stock: stockValue,
        id_type: typeValue
    }

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-product', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the data in the table
            updateRow(xhttp.response, idValue);

            // Clear the input fields for another transaction
            idInput.value = '';
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

// Reset form
updateProductForm.addEventListener('reset', function (e) {

    // Get form fields
    let idInput = document.getElementById('input-id-update');
    let nameInput = document.getElementById('input-name-update');
    let priceInput = document.getElementById('input-price-update');
    let stockInput = document.getElementById('input-stock-update');
    let typeInput = document.getElementById('input-type-update');

    // Clear input fields
    idInput.value = '';
    nameInput.value = '';
    priceInput.value = '';
    stockInput.value = '';
    typeInput.value = '';

});


function updateRow(data, productID) {
    
    // Retrieve Products table
    let productsTable = document.getElementById('products-table');
    // Retrieve updated row data
    let parsedData = JSON.parse(data);

    // Iterate thorugh rows
    for (let i = 0, row; row = productsTable.rows[i]; i++) {
        // Find row to be updated
        if (productsTable.rows[i].getAttribute('data-value') == productID) {
            // Retrieve row and cells
            let updateRowIndex = productsTable.getElementsByTagName('tr')[i];
            let nameTD = updateRowIndex.getElementsByTagName('td')[1];
            let priceTD = updateRowIndex.getElementsByTagName('td')[2];
            let stockTD = updateRowIndex.getElementsByTagName('td')[3];
            let typeTD = updateRowIndex.getElementsByTagName('td')[4];
            // Update row
            nameTD.innerHTML = parsedData[0].name;
            priceTD.innerHTML = parsedData[0].price;
            stockTD.innerHTML = parsedData[0].stock;
            typeTD.innerHTML = parsedData[0].type;
        }
    }

}

// Populate form with selected product information
function populateUpGroupForm() {

    // Retrieve form fields
    let deleteForm = document.getElementById('input-id-update');
    let productID = deleteForm.value;
    let nameProduct = document.getElementById('input-name-update');
    let priceProduct = document.getElementById('input-price-update');
    let stockProduct = document.getElementById('input-stock-update');
    let typeProduct = document.getElementById('input-type-update');

    // Retrieve specified product information
    let productsTable = document.getElementById('products-table');
    let specName = '';
    let specPrice = '';
    let specStock = '';
    let specType = '';

    // Iterate through rows
    for (let i = 0, row; row = productsTable.rows[i]; i++) {
        // Find row of specified product
        if (productsTable.rows[i].getAttribute('data-value') == productID) {
            let specRow = productsTable.getElementsByTagName('tr')[i];
            specName = specRow.getElementsByTagName('td')[1].textContent
            specPrice = specRow.getElementsByTagName('td')[2].textContent
            specStock = specRow.getElementsByTagName('td')[3].textContent
            specType = specRow.getElementsByTagName('td')[4].textContent
        }
    }

    
    // Populate type dropdown
    let count = 0
    for (var option of typeProduct.options) {
        console.log(option)
        if (specType == option.innerHTML) {
            typeProduct.options[count].selected =  true;
            break;
        }  else {
            typeProduct.options[0].selected = true;
        }
        count += 1
    }

    // Populate form
    nameProduct.value = specName;
    priceProduct.value = specPrice;
    stockProduct.value = specStock;

}


