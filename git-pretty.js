#!/usr/bin/env node
const prompt = require('prompt-sync')()

function interactiveRebase() {
    console.log("We're going to do an interactive rebase!")
    console.log("Welcome to the DANGER ZONE!")
    console.log()
    console.log("git rebase -i {COMMITISH}")
    console.log()
    console.log("And when that's done, do this:")
    console.log()
    console.log("git push --force origin {branch}")
    console.log()
}

function main() {
    console.log("So you have a mess on your hands. What sort of mess?")
    console.log()
    console.log("1: An uncommitted mess")
    console.log("2: I accidentally committed something")
    console.log("3: My Git history is ugly")
    console.log("4: I have a bunch of old branches I want gone")
    let response = prompt("> ")
    console.log()

    if (response == "1") {
        console.log("Do you care enough about your mess to keep it?")
        console.log()
        console.log("1: Yes")
        console.log("2: No")
        response = prompt("> ")
        console.log()

        if (response == "1") {
            console.log("Looks like we caught this just in time.")
            console.log("Split off a logical chunk from your mess, stage it and commit it with a good message.")
            console.log("Still have a mess? Do it again.")
            return "11"
        }

        if (response == "2") {
            console.log("Looks like this is what you are looking for:")
            console.log()
            console.log("git reset --hard")
            console.log()
            return "12"
        }
    }

    if (response == "2") {
        console.log("Has anyone else seen it?")
        console.log()
        console.log("1: Yes")
        console.log("2: Not yet")
        response = prompt("> ")
        console.log()

        if (response == "1") {
            console.log("Looks like this is what you are looking for:")
            console.log()
            console.log("git revert {COMMITISH}")
            console.log()
            return "21"
        }

        if (response == "2") {
            console.log("How long ago?")
            console.log()
            console.log("1: Last commit")
            console.log("2: It seems like forever ago")
            response = prompt("> ")
            console.log()

            if (response == "1") {
                console.log("What would make this better?")
                console.log()
                console.log("1: I forgot to add a file")
                console.log("2: A better message")
                console.log("3: Remove the last commit, but keep the changes")
                console.log("4: Throw the last commit away, and delete its changes")
                response = prompt("> ")
                console.log()

                if (response == "1") {
                    console.log("Looks like this is what you are looking for:")
                    console.log()
                    console.log("git add {my_awesome_file}")
                    console.log("git commit --amend")
                    console.log()
                    return "2211"
                }

                if (response == "2") {
                    console.log("Looks like this is what you are looking for:")
                    console.log()
                    console.log("git commit --amend")
                    console.log()
                    return "2212"
                }

                if (response == "3") {
                    console.log("Looks like this is what you are looking for:")
                    console.log()
                    console.log("git reset HEAD~")
                    console.log()
                    return "2213"
                }

                if (response == "4") {
                    console.log("Looks like this is what you are looking for:")
                    console.log()
                    console.log("git reset --hard HEAD^")
                    console.log()
                    return "2214"
                }
            }

            if (response == "2") {
                console.log("Take a mulligan?")
                console.log()
                console.log("1: Yes")
                console.log("2: No")
                response = prompt("> ")
                console.log()

                if (response == "1") {
                    console.log("We'll reset and commit from scratch:")
                    console.log()
                    console.log("git reset {COMMITISH}")
                    console.log()
                    console.log("Then split off a logical chunk from your mess, stage it and commit it with a good message.")
                    console.log("Still have a mess? Do it again.")
                    return "2221"
                }

                if (response == "2") {
                    interactiveRebase()
                    return "2222"
                }
            }
        }
    }

    if (response == "3") {
        console.log("Is it already on GitHub?")
        console.log()
        console.log("1: Yes")
        console.log("2: No")
        response = prompt("> ")
        console.log()

        if (response == "1") {
            console.log("Is anyone down stream?")
            console.log()
            console.log("1: Yes")
            console.log("2: No")
            response = prompt("> ")
            console.log()

            if (response == "1") {
                console.log("Enough to form a lynch mob?")
                console.log()
                console.log("1: Yes")
                console.log("2: No")
                response = prompt("> ")
                console.log()

                if (response == "1") {
                    console.log("It's safest to let it stay ugly then")
                    return "3111"
                }

                if (response == "2") {
                    console.log("Do you hate them?")
                    console.log()
                    console.log("1: Yes")
                    console.log("2: No")
                    response = prompt("> ")
                    console.log()

                    if (response == "1") {
                        interactiveRebase()
                        return "31121"
                    }

                    if (response == "2") {
                        console.log("Send them a note, let 'em know you're changing history.")
                        console.log()
                        interactiveRebase()
                        return "31122"
                    }
                }
            }

            if (response == "2") {
                interactiveRebase()
                return "312"
            }

        }

        if (response == "2") {
            console.log("Should we remove merge conflicts?")
            console.log()
            console.log("1: That would do the trick")
            console.log("2: No, I need to change history!")
            response = prompt("> ")
            console.log()

            if (response == "1") {
                console.log("Looks like this is what you are looking for:")
                console.log()
                console.log("git rebase origin/{branch}")
                console.log()
                return "321"
            }

            if (response == "2") {
                interactiveRebase()
                return "322"
            }
        }
    }

    if (response == "4") {
        console.log("To delete all local branches that are already merged into the currently checked out branch:")
        console.log()
        console.log('git branch --merged | egrep -v "(^\*|master|dev)" | xargs git branch -d')
        console.log()
        console.log("You can see that master and dev are excluded in case they are an ancestor.")
        console.log("Check out https://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged")
        return "4"
    }
}

main()
