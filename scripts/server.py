import cherrypy


class Server:

    def __init__(self, config, root):

        """
        Handles cherrypy.
        :param config: the site map. key = route, value = class
        """
        self.root = root
        self.config = config
        self.tree = cherrypy.tree
        self.engine = cherrypy.engine

    def app_config(self):
        return {
            '/static': {
                "tools.staticdir.on": True,
                "tools.staticdir.dir": "%s/public" % self.root
            }
        }

    def build(self):

        """
        Build the routes from the config dictionary passed into constructor
        :return: no return value
        """
        for item in self.config:
            app = self.config[item]()
            self.tree.mount(app, item, self.app_config())

    def start(self):

        """
        start the cherrypy server
        :return: no return value
        """
        self.engine.start()
        self.engine.block()
