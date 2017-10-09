from time import time


class MessageLog:
    def __index__(self):
        self.message_list = []

    def add_message(self, text, author):
        message = self._new_message(text, author)
        self.message_list.append(message)

    def get_messages(self, index):
        if len(self.message_list) > index:
            next_index = index + 1
            return self.message_list[next_index:]
        else:
            return []

    def _new_message(self, text, author):
        return {
            'index': len(self.message_list),
            'text': text,
            'author': author,
            'timestamp': time()
        }