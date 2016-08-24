---
layout: post
title: 使用 Robocopy 删除 Windows 上路径过长文件（夹）
category: Tips
tags: ["Windows"]
notebook: Posts
image: /images/201606/delete.png
audio:
video:
description: 遇到文件路径过长的文件，要删除直接上 Robocopy 吧！
toc: false
---

![windows notice](/images/201606/delete_file.png)

> 文件名对目标文件夹可能过长。您可以缩短文件名并重试，或者尝试路径较短的位置。

看到这样的提示，稍显尴尬，已经不是第一次了，所以干脆写个记录以备后患吧。

用到的工具是 [Robocopy](https://technet.microsoft.com/en-gb/library/cc733145(v=ws.10).aspx)，它是微软在 [Windows Server 2003 Resource Kit Tools](https://www.microsoft.com/en-us/download/details.aspx?id=17657) 中提供的复制工具，新版的 Windows 中应该已经集成该工具了，如果没有可以到上述网址下载。

好吧，看看怎么删除这样的文件路径过长的文件（夹）吧。

假设要删除的文件夹是 `D:\folder-to-delete`，那么可以先在 D 盘下新建一个空文件夹 `D:\empty-folder`。

然后再在命令提示符中输入：

```bash
robocopy /MIR D:\empty-folder D:\folder-to-delete
```

这样就把文件夹 `D:\folder-to-delete` 复制成与 `D:\empty-folder` 一样的空文件夹了，就这么简单删除了想要删掉的路径太长的文件。
