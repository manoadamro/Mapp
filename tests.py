import pytest
import unittest
from lib.test_file import TestFileThing

class TestFileTests(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_hello(self):
        obj = TestFileThing()
        self.assertEqual(obj.say_hello(), 'hello!')

if __name__ == '__main__':
    unittest.main()
