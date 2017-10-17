from .database import DatabaseController
from time import gmtime, strftime, time


class MessageLog:

    def __init__(self):
        self.message_list = []
        self.db = DatabaseController()

    def add_message(self, author, text, channel='global'):
        message = self._new_message(text=text, author=author)
        self.db.add_message(message=text, author=author, table=channel)
        self.message_list.append(message)

    def get_messages(self, channel, index):
        messages = self.db.get_all_messages(table=channel)
        if len(messages) > index:
            next_index = index + 1
            return messages[next_index:]
        else:
            return []
        return

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
            'timestamp': strftime("%H:%M", gmtime())
        }

    def __len__(self):
        return len(self.message_list)

    def __getitem__(self, item):
        return self.message_list[item]

    def __setitem__(self, key, value):
        self.message_list[key] = value
