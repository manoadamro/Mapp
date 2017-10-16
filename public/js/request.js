

(function(exports){

    var Request = function(method, route){
        this.method = method;
        this.route = route;
    }

    Request.prototype.execute = function(params, onPass) {
        this.method(this.route, params).done(function(response){
            if (response.code == 0){
                if(onPass !== null) {
                    onPass(response.data);
                }
            }
            else {
                errors.append(response.message);
                errors.render();
                errors.clear();
            }
        });
    };

    var postRequest = function(route) {
        var req = new Request($.post, route);
        return req;
    }

    var getRequest = function(route) {
        var req = new Request($.get, route);
        return req;
    }

    exports.postRequest = postRequest;
    exports.getRequest = getRequest;

})(this);