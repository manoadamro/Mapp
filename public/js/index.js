var index = -1
var channel = 'global'

$("#send").click(function(event) {
	message = document.getElementById('messageForm').value;
	params = {"message": message, "channel": channel}
	$.post("/chat/message", params)
	document.getElementById('messageForm').value = ''
	event.preventDefault();
});

$("#addChannel").click(function(event) {
    name = document.getElementById('channelForm').value
    createChannel(name);
    event.preventDefault();
});

$("#deleteChannel").click(function(event) {
    deleteChannel(channel);
    event.preventDefault();
});


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
            displayError(data.message);
        }
    })
};


var createChannel = function(name) {
    params = {"channel": name}
    $.post("/chat/create", params).done(function(response) {
        if (response.code === 0) {
            channel = name
            clearMessages()
        }
        else {
            displayError(data.message);
        }
    });
}


var deleteChannel = function() {
    params = {"channel": channel}
    $.post("/chat/delete", params).done(function(response) {
        if (response.code === 0) {
            channel = 'global'
            clearMessages()
        }
        else {
            displayError(data.message);
        }
    });
}


var joinChannel = function(name) {
    leaveChannel()
    params = {"channel": name}
    $.post("/chat/join", params).done(function(response) {
        if (response.code === 0) {
            channel = name
        }
        else {
            displayError(data.message);
        }
    });
}


var leaveChannel = function() {
    params = {"channel": channel}
    $.post("/chat/leave", params).done(function(response) {
        if (response.code === 0) {
            channel = 'global'
        }
        else {
            displayError(data.message);
        }
    });
}


var clearMessages = function() {
    document.getElementById("messageList").innerHTML = "";
}

var displayError = function(message) {
    throw message;
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
