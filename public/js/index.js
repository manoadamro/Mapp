var index = -1
var channel = 'global'


// New Message
$("#send").click(function(event) {
	message = document.getElementById('messageForm').value;
	params = {"message": message, "channel": channel}
	$.post("/chat/message", params)
	document.getElementById('messageForm').value = ''
	event.preventDefault();
});


// Get Updates
var getUpdates = function() {
    params = {"index": index, "channel": channel}
    $.get("/chat/update", params).done(function(response){
        if (response.code === 0) {
            var parsedMessages = response.data;
            if (parsedMessages.length > 0) {
                renderHTML(parsedMessages);
                index = parsedMessages[parsedMessages.length - 1].index
            }
        }
        else {
            // error = data.message
        }
    })
};


// Create Channel
var createChannel = function() {
    // route -> '/chat/create'
    // params-> 'channel' (name of channel)
}


// Delete Channel
var deleteChannel = function() {
    // route -> '/chat/delete'
    // params-> 'channel' (name of channel)
}


// Join Channel
var joinChannel = function() {
    // route -> '/chat/join'
    // params-> 'channel' (name of channel)

    // set channel var to channel name if response code is 0
}


// Leave Channel
var leaveChannel = function() {
    // route -> '/chat/leave'
    // params-> 'channel' (name of channel)

    // set channel var to [something] if response code is 0
}


// Render Messages As HTML
var renderHTML = function(data) {
    var htmlString = '';
    for (i = 0; i < data.length; i++) {
        htmlString += (data[i].author + ': ' + data[i].text + '<br/>')
    }
    document.getElementById("messageList").innerHTML += htmlString;
}

// Update Loop
var timeout = function(){
setTimeout(function () {
    getUpdates();
    timeout();
}, 1000);
}


// Force Login So We Can Use It
$.post("/session/login", {'username': 'monkey'})

// Begin Update Loop
timeout();
