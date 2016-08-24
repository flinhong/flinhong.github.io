---
layout: post
title: Install Jekyll on Windows
category: Tips
tags: ["Jekyll"]
notebook: Posts
image: /images/201606/jekyll.jpg
audio:
video:
description: In this installation guide we’ll be using Windows 10. These instructions should work for older versions of Windows but they have not but tested.
toc: true
---

In this installation guide we’ll be using Windows 10. These instructions should work for older versions of Windows but they have not but tested.

## Install Chocolatey 

Open Command Prompt which can be found in `All Apps -> Windows System -> Command Prompt`. Right click on the icon, select “More” then “Run as administrator”.

Next we’ll install [Chocolatey](https://chocolatey.org/) which is a package manager for Windows.

```bash
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

Close Command Prompt and open it again to make Chocolatey available, remember to run it as administrator.

## Install Ruby by Chocolatey

Then we’ll install ruby.

```bash
choco install ruby -y
```

Close Command Prompt and open it once again to make Ruby available, remember to run it as administrator.

## Install Jekyll using Gem

And now we can install Jekyll.

```bash
gem install jekyll
```

We can test Jekyll is working by checking the version installed.

```bash
jekyll -v
```

You can visit [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/) for more information.
