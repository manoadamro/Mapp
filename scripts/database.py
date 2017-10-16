import sqlite3
import datetime

conn = sqlite3.connect('./db/messenger.db')
c = conn.cursor()


def create_table():
    c.execute(
        'CREATE TABLE IF NOT EXISTS chatMessages(datestamp TEXT, message TEXT, author TEXT)')


def data_entry(message, author):
    today = datetime.datetime.now()
    c.execute(
        "INSERT INTO chatMessages VALUES(?, ?, ?)", (today, message, author))
    conn.commit()


def get_entries():
    with conn:
        c.execute("SELECT * FROM chatMessages")
        print(c.fetchall())


def delete_message(message):
    with conn:
        c.execute("DELETE FROM chatMessages WHERE message=?", (message,))


def delete_all_entries():
    with conn:
        c.execute("DELETE FROM chatMessages")


def update_entry():
    with conn:
        c.execute(
            "UPDATE chatMessages SET message = 'Goodbye world!' WHERE message = 'Hello world now!!'")


create_table()
data_entry('Hello!', 'Stephen')
data_entry('Hi!', 'Tom')
get_entries()
delete_message('Hello!')
get_entries()
delete_all_entries()


c.close()
conn.close()
