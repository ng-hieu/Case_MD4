function formCreateProduct() {
    let html = `<input type="text" id="name" placeholder="name">
                    <input type="text" id="price" placeholder="price">
                    <input type="text" id="categoryId" placeholder="categoryId">
                    <input type="file" id="fileButton" onchange="uploadImage(event)">
                    <button onclick="createNewProduct()">Add New Product</button>`
    $('#productImg').html(html);
}

function createNewProduct() {
    let id = $('#id').val();
    let name = $("#name").val()
    let price = $("#price").val()
    let categoryId = $("#categoryId").val()
    let image = $("#fileButton").val()
    let product = {
        id: id,
        name: name,
        price: price,
        image: image,
        categoryId: categoryId
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/products`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(product),
        success: (messenger) =>{
            console.log(messenger)
            bodyAfLoginAdmin();
        }
    })
}

function formEditProduct(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/products/${id}`,
        Headers: {
            'Content-Type': 'application/json'
        },
        success: (product) => {
            let html = `
            <input type="text" id="name" placeholder="name" value=${product.name}>
            <input type="text" id="price" placeholder="price" value=${product.price}>
            <input type="text" id="quantity" placeholder="quantity" value=${product.quantity}>
            <input type="text" id="img" placeholder="img" value=${product.img}>
            <input type="text" id="category" placeholder="category" value=${product.category.id}>
            <button onclick="update(${product.id})">update</button>`
            $('#productImg').html(html);
        }
    })
}

function update(id) {
    let name = $('#name').val()
    let price = $('#price').val()
    let quantity = $('#quantity').val()
    let img = $('#img').val()
    let category = $('#category').val()

    let product = {
        name: name,
        price: price,
        quantity: quantity,
        image: img,
        category: category
    }
    $.ajax({
        type: "put",
        url: `http://localhost:3000/products/${id}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(product),
        success: (message) => {
            getList()
        }
    })
}

function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (messenger) => {
            console.log('xóa thành công', messenger)
        },
        error: function (err) {
            console.log("Bị lỗi khi đang xóa sản phẩm: ", err)
        }
    })
}