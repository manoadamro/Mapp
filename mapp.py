from os import getcwd

from config.routes import site_map
from scripts.server import Server

if __name__ == '__main__':
    app_dir = getcwd()
    server = Server(site_map, app_dir)
    server.build()
    server.start()

