function id(_id) {
    return document.getElementById(_id)
}



let users = [];


class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

}



class Person extends Login {
    constructor(name, email, password) {
        super(email, password);
        this.name = name;
    }
}
function admin() {
    let _name = "admin";
    let _email = "admin@mail.ru";
    let _password = "admin"
    let user = new Person(_name, _email, _password);
    users.push(user);
}
admin();
function login() {
    console.log(4);
    let user;
    for (let l of users) {
        if (id("email_login").value == l.email && id("password_login").value == l.password) {
            user = l
        }
        else{
            user=null;
        }

    }
    if (user!=null) {
        for (let l of users) {
            if (id("email_login").value == "admin@mail.ru" && id("password_login").value == "admin") {
                location.href="adminPanel.html";
            }
            else{
                localStorage.User = JSON.stringify(user);
                location.href = "index.html";
            }
        }
    }
    else{
        alert("mail ve ya parol duzgun deyil")
    }

}
    function register() {

        let _name = id("name").value;
        let _email = id("email").value;
        let _password = id("password").value

        if (_password == id("passwordew").value) {
            let user = new Person(_name, _email, _password);
            users.push(user);
            return false;
        }
        else {
            alert("parol ust -uste dushmur");
        }

    }

    document.addEventListener("DOMContentLoaded", function (event) {
        if (localStorage.User != null);
    });

    function logout() {
        if (localStorage.User != null) {
            document.location.href = "index.html";
            localStorage.clear();

        }

    }