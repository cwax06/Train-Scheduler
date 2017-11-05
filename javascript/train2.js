


$(document).ready(function () {
    console.log('hello world')



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCl9dw69y74RNISpXUdDZfUpZyPdKOWTnA",
        authDomain: "train-schedule-1e146.firebaseapp.com",
        databaseURL: "https://train-schedule-1e146.firebaseio.com",
        projectId: "train-schedule-1e146",
        storageBucket: "",
        messagingSenderId: "544502042419"
    };
    firebase.initializeApp(config);


    //global variables
    var db = firebase.database();
    var trains = [];
    var trainsRef = db.ref('/trains');


    //functions
    function createTableRow(train) {
        console.log(childSnapshot.val);
        // <tr>
        //     <td>train</td>
        //     <td>Doe</td>
        //     <td>john@example.com</td>
        // </tr>
        var tr = $("<tr>");
        var trainCol = $("<td>");
        var lineCol = $("<td>");
        var destinationCol = $("<td>");
        var frequencyCol = $("<td>");
        var nextArrivalCol = $("<td>");
        var minutesCol = $("<td>");


        // months frequency = currentDate - destinationDate
        var convertedDate = moment(train.destinationDate, "MM-DD-YY");
        var currentDate = moment()
        // totalminutes = months frequency * (nextArrival)


        trainCol.text(train.person);
        lineCol.text(train.line);
        destinationCol.text(train.destinationDate);
        nextArrivalCol.text(train.nextArrival);
        frequencyCol.text("frequency");
        minutesCol.text("minutes");

        $("tbody").append(tr);
        tr.append(trainCol);
        tr.append(lineCol);
        tr.append(destinationCol);
        tr.append(frequencyCol);
        tr.append(nextArrivalCol);
        tr.append(minutesCol);

    }

    function submitHandler(event) {
        event.preventDefault();
        var trainName = $("#train").val().trim();
        var line = $("#line").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();
        var nextArrival = $("#nextArrival").val().trim();
        var train = {
            trainName: trainName,
            line: line,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextArrival: nextArrival,
        }
        console.log(train);
        trainsRef.push(train);
        $('#train').val("");
        $('#line').val("");
        $('#destination').val("");
        $('#firstTrain').val("");
        $('#frequency').val("");
        $('#nextArrival').val("");

    };

    function childAddedHandler(snapshot) {
        console.log(snapshot.val());
        var train = snapshot.val();
        createTableRow(train);
    }


    //event listener
    $("#button").on("click", submitHandler);

    trainsRef.on("child_added", childAddedHandler);



    //belongs to ready.function
})

