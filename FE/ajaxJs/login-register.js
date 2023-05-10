$("#login-form").submit(function (e) {
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
            document.querySelector("#sign-in-up").style.visibility = 'hidden';
        }
    });
    $('#signInOut').html(`<a href="#signOut" onclick="signOut()">Sign Out</a>`)
});

function signOut() {
    console.log('đã vào Sign Out')
    localStorage.removeItem('token')
    $('#signInOut').html(`<a id="modal_trigger" href="#modal" class="sign-in-up">Sign In/Up</a>`)
    console.log('Out xong')
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
            alert('Bạn hãy Log In lại')
        }
    });
});
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/login');
    }
}
function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    } else {
        return res.status(403).send('You are not authorized to access this page');
    }
}

function  checkLogin(req, res, next) {
    let token = localStorage.getItem('token');
    console.log(token)
    if(token) {
        document.querySelector("sign-in-up").style.display = 'none';
    }
}

checkLogin()



