---
layout: post
title: Git 学习笔记 - 撤销操作
category: Tools
tags: ["Git"]
notebook: Posts
image: /images/201606/reset-concept.png
audio:
video:
description: 今天学习一下 Git 中的撤销操作，需要注意有些撤销操作是不可逆的，这也是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有几个地方之一。
toc: true
---

今天学习一下 Git 中的撤销操作，尤其需要注意有些撤销操作是不可逆的，这也是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有几个地方之一。

练习操作还是可以继续克隆这个仓库：`https://github.com/libgit2/libgit2`

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 `--amend` 选项的提交命令尝试重新提交：

```bash
$ git commit --amend
```

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```bash
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交，第二次提交将代替第一次提交的结果。

## 取消暂存的文件

如果你已经修改了两个文件并且想要将它们作为两次独立的修改提交，但是却意外地输入了 `git add *` 暂存了它们两个。如何只取消暂存两个中的一个呢？ `git status` 命令提示了你：

```bash
$ git add *
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
    modified:   CONTRIBUTING.md
```

在 “Changes to be committed” 文字正下方，提示使用 `git reset HEAD <file>...` 来取消暂存。所以，我们可以这样用 `git reset` 来取消暂存 `CONTRIBUTING.md` 文件：

```bash
$ git reset HEAD CONTRIBUTING.md
Unstaged changes after reset:
M	CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

这个命令有点儿奇怪，但是起作用了。 `CONTRIBUTING.md` 文件已经是修改未暂存的状态了。

## 撤消对文件的修改

如果你并不想保留对 `CONTRIBUTING.md` 文件的修改怎么办？ 你该如何方便地撤消修改 —— 将它还原成上次提交时的样子（或者刚克隆完的样子，或者刚把它放入工作目录时的样子）？幸运的是，`git status` 也告诉了你应该如何做。在上面一个例子中，未暂存区域是这样：

```bash
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

它非常清楚地告诉了你如何撤消之前所做的修改。 让我们来按照提示执行：

```bash
$ git checkout -- CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
```

可以看到那些修改已经被撤消了。

<div class="info-message">
	<a href="#" class="close-info"><i class="fa fa-times"></i></a>
	<p><strong>注意:</strong></p>
	<p>你需要知道 "git checkout -- [file]" 是一个危险的命令，这很重要。 你对那个文件做的任何修改都会消失 —— 你只是拷贝了另一个文件来覆盖它。 除非你确实清楚不想要那个文件了，否则不要使用这个命令。</p>
</div>

另外，在 Git 中任何 **已提交的** 东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 `--amend` 选项覆盖的提交也可以恢复。 然而，任何你未提交的东西丢失后很可能再也找不到了。

参考：
[2.4 Git 基础 - 撤消操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)