let deleteProductForm = document.getElementById('delete-product-form');
let idInput = document.getElementById('input-id-delete');
let nameProduct = document.getElementById('delete-name');
let priceProduct = document.getElementById('delete-price');
let stockProduct = document.getElementById('delete-stock');
let typeProduct = document.getElementById('delete-type');
let deleteProductConf = document.getElementById('confirmation-container')

deleteProductConf.addEventListener('submit', function(e) {
    e.preventDefault()

    delProductModalBg = document.getElementById('modal-container-products')
    let idInput = document.getElementById('input-id-delete')
    let idValue = idInput.value
    console.log(idValue)
    delProductModalBg.setAttribute('hidden', true)
    deleteProduct(idValue)

})


// Submit form
deleteProductForm.addEventListener('submit', function (e) {
    
    // Prevent form submission
    e.preventDefault();


    delProductModalBg = document.getElementById('modal-container-products')
    document.getElementById('header').scrollIntoView()
    delProductModalBg.removeAttribute("hidden")
    // Get values of form fields
    // let idValue = idInput.value;

    // Delete Product
    // deleteProduct(idValue);

});

// Reset form
deleteProductForm.addEventListener('reset', function (e) {

    // Clear input fields
    idInput.innerText = '';
    nameProduct.innerText = '';
    priceProduct.innerText = '';
    stockProduct.innerText = '';
    typeProduct.innerText = '';

});


function deleteProduct (productID) {

    // Package data into JS object
    let data = {
        id_product: productID
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-product', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    // Define resolution of AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data from the table
            deleteRow(productID);

            // Clear the input fields for another transaction
            
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('There was an error with the input.')
        }
    }

    idInput.value = '';
    nameProduct.innerText = '';
    priceProduct.innerText = '';
    stockProduct.innerText = '';
    typeProduct.innerText = '';
    // Send AJAX request
    xhttp.send(JSON.stringify(data));

}


// Delete row from Products table
function deleteRow (productID) {
    let productsTable = document.getElementById('products-table');
    
    // Iterate through rows
    for (let i = 0, row; row = productsTable.rows[i]; i++) {
        // Find row to be deleted
        if (productsTable.rows[i].getAttribute('data-value') == productID) {
            // Delete row
            productsTable.deleteRow(i);
            break;
        }
    }

}


// Populate form with selected product information
function populateForm() {

    // Retrieve form fields
    let deleteForm = document.getElementById('input-id-delete');
    let productID = deleteForm.value;
    let nameProduct = document.getElementById('delete-name');
    let priceProduct = document.getElementById('delete-price');
    let stockProduct = document.getElementById('delete-stock');
    let typeProduct = document.getElementById('delete-type');
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

    // Populate form
    nameProduct.innerText = specName;
    priceProduct.innerText = specPrice;
    stockProduct.innerText = specStock;
    typeProduct.innerText = specType;

}


function deleteModalCancel () {
    let modal = document.getElementById('modal-container-products')
    modal.setAttribute('hidden', true)
    
}

