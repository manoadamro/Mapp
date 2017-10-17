
var DEFAULT_CHANNEL_NAME = 'global'
var user = null;


var renderLogInView = function(){

	session.logOut(null);

	document.getElementById('menu-toggle').style.display = 'none'

	var loginForm = new LoginForm(user);
	loginForm.render("page");
}

var renderChannelView = function(){

	var channels = new Channels();

	var pageHtml = language.languageListHtml() + channels.channelHtml();
	document.getElementById("page").innerHTML = pageHtml;

	var messages = new Messages(user, channels);
	messages.render();

	var sideBar = new SideBar(user, channels, messages);
	sideBar.render();
	channels.getWhiteList(user.channel, function(response) {
        userlist = document.getElementById('userList')
        userList.innerHTML = ''
        for(i=0; i<response.length; i++) {
            userList.innerHTML += '<li>' +
            response[i] +
            '</li>'
        }
	})

	document.getElementById('menu-toggle').style.display = 'initial'
		
	$("#logout").click(function(event) {
		session.logOut(function(response){
			user = null;
			renderLogInView();
		})
	});

	messages.loop();
}

renderLogInView();