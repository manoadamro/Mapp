from time import time
from .message_log import MessageLog


class Channel:
    def __init__(self, name, creator):
        self.message_log = MessageLog()
        self.user_log = []
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

    def add_message(self, author, text, channel):
        self.message_log.add_message(author=author, text=text, channel=channel)

    def get_messages(self, channel, index):
        return self.message_log.get_messages(channel=channel, index=index)

    def sentiment(self):
        return self.total_sentiment / len(self.message_log)
