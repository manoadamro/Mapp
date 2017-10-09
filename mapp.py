
from lib.server import Server
from controllers.app import App


# route config
config = {
    '/': App
}

# create server
server = Server(config)

# build routes
server.build()

# start server
server.start()

# visit http://localhost:8080/ to see html file
