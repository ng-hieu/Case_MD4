console.log('Check body')
console.log("checkBody running")
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
        <div className="popular-item">
            <div className="top-content">
                <div className="right">
                    <h4>${item.nameCategory}</h4>
                    <span><em>${item.price}</em>${item.name}</span>
                </div>
            </div>
            <div className="thumb">
                <img src="${item.image}" alt="">
            </div>
        </div>`
        })
        $('#productImg').html(html);
    },
    error: function (err) {
        console.log("Bị lỗi khi đang hiển thị sản phẩm: ", err)
    }
})
