import cherrypy


class Server:
    def __init__(self, config):
        self.config = config

    def build(self):
        for item in self.config:
            app = self.config[item]()
            self.mount(app, item)

    def mount(self, app, route, config=None):
        cherrypy.tree.mount(app, route, config)

    def start(self):
        cherrypy.engine.start()
        cherrypy.engine.block()
