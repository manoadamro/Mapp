
var clearMessages = function() {
    document.getElementById("messageList").innerHTML = "";
}

var displayError = function(message) {
    document.getElementById('message').innerHTML = message
}

var clearSession = function(){
    $.post("/session/logout", {})
}