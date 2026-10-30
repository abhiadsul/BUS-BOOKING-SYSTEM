var map;
var busMarkers = [];


// ===============================
// BUS DATA
// ===============================

var buses = [

    {
        name: "Shivneri Express",
        route: "Mumbai → Pune → Satara → Kolhapur",
        currentLocation: "Pune",
        destination: "Kolhapur",
        eta: "15 minutes",
        fare: 500,
        lat: 18.5204,
        lng: 73.8567
    },

    {
        name: "Maharashtra Express",
        route: "Mumbai → Pune → Solapur",
        currentLocation: "Pune",
        destination: "Solapur",
        eta: "20 minutes",
        fare: 450,
        lat: 18.5289,
        lng: 73.8745
    },

    {
        name: "Neeta Travels",
        route: "Pune → Satara → Kolhapur → Sangli",
        currentLocation: "Satara",
        destination: "Sangli",
        eta: "25 minutes",
        fare: 400,
        lat: 17.6805,
        lng: 74.0183
    },

    {
        name: "MSRTC Express",
        route: "Pune → Solapur → Latur → Nanded",
        currentLocation: "Solapur",
        destination: "Nanded",
        eta: "30 minutes",
        fare: 600,
        lat: 17.6599,
        lng: 75.9064
    },

    {
        name: "Deccan Express",
        route: "Mumbai → Nashik → Jalgaon",
        currentLocation: "Nashik",
        destination: "Jalgaon",
        eta: "35 minutes",
        fare: 550,
        lat: 19.9975,
        lng: 73.7898
    },

    {
        name: "Vidarbha Express",
        route: "Nagpur → Akola → Amravati",
        currentLocation: "Nagpur",
        destination: "Amravati",
        eta: "40 minutes",
        fare: 500,
        lat: 21.1458,
        lng: 79.0882
    },

    {
        name: "Marathwada Express",
        route: "Pune → Chhatrapati Sambhajinagar → Nanded",
        currentLocation: "Chhatrapati Sambhajinagar",
        destination: "Nanded",
        eta: "45 minutes",
        fare: 550,
        lat: 19.8762,
        lng: 75.3433
    },

    {
        name: "Konkan Express",
        route: "Mumbai → Pune → Satara → Kolhapur → Sangli",
        currentLocation: "Satara",
        destination: "Sangli",
        eta: "50 minutes",
        fare: 450,
        lat: 17.6805,
        lng: 74.0183
    }

];


// ===============================
// MAP INITIALIZATION
// ===============================

function initMap() {

    map = new mappls.Map("map", {

        center: [19.7515, 75.7139],

        zoom: 6,

        zoomControl: true

    });


    map.addListener("load", function() {

        addBusMarkers();

        showBusTable();

    });

}


// ===============================
// ADD BUS MARKERS
// ===============================

function addBusMarkers() {

    buses.forEach(function(bus, index) {

        var marker =
            new mappls.Marker({

                map: map,

                position: {
                    lat: bus.lat,
                    lng: bus.lng
                },

                fitbounds: false,

                icon_url:
                    "https://apis.mappls.com/map_v3/1.png"

            });


        marker.addListener(
            "click",
            function() {

                showBusPopup(bus);

            }
        );


        busMarkers.push(marker);

    });


    document.getElementById(
        "busCount"
    ).innerText = buses.length;

}


// ===============================
// BUS POPUP
// ===============================

function showBusPopup(bus) {

    var popup =
        new mappls.InfoWindow({

            map: map,

            content: `

                <div style="
                    padding:10px;
                    min-width:220px;
                    font-family:Arial;
                ">

                    <h3 style="
                        color:#063b66;
                        margin-top:0;
                    ">
                        🚌 ${bus.name}
                    </h3>

                    <p>
                        <b>🛣️ Route:</b><br>
                        ${bus.route}
                    </p>

                    <p>
                        <b>📍 Current:</b>
                        ${bus.currentLocation}
                    </p>

                    <p>
                        <b>🎯 Destination:</b>
                        ${bus.destination}
                    </p>

                    <p>
                        <b>⏱️ ETA:</b>
                        ${bus.eta}
                    </p>

                    <p>
                        <b>💰 Fare:</b>
                        ₹${bus.fare}
                    </p>

                    <p style="
                        color:green;
                        font-weight:bold;
                    ">
                        🟢 Running
                    </p>

                    <button
                        onclick="bookBus(
                            '${bus.name}',
                            ${bus.fare},
                            '${bus.currentLocation}',
                            '${bus.destination}'
                        )"
                        style="
                            background:#ff8c00;
                            color:white;
                            border:none;
                            padding:8px 12px;
                            border-radius:5px;
                            cursor:pointer;
                            font-weight:bold;
                        "
                    >
                        🎫 Book This Bus
                    </button>

                </div>

            `,

            position: {
                lat: bus.lat,
                lng: bus.lng
            }

        });

}


// ===============================
// FIND BUSES
// ===============================

function findBuses() {

    var currentLocation =
        document.getElementById(
            "currentLocation"
        ).value;

    var destination =
        document.getElementById(
            "destination"
        ).value;

    var result =
        document.getElementById(
            "busResults"
        );


    if (currentLocation === "") {

        alert(
            "Please select your current location."
        );

        return;
    }


    if (destination === "") {

        alert(
            "Please select your destination."
        );

        return;
    }


    if (currentLocation === destination) {

        alert(
            "Current location and destination cannot be same."
        );

        return;
    }


    var matchingBuses = [];


    buses.forEach(function(bus) {

        var route =
            bus.route.split(" → ");


        var currentIndex =
            route.indexOf(
                currentLocation
            );

        var destinationIndex =
            route.indexOf(
                destination
            );


        if (
            currentIndex !== -1 &&
            destinationIndex !== -1 &&
            destinationIndex > currentIndex
        ) {

            matchingBuses.push(bus);

        }

    });


    if (
        matchingBuses.length === 0
    ) {

        result.innerHTML = `

            <div class="no-bus">

                <div class="no-bus-icon">
                    🚌
                </div>

                <h2>
                    ❌ No Bus Currently Available
                </h2>

                <p>
                    No running bus was found from
                    <b>${currentLocation}</b>
                    towards
                    <b>${destination}</b>.
                </p>

            </div>

        `;

        return;
    }


    var html = `

        <div class="results-heading">

            <h2>
                🚌 Buses Available
            </h2>

            <p>
                Running buses from
                <b>${currentLocation}</b>
                towards
                <b>${destination}</b>
            </p>

        </div>

    `;


    matchingBuses.forEach(function(bus) {

        html += `

            <div class="running-bus-card">

                <div class="running-bus-header">

                    <h2>
                        🚌 ${bus.name}
                    </h2>

                    <span class="status">
                        🟢 Running
                    </span>

                </div>

                <div class="running-bus-details">

                    <div>
                        <b>🛣️ Route</b>
                        <p>
                            ${bus.route}
                        </p>
                    </div>

                    <div>
                        <b>📍 Current Location</b>
                        <p>
                            ${bus.currentLocation}
                        </p>
                    </div>

                    <div>
                        <b>🎯 Destination</b>
                        <p>
                            ${bus.destination}
                        </p>
                    </div>

                    <div>
                        <b>⏱️ ETA</b>
                        <p>
                            ${bus.eta}
                        </p>
                    </div>

                    <div>
                        <b>💰 Fare</b>
                        <p>
                            ₹${bus.fare}
                        </p>
                    </div>

                </div>

                <button
                    class="book-running-bus"
                    onclick="bookBus(
                        '${bus.name}',
                        ${bus.fare},
                        '${bus.currentLocation}',
                        '${bus.destination}'
                    )">

                    🎫 Book This Bus

                </button>

            </div>

        `;

    });


    result.innerHTML = html;

}


// ===============================
// BUS TABLE
// ===============================

function showBusTable() {

    var table =
        document.getElementById(
            "busTableBody"
        );


    table.innerHTML = "";


    buses.forEach(function(bus) {

        table.innerHTML += `

            <tr>

                <td>
                    🚌 ${bus.name}
                </td>

                <td>
                    ${bus.route}
                </td>

                <td>
                    📍 ${bus.currentLocation}
                </td>

                <td>
                    🎯 ${bus.destination}
                </td>

                <td>
                    ${bus.eta}
                </td>

                <td>
                    ₹${bus.fare}
                </td>

                <td class="running">
                    🟢 Running
                </td>

                <td>

                    <button
                        class="book-button"
                        onclick="bookBus(
                            '${bus.name}',
                            ${bus.fare},
                            '${bus.currentLocation}',
                            '${bus.destination}'
                        )">

                        Book

                    </button>

                </td>

            </tr>

        `;

    });

}


// ===============================
// BOOK BUS
// ===============================

function bookBus(
    busName,
    fare,
    from,
    to
) {

    localStorage.setItem(
        "busName",
        busName
    );

    localStorage.setItem(
        "busFare",
        fare
    );

    localStorage.setItem(
        "from",
        from
    );

    localStorage.setItem(
        "to",
        to
    );


    window.location.href =
        "seats.html";

}