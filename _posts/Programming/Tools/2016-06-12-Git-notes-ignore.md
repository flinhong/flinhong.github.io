---
layout: post
title: Git 学习笔记 - .gitignore 的使用
category: Tools
tags: ["Git"]
notebook: Posts
image: /images/201606/ignore.jpg
audio:
video:
description: 我们在使用 Git 进行版本控制的时候，有些文件是无需纳入 Git 管理的，通常都是些自动生成的文件。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件来解决这个问题。
toc: false
---

项目中经常会生成一些 Git 系统不需要追踪的文件。典型的是在编译生成过程中产生的文件或是编程器生成的临时备份文件。当然，你不追踪这些文件，可以不用 `git add` 把它们加到索引中。但是这样会很快变成一件烦人的事，你发现项目中到处有未追踪的文件; 这样也使 `git add .` 和 `git commit -a` 变得没有实际用处，同时 `git status` 命令的输出也会有它们，每次都看到 `Untracked files ...` 是不是会变得很抓狂。

其实，这个问题解决起来很简单，我们可以创建一个名为 `.gitignore` 的特殊文件，然后把要忽略的文件名填进去，Git 就会自动忽略这些文件。之前在学习 [Git 基础](/tools/Git-notes-basics/#headid-section-7)的时候就谈过这个问题。

当然，我们不需要从头写 `.gitignore` 文件，GitHub 已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：[https://github.com/github/gitignore](https://github.com/github/gitignore)，另外，推荐一个自动生成 `.gitignore` 文件的网址：[http://www.gitignore.io/](https://www.gitignore.io/)。

要注意，我们忽略文件的原则是[^1]：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的 .class 文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

比如说，你在 Windows 下进行 Python 开发，Windows 会自动在有图片的目录下生成隐藏的缩略图文件，如果有自定义目录，目录下就会有 `Desktop.ini` 文件，因此你需要忽略 Windows 自动生成的信息文件：

```
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini
```

然后，继续忽略 Python 编译产生的 `.pyc`、`.pyo`、`dist` 等文件或目录：

```
# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build
```

最后一步就是把 `.gitignore` 也提交到 Git，并且可以对其做版本管理。当然检验 `.gitignore` 的标准是 `git status` 命令是不是说 `working directory clean`。

有些时候，你想添加一个文件到 Git，但发现添加不了，原因可能就是这个文件被 `.gitignore` 忽略了：

```bash
$ git add App.class
The following paths are ignored by one of your .gitignore files:
App.class
Use -f if you really want to add them.
```

如果你确实想添加该文件，可以用 `-f` 强制添加到 Git：

```bash
$ git add -f App.class
```

或者你发现，可能是 `.gitignore` 写得有问题，需要找出来到底哪个规则写错了，可以用 `git check-ignore` 命令检查：

```
$ git check-ignore -v App.class
.gitignore:3:*.class    App.class
```

上面，Git 告诉我们，`.gitignore` 的第 3 行规则忽略了该文件，于是我们就可以知道应该修订哪个规则了。

其他信息可以直接 `man gitignore` 查看帮助[^2]。

但有些时候我们会遇到这样的问题：写入 `.gitignore` 文件中的文件却还是被 Git 追踪, 当你通过 `git status` 查询文件状态时，他们并没有被忽略。

以下是你可能遇到问题的场景：

* 当你在 git 库中编写某些代码文件，并已经 stage 该文件之后，你发现某个文件你不想用了，想在以后的改变中忽略它。然后在你的 `.gitignore` 文件中加入该文件名，结果它并没有被忽略。
* 当你从远程代码库中 `git clone` 一份代码到本地并做些修改，build，然后通过 `git add .` 等 stage 了这些改变，当你通过 `git status` 查看状态时发现不小心把 `build/` 文件夹给 add 进来了。于是你在 `.gitignore` 文件中加入了 `build/`，但发现并不起作用。

究其原因，`.gitignore` 文件只是 ignore 没有被 staged(cached) 文件，对于已经被 staged 的文件，加入 ignore 文件时一定要先从 staged 移除。下面这段话来自 GitHub：

> If you already have a file checked in, and you want to ignore it, Git will not ignore the file if you add a rule later. In those cases, you must untrack the file first, by running the following command in your terminal:

```bash
git rm --cached 
```

因此，要想用 `.gitignore` 成功忽略文件，必须先把它们从 staged 中移除[^3]：

1. commit 你已有的改变，保存当前的工作。
2. `git rm --cached file/path/to/be/ignored` 清除缓存。
3. `git add .` 添加更改变化。
4. `git commit -m "fixed untracked files"`。

参考：

[^1]: [忽略特殊文件](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758404317281e54b6f5375640abbb11e67be4cd49e0000)
[^2]: [.gitignore 文件使用说明](https://segmentfault.com/a/1190000000522997)
[^3]: [.gitignore 文件不起作用](http://t.hengwei.me/post/gitignore%E6%96%87%E4%BB%B6%E4%B8%8D%E8%B5%B7%E4%BD%9C%E7%94%A8/)

