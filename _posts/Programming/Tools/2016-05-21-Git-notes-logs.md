---
layout: post
title: Git 学习笔记 - 提交历史
category: Tools
tags: ["Git"]
notebook: Posts
image: /images/201605/git-log.jpg
audio:
video:
description: 在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。完成这个任务最简单而又有效的工具是 git log 命令。今天按照 Git Pro 中的演示例子 simplegit 项目，一步一步操作学习吧。
toc: false
---

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。完成这个任务最简单而又有效的工具是 `git log` 命令。

接下来按照 Git Pro 中的演示例子 simplegit 项目，一步一步操作学习吧。运行下面的命令获取该项目源代码：

```
git clone https://github.com/schacon/simplegit-progit
```

然后在此项目中运行 `git log`，应该会看到下面的输出：

```bash
$ git log
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number

commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Sat Mar 15 16:40:33 2008 -0700

    removed unnecessary test

commit a11bef06a3f659402fe7563abf99ad00de2209e6
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Sat Mar 15 10:31:28 2008 -0700

    first commit
```

默认不用任何参数的话，`git log` 会按提交时间列出所有的更新，最近的更新排在最上面。正如你所看到的，这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。

一个常用的选项是 `-p`，用来显示每次提交的内容差异。 你也可以加上 `-2` 来仅显示最近两次提交：

```
$ git log -p -2
```

该选项除了显示基本信息之外，还在附带了每次 commit 的变化。当进行代码审查，或者快速浏览某个搭档提交的 commit 所带来的变化的时候，这个参数就非常有用了。 你也可以为 `git log` 附带一系列的总结性选项。比如说，如果你想看到每次提交的简略的统计信息，你可以使用 `--stat` 选项：

```
$ git log --stat
```

`--stat` 选项在每次提交的下面列出额所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了。在每次提交的最后还有一个总结。

另外一个常用的选项是 `--pretty`。这个选项可以指定使用不同于默认格式的方式展示提交历史。这个选项有一些内建的子选项供你使用。比如用 oneline 将每个提交放在一行显示，查看的提交数很大时非常有用。另外还有 `short`，`full` 和 `fuller` 可以用，展示的信息或多或少有些不同。

```
$ git log --pretty=oneline
```

但最有意思的是 `format`，可以定制要显示的记录格式。这样的输出对后期提取分析格外有用 — 因为你知道输出的格式不会随着 Git 的更新而发生改变：

```bash
$ git log --pretty=format:"%h - %an, %ar : %s"
ca82a6d - Scott Chacon, 6 years ago : changed the version number
085bb3b - Scott Chacon, 6 years ago : removed unnecessary test
a11bef0 - Scott Chacon, 6 years ago : first commit
```

下表是 `git log --pretty=format` 常用的选项：

---

| **选项** |  **说明**    |
|:---------|:-------------|
|   `%H`   | 提交对象（commit）的完整哈希字串 |
|   `%h`   | 提交对象的简短哈希字串 |
|   `%T`   | 树对象（tree）的完整哈希字串 |
|   `%t`   | 树对象的简短哈希字串 |
|   `%P`   | 父对象（parent）的完整哈希字串 |
|   `%p`   | 父对象的简短哈希字串 |
|   `%an`  | 作者（author）的名字 |
|   `%ae`  | 作者的电子邮件地址 |
|   `%ad`  | 作者修订日期（可以用 --date= 选项定制格式） |
|   `%ar`  | 作者修订日期，按多久以前的方式显示 |
|   `%cn`  | 提交者(committer)的名字 |
|   `%ce`  | 提交者的电子邮件地址 |
|   `%cd`  | 提交日期 |
|   `%cr`  | 提交日期，按多久以前的方式显示 |
|   `%s`   | 提交说明 |

---

你一定奇怪 作者 和 提交者 之间究竟有何差别，其实作者指的是实际作出修改的人，提交者指的是最后将此工作成果提交到仓库的人。所以，当你为某个项目发布补丁，然后某个核心成员将你的补丁并入项目时，你就是作者，而那个核心成员就是提交者。

当 `oneline` 或 `format` 与另一个 `log` 选项 `--graph` 结合使用时尤其有用。这个选项添加了一些 ASCII 字符串来形象地展示你的分支、合并历史：

```bash
$ git log --pretty=format:"%h %s" --graph
* 2d3acf9 ignore errors from SIGCHLD on trap
*  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
|\
| * 420eac9 Added a method for getting the current branch.
* | 30e367c timeout code and tests
* | 5a09431 add timeout protection to grit
* | e1193f8 support for heads with slashes in them
|/
* d6016bc require time for xmlschema
*  11d191e Merge branch 'defunkt' into local
```

以上只是简单介绍了一些 `git log` 命令支持的选项。这有个[表格](https://git-scm.com/book/zh/v2/ch00/log_options)列出了我们目前涉及到的和没涉及到的选项，以及它们是如何影响 log 命令的输出的。

除了定制输出格式的选项之外，`git log` 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。之前你已经看到过 `-2` 了，它只显示最近的两条提交，实际上，这是 `-<n>` 选项的写法，其中的 n 可以是任何整数，表示仅显示最近的若干条提交。不过实践中我们是不太用这个选项的，Git 在输出所有提交时会自动调用分页程序，所以你一次只会看到一页的内容。

另外还有按照时间作限制的选项，比如 `--since` 和 `--until` 也很有用。

还可以给出若干搜索条件，列出符合的提交。用 `--author` 选项显示指定作者的提交，用 `--grep` 选项搜索提交说明中的关键字。（请注意，如果要得到同时满足这两个选项搜索条件的提交，就必须用 `--all-match` 选项。否则，满足任意一个条件的提交都会被匹配出来）

另一个非常有用的筛选选项是 `-S`，可以列出那些添加或移除了某些字符串的提交。比如说，你想找出添加或移除了某一个特定函数的引用的提交，你可以这样使用：

```
$ git log -Sfunction_name
```

最后一个很实用的 `git log` 选项是路径 (path)，如果只关心某些文件或者目录的历史提交，可以在 `git log` 选项的最后指定它们的路径。因为是放在最后位置上的选项，所以用两个短划线（--）隔开之前的选项和后面限定的路径名。

来看一个实际的例子，如果要查看 Git 仓库中，2008 年 10 月期间，Junio Hamano 提交的但未合并的测试文件，可以用下面的查询命令：

```bash
$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/
5610e3b - Fix testcase failure when extended attributes are in use
acd3b9e - Enhance hold_lock_file_for_{update,append}() API
f563754 - demonstrate breakage of detached checkout with symbolic link HEAD
d1a43f2 - reset --hard/read-tree --reset -u: remove unmerged new paths
51a94af - Fix "checkout --track -b newbranch" on detached HEAD
b0ad11e - pull: allow "git pull origin $something:$current_branch" into an unborn branch
```

这次就到这里，有很多 GUI 都能可视化显示这些记录，看起来会比较贴心些，不过不都是基于这些命令的基础嘛，多学学还是有用的。