$("#login-form").submit(function(e) {
    e.preventDefault(); // ngăn chặn submit form
    let username = $("#usernameSignIn").val();
    let password = $("#passwordSignIn").val();
    //const result = window.location.origin;
    $.ajax({
        url: `http://localhost:3000/auth/login`,
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({username: username, password: password}),
        success: function(token) {
            localStorage.setItem('token', token)
        }
    });
    $('#modal_trigger').html(`Sign Out`)
});

$("#register-form").submit(function(e) {
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
        success: function(messenger) {
            console.log('Đã thêm xong '+ messenger)
            alert('Bạn hãy Log In lại')
        }
    });
});