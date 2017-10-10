describe('Features', function() {

  beforeEach(function() {
    sendButton = document.getElementById('send')

    jqueryDone = function(){}
    $.post = function(){return {done: jqueryDone}}
    $.get = function(){return {done: jqueryDone}}
  })

  afterEach(function() {
    document.getElementById('messageForm').innerHTML = ''
    document.getElementById('messageList').innerHTML = ''
  })

  describe('send a message', function() {
    it('renders on screen', function() {
      messageForm.value = 'teehee!'
      sendButton.click()
      expect(document.getElementById('messageList').innerHTML).toEqual('teehee!<br>')
    })
  })
  })
