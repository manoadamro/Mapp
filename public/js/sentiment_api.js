console.log("hello");

sentimentTest = document.getElementById("sentimentTest");

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
