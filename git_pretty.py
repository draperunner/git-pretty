#!/usr/bin/python
from __future__ import print_function

from builtins import input


def interactive_rebase():
    print("We're going to do an interactive rebase!")
    print("Welcome to the DANGER ZONE!")
    print()
    print("git rebase -i {COMMITISH}")
    print()
    print("And when that's done, do this:")
    print()
    print("git push --force origin {branch}")
    print()


def main():
    print("So you have a mess on your hands. What sort of mess?")
    print()
    print("1: An uncommitted mess")
    print("2: I accidentally committed something")
    print("3: My Git history is ugly")
    response = input("> ")
    print()

    if response == "1":
        print("Do you care enough about your mess to keep it?")
        print()
        print("1: Yes")
        print("2: No")
        response = input("> ")
        print()

        if response == "1":
            print("Looks like we caught this just in time.")
            print("Split off a logical chunk from your mess, stage it and commit it with a good message.")
            print("Still have a mess? Do it again.")
            return "11"

        if response == "2":
            print("Looks like this is what you are looking for:")
            print()
            print("git reset --hard")
            print()
            return "12"

    if response == "2":
        print("Has anyone else seen it?")
        print()
        print("1: Yes")
        print("2: Not yet")
        response = input("> ")
        print()

        if response == "1":
            print("Looks like this is what you are looking for:")
            print()
            print("git revert {COMMITISH}")
            print()
            return "21"

        if response == "2":
            print("How long ago?")
            print()
            print("1: Last commit")
            print("2: It seems like forever ago")
            response = input("> ")
            print()

            if response == "1":
                print("What would make this better?")
                print()
                print("1: I forgot to add a file")
                print("2: A better message")
                print("3: Just throw the last commit away")
                response = input("> ")
                print()

                if response == "1":
                    print("Looks like this is what you are looking for:")
                    print()
                    print("git add {my_awesome_file}")
                    print("git commit --amend")
                    print()
                    return "2211"

                if response == "2":
                    print("Looks like this is what you are looking for:")
                    print()
                    print("git commit --amend")
                    print()
                    return "2212"

                if response == "3":
                    print("Looks like this is what you are looking for:")
                    print()
                    print("git reset --hard HEAD^")
                    print()
                    return "2213"

            if response == "2":
                print("Take a mulligan?")
                print()
                print("1: Yes")
                print("2: No")
                response = input("> ")
                print()

                if response == "1":
                    print("We'll reset and commit from scratch:")
                    print()
                    print("git reset {COMMITISH}")
                    print()
                    print("Then split off a logical chunk from your mess, stage it and commit it with a good message.")
                    print("Still have a mess? Do it again.")
                    return "2221"

                if response == "2":
                    interactive_rebase()
                    return "2222"

    if response == "3":
        print("Is it already on GitHub?")
        print()
        print("1: Yes")
        print("2: No")
        response = input("> ")
        print()

        if response == "1":
            print("Is anyone down stream?")
            print()
            print("1: Yes")
            print("2: No")
            response = input("> ")
            print()

            if response == "1":
                print("Enough to form a lynch mob?")
                print()
                print("1: Yes")
                print("2: No")
                response = input("> ")
                print()

                if response == "1":
                    print("It's safest to let it stay ugly then")
                    return "3111"

                if response == "2":
                    print("Do you hate them?")
                    print()
                    print("1: Yes")
                    print("2: No")
                    response = input("> ")
                    print()

                    if response == "1":
                        interactive_rebase()
                        return "31121"

                    if response == "2":
                        print("Send them a note, let 'em know you're changing history.")
                        print()
                        interactive_rebase()
                        return "31122"

            if response == "2":
                interactive_rebase()
                return "312"

        if response == "2":
            print("Should we remove merge conflicts?")
            print()
            print("1: That would do the trick")
            print("2: No, I need to change history!")
            response = input("> ")
            print()

            if response == "1":
                print("Looks like this is what you are looking for:")
                print()
                print("git rebase origin/{branch}")
                print()
                return "321"

            if response == "2":
                interactive_rebase()
                return "322"


def console_script_wrapper():
    main()


if __name__ == '__main__':
    main()
