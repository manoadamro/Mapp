class Controller:

    def ok(self, data=None, message=''):
        return {
            'code': 0,
            'message': message,
            'data': data
        }

    def error(self, data=None, message=''):
        return {
            'code': 1,
            'message': message,
            'data': data
        }
