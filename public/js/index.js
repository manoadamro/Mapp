var index = -1
var channel = 'global'

$("#send").click(function(event) {
	message = document.getElementById('messageForm').value;
	params = {"message": message, "channel": channel}
	$.post("/chat/message", params)
	document.getElementById('messageForm').value = ''
	event.preventDefault();
});

var getUpdates = function() {
    params = {"index": index, "channel": channel}
    $.get("/chat/update", params).done(function(response){
        if (response.code === 0) {
            var parsedMessages = response.data;
            if (parsedMessages.length > 0) {
                renderHTML(parsedMessages);
            }
        }
        else {
            // error = data.message
        }
    })
};


var createChannel = function() {
    // route -> '/chat/create'
}

var deleteChannel = function() {
    // route -> '/chat/delete'
}

var joinChannel = function() {
    // route -> '/chat/join'
}

var leaveChannel = function() {
    // route -> '/chat/leave'
}


var renderHTML = function(data) {
    var htmlString = '';
    for (i = 0; i < data.length; i++) {
        htmlString += (data[i].author + ': ' + data[i].text + '<br/>')
    }
    document.getElementById("messageList").innerHTML += htmlString;
    index = data[data.length - 1].index
}


var timeout = function(){
setTimeout(function () {
    getUpdates();
    timeout();
}, 1000);
}


$.post("/session/login", {'username': 'monkey'})

timeout();
