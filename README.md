# git-pretty
An implementation of Justin Hileman's handy chart from http://justinhileman.info/article/git-pretty/

![Git Pretty Chart](http://justinhileman.info/article/git-pretty/git-pretty.png "Git Pretty Chart")

## Install
```bash
sudo pip install git-pretty
```

sudo makes the installation global, so that you can run `git-pretty` from any directory!

## Use
Just run
```bash
git-pretty
```
This opens an interactive session like this:
```bash
So you have a mess on your hands. What sort of mess?

1: An uncommitted mess
2: I accidentally committed something
3: My Git history is ugly
>
```
