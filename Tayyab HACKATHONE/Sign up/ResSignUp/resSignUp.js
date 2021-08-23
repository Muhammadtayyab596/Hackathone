let resSignUp = (e) => {
    console.log(e);
    e.preventDefault();

    var email = document.getElementById("email").value;
    var resName = document.getElementById("resName").value;
    var resCountry = document.getElementById("resCountry").value;
    var resCity = document.getElementById("resCity").value;
    var password = document.getElementById("password").value;

    var form = document.getElementById("needs-validation")
    form.classList.add("was-validated")
    if (!form) {
        return
    }

    if (!email || !resName || !resCountry || !resCity || !password) {
        swal({
            title: "Bad job!",
            text: "Empty Input Fileds",
            icon: "error",
            button: "try Again",
        });
    } else {


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user

                console.log("SIGN UP SUUESSFULL");

                console.log(user.uid);

                firebase.firestore().collection("users").doc(user.uid).set({
                        email: email,
                        resName: resName,
                        resCountry: resCountry,
                        resCity: resCity,
                        uid: user.uid,
                        state: "Restaurant"

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
                        location.href = "../../Login./login.html";
                    })

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