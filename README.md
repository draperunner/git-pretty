# git-pretty

An implementation of Justin Hileman's handy chart from http://justinhileman.info/article/git-pretty/

… with some additions!

![git-pretty GIF](git-pretty.gif)

![Git Pretty Chart](http://justinhileman.info/article/git-pretty/git-pretty.png 'Git Pretty Chart')

## Use

Just run

```bash
npx git-pretty
```

This opens an interactive session like this:

```bash
So you have a mess on your hands. What sort of mess?

1: An uncommitted mess
2: I accidentally committed something
3: My Git history is ugly
4: I have a bunch of old branches I want gone
5: I want to sync my fork with the original repo
>
```

## Install

If you need this kind of help often, you could install git-pretty globally:

```
npm i -g git-pretty
```

Then you can drop `npx` and run

```
git-pretty
```

Using `npx` is recommended though, because it always uses the latest version.

## Node JS?

> Wasn't this a Python package, installable through `pip`?

Yes it was! But now it's a Node package, installable through `npm`. Ah, how things change through life.
