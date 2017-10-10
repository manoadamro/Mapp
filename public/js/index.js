var index = -1

$("#send").click(function(event) {
			message = document.getElementById('messageForm').value;
			if (message != '') {
				$.post("/message/new", {"message": message})
				document.getElementById('messageForm').value = ''
				event.preventDefault();
			}
		});

 function getUpdates() {
    $.get("/message/updates", {"index": index}).done(function(data){
	var parsedMessages = (data);
	if (parsedMessages.length > 0) {
        renderHTML(parsedMessages);
        }
	})
};


function renderHTML(data) {
 var htmlString = '';
 for (i = 0; i < data.length; i++) {
    //  console.log(data[i].text)
   htmlString += '<span class="message">' + data[i].text + data[i].author + '<br/>' + '</span>'
 }
 document.getElementById("messageList").innerHTML += htmlString;
 index = data[data.length - 1].index
}

function timeout(){
setTimeout(function () {
    getUpdates();
    timeout();
}, 1000);
}


timeout();
