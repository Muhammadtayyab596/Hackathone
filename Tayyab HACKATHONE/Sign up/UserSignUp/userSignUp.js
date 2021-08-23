let userSignUp = (e) => {
    console.log(e);
    e.preventDefault();

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;

    var userCountry = document.getElementById("userCountry").value;
    var userCity = document.getElementById("userCity").value;
    var password = document.getElementById("password").value;

    var form = document.getElementById("needs-validation")
    form.classList.add("was-validated")
    if (!form) {
        return
    }

    if (!email || !username || !userCountry || !userCity || !password) {
        swal({
            title: "Bad job!",
            text: "Empty Input Fileds",
            icon: "error",
            button: "try Again",
        });
    } else {
        console.log(email);
        console.log(userCountry);
        console.log(userCity);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user


                console.log(user.uid);
                console.log("SIGN UP SUUESSFULL");

                firebase.firestore().collection("users").doc(user.uid).set({
                        email: email,
                        username: username,
                        userCountry: userCountry,
                        userCity: userCity,
                        uid: user.uid,
                        state: "user"

                    })
                    .then(function() {
                        console.log("Data Succesfull");
                    }).catch(error => {
                        console.log(error);
                    })





                swal({
                        title: "Good job!",
                        text: "Successfully Sign up",
                        icon: "success",
                        button: "Next",
                    })
                    .then((value) => {
                        location.href = "../../Dasboard/UserDasboard/userDashboard.html";
                    })
                    // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);

                swal({
                    title: "Bad job!",
                    text: errorMessage,
                    icon: "error",
                    button: "Try Again",
                });
                // ..
            });
    }

}