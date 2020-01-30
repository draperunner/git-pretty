#!/usr/bin/env node
const inquirer = require('inquirer')
const chalk = require('chalk')

async function ask(question, choices) {
    const { answer } = await inquirer.prompt([{
        type: 'list',
        name: 'answer',
        message: question,
        choices: choices.map((name, index) => ({
            name,
            value: `${index + 1}`,
        }))
    }])
    return answer
}

function askYesNo(question) {
    return ask(question, ['Yes', 'No'])
}

function printCode(code) {
    console.log(chalk.bgGreenBright(chalk.black(` ${code} `)))
}

function dangerZone() {
    console.log('\n' + chalk.bgRed('Welcome to the DANGER ZONE!') + '\n')
}

function interactiveRebase() {
    dangerZone()
    console.log(`We're going to do an ${chalk.bold('** interactive rebase! **')}`)
    printCode('git rebase -i {COMMITISH}')
    console.log()
    console.log('And when that\'s done, do this:')
    console.log()
    printCode('git push --force origin {branch}')
    console.log()
}

async function main() {
    let answer = await ask('So you have a mess on your hands. What sort of mess?', [
        'An uncommitted mess',
        'I accidentally committed something',
        'My Git history is ugly',
        'I have a bunch of old branches I want gone',
        'I want to sync my fork with the original repo',
        'I want my branch to be exactly like on GitHub!',
    ])

    if (answer === '1') {
        answer = await askYesNo('Do you care enough about your mess to keep it?')

        if (answer === '1') {
            console.log('Looks like we caught this just in time.')
            console.log('Split off a logical chunk from your mess, stage it and commit it with a good message.')
            console.log('Still have a mess? Do it again.')
            return '11'
        }

        if (answer === '2') {
            console.log('Looks like this is what you are looking for:')
            console.log()
            printCode('git reset --hard')
            console.log()
            return '12'
        }
    }

    if (answer === '2') {
        answer = await askYesNo('Has anyone else seen it?')

        if (answer === '1') {
            console.log('Looks like this is what you are looking for:')
            console.log()
            printCode('git revert {COMMITISH}')
            console.log()
            return '21'
        }

        if (answer === '2') {
            answer = await ask('How long ago?', [
                'Last commit',
                'It seems like forever ago',
            ])

            if (answer === '1') {
                answer = await ask('What would make this better?', [
                    'I forgot to add a file',
                    'A better message',
                    'Remove the last commit, but keep the changes',
                    'Throw the last commit away, and delete its changes',
                ])

                if (answer === '1') {
                    console.log('Looks like this is what you are looking for:')
                    console.log()
                    printCode('git add {my_awesome_file}')
                    printCode('git commit --amend')
                    console.log()
                    return '2211'
                }

                if (answer === '2') {
                    console.log('Looks like this is what you are looking for:')
                    console.log()
                    printCode('git commit --amend')
                    console.log()
                    return '2212'
                }

                if (answer === '3') {
                    console.log('Looks like this is what you are looking for:')
                    console.log()
                    printCode('git reset HEAD~')
                    console.log()
                    return '2213'
                }

                if (answer === '4') {
                    console.log('Looks like this is what you are looking for:')
                    console.log()
                    printCode('git reset --hard HEAD^')
                    console.log()
                    return '2214'
                }
            }

            if (answer === '2') {
                answer = await askYesNo('Take a mulligan?')

                if (answer === '1') {
                    console.log('We\'ll reset and commit from scratch:')
                    console.log()
                    printCode('git reset {COMMITISH}')
                    console.log()
                    console.log('Then split off a logical chunk from your mess, stage it and commit it with a good message.')
                    console.log('Still have a mess? Do it again.')
                    return '2221'
                }

                if (answer === '2') {
                    interactiveRebase()
                    return '2222'
                }
            }
        }
    }

    if (answer === '3') {
        answer = await askYesNo('Is it already on GitHub?')

        if (answer === '1') {
            answer = await askYesNo('Is anyone down stream?')

            if (answer === '1') {
                answer = await askYesNo('Enough to form a lynch mob?')

                if (answer === '1') {
                    console.log('It\'s safest to let it stay ugly then')
                    return '3111'
                }

                if (answer === '2') {
                    answer = await askYesNo('Do you hate them?')

                    if (answer === '1') {
                        interactiveRebase()
                        return '31121'
                    }

                    if (answer === '2') {
                        console.log('Send them a note, let \'em know you\'re changing history.')
                        console.log()
                        interactiveRebase()
                        return '31122'
                    }
                }
            }

            if (answer === '2') {
                interactiveRebase()
                return '312'
            }

        }

        if (answer === '2') {
            answer = await ask('Should we remove merge conflicts?', [
                'That would do the trick',
                'No, I need to change history!',
            ])

            if (answer === '1') {
                console.log('Looks like this is what you are looking for:')
                console.log()
                printCode('git rebase origin/{branch}')
                console.log()
                return '321'
            }

            if (answer === '2') {
                interactiveRebase()
                return '322'
            }
        }
    }

    if (answer === '4') {
        dangerZone()
        console.log('To delete all local branches that are already merged into the currently checked out branch:')
        printCode('git branch --merged | egrep -v \'(^\\*|master|dev)\' | xargs git branch -d')
        console.log()
        console.log('You can see that master and dev are excluded in case they are an ancestor.')
        console.log('Check out https://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged')
        return '4'
    }

    if (answer === '5') {
        console.log('Alright! You have forked a repo a while ago, and now it\'s time to update it with the changes in the original repo.')
        console.log()

        const answer = await ask('Have you already configured the original repo as a remote?', [
            'No',
            'Yes',
            'Not sure'
        ])

        if (answer === '1') {
            console.log('Let\'s set up a remote.')
            printCode('git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git')
            console.log()
            console.log('Verify that it was added by listing all remotes:')
            printCode('git remote -v')
            console.log()
            console.log('Fetch the changes from the remote:')
            printCode('git fetch upstream')
            console.log()
            console.log('Now checkout your local master branch')
            printCode('git checkout master')
            console.log()
            console.log('Merge the changes from the remote into your local branch')
            printCode('git merge upstream/master')
            console.log()
            console.log('Read GitHub\'s guide for this if you don\'t trust git-pretty: https://help.github.com/en/articles/syncing-a-fork')
            return '52'
        }

        if (answer === '2') {
            console.log('Ok then. I\'ll assume the name of your remote for the original repo is "upstream"')
            console.log()
            console.log('Fetch the changes from the remote:')
            printCode('git fetch upstream')
            console.log()
            console.log('Now checkout your local master branch')
            printCode('git checkout master')
            console.log()
            console.log('Merge the changes from the remote into your local branch')
            printCode('git merge upstream/master')
            console.log()
            console.log('Read GitHub\'s guide for this if you don\'t trust git-pretty: https://help.github.com/en/articles/syncing-a-fork')
            return '51'
        }

        if (answer === '3') {
            console.log('Not sure? Do this:')
            printCode('git remote -v')
            console.log('If the original repo is in that list, that means the remote is configured.')
            return '53'
        }
    }

    if (answer === '6') {
        console.log('Here is what you need. if master is not your desired branch, replace it in the code below with the desired branch name.')
        console.log('Make sure you don\'t have any local changes you want to keep!')
        dangerZone()
        printCode('git fetch')
        printCode('git reset --hard origin/master')
        return '6'
    }
}

main()
