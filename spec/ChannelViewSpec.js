describe("Channel view", function() {


  beforeEach(function() {
    updateLoop = function() {};
    jqueryDone = function(func) {
      func({
            'code': 0,
            'message': 'hello',
            'data': { text: "text", author: "" }
        });
    };
    $.post = function() {
      return { done: jqueryDone };
    };
    $.get = function() {
      return { done: jqueryDone };
    };
//    setChannelView();
  });

  afterEach(function() {
    document.getElementById("messageForm").innerHTML = "";
    document.getElementById("messageList").innerHTML = "";
    document.getElementById("languageForm").value = "";
  });

  describe("Sending a message", function() {
    it("The text box clears after sending", function() {
      document.getElementById("messageForm").innerHTML = "text";
      send.click();
      expect(document.getElementById("messageForm").innerHTML).toEqual(
      ""
       );
    });

    it("Target language updates when you set language", function() {
      document.getElementById("languageForm").value = "fr";
      setLanguage.click();
      expect(document.getElementById("targetLanguageLabel").innerHTML).toEqual(
        "Target Language: fr"
      );
     });
  });
});
