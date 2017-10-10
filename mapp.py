from config.routes import site_map
from scripts.server import Server

if __name__ == '__main__':
    server = Server(site_map)
    server.build()
    server.start()

