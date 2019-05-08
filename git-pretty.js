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

function interactiveRebase() {
    console.log(`We\'re going to do an ${chalk.bold('** interactive rebase! **')}`)
    console.log()
    console.log(chalk.bgRed('Welcome to the DANGER ZONE!'))
    console.log()
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
        console.log('To delete all local branches that are already merged into the currently checked out branch:')
        console.log()
        printCode('git branch --merged | egrep -v \'(^\\*|master|dev)\' | xargs git branch -d')
        console.log()
        console.log('You can see that master and dev are excluded in case they are an ancestor.')
        console.log('Check out https://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged')
        return '4'
    }
}

main()
