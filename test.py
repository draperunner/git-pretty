import unittest

import gitpretty


def test_path(path):
    values = iter(path)
    gitpretty.input = lambda p: next(values)
    return gitpretty.main()


class TestGitPretty(unittest.TestCase):
    def test_paths(self):
        paths = ["12", "11", "21", "2211", "2212", "2213", "2221", "2222", "321", "322", "312", "321", "322", "3111",
                 "31121", "31122"]

        for path in paths:
            self.assertEqual(path, test_path(path))


if __name__ == "__main__":
    unittest.main()
