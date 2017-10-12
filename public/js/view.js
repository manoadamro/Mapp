var view = '';


var setChannelView = function(){

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
                document.getElementById('messageForm').innerHTML = ''
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