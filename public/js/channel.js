var channel = '';

var createChannel = function(name) {
    params = {"channel": name}
//    $.post("/chat/create", params).done(function(response) {
//        if (response.code === 0) {
//            console.log("creating " + name)
//            switchChannel(name)
//        }
//        else {
//            displayError(response.message);
//        }
//    });
    postRequest("/chat/create", params, function(response){
        switchChannel(name)
    })
}


var deleteChannel = function() {
    params = {"channel": channel}
//    $.post("/chat/delete", params).done(function(response) {
//        if (response.code === 0) {
//            console.log("deleteing " + name)
//            switchChannel('global')
//        }
//        else {
//            displayError(response.message);
//        }
//    });
    postRequest("/chat/delete", params, function(response){
        switchChannel('global')
    })
}

var joinChannel = function(name){
    params = {"channel": name}
//    $.post("/chat/join", params).done(function(response) {
//        if (response.code === 0) {
//            console.log("joining " + name)
//            channel = name
//            clearMessages()
//            index = -1
//            displayError('')
//        }
//        else {
//            displayError(response.message);
//        }
//    });
    postRequest("/chat/join", params, function(response){
        channel = name
        clearMessages()
        index = -1
    })
}

var switchChannel = function(name) {
    if (channel !== '') {
        params = {"channel": channel}
//        $.post("/chat/leave", params).done(function(response) {
//            if (response.code === 0) {
//                console.log("leaving " + channel)
//                joinChannel(name)
//            }
//            else {
//                displayError(response.message);
//            };
//        })
        postRequest("/chat/leave", params, function(response){
            joinChannel(name)
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
//    $.get("/chat/list", {}).done(function(response){
//        if (response.code === 0) {
//            displayError('')
//            renderChannels(response.data)
//        }
//        else {
//            displayError(response.message);
//        }
//    })
    getRequest("/chat/list", {}, function(response){
        renderChannels(response.data)
    })
}

getChannelList()
