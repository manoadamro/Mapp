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
			"<div class=\"dropdown\" id='dropdown'>" +
			"<button class=\"dropbtn\">Languages</button>" +
			"<div class=\"dropdown-content\" >" +
			"<input type='text' id='myInput' placeholder='Search...' onkeyup='language.filterFunction()'>" +
			this.generateLanguageList() +
			"</div>" +
			"</div>"
		);
	};

	Language.prototype.filterFunction = function() {
		var input, filter, ul, li, a, i;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		div = document.getElementById("dropdown");
		a = div.getElementsByTagName("a");
		for (i = 0; i < a.length; i++) {
			if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
				a[i].style.display = "";
			} else {
				a[i].style.display = "none";
			}
		}
	};

	exports.language = new Language();
})(this);
