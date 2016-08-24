---
layout: post
title: Git 学习笔记 - Git 基础
category: Tools
tags: ["Git"]
notebook: Posts
image: /images/201605/git-history.png
audio:
video:
description: 今天学习 Git 仓库的基本操作：初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）或提交（commit)更改，配置 Git 来忽略指定的文件和文件模式，以及在仓库中移动、移除文件。
toc: true
---

今天学习 Git 仓库的基本操作：初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）或提交（commit)更改，配置 Git 来忽略指定的文件和文件模式，以及在仓库中移动、移除文件。

## 获取 Git 仓库

### 在现有目录中初始化仓库

如果你打算使用 Git 来对现有的项目进行管理，你只需要进入该项目目录并输入：

```bash
$ git init
```

该命令将创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。你可通过 `git add` 命令来实现对指定文件的跟踪，然后执行 `git commit` 提交：

```bash
$ git add *.c
$ git add LICENSE
$ git commit -m 'initial project version'
```

### 克隆现有的仓库

这也是我最常用的，在 Github 上建好仓库后，用克隆的方法可以不用怎么配置就能直接推送了。

克隆仓库的命令格式是 `git clone [url]`。比如，要克隆 Git 的可链接库 libgit2，可以用下面的命令：

```bash
$ git clone https://github.com/libgit2/libgit2
```

这会在当前目录下创建一个名为 “libgit2” 的目录，并在这个目录下初始化一个 .git 文件夹，从远程仓库拉取下所有数据放入 .git 文件夹，然后从中读取最新版本的文件的拷贝。如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以使用如下命令：

```bash
$ git clone https://github.com/libgit2/libgit2 mylibgit
```

## 记录每次更新到仓库

你工作目录下的每一个文件都不外乎这两种状态：已跟踪或未跟踪。已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能处于未修改，已修改或已放入暂存区。工作目录中除已跟踪文件以外的所有其它文件都属于未跟踪文件，它们既不存在于上次快照的记录中，也没有放入暂存区。初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。

编辑过某些文件之后，由于自上次提交后你对它们做了修改，Git 将它们标记为已修改文件。我们逐步将这些修改过的文件放入暂存区，然后提交所有暂存了的修改，如此反复。所以使用 Git 时文件的生命周期如下：

![Git 文件周期](/images/201605/lifecycle.png "Git 中文件的状态变化周期")
{:.hascaption}

### 检查当前文件状态

要查看哪些文件处于什么状态，可以用 `git status` 命令。如果在克隆仓库后立即使用此命令，会看到类似这样的输出：

```bash
$ git status
On branch master
nothing to commit, working directory clean
```

现在，让我们在项目下创建一个新的 README 文件。如果之前并不存在这个文件，使用 `git status` 命令，你将看到一个新的未跟踪文件：

```bash
$ echo 'My Project' > README
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    README

nothing added to commit but untracked files present (use "git add" to track)
```

在状态报告中可以看到新建的 README 文件出现在 `Untracked files` 下面。

### 跟踪新文件

要跟踪 README 文件，就要使用命令 `git add` 将其纳入跟踪。 运行：

```bash
$ git add README
```

此时再运行 `git status` 命令，会看到 README 文件已被跟踪，并处于暂存状态：

```bash
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
```

只要在 `Changes to be committed` 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。`git add` 命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件。

### 暂存已修改文件

修改文件之后，要暂存这次更新，需要运行 `git add` 命令。这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。将这个命令理解为“添加内容到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。

如果运行了 `git add` 之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来。

### 状态简览

`git status` 命令的输出十分详细，但其用语有些繁琐。如果你使用 `git status -s` 命令或 `git status --short` 命令，你将得到一种更为紧凑的格式输出，例如：

```bash
$ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```

新添加的未跟踪文件前面有 `??` 标记，新添加到暂存区中的文件前面有 `A` 标记，修改过的文件前面有 `M` 标记。 你可能注意到了 `M` 有两个可以出现的位置，出现在右边的 `M` 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 `M` 表示该文件被修改了并放入了暂存区。例如，上面的状态报告显示： README 文件在工作区被修改了但是还没有将修改后的文件放入暂存区, lib/simplegit.rb 文件被修改了并将修改后的文件放入了暂存区。而 Rakefile 在工作区被修改并提交到暂存区后又在工作区中被修改了，所以在暂存区和工作区都有该文件被修改了的记录。

### 忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表，比如日志文件，或者编译过程中创建的临时文件等。在这种情况下，我们可以创建一个名为 `.gitignore` 的文件，列出要忽略的文件模式。来看一个实际的例子：

```bash
$ cat .gitignore
*.[oa]
*~
```

第一行告诉 Git 忽略所有以 `.o` 或 `.a` 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。

文件 `.gitignore` 的格式规范如下：

* 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式可以以（/）开头防止递归。
* 匹配模式可以以（/）结尾指定目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。星号 (`*`) 匹配零个或多个任意字符； [`abc`] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 `a`，要么匹配一个 `b`，要么匹配一个 `c`）；问号（`?`）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [`0-9`] 表示匹配所有 `0` 到 `9` 的数字）。使用两个星号（`**`) 表示匹配任意中间目录，比如 `a/**/z` 可以匹配 `a/z`, `a/b/z` 或 `a/b/c/z` 等。

GitHub 有一个十分详细的针对数十种项目及语言的 `.gitignore` 文件列表，你可以在 [https://github.com/github/gitignore](https://github.com/github/gitignore) 找到它。

### 查看已暂存和未暂存的修改

如果 `git status` 命令的输出对于你来说过于模糊，你想知道具体修改了什么地方，可以用 `git diff` 命令。你可能通常会用它来回答这两个问题：当前做的哪些更新还没有暂存？ 有哪些更新已经暂存起来准备好了下次提交？

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

若要查看已暂存的将要添加到下次提交里的内容，可以用 `git diff --cached` 命令。（Git 1.6.1 及更高版本还允许使用 `git diff --staged`，效果是相同的，但更好记些。）

`git diff` 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。所以有时候你一下子暂存了所有更新过的文件后，运行 `git diff` 后却什么也没有，就是这个原因。

### 提交更新

每次准备提交前，先用 `git status` 看下，是不是都已暂存起来了，然后再运行提交命令 `git commit`：

```bash
$ git commit
```

这种方式会启动文本编辑器以便输入本次提交的说明。

另外，你也可以在 `commit` 命令后添加 `-m` 选项，将提交信息与命令放在同一行，如下所示：

```bash
$ git commit -m "Story 182: Fix benchmarks for speed"
[master 463dc4f] Story 182: Fix benchmarks for speed
 2 files changed, 2 insertions(+)
 create mode 100644 README
```

OK，现在你已经创建了第一个提交！可以看到，提交后它会告诉你，当前是在哪个分支（master）提交的，本次提交的完整 SHA-1 校验和是什么（463dc4f），以及在本次提交中，有多少文件修订过，多少行添加和删改过。

要注意，提交时记录的是放在暂存区域的快照。任何还未暂存的仍然保持已修改状态，可以在下次提交时纳入版本管理。每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。

### 跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。 Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git commit -a -m 'added new benchmarks'
[master 83e38c7] added new benchmarks
 1 file changed, 5 insertions(+), 0 deletions(-)
```

如此，提交之前不再需要 `git add` 文件“CONTRIBUTING.md”了。

### 移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。可以用 `git rm` 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

如果只是简单地从工作目录中手工删除文件，运行 `git status` 时就会在 “Changes not staged for commit” 部分（也就是 未暂存清单）看到：

```bash
$ rm PROJECTS.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    PROJECTS.md

no changes added to commit (use "git add" and/or "git commit -a")
```

然后再运行 `git rm` 记录此次移除文件的操作：

```bash
$ git rm PROJECTS.md
rm 'PROJECTS.md'
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    deleted:    PROJECTS.md
```

下一次提交时，该文件就不再纳入版本管理了。如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`。 这是一种安全特性，用于防止误删还没有添加到快照的数据，这样的数据不能被 Git 恢复。

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。当你忘记添加 .gitignore 文件，不小心把一个很大的日志文件或一堆 `.a` 这样的编译生成文件添加到暂存区时，这一做法尤其有用。为达到这一目的，使用 `--cached` 选项：

```bash
$ git rm --cached README
```

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用上面提到的 `glob` 模式。

```bash
$ git rm log/\*.log
```

注意星号 `*` 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 `shell` 来帮忙展开。此命令删除 `log/` 目录下扩展名为 `.log` 的所有文件。类似的比如：

```bash
$ git rm \*~
```

该命令为删除以 `~` 结尾的所有文件。

### 修改文件名

要在 Git 中对文件改名，可以这么做：

```bash
$ git mv file_from file_to
```

它会恰如预期般正常工作。 实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明：

```
$ git mv README.md README
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```bash
$ mv README.md README
$ git rm README.md
$ git add README
```

学完这些，突然觉得还是 GUI 好用…… 😂

