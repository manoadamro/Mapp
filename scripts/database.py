import sqlite3
import datetime

conn = sqlite3.connect('./db/messages.db', check_same_thread=False)
c = conn.cursor()


class DatabaseController:

    def create_table(self, table):
        c.execute(
            'CREATE TABLE IF NOT EXISTS {}(datestamp TEXT, message TEXT, author TEXT, formatted_time TEXT)'.format(table))

    def add_message(self, message, author, table):
        self.create_table(table)
        today = datetime.datetime.now()
        formatted_time = today.strftime("%b %d %H:%M")
        c.execute(
            "INSERT INTO {} VALUES(?, ?, ?, ?)".format(table), (today, message, author, formatted_time,))
        conn.commit()
        self.get_all_messages(table)

    def print_all_messages(self, table):
        with conn:
            c.execute("SELECT * FROM {}".format(table))
            for row in c.fetchall():
                print(row)

    def get_all_messages(self, table):
        str = ''
        with conn:
            c.execute("SELECT * FROM {}".format(table))
            return c.fetchall()

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

# c.close()
# conn.close()
