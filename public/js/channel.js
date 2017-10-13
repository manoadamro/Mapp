var channel = '';

var createChannel = function(name) {
    params = {"channel": name}
    $.post("/chat/create", params).done(function(response) {
        if (response.code === 0) {
            console.log("creating " + name)
            switchChannel(name)
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
            console.log("deleteing " + name)
            switchChannel('global')
        }
        else {
            displayError(response.message);
        }
    });
}

var joinChannel = function(name){
    params = {"channel": name}
    $.post("/chat/join", params).done(function(response) {
        if (response.code === 0) {
            console.log("joining " + name)
            channel = name
            clearMessages()
            index = -1
            displayError('')
        }
        else {
            displayError(response.message);
        }
    });
}

var switchChannel = function(name) {
    if (channel !== '') {
        params = {"channel": channel}
        $.post("/chat/leave", params).done(function(response) {
            if (response.code === 0) {
                console.log("leaving " + channel)
                joinChannel(name)
            }
            else {
                displayError(response.message);
            };
        })
    }
    else if(channel === name) {
        displayError("you are already in this channel");
    }
    else {
        joinChannel(name)
    }
}


var getChannelList = function() {
    $.get("/chat/list", {}).done(function(response){
        if (response.code === 0) {
            displayError('')
            renderChannels(response.data)
        }
        else {
            displayError(response.message);
        }
    })
}

getChannelList()
