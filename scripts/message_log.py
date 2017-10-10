from time import time


class MessageLog:

    def __init__(self):
        self.message_list = []

    def add_message(self, text):
        """
        Adds a new message to the log
        :param text: the message body
        :param author: the message author
        :return: no return value
        """
        author = ''  # get from session
        message = self._new_message(text, author)
        self.message_list.append(message)

    def get_messages(self, index):
        """
        uses 'last received index' and returns any message after that index
        :param index: the index of the last message the user received
        :return: a list of messages the user has not received yet
        """
        if len(self.message_list) > index:
            next_index = index + 1
            return self.message_list[next_index:]
        else:
            return []

    def _new_message(self, text, author):
        """
        creates a message dictionary from message body and author
        :param text: the message body
        :param author: the message author
        :return: a dictionary containing info about a single message
        """
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