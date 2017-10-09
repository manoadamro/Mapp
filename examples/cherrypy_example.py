import cherrypy


class Server:
    def __init__(self):
        pass

    def mount(self, app, route, config=None):
        cherrypy.tree.mount(app, route, config)

    def start(self):
        cherrypy.engine.start()
        cherrypy.engine.block()


class Home:

    def __init__(self):
        pass

    # /
    @cherrypy.expose()
    def index(self):
        return "Hello Home"

    # /something
    @cherrypy.expose()
    def something(self):
        return "Something Home"


class Thing:

    def __init__(self):
        pass

    # /thing
    @cherrypy.expose()
    def index(self):
        return "Hello Thing"

    # /thing/something
    @cherrypy.expose()
    def something(self):
        return "Something Thing"



s = Server()
h = Home()
t = Thing()


s.mount(h, '/')
s.mount(t, '/thing')

s.start()
