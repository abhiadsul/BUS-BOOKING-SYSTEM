function searchBuses() {

    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var date = document.getElementById("date").value;


    if (from === "Select City") {

        alert("Please select From city");

        return;
    }


    if (to === "Select City") {

        alert("Please select To city");

        return;
    }


    if (date === "") {

        alert("Please select Journey Date");

        return;
    }


    if (from === to) {

        alert("From and To cities cannot be same");

        return;
    }


    localStorage.setItem("from", from);

    localStorage.setItem("to", to);

    localStorage.setItem("date", date);


    window.location.href = "busses.html";

}