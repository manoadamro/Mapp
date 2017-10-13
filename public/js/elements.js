var languageSelector =
	'<p id="targetLanguageLabel"></p>' +
	'<form id="languageSelector">' +
	'<input class="center textBox" type="text" type="text" id="languageForm"></input>' +
	'<button id="setLanguage">Set Language</button>' +
	"</form>";

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
	'<button class="btn" id="send">Send</button>' +
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

var createChannel =
	'<form id="createChannel">' +
	'<input class="" type="text" id="channelForm"></input>' +
	"<button>Create Channel</button>" +
	"</form>";
