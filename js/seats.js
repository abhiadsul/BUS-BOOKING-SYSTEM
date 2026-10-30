/*
    MAHARASHTRA BUS BOOKING
    CUSTOM SEATING CHART
*/


var selectedSeats = [];


/*
    Seat layout

    Left side:
    V1 V2
    D  C
    H  G
    6  5
    8  7
    14 13
    16 15
    22 21
    24 23
    30 29
    32 31

    Right side:
    B  A
    E  F
    1  2
    *3 *4
    9  10
    11 12
    17 18
    19 20
    25 26
    27 28
    33 34

    Last row:
    39 38 37 36 35
*/


var seatRows = [

    ["V1", "V2", "", "B", "A"],

    ["D", "C", "", "E", "F"],

    ["H", "G", "", "1", "2"],

    ["6", "5", "", "*3", "*4"],

    ["8", "7", "", "9", "10"],

    ["14", "13", "", "11", "12"],

    ["16", "15", "", "17", "18"],

    ["22", "21", "", "19", "20"],

    ["24", "23", "", "25", "26"],

    ["30", "29", "", "27", "28"],

    ["32", "31", "", "33", "34"],

    ["39", "38", "37", "36", "35"]

];



/*
    Seats which are already booked.

    Demo purpose.
*/

var bookedSeats = [

    "6",
    "5",
    "17",
    "18"
];



/*
    Get bus information
*/

var busName =
    localStorage.getItem("busName") ||
    "Maharashtra Express";


var busFare =
    Number(
        localStorage.getItem("busFare")
    ) || 450;


var fromCity =
    localStorage.getItem("from") ||
    "-";


var toCity =
    localStorage.getItem("to") ||
    "-";



/*
    Display bus information
*/

document.getElementById("busName").innerText =
    busName;


document.getElementById("busFare").innerText =
    busFare;


document.getElementById("fromCity").innerText =
    fromCity;


document.getElementById("toCity").innerText =
    toCity;



/*
    Create seating chart
*/

function createSeats() {


    var layout =
        document.getElementById(
            "seatLayout"
        );


    layout.innerHTML = "";


    seatRows.forEach(function(row) {


        var rowDiv =
            document.createElement("div");


        rowDiv.className =
            "seat-row";


        row.forEach(function(seatNumber) {


            /*
                Empty space creates
                the center aisle.
            */

            if (seatNumber === "") {

                var aisle =
                    document.createElement("div");

                aisle.className =
                    "seat-aisle";

                rowDiv.appendChild(aisle);

                return;
            }



            /*
                Create seat
            */

            var seat =
                document.createElement("div");


            seat.className =
                "custom-seat";


            seat.innerHTML = `

                <span class="seat-number">
                    ${seatNumber}
                </span>

                <span class="seat-fare">
                    ₹${busFare}
                </span>

            `;



            /*
                Check booked seat
            */

            if (
                bookedSeats.includes(
                    seatNumber
                )
            ) {

                seat.classList.add(
                    "booked"
                );

            }


            /*
                Seat click
            */

            seat.onclick = function() {


                if (
                    bookedSeats.includes(
                        seatNumber
                    )
                ) {

                    alert(
                        "This seat is already booked."
                    );

                    return;

                }


                /*
                    Select / unselect
                */

                if (
                    selectedSeats.includes(
                        seatNumber
                    )
                ) {


                    selectedSeats =
                        selectedSeats.filter(
                            function(item) {

                                return item !==
                                    seatNumber;

                            }
                        );


                    seat.classList.remove(
                        "selected"
                    );


                } else {


                    selectedSeats.push(
                        seatNumber
                    );


                    seat.classList.add(
                        "selected"
                    );

                }


                updateSeatDetails();

            };


            rowDiv.appendChild(seat);

        });


        layout.appendChild(rowDiv);

    });

}



/*
    Update selected seats
    and total amount
*/

function updateSeatDetails() {


    var selectedText =
        document.getElementById(
            "selectedSeats"
        );


    var totalText =
        document.getElementById(
            "totalAmount"
        );


    if (
        selectedSeats.length === 0
    ) {

        selectedText.innerText =
            "None";

        totalText.innerText =
            "0";

        return;

    }


    selectedText.innerText =
        selectedSeats.join(", ");


    var total =
        selectedSeats.length *
        busFare;


    totalText.innerText =
        total;

}



/*
    Continue to payment
*/

function continuePayment() {


    if (
        selectedSeats.length === 0
    ) {

        alert(
            "Please select at least one seat."
        );

        return;

    }


    /*
        Save selected seats
    */

    localStorage.setItem(
        "selectedSeats",
        selectedSeats.join(", ")
    );


    /*
        Calculate total
    */

    var total =
        selectedSeats.length *
        busFare;


    localStorage.setItem(
        "totalAmount",
        total
    );


    /*
        Go to payment
    */

    window.location.href =
        "payment.html";

}



/*
    Create seats when page loads
*/

createSeats();