---
layout: post
title: 在 Sublime Text 中用 Markdown 编辑 Evernote 笔记
category: Tools
tags: ["Sublime Text", "Evernote"]
notebook: Posts
image: /images/201605/Evernote.jpg
audio:
video:
description: Evernote for Sublime Text 做到的是在 Sublime Text 中编辑 Markdown 文本，本地保存原始文本，并和 Evernote 笔记 ID 关联同步。这样，在 Sublime 中可以浏览由 Sublime 创建的 Markdown 文件，又能将转换后的笔记同步到 Evernote 的笔记列表，还可进行双向同步。
toc: true
---

某个风和日丽的下午，一学妹问我有没有什么好用的笔记软件，但不要 Evernote 和 OneNote。一时语塞，除了这两个常用的笔记软件，我也提不出其他比较靠谱的了，知之甚少。

虽然自己也时有做笔记，但多数时间是用 Evernote 摘录网页，以作备用。为了回答学妹的问题，我也试着搜索了一下。[小众软件](http://www.appinn.com/my-fav-note-final/)曾票选过最受欢迎的笔记软件，还是 Evernote 最受青睐，OneNote 也还不错，其他的基本没用过也不做评价。

![最受欢迎的笔记软件](https://lh3.googleusercontent.com/-ofBR5thsjtU/VznEZr5z6TI/AAAAAAAAAYM/CmXFgB4Grkk/s0/Note%252520Apps.png)

既然 Evernote 最常用，那还是选择它吧。但是 Evernote 对 Markdown 支持不是很到位，更不要说 OneNote 了。所以有不少同学选择在 GitHub 上做起笔记来。这倒也可以，不过自己要看个笔记还得去翻网页就不太方便了。所以有了今天这款 [Evernote for Sublime Text](https://packagecontrol.io/packages/Evernote) 插件。

## 简介

Evernote for Sublime Text 做到的是在 Sublime Text 中编辑 Markdown 文本，本地保存（可用 OneDrive, GitHub 等做同步备份）原始文本，并和 Evernote 笔记 ID 关联同步。这样，在 Sublime 中可以浏览由 Sublime 创建的 Markdown 文件，又能将转换后的笔记同步到 Evernote 的笔记列表，还可进行双向同步（在 Sublime 中打开 Evernote 的笔记并转换成 Markdown 进行编辑）。不过，在使用过程中，一旦在 Evernote 中对笔记进行了更新，则有一定几率导致笔记同步冲突[^1]。Markdown 标记错误也能引起不能同步。

自己试用了一下，感觉用 Markdown 这样做笔记确实很方便，同步冲突也确实遇到了（代码高亮的时候写错了语言名称），不过这不影响我继续使用这个优秀的插件。在编辑过程中注意不要修改 Evernote 中的笔记就是了（那就暂时不打开 Evernote吧）。若今后修改了 Evernote 中的笔记，最好使用插件的打开命令，打开一份新的再继续编辑更新吧。

## 安装

那么，来看看这款插件的使用吧。首先是[安装](https://github.com/bordaigorl/sublime-evernote/wiki/Installation)：

1. 用 Sublime Text 的 `Package Control` 安装 Evernote。如果你在 Sublime Text 中没有安装过 `Package Control`，请参见这里的[安装指南](https://packagecontrol.io/installation)。

2. 设置 Sublime Text 插件与 Evernote 关联[^2]：

	(1) 关联 Evernote 需要 `Developer Token`，如果第一次关联或者要更新 Token，可以通过 Sublime Text 菜单中的 `Preferences > Package Settings > Evernote > Reconfigure Evernote` 打开 Evernote 的相应页面获取应用授权。

	![关联 Evernote](https://lh3.googleusercontent.com/-eX1AQnGrvuQ/VznMqCedygI/AAAAAAAAAYc/2Tpri7no2ek/s0/sublime_text_2016-05-16_21-35-33.png)

	(2) 如果是中国印象笔记的用户，需[参见这里](https://github.com/bordaigorl/sublime-evernote/wiki/First-Use#%E4%B8%AD%E5%9B%BD%E5%8D%B0%E8%B1%A1%E7%AC%94%E8%AE%B0%E7%94%A8%E6%88%B7appyinxiangcom)进行关联设置。

	(3) 将 Evernote 网页中的 Developer Token 和 NoteStore URL 添加到 Sublime Evernote 插件的设置文件 `Preferences > Package Settings > Evernote > Settings - User`：

	```
	{
	 "noteStoreUrl": "Your NoteStore URL",
	 "token": "Your Developer Token"
	}
	```

3. 测试是否成功：通过 `ctrl+shift+p` (Win, Linux) 或者 `shift+command+p` (OS X) 打开 Sublime Text 命令窗口，输入 Evernote，就会看见 Evernote 插件的许多命令，点击 Evernote:list recent notes，如果看到罗列出最新的笔记，则说明授权成功。

## 快捷键设置

默认情况下，Evernote 插件没有绑定任何快捷键，所有操作通过 Sublime 中 `ctrl+shift+p` 输入 Evenote 后选择相应功能进行。当然你也可以在 Sublime Text 中通过 `Preferences > Key Bindings - User` 关联快捷键[^3]:

```
{ "keys": ["super+e"], "command": "show_overlay", "args": {"overlay": "command_palette", "text": "Evernote: "} },
{ "keys": ["ctrl+e", "ctrl+s"], "command": "send_to_evernote" },
{ "keys": ["ctrl+e", "ctrl+o"], "command": "open_evernote_note" },
{ "keys": ["ctrl+e", "ctrl+u"], "command": "save_evernote_note" },
```

意思是，按 `ctrl+e`, `ctrl+s` 后，会将笔记保存并且同步到印象笔记，按 `ctrl+e`, `ctrl+s` 则是更新笔记。

嗯，差不多这样就可以开始使用了，更多功能参看 Evernote for Sublime Text 的 [Wiki](https://github.com/bordaigorl/sublime-evernote/wiki)。

对我来说，既可以用 Markdown 写 Blog post 同步到 Gitlab，又可以同时在 Evernote 中做个备份，很不错了。

参考:

[^1]: [从 Evernote 开始官方支持 Markdown 说起](http://blog.ernest.me/post/evernote-starts-support-markdown)
[^2]: [Sublime-evernote：支持用 Markdown 写印象笔记(Evernote)](http://www.jianshu.com/p/0add426fdd26)
[^3]: [Evernote for Sublime Text](https://packagecontrol.io/packages/Evernote)

