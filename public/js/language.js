var targetLanguage = "English";

var changeLanguage = function(language) {
	if (language.length > 0) {
		params = { language: language };
		postRequest("/chat/language", params, function() {
			fullLanguage = getKeyByValue(LANGUAGES, language);
			refreshTargetLanguage(fullLanguage);
		});
	}
};

var refreshTargetLanguage = function(name) {
	document.getElementById("targetLanguageLabel").innerHTML =
		"Target Language: <strong>" + name + "</strong>";
};

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
