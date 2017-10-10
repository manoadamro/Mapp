from time import time


class MessageLog:
    def __index__(self):
        self.message_list = []

    def add_message(self, text, author):
        """
        Adds a new message to the log
        :param text: the message body
        :param author: the message author
        :return: no return value
        """
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
        return {
            'index': len(self.message_list),
            'text': text,
            'author': author,
            'timestamp': time()
        }