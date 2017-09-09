var config = {
    apiKey: "AIzaSyBMC4tR6PCd0V5_orVwJIKpDthNsWMMHGE",
    authDomain: "iic2173-t1.firebaseapp.com",
    databaseURL: "https://iic2173-t1.firebaseio.com/",
    storageBucket: ""
};
var database;
var app;
var currentIP;
var currentDate;

function generateCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let hh = today.getHours();
    let mis = today.getMinutes();
    let ss = today.getSeconds();
    if (mis < 10) {
        mis = "0" + mis;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }    
    let yyyy = today.getFullYear();
    currentDate = dd+'/'+mm+'/'+yyyy + "   " + hh + ":" + mis + ":" + ss;
    return currentDate;
}

function sendNewLog() {
    if (currentIP) {
        database.ref('key-last').push({
            "ip" : currentIP,
            "date" : currentDate
        });
    }    
}

function fillArrays(cDB) {
    //Ugly because of the way the Firebase DB was made
    ipArray[0] = cDB.ip1.ip;
    dateArray[0] = cDB.ip1.date;
    ipArray[1] = cDB.ip1.ip;
    dateArray[1] = cDB.ip1.date;
    ipArray[2] = cDB.ip1.ip;
    dateArray[2] = cDB.ip1.date;
    ipArray[3] = cDB.ip1.ip;
    dateArray[3] = cDB.ip1.date;
    ipArray[4] = cDB.ip1.ip;
    dateArray[4] = cDB.ip1.date;
    ipArray[5] = cDB.ip1.ip;
    dateArray[5] = cDB.ip1.date;
    ipArray[6] = cDB.ip1.ip;
    dateArray[6] = cDB.ip1.date;
    ipArray[7] = cDB.ip1.ip;
    dateArray[7] = cDB.ip1.date;
    ipArray[8] = cDB.ip1.ip;
    dateArray[8] = cDB.ip1.date;
    ipArray[9] = cDB.ip1.ip;
    dateArray[9] = cDB.ip1.date;


}

function displayOldVisitors(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        let visitorValues = childSnapshot.val();
        let listVisitor = "<li>" + visitorValues.ip + " en la fecha " + visitorValues.date + "</li>";
        $("#previous-visitors").append(listVisitor);
    })
}

$("document").ready(function() {
    try {
        //Firebase stuff
        app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        database = firebase.database();
        //Get current IP and time. 
        try {
            $.getJSON('//jsonip.com/?callback=?', function(data) {
                currentIP = data.ip;
                $("#welcome").text("Tu dirección IP actual es: " + data.ip);
            });
        } catch (e) {
            //For some reason it doesn't seem to work on Firefox
            console.log(e);
            $("#welcome").text("Hubo un problema al obtener tu IP");
        }        
        $("#current-time").text("La fecha y hora actual son: " + generateCurrentDate());
        //Get last 10 visitors from DB
        firebase.database().ref('key-last').orderByChild("date").limitToLast(10).once('value').then(function(snapshot) {
            sendNewLog();
            displayOldVisitors(snapshot);                    
        })            
    } catch (e) {
        console.error(e);
    }    
})