var pageCounter = 1;
var studentNumber = 1;
var studentContainer = document.getElementById("student-info");
var btn = document.getElementById("btn");
var percentComplete = 1;


btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();

    if (pageCounter == 1) {
        ourRequest.open('GET', 'https://mustang-index.azurewebsites.net/ldw6txsjg6.json');
    } else if (pageCounter == 2) {
        ourRequest.open('GET', 'https://mustang-index.azurewebsites.net/ldw6txsjg5.json');
    } else if (pageCounter == 3) {
        ourRequest.open('GET', 'https://mustang-index.azurewebsites.net/y2882154268.json');
    } else if (pageCounter == 4) {
        ourRequest.open('GET', 'https://mustang-bg.azurewebsites.net/json/ichyiqxden.json');
    } else if (pageCounter == 5) {
        ourRequest.open('GET', 'https://mustang-bg.azurewebsites.net/json/bdrgaygrvj.json');
    } else if (pageCounter == 6) {
        ourRequest.open('GET', 'https://mustang-bg.azurewebsites.net/json/rfsrhpkevc.json');
    } else if (pageCounter == 7) {
        ourRequest.open('GET', 'https://mustang-index-jaw.azurewebsites.net/edwrytyawj.json');
    } else if (pageCounter == 8) {
        ourRequest.open('GET', 'https://mustang-index-jaw.azurewebsites.net/kusxkvellx.json');
    } else if (pageCounter == 9) {
        ourRequest.open('GET', 'https://mustang-index-jaw.azurewebsites.net/vdifvwrmjj.json');
    }

    ourRequest.onload = function() {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
            studentNumber++;
        } else {
            console.log("We connected to the server, but it returned an error.");
        }

    };

    ourRequest.onerror = function() {
        console.log("Connection error");
    };

    ourRequest.send();
    pageCounter++;
    if (pageCounter > 9) {
        btn.classList.add("hide-me");
    };

    ourRequest.upload.addEventListener("progress", function(evt) {
        console.log("in Upload progress");
        console.log("Upload Done");
    }, false);
    //Download progress, waiting for response from server
    ourRequest.addEventListener("progress", function(e) {
        console.log("in Download progress");
        if (e.lengthComputable) {
            //percentComplete = (e.loaded / e.total) * 100;
            percentComplete = parseInt((e.loaded / e.total * 100), 10);
            console.log(percentComplete);
            $('#bulk-action-progbar').data("aria-valuenow", percentComplete);
            $('#bulk-action-progbar').css("width", percentComplete + '%');

        } else {
            console.log("Length not computable.");
        }
    }, false);
});

function renderHTML(data) {
    var htmlString = "";

    htmlString += "<h3>" + "Student " + studentNumber + " Info" + "</h3>";
    htmlString += "<p>" + "Name: " + data.firstName + " " + data.lastName + "</br>" + " Preferred Name: " + data.preferredName + "</br>" + " Email: " + data.email + "</br>" + " Phone Number: " + data.phoneNumber;
    htmlString += "</br>" + " Class: " + data.class + "</br>" + " Room: " + data.room + "</br>" + " Class Start Time: " + data.startTime + "</br>" + " Seat Number: " + data.seatNumber + "</br>" + " In-Person Days: " + data.inPerson;
    htmlString += "</br>" + " Virtual Days: " + data.virtual + "</br>" + " City: " + data.city + "</br>" + " State: " + data.state + "</br>" + " Zipcode: " + data.zip + "</br>" + " Location's Latitude and Longitude: " + data.lat;
    htmlString += data.lng + "</br>" + " Person's Favorite Hobby: " + data.favoriteHobby + "</p>" + '</br>';
    studentContainer.insertAdjacentHTML('beforeend', htmlString);
}