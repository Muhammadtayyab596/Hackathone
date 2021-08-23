var userID;
firebase.auth().onAuthStateChanged((user) => {


    if (user) {
        console.log(user.uid);
        userID = user.uid
        getPendingData();


    }

});


let getPendingData = () => {
    console.log(userID);
    firebase.firestore().collection("pending").where("resUid", "==", userID).where("status", "==", "pending")
        .get()
        .then((snapshot) => {
            snapshot.forEach(doc => {

                console.log("DOC", doc.data());
                document.getElementById("disPlayCard").innerHTML += `


                <div class="col col-sm-12 col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${doc.data().titel}</h5>
                        <p class="card-text fw-bold">Dishes: ${doc.data().cetegory}</p>
                        <p class="card-text fw-bold">${doc.data().itemPrice}</p>
                        <a href="#" class="btn btn-danger" id =${doc.id} onclick = accepted(this.id)>PENDING </a>
                        
                    </div>

                </div>
            </div>

                `
            });
        })
}



function accepted(i) {
    console.log(i);
    firebase.firestore().collection("pending").doc(i).update({
        status: "accepted"
    });
    swal({
            titel: "Congratulation",
            text: "SuccessFully Accepted",
            icon: "success",
            button: "next",
        })
        .then((res) => {
            window.location = "../Accepted/accepted.html"
        })
}
//


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