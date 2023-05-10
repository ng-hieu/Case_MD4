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
                        <div class="border-button">
                          <a href="#" onclick="addToCart()">Thêm vào giỏ hàng</a>
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
    $('#signInOut').html(`<a href="#signOut" onclick="signOut()">Sign Out</a>`)
}
function addToCart(){

}
