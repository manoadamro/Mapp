
var clearMessages = function() {
	document.getElementById("messageList").innerHTML = "";
};

var displayError = function(message) {
	document.getElementById("message").innerHTML = message;
};

var clearSession = function() {
	$.post("/session/logout", {});
};

function request(method, route, params, onPass) {
    method(route, params).done(function(response){
        if(response.code === 0) {
            onPass(response);
            displayError('')
        } else {
            displayError(response.message);
        }
    })
}

var postRequest = function(route, params, onPass) {
    request($.post, route, params, onPass)
}

var getRequest = function(route, params, onPass) {
    request($.get, route, params, onPass)
}