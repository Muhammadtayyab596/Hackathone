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
        console.log("current user", user.uid);

        userID = user.uid;
        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                var username = document.getElementById("username")
                var currentUser = snapshot.data();
                console.log(currentUser);

                username.innerHTML = currentUser.username;
                getCard(userID)
            })

    }

});


function getCard(userID) {
    firebase.firestore().collection("cards").get()
        .then((snapshot) => {

            console.log(snapshot);

            console.log("user k id", userID);

            snapshot.forEach(data => {
                var obj = data.data()
                var src = obj.image;

                console.log("user data ki id", data.id)
                    // document.getElementById("disPlayCard") = "";
                document.getElementById("disPlayCard").innerHTML += `


                    <div class="col-12 col-sm-12 col-md-6 col-lg-4  mal">
                    <div class="card">
                        <img src="${src}" class="card-img-top" alt="..."  >
                        <div class="card-body">
                            <h5 class="card-title fw-bold">NAME: ${obj.restaurantName}</h5>
                            <p class="card-text" fw-bold>Dish: ${obj.itemName}</p>
                            <p class="card-text fw-bold">RS: ${obj.itemPrice}</p>
                            <p class="card-text fw-bold">Catorgotry Pkistan</p>
                            <a href="#" class="btn btn-primary" id =${data.id} onclick = order(this.id)>Oder </a>
                        </div>
                    </div>
                </div>

                    `
            });
        })
}


var newObj;

function order(t) {
    // var cardId = cid
    // console.log("cardId", cardId);
    // console.log("tid is => ", t.id)
    console.log(t);
    var docRef = firebase.firestore().collection("cards").doc(t);
    docRef.get().then(function(doc) {


        console.log(doc.data());
        if (doc.exists) {
            var data = doc.data()
            newobj = {
                status: "pending",
                titel: data.restaurantName,
                // price: data.price,
                cetegory: data.itemName,
                // delivery: data.delivery,
                itemPrice: data.itemPrice,
                userUid: userID,
                resUid: data.uid,
                // (userid restaurant ki id hai )
            }
            console.log("newobj", newobj)

            var db = firebase.firestore().collection("pending");
            db.add(newobj)
                .then(() => {
                    swal({
                        titel: "good Job",
                        icon: "success",
                        button: "next",
                    })
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            console.log("Not Such a document");
        }


    })

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