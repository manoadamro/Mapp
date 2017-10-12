var targetLanguage = 'en';

var changeLanguage = function() {

    language = document.getElementById('languageForm').value;

    if (language.length > 0){
        $.post("/chat/language", {"language": language}).done(function(response){
            if (response.code === 0) {
                targetLanguage = language;
                refreshTargetLanguage();
                displayError('');

            }
            else {
                displayError('failed to change target language');
            }
        })

    }
}

var refreshTargetLanguage = function(){
    document.getElementById('targetLanguageLabel').innerHTML = "Target Language: " + targetLanguage
}