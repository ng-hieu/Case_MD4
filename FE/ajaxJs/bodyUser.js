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
                          <a href="#" onclick="addToCart(${item.id})">Thêm vào giỏ hàng</a>
                        </div>
                    </div>
                </div>`
            })
            $('#productImg').html(html);
            let token = localStorage.getItem('token')
            let idUser =  parseInt(parseJwt(token).idUser);
            $('#plus').html(`<a href="#" onclick="getCartByIdUser(${idUser})"><i class="fas fa-shopping-cart" style="font-size: 27px; color: #FE1175FF;margin-bottom: auto;margin-top: auto;padding-top: 23px;"></i></a>`);
            
        },
        error: function (err) {
            console.log("Bị lỗi khi đang hiển thị sản phẩm sau khi LogIn: ", err)
        }
    })
    $('#signInOut').html(`<a href="#signOut" onclick="signOut()">Sign Out</a>`)
}

function getCartByIdUser(idUser){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/auth/cart/getcart/${idUser}`,
        headers: {
            'Content-Type':  'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let html = '';
            let token = localStorage.getItem('token')
            let idUser =  parseInt(parseJwt(token).idUser);
            console.log('đã vào')
            let product = data
            product.forEach(item => {
                html += `
             
                <div class="col-lg-3 col-sm-6">
                    <div class="popular-item">
                        <div class="top-content">
                            <div class="right">
                                <h4>${item.name}</h4>
                                <span><em>${item.price}</em>${item.status}</span>
                            </div>
                        </div>
                        <div class="imgSize">
                            <img src="${item.image}" alt="" class="imgFixSize">
                        </div>
                        <div class="border-button">
                          <a href="#" onclick="pay(${item.id}, ${idUser})">Thanh toán</a>
                        </div>
                    </div>
                </div>`
            })
            $('#productImg').html(html);

            $('#plus').html(`<a href="#" onclick="getCartByIdUser(${idUser})"><i class="fas fa-shopping-cart" style="font-size: 27px; color: #FE1175FF;margin-bottom: auto;margin-top: auto;padding-top: 23px;"></i></a>`);

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

function addToCart(id) {
    let quantity = 1
    let product = parseInt(id)
    let idUser = parseInt(localStorage.getItem('idUser'))
    let cart = {
        "quantity": quantity,
        "product": product,
        "user": idUser
    }
    console.log(cart)
    
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/auth/cart/addcart`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(cart),
        success: (messenger) =>{
            console.log(messenger)
            bodyAfLogin();
        }
    })
}

