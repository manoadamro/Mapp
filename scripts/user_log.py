from .user import User


class UserLog:
    def __init__(self):
        self.users = {}

    def add_user(self, uid, user):
        assert user is User, 'values added to UserLog but be instances of User'
        if uid not in self.users:
            self.users[uid] = user

    def remove_user(self, uid):
        if uid in self.users:
            del self.users[uid]

    def __getitem__(self, item):
        return self.users[item]

    def __setitem__(self, key, value):
        self.users[key] = value

    def __delitem__(self, key):
        del self.users[key]

    def __contains__(self, item):
        return item in self.users

    def __len__(self):
        return len(self.users)
