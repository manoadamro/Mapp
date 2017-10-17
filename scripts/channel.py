from time import time
from .message_log import MessageLog


class Channel:
    def __init__(self, name, creator, white_list):
        self.message_log = MessageLog()
        self.user_log = []
        self.white_list = white_list
        self.name = name
        self.creator = creator
        self.created_at = time()

        self.sentiment_analyzer = Sentiment()
        self.total_sentiment = 0

    def add_user(self, uid):
        self.user_log.append(uid)

    def remove_user(self, uid):
        self.user_log.remove(uid)

    def contains_user(self, uid):
        return uid in self.user_log

    def add_message(self, author, text):
        self.message_log.add_message(author, text)

    def get_messages(self, index):
        return self.message_log.get_messages(index)

    def sentiment(self):
        return self.total_sentiment / len(self.message_log)
