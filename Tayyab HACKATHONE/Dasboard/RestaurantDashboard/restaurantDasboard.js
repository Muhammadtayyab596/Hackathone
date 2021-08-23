var navbar = document.querySelector(".navbar");
console.log(navbar);
window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        navbar.classList.add("scrool")

    } else {
        navbar.classList.remove("scrool")

    }
}


var userID;
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        console.log(user.uid);

        userID = user.uid;
        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                var username = document.getElementById("resName")
                var currentUser = snapshot.data();
                console.log(currentUser.uid);

                username.innerHTML = currentUser.resName;

            })

    }

});

var storage = firebase.storage();

let addCard = (e) => {

    console.log(e);
    e.preventDefault();

    var restaurantName = document.getElementById("restaurantName").value
    var itemPrice = document.getElementById("itemPrice").value
    var itemName = document.getElementById("itemName").value
    var imageFile = document.getElementById("imageFile")


    var form = document.getElementById("needs-validation")
    form.classList.add("was-validated")
    if (!form) {
        return
    }
    if (!restaurantName || !itemPrice || !itemName || !imageFile) {
        swal({
            title: "Bad job!",
            text: "Empty Input Fileds",
            icon: "error",
            button: "try Again",
        });

        document.getElementById("restaurantName").value = "";
        document.getElementById("itemPrice").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("imageFile").value = "";
    } else {



        var imageKey = imageFile.files[0];


        var imagesRef = storage.ref().child('images/' + imageKey.name);
        var uploadTask = imagesRef.put(imageKey);


        uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
                console.log("URL", url);

                firebase.firestore().collection("cards").add({
                        restaurantName: restaurantName,
                        itemName: itemName,
                        itemPrice: itemPrice,
                        uid: userID,
                        image: url
                    })
                    .then(function() {
                        console.log(userID);
                        console.log("Object url", url);
                        console.log("Data Added");

                    })
                    .catch(function(error) {
                        console.log(error);
                    })



            })
            .catch((er) => {
                console.log(er);
                swal({
                    title: "SERVER RESPONES FAILED PLZ TRY AGAIN",
                    text: er,
                    icon: "error",
                    button: "try Again",
                });
            })


        document.getElementById("restaurantName").value = "";
        document.getElementById("itemPrice").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("imageFile").value = "";

    }
}

function logOut() {
    firebase.auth().signOut()
        .then(() => {

            swal({
                title: "LOGIUT",
                text: " SUCCESSFULLY LOGOUT",
                icon: "success",
            })
        })
        .then((res) => {
            window.location = "../../Login/login.html"
        })
        .catch((error) => {
            console.log(error);
        });
}