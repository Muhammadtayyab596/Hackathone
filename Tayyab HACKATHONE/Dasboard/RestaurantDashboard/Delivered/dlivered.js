var userID;
firebase.auth().onAuthStateChanged((user) => {


    if (user) {
        console.log(user.uid);
        userID = user.uid
        getDeliveredData();


    }

});



let getDeliveredData = () => {
    console.log(userID);
    firebase.firestore().collection("pending").where("resUid", "==", userID).where("status", "==", "delivered")
        .get()
        .then((snapshot) => {
            snapshot.forEach(doc => {

                console.log("DOC", doc.data());
                document.getElementById("disPlayCard").innerHTML += `


                <div class="col col-sm-12 col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Name: ${doc.data().titel}</h5>
                        <p class="card-text fw-bold">Dishe : ${doc.data().cetegory}</p>
                        <p class="card-text fw-bold">Price : ${doc.data().itemPrice}</p>
                        <a href="#" class="btn btn-success" id =${doc.id} onclick = completed(this.id)>Completed </a>
                        
                    </div>

                </div>
            </div>

                `
            });
        })
}



function completed(i) {
    console.log(i);
    firebase.firestore().collection("pending").doc(i).update({
        status: "completed"
    });
    swal({
            titel: "Congratulation",
            text: "SuccessFully Accepted",
            icon: "success",
            button: "next",
        })
        .then((res) => {
            window.location = "../pendind/pending.html"
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
            window.location = "../../../Login/login.html"
        })
        .catch((error) => {
            console.log(error);
        });
}