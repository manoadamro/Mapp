describe("Features", function() {



  beforeEach(function() {
    sendButton = document.getElementById("send");
    timeout = function() {};
    jqueryDone = function(func) {
      func([{ text: "text", author: "" }]);
    };
    $.post = function() {
      return { done: jqueryDone };
    };
    $.get = function() {
      return { done: jqueryDone };
    };
  });

  afterEach(function() {
    document.getElementById("messageForm").innerHTML = "";
    document.getElementById("messageList").innerHTML = "";
  });

  describe("send a message", function() {
    it("renders on screen", function(done) {
      messageForm.value = "text";
      sendButton.click();
      // console.log(document.getElementById('messageList').innerHTML)
      setTimeout(function() {
        expect(document.getElementById("messageList").innerHTML).toEqual(
          "text<br>text<br>"
        );
        done();
      }, 1000);
    });
  });
});
