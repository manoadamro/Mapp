from time import time
from .database import DatabaseController


class MessageLog:

    def __init__(self):
        self.message_list = []
        self.db = DatabaseController()

    def add_message(self, author, text):
        message = self._new_message(text, author)
        self.db.add_message(author, text)
        self.message_list.append(message)

    def get_messages(self, index):
        if len(self.message_list) > index:
            next_index = index + 1
            return self.message_list[next_index:]
        else:
            return []

    def _new_message(self, text, author):
        length = len(self.message_list)
        if length > 0:
            index = self.message_list[length - 1]['index'] + 1
        else:
            index = 0

        return {
            'index': index,
            'text': text,
            'author': author,
            'timestamp': time()
        }

    def __len__(self):
        return len(self.message_list)

    def __getitem__(self, item):
        return self.message_list[item]

    def __setitem__(self, key, value):
        self.message_list[key] = value
