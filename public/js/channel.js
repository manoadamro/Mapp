var channel = 'global';

var createChannel = function(name) {
    params = {"channel": name}
    $.post("/chat/create", params).done(function(response) {
        if (response.code === 0) {
            joinChannel(name)
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
            leaveChannel()
        }
        else {
            displayError(response.message);
        }
    });
}

var joinChannel = function(name) {
    if (channel !== '') {
        leaveChannel()
    }
    params = {"channel": name}
    $.post("/chat/join", params).done(function(response) {
        if (response.code === 0) {
            channel = name
            displayError('')
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
            channel = ''
            displayError('')
        }
        else {
            displayError(response.message);
        }
    });
}


var getChannelList = function() {
    $.get("/chat/channels", {}).done(function(response){
        if (response.code === 0) {
            // channel list is in response.data
            displayError('')
        }
        else {
            displayError(response.message);
        }
    })
}
