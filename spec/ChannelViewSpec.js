describe("Features", function() {


  beforeEach(function() {
    updateLoop = function() {};
    jqueryDone = function(func) {
      func([{
            'code': 0,
            'message': 'hello',
            'data': { text: "text", author: "" }
        }]);
    };
    $.post = function() {
      return { done: jqueryDone };
    };
    $.get = function() {
      return { done: jqueryDone };
    };
    setChannelView();
    sendButton = document.getElementById("send");
  });

  afterEach(function() {
    document.getElementById("messageForm").innerHTML = "";
    document.getElementById("messageList").innerHTML = "";
  });

  describe("send a message", function() {
    it("text box clears", function(done) {
      document.getElementById("messageForm").value = "text";
      sendButton.click();
//       console.log(document.getElementById('messageList').innerHTML)
      setTimeout(function() {
        expect(document.getElementById("messageForm").innerHTML).toEqual(
          ""
        );
        done();
      }, 1000);
    });
  });
});
