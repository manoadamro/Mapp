import cherrypy


class Server:
    def __init__(self, config):

        """
        Handles cherrypy.
        :param config: the site map. key = route, value = class
        """
        self.config = config
        self.tree = cherrypy.tree
        self.engine = cherrypy.engine

    def build(self):

        """
        Build the routes from the config dictionary passed into constructor
        :return: no return value
        """
        for item in self.config:
            app = self.config[item]()
            self.tree.mount(app, item)

    def start(self):

        """
        start the cherrypy server
        :return: no return value
        """
        self.engine.start()
        self.engine.block()
