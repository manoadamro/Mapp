
(function(exports){

	ERROR_MESSAGE_ELEMENT_ID = 'error-messages';

    var Error = function(message){
        this.message = message;
    }

    Error.prototype.format = function() {
    	return '<span>' + this.message + '</span>'
    };


    var ErrorLog = function(){
    	this.element = document.getElementById(ERROR_MESSAGE_ELEMENT_ID);
    	this.clear();
    }

    ErrorLog.prototype.append = function(message) {
    	var error = new Error(message);
    	this.log.push(error)
    };

    ErrorLog.prototype.clear = function() {
    	this.log = [];
    	this.element.innerHTML = ''
    };

    ErrorLog.prototype.formatList(first_argument) {
    	var string = '';
    	for (var i = this.log.length - 1; i >= 0; i--) {
    		var line =  this.log[i].format() + '<br />';
    		string += line;
    	}
    	return string;
    };

    ErrorLog.prototype.render = function() {
    	this.element.innerHTML = '<p>' + this.formatList() + '</p>';
    };

    exports.errors = new ErrorLog();

})(this);