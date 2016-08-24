---
layout: post
title: Jekyll-based 博客中实现代码高亮
category: Front-end
tags: Jekyll
image: /images/201509/code-highlighting.png
description: 之前使用别人的博客模板，代码高亮 so easy 的，直接在 _config 中设置 highlighter 为 pygments 就可以了。可是自己改了一个模板，加上没有认真读 Jekyll Docs，代码高亮失效了。好吧，还是自己动手。
toc: true
---

之前使用别人的博客模板，代码高亮 so easy 的，直接在 `_config` 中设置 `highlighter` 为 `pygments` 就可以了。可是自己改了一个模板，加上没有认真读 [Jekyll Docs](http://jekyllrb.com/docs/templates/)，代码高亮失效了。好吧，还是自己动手。

在 GitHub Pages 中实现代码高亮有两个选择，一是自定义 CSS，另一个是使用嵌入的 Gists。

## 自定义 CSS 样式

要让 Jekyll 为你实现代码高亮，需要做以下三件事：

1) 添加一个语法高亮的 CSS 文件到你的文件目录中，例如 `css/syntax.css`。Jekyll Docs 中提到了一个现成的 [syntax.css](https://github.com/mojombo/tpw/tree/master/css/syntax.css)。

2) 将刚才添加的 CSS 文件包含到相应的 layout 文件中，例如 `_layouts/post.html`。

{% highlight html %}
<head>
<link href="./css/syntax.css" rel="stylesheet">
</head>
{% endhighlight %}

3) 第三步呢，就是在你的 post 中使用 `highlight` Liquid tags。当然，你需要在`_config.yml`中设置好 highlighter。如果你不想显示行号，可以不用加 `linenos`。

那么，举个栗子，这段 Ruby 代码经过 Jekyll 处理之后就变成：

{% highlight ruby linenos %}
def show
  puts "Outputting a very lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong line"
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}

没有行号的代码如下：

```ruby
def show
  puts "Outputting a very lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong line"
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
```

还不错吧，你还可以进一步改进 CSS，使行号与代码部分以不同样式分隔开，比如说我这里，让行号颜色变浅一些，并添加了竖线分割。要这么做，只需要在CSS中添加：

{% highlight css linenos %}
/* Add to css/syntax.css */
.highlight .lineno { color: #ccc; display:inline-block; padding: 0 5px; border-right:1px solid #ccc; }
.highlight pre code { display: block; white-space: pre; overflow-x: auto; word-wrap: normal; }
{% endhighlight %}

## 使用 GitHub Gists

除了上述代码高亮外，另一种实现代码高亮的方法就是采用 GitHub Gists。

打开 [GitHub Gist](https://gist.github.com/)，创建一个 gist，然后复制 `Embed URL`，就能在 post 中实现和 GitHub 中一样一样的代码高亮。

比如说这样：

<script src="https://gist.github.com/flinhong/9c155871dadb81927b20.js"></script>


目前我还是采用第一种方法，Gists 备用吧。
