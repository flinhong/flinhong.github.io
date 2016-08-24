---
layout: post
title: Git 学习笔记 - 起步
category: Tools
tags: ["Git"]
notebook: Posts
image: /images/201605/git-start.jpg
audio:
video:
description: 虽然一直用 Git 管理自己的博客文件，但大多数情况下使用的是 Github Desktop 或者 Git GUI，对 Git 本身以及 Git 的一些命令并不理解。所以找到 Pro Git 深入学习一下 Git。
toc: true
---

虽然一直用 Git 管理自己的博客文件，但大多数情况下使用的是 Github Desktop 或者 Git GUI，对 Git 本身以及 Git 的一些命令并不理解。所以找到 [Pro Git](https://git-scm.com/book/en/v2) 深入学习一下 Git。


## Git 如何对待数据

Git 和其它版本控制系统（包括 Subversion 和近似工具）的主要差别在于 Git 对待数据的方法。Git 中把数据看作是对小型文件系统的一组快照。每次你提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。Git 对待数据更像是一个“**快照流**”。

![Git data over time](/images/201605/git-ver-time.png "存储项目随时间改变的快照")
{:.hascaption}

## 数据在 Git 中的三种状态

在 Git 中，你的文件可能处于三种状态中的其中之一：已提交（committed）、已修改（modified）和已暂存（staged）。已提交表示数据已经安全的保存在本地数据库中。已修改表示修改了文件，但还没保存到数据库中。已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

由此引入 Git 项目的三个工作区域的概念：Git 仓库、工作目录以及暂存区域。

![3 status in Git](/images/201605/git-area.png "工作目录、暂存区域以及 Git 仓库")
{:.hascaption}

Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。这是 Git 中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。

工作目录是对项目的某个版本独立提取出来的内容。这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。有时候也被称作“索引”，不过一般说法还是叫暂存区域。

基本的 Git 工作流程如下：

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

在 Git 目录中保存着的特定版本文件，就属于已提交状态。如果作了修改并已放入暂存区域，就属于已暂存状态。如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。

## 初次运行 Git 前的配置

在不同系统安装 Git 可参考 [Git 官方网站](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)。

安装完 Git 后应该做的第一件事就是设置你的用户名称与邮件地址。这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：

```bash
$ git config --global user.name "Frank Lin"
$ git config --global user.email franklin@flinhong.com
```

如果想要检查你的配置，可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。通过输入 `git config <key>` 来检查 Git 的某一项配置，例如：

```bash
$ git config user.name
Frank Lin
```

## 获取帮助

有三种方法可以找到 Git 命令的使用手册：

```bash
$ git help <verb>
$ git <verb> --help
$ man git-<verb>
```

例如，要想获得 config 命令的手册，执行：

```bash
$ git help config
```

这些命令可以随时随地使用而无需联网。