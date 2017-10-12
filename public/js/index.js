
var setChannelView = function(){

    var languageSelector = '<p id="targetLanguageLabel"></p>' +
                           '<form id="languageSelector">' +
                           '<input class="center textBox" type="text" type="text" id="languageForm"></input>' +
                           '<button id="setLanguage">Set Language</button>' +
                           '</form>'

    var messageList = '<div id="messageList" class="center"></div>'

    var messageForm = '<form class="center">' +
                      '<textarea class="center textBox" type="text" type="textarea" id="messageForm"></textarea>' +
                      '<br />' +
                      '<button id="send" class="btn btn-primary">Send</button>' +
                      '</form>' +
                      '<form class="center">' +
                      '<br />' +
                      '<button id="logout">Log Out</button>' +
                      '</form>'

    document.getElementById('page').innerHTML = languageSelector + messageList + messageForm
    view = 'channel'

    $("#setLanguage").click(function(event) {
        changeLanguage();
        event.preventDefault();
    });

    $("#send").click(function(event) {
        message = document.getElementById('messageForm').value;
        params = {"message": message, "channel": channel}
        $.post("/chat/message", params).done(function(response){
            if (response.code === 0){
                document.getElementById('messageForm').value = ''
                displayError('')
            }
        })
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

    refreshTargetLanguage(targetLanguage)
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
        if (username.length === 0) {
            displayError('Username can not be empty')
        }
        else {
            $.post("/session/login", {'username': username, 'language': 'en'}).done(function(response){
                if (response.code == 0) {
                    setChannelView();
                    displayError('')
                }
                else {
                    displayError(response.message);
                }
            });
        }
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
            displayError('')
        }
        else {
            displayError(response.message);
        }
    })
};

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
