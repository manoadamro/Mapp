var index = -1;
var channel = 'global';
var view = '';


var setChannelView = function(){
    var messageList = '<div id="messageList" class="center"></div>'
    var messageForm = '<form class="center">' +
                      '<textarea class="center textBox" type="text" type="textarea" id="messageForm"></textarea>' +
                      '<br />' +
                      '<button id="send">Send</button>' +
                      '</form>' +
                      '<form class="center">' +
                      '<button id="logout">Log Out</button>' +
                      '</form>'

    document.getElementById('page').innerHTML = messageList + messageForm
    view = 'channel'

    $("#send").click(function(event) {
        message = document.getElementById('messageForm').value;
        params = {"message": message, "channel": channel}
        $.post("/chat/message", params)
        document.getElementById('messageForm').value = ''
        event.preventDefault();
    });

    $("#logout").click(function(event) {
        clearSession();
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

    updateLoop();
}

var setLogInView = function() {
    var loginForm = '<form class="center">' +
               '<input class="center textBox" type="text" type="text" id="usernameForm"></input>' +
               '<br />' +
               '<button id="login">Log In</button>' +
               '</form>'
    document.getElementById('page').innerHTML = loginForm
    view = 'login'

    $("#login").click(function(event) {
        var username = document.getElementById('usernameForm').value
        $.post("/session/login", {'username': username}).done(function(response){
            console.log(response)
            if (response.code == 0) {
                setChannelView();
            }
            else {
                displayError(response.message);
            }
        });
        event.preventDefault();
    });
}


var getUpdates = function() {
    params = {"index": index, "channel": channel}
    $.get("/chat/update", params).done(function(response){
        if (response.code === 0) {
            var parsedMessages = response.data;
            if (parsedMessages.length > 0) {
                renderMessages(parsedMessages);
                index = parsedMessages[parsedMessages.length - 1].index
            }
        }
        else {
            displayError(response.message);
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
            displayError(response.message);
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
            displayError(response.message);
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
            displayError(response.message);
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
            displayError(response.message);
        }
    });
}


var clearMessages = function() {
    document.getElementById("messageList").innerHTML = "";
}

var displayError = function(message) {
    document.getElementById('message').innerHTML = message
}


var renderMessages = function(data) {
    var htmlString = '';
    for (i = 0; i < data.length; i++) {
        htmlString += ('<span class="message">' + data[i].author + ': ' + data[i].text + '<br/>' + '</span>')
    }
    document.getElementById("messageList").innerHTML += htmlString;
}


var updateLoop = function(){
    setTimeout(function () {
        if (view === 'channel'){
            getUpdates();
            updateLoop();
        }
    }, 1000);
}

var clearSession = function(){
    $.post("/session/logout", {})
}

// On Start
clearSession();
setLogInView();