// <div className="row">
//     <div className="col-lg-6">
//         <div className="section-heading">
//             <h6>Bộ sưu tập</h6>
//             <h4>ĐƯỢC SỬ DỤNG <em>NHIỀU NHẤT</em></h4>
//         </div>
//     </div>
//     <div className="col-lg-6">
//         <div className="main-button">
//             <a href="categories.html">Xem tất cả sản phẩm</a>
//         </div>
//     </div>
//     <div className="col-lg-3 col-sm-6">
//         <div className="popular-item">
//             <div className="top-content">
//                 <div className="icon">
//                     <img src="assets/images/icon-01.png" alt="">
//                 </div>
//                 <div className="right">
//                     <h4>Nature Pic Contest</h4>
//                     <span><em>126</em> Available Contests</span>
//                 </div>
//             </div>
//             <div className="thumb">
//                 <img src="assets/images/popular-01.png" alt="">
//                     <span className="category">Top Contest</span>
//                     <span className="likes"><i className="fa fa-heart"></i> 256</span>
//             </div>
//             <div className="border-button">
//                 <a href="contest-details.html">Browse Nature Pic Contests</a>
//             </div>
//         </div>
//     </div>
// </div>
function searchProduct(value) {
    let token = JSON.parse(localStorage.getItem('token'));
    let name = value.toLowerCase();
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/products/find-by-name?name=${name}`,
        data: JSON.stringify(name),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            console.log(data);
            let html = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th scope="col" colspan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>`;
            $('#body').html(html);
            let tbody = ``;
            let categories = ``;
            data[1].map((item) => {
                categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
            })
            data[0].map((item) => {
                tbody += `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.price} $</td>
                    <td><img src="${item.image}" alt="${item.image}" style="width: 200px;"></td>
                    <td>${item.nameCategory}</td>
                    `
                if (token.role === 'admin') {
                    tbody += `
                    <td>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${item.id}">Edit</button>
                        <div class="modal fade" id="editModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name</span>
                                        <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                        <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Category</span>
                                        <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                            <option value="${item.idCategory}">${item.nameCategory}</option>
                                            ${categories}
                                        </select>
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">@</span>
                                        <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="editProduct(${item.id})">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${item.id}">Delete</button>
                        <div class="modal fade" id="deleteModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete ${item.name}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete???
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct(${item.id})">Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>`;
                }
                else {
                    tbody += `
                    <td>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buyModal${item.id}">Buy</button>
                        <div class="modal fade" id="buyModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Buy ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name</span>
                                        <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                        <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Category</span>
                                        <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                            <option value="${item.idCategory}">${item.nameCategory}</option>
                                            ${categories}
                                        </select>
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">@</span>
                                        <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="buyProduct(${item.id})">Confirm</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    `;
                }
            });
            $('#tbody').html(tbody);
        }
    })
}
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
