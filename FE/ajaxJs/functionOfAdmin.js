function formCreateProduct() {
    let html = `<input type="text" id="name" placeholder="name">
                    <input type="text" id="price" placeholder="price">
                    <input type="text" id="categoryId" placeholder="categoryId">
                    <input type="hidden" name="image" id='image'>
                    <input type="file" id="fileButton" onchange="uploadImage(event)">
                    <button onclick="createNewProduct()">Add New Product</button>`
    $('#productImg').html(html);
}

function createNewProduct() {
    let id = $('#id').val();
    let name = $("#name").val()
    let price = $("#price").val()
    let categoryId = $("#categoryId").val()
    let image = $("#image").val()
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
    // alert(id);
    // alert(`http://localhost:3000/products/${id}`)
    // alert(localStorage.getItem('token'))
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let product = data.data
            let html = `
            <input type="text" id="name" placeholder="name" value=${product.name}>
            <input type="text" id="price" placeholder="price" value=${product.price}>
            <input type="text" id="img" placeholder="img" value=${product.image}>
            <input type="file" id="fileButton" onchange="uploadImage(event)">
            <input type="text" id="category" placeholder="category" value=${product.categoryId.idCategory}>
            <button onclick="update(${product.id})">update</button>`
            $('#productImg').html(html);
            scroll(300,1000)
        },
        error: function (err) {
            console.log("Bị lỗi khi đang sửa sản phẩm: ", err)
        }
    })
}

function update(id) {
    let name = $('#name').val()
    let price = $('#price').val()
    let image = $('#img').val()
    let categoryId = $('#category').val()

    let product = {
        name: name,
        price: price,
        image: image,
        categoryId: categoryId
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(product),
        success: (message) => {
            alert('sửa thành công', message)
            bodyAfLoginAdmin()
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
            alert('xóa thành công', messenger)
            bodyAfLoginAdmin()
        },
        error: function (err) {
            alert("Bị lỗi khi đang xóa sản phẩm: ", err)
        }
    })
}