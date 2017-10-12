var index = -1;
var view = '';

var clearMessages = function() {
    document.getElementById("messageList").innerHTML = "";
}

var displayError = function(message) {
    document.getElementById('message').innerHTML = message
}