sentimentTest = document.getElementById("sentimentTest");

var getSentiment = function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open(
		"POST",
		"http://text-processing.com/api/sentiment?text=great"
	);
	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		console.log(ourData);
	};
	ourRequest.send();
};

sentimentTest.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open(
		"GET",
		"http://text-processing.com/api/sentiment/text=this-is-great!"
	);
	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		console.log(ourData);
	};
	ourRequest.send();
});

function renderHTML(data) {
	var htmlString = "";
	for (i = 0; i < 5; i++) {
		htmlString +=
			"<li> <a href= " +
			data.response.results[i].webUrl +
			">" +
			data.response.results[i].webTitle +
			"</a></li>";
		//  console.log(data.response.results[i].webTitle);
	}
	// newsfeed.insertAdjacentHTML('beforeend', htmlString);
	newsfeed.innerHTML = htmlString;
	console.log(htmlString);
}

// getSentiment();

$.ajax({
	url: "http://text-processing.com/api/sentiment",
	beforeSend: function(xhr) {
		xhr.setRequestHeader("text", "This is great");
	},
	success: function(data) {
		alert(data);
		//process the JSON data etc
	}
});
