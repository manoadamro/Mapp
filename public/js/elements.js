var languageList =
	'<p id="targetLanguageLabel"></p>' +
	'<div class="dropdown">' +
	'<button class="dropbtn">Languages</button>' +
	'<div class="dropdown-content">' +
	generateLanguageList() +
	"</div>" +
	"</div>";

var messageList = '<div id="messageList" class="message-list"></div>';

var messageForm =
	'<form class="message-form">' +
	'<input class="text-box" type="text" type="textarea" id="messageForm"></input>' +
	"<br />" +
	'<button class="btn btn-primary" id="send">Send</button>' +
	"</form>" +
	'<form class="center">' +
	"<br />" +
	'<button class="btn btn-danger" id="logout">Log Out</button>' +
	"</form>";

var loginForm =
	"<form>" +
	"<div class='name-input'>Input your name:<div>" +
	'<input class="usernameForm" type="text" id="usernameForm"></input>' +
	"<br />" +
	'<button class="login btn btn-success" id="login">Log In</button>' +
	"</form>";

var createPublicChannel =
	'<form id="createChannel">' +
	'<input class="" type="text" id="publicChannelForm"></input>' +
	"<button>Create Public Channel</button>" +
	"</form>";

var createPrivateChannel =
	'<form id="createChannel">' +
	'<input class="" type="text" id="privateChannelForm"></input>' +
	"<button>Create Private Channel</button>" +
	"</form>";

var addUser=
    '<form id="addUser">' +
	'<input class="" type="text" id="userForm"></input>' +
	"<button>Add User</button>" +
	"</form>";