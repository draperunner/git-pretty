# git-pretty
An implementation of Justin Hileman's handy chart from http://justinhileman.info/article/git-pretty/

… with some additions!

![Git Pretty Chart](http://justinhileman.info/article/git-pretty/git-pretty.png "Git Pretty Chart")

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
