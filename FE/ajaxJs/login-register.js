$("#login-form").submit(function (e) {
    console.log('đã vào login')
    e.preventDefault(); // ngăn chặn submit form
    let username = $("#usernameSignIn").val();
    let password = $("#passwordSignIn").val();
    //const result = window.location.origin;
    $.ajax({
        url: `http://localhost:3000/auth/login`,
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({username: username, password: password}),
        success: function (token) {
            localStorage.setItem('token', token);
            let role = parseJwt(token).role;
            let idUser = parseJwt(token).idUser; // Cương thêm
            // alert(`token parsed: ${JSON.stringify(parseJwt(token))}`)
            localStorage.setItem('idUser', idUser) // Cương thêm
            localStorage.setItem('role', role);
            if(role === 'user'){
                bodyAfLogin();
            } else if(role === 'admin'){
                bodyAfLoginAdmin();
            }
        }
    });
});

function signOut() {
    console.log('đã vào Sign Out')
    localStorage.removeItem('token')
    $('#signInOut').html(`<a id="modal_trigger"  class="sign-in-up" data-bs-toggle="modal" data-bs-target="#modal">Sign In/Up</a>`)
    afSignOut()
}

$("#register-form").submit(function (e) {
    console.log('đã vào')
    e.preventDefault(); // ngăn chặn submit form
    let username = $("#usernameSignUp").val();
    let password = $("#passwordSignUp").val();
    //const result = window.location.origin;
    $.ajax({
        url: `http://localhost:3000/auth/register`,
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({username: username, password: password}),
        success: function (messenger) {
            console.log('Đã thêm xong ' + messenger)
        }
    });
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
