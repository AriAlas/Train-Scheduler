var config = {
    apiKey: "AIzaSyCru5xCQi_9W3HdCvEQ8OOnZJP_5V5aer8",
    authDomain: "firstproyect-cfe13.firebaseapp.com",
    databaseURL: "https://firstproyect-cfe13.firebaseio.com",
    projectId: "firstproyect-cfe13",
    storageBucket: "firstproyect-cfe13.appspot.com",
    messagingSenderId: "903094240463"
  };


firebase.initializeApp(config);
var database = firebase.database();





$("#submit-button").on("click", function (){

    var form = $("#myForm");
    var valid = form[0].checkValidity();
    form.addClass("was-validated");

    if(!valid) {
        return false;
    }

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();
    
    


//    var trainTime = moment(trainTime).format("hh:mm");

   console.log(trainTime);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency

    });




});

database.ref().on("child_added", function(childSnapshot) {
    var tableRow = $("<tr>");
    var tdName = $("<td>");
    var tdDestination = $("<td>");
    var tdTime = $("<td>");
    var tdFrequency = $("<td>");
    var tdminAway = $("<td>");
    var tdNextArrival = $("<td>");
   
    var firstTime = childSnapshot.val().trainTime;
    console.log("first " + firstTime);
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var frequency = childSnapshot.val().frequency;
    var currentTime = moment();
    console.log("current" + currentTime);
    var difference = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log("difference" + difference);
    var remainder = difference % frequency;
    console.log("remainder" + remainder);
    var minAway = frequency - remainder;
    console.log(minAway);
    var nextArrival = moment().add(minAway, "minutes");



    tdName.text(childSnapshot.val().trainName);
    tdDestination.text(childSnapshot.val().destination);
    tdTime.text(childSnapshot.val().trainTime);
    tdFrequency.text(childSnapshot.val().frequency);
    tdNextArrival.text(moment(nextArrival).format("hh:mm"));
    tdminAway.text(minAway);


    tableRow.append(tdName);
    tableRow.append(tdDestination);
    tableRow.append(tdFrequency);
    tableRow.append(tdNextArrival);
    tableRow.append(tdminAway);
    // tableRow.append(untilTrain);
  


    $("#table-body").append(tableRow);

});
function currentTime() {
    var sec = 1;	
    time = moment().format('HH:mm:ss');
    searchTime = moment().format('HH:mm');
        $('.current-time').text(time);

        t = setTimeout(function() {
            currentTime();
        }, sec * 1000);	
}
currentTime(); 


