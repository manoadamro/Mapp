var index = -1;
//var channel = 'global';
var view = '';
var targetLanguage = 'en';

var clearMessages = function() {
    document.getElementById("messageList").innerHTML = "";
}

var displayError = function(message) {
    document.getElementById('message').innerHTML = message
}