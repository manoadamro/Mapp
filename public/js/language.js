(function(exports) {
	DEFAULT_LANGUAGE = "en";

	var Language = function() {
		this.languageCode = DEFAULT_LANGUAGE;
		this.languageString = getKeyByValue(LANGUAGES, DEFAULT_LANGUAGE);
	};

	Language.prototype.targetLanguageHTML = function() {
		return "Receiving messages in <strong>" + this.languageString + "</strong>";
	};

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	Language.prototype.changeLanguage = function(language) {
		var fullLanguage = getKeyByValue(LANGUAGES, language);
		this.languageCode = language;
		this.languageString = fullLanguage;
		document.getElementById(
			"targetLanguageLabel"
		).innerHTML = this.targetLanguageHTML();
	};

	Language.prototype.generateLanguageList = function() {
		var str = "";
		Object.keys(LANGUAGES).forEach(function(key) {
			var value = LANGUAGES[key];
			str +=
				"<a href=" +
				"javascript:language.changeLanguage(\"" +
				value +
				"\")>" +
				key +
				"</a>";
		});
		return str;
	};

	Language.prototype.languageListHtml = function() {
		return (
			"<p id=\"targetLanguageLabel\">" +
			this.targetLanguageHTML() +
			"</p>" +
			"<div class=\"dropdown\">" +
			"<button class=\"dropbtn\">Languages</button>" +
			"<div class=\"dropdown-content\">" +
			this.generateLanguageList() +
			"</div>" +
			"</div>"
		);
	};

	exports.language = new Language();
})(this);
