import sqlite3
import datetime

conn = sqlite3.connect('./db/tutorial.db')
c = conn.cursor()


def create_table():
    c.execute(
        'CREATE TABLE IF NOT EXISTS chatMessages(unix REAL, datestamp TEXT, message TEXT)')


def data_entry():
    today = datetime.datetime.now()
    str = 'Hello world now!!'
    c.execute(
        "INSERT INTO chatMessages VALUES(?, ?, ?)", (123, today, str))
    conn.commit()


def get_entries():
    with conn:
        c.execute("SELECT * FROM chatMessages")
        print(c.fetchall())


def delete_entries():
    with conn:
        c.execute("DELETE FROM chatMessages")


def update_entry():
    with conn:
        c.execute(
            "UPDATE chatMessages SET message = 'Goodbye world!' WHERE message = 'Hello world now!!'")


data_entry()
get_entries()
update_entry()
get_entries()
delete_entries()
get_entries()


c.close()
conn.close()
