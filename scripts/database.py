import sqlite3
import datetime

conn = sqlite3.connect('./db/messenger.db', check_same_thread=False)
c = conn.cursor()


class DatabaseController:

    def create_table(self):
        c.execute(
            'CREATE TABLE IF NOT EXISTS chatMessages(datestamp TEXT, message TEXT, author TEXT)')

    def add_message(self, message, author):
        self.create_table()
        today = datetime.datetime.now()
        c.execute(
            "INSERT INTO chatMessages VALUES(?, ?, ?)", (today, message, author))
        conn.commit()
        # self.get_all_messages()
        # c.close()
        # conn.close()

    def get_all_messages(self):
        with conn:
            c.execute("SELECT * FROM chatMessages")
            for row in c.fetchall():
                print(row)

    def delete_message(self, message):
        with conn:
            c.execute("DELETE FROM chatMessages WHERE message=?", (message,))

    def delete_all_entries(self):
        with conn:
            c.execute("DELETE FROM chatMessages")

    def update_entry(self, old_message, new_message):
        with conn:
            c.execute(
                "UPDATE chatMessages SET message = ? WHERE message = ?", (old_message, new_message,))


DatabaseController().create_table()

# c.close()
# conn.close()
