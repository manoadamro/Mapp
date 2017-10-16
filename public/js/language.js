(function(exports){

	var refreshTargetLanguage = function(name) {
		document.getElementById("targetLanguageLabel").innerHTML = "Target Language: <strong>" + name + "</strong>";
	};

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	var changeLanguage = function(language) {
		console.log('switched language: ' + language); // <--- never gets called
		var fullLanguage = getKeyByValue(LANGUAGES, language);
		refreshTargetLanguage(fullLanguage);
	};

	var generateLanguageList = function() {
		var str = "";
		Object.keys(LANGUAGES).forEach(function(key) {
			var value = LANGUAGES[key];
			str += "<a href=" + 'javascript:changeLanguage("' + value + '")>' + key + "</a>";
		});
		return str;
	};

	var languageList =
		'<p id="targetLanguageLabel"></p>' +
		'<div class="dropdown">' +
		'<button class="dropbtn">Languages</button>' +
		'<div class="dropdown-content">' +
		generateLanguageList() +
		"</div>" +
		"</div>";

	exports.languageList = languageList;
	exports.changeLanguage = changeLanguage;
})(this);