$.ajax({
    type: 'GET',
    url: `http://localhost:3000/products/`,
    headers: {'Content-Type': 'application/json'},
    success: function (data) {
        let html = '';
        console.log('đã vào')
        let product = data[0]
        product.forEach(item => {
            html += `
                <div class="col-lg-3 col-sm-6">
                    <div class="popular-item">
                        <div class="top-content">
                            <div class="right">
                                <h4>${item.name}</h4>
                                <span><em>${item.price}</em>${item.nameCategory}</span>
                            </div>
                        </div>
                        <div class="imgSize">
                            <img src="${item.image}" alt="" class="imgFixSize">
                        </div>
                    </div>
                </div>`
        })
        $('#productImg').html(html);
    },
    error: function (err) {
        console.log("Bị lỗi khi đang hiển thị sản phẩm: ", err)
    }
})
function bodyAfLogin(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/`,
        headers: {
            'Content-Type':  'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let html = '';
            console.log('đã vào')
            let product = data[0]
            product.forEach(item => {
                html += `
                <div class="col-lg-3 col-sm-6">
                    <div class="popular-item">
                        <div class="top-content">
                            <div class="right">
                                <h4>${item.name}</h4>
                                <span><em>${item.price}</em>${item.nameCategory}</span>
                            </div>
                        </div>
                        <div class="imgSize">
                            <img src="${item.image}" alt="" class="imgFixSize">
                        </div>
                        <div class="border-button">
                          <a href="#" onclick="addToCart()">Thêm vào giỏ hàng</a>
                        </div>
                    </div>
                </div>`
            })
            $('#productImg').html(html);
        },
        error: function (err) {
            console.log("Bị lỗi khi đang hiển thị sản phẩm sau khi LogIn: ", err)
        }
    })
    $('#signInOut').html(`<a href="#signOut" onclick="signOut()">Sign Out</a>`)
}
function bodyAfLoginAdmin(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/`,
        headers: {
            'Content-Type':  'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let html = '';
            console.log('đã vào')
            let product = data[0]
            product.forEach(item => {
                html += `
                <div class="col-lg-3 col-sm-6">
                    <div class="popular-item">
                        <div class="top-content">
                            <div class="right">
                                <h4>${item.name}</h4>
                                <span><em>${item.price}</em>${item.nameCategory}</span>
                            </div>
                        </div>
                        <div class="imgSize">
                            <img src="${item.image}" alt="" class="imgFixSize">
                        </div>
                        <div class="border-button">
                          <a href="#uppdate" onclick="formEditProduct(${item.id})">Sửa</a>
                          <a href="#delete" onclick= "deleteProduct(${item.id})">Xóa</a>
                        </div>
                    </div>
                </div>`
            })
            $('#productImg').html(html);
        },
        error: function (err) {
            console.log("Bị lỗi khi đang hiển thị sản phẩm Admin: ", err)
        }
    })
    $('#plus').html(`<a href="#" onclick="formCreateProduct()" ><i class="fas fa-plus" style="font-size: 27px; color: #FE1175FF;margin-bottom: auto;margin-top: auto;padding-top: 23px;"></i></a>`)
    $('#signInOut').html(`<a href="#" onclick="signOut()">Sign Out</a>`)
}

function afSignOut(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/`,
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            let html = '';
            console.log('đã vào')
            let product = data[0]
            product.forEach(item => {
                html += `
                <div class="col-lg-3 col-sm-6">
                    <div class="popular-item">
                        <div class="top-content">
                            <div class="right">
                                <h4>${item.name}</h4>
                                <span><em>${item.price}</em>${item.nameCategory}</span>
                            </div>
                        </div>
                        <div class="imgSize">
                            <img src="${item.image}" alt="" class="imgFixSize">
                        </div>
                    </div>
                </div>`
            })
            $('#productImg').html(html);
        },
        error: function (err) {
            console.log("Bị lỗi khi đang hiển thị sản phẩm sau SignOut: ", err)
        }
    })
}

