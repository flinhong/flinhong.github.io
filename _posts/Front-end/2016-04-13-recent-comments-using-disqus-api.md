---
layout: post
category: Front-end
title: 使用 Disqus API 加载最近评论
notebook: Posts
tags: ["JavaScript", "Disqus"]
image: /images/201604/comments.jpg
description: Disqus 以前提供了最近评论的 JavaScript 代码，但是官方提示说不再继续支持，而是提供了新的 Disqus API 供开发者使用。那么我们好好把 Disqus API 用起来，做一个最近评论的列表吧。
toc: true
---

多说应该是目前国内用户量最大的社会化评论平台，但是稳定性堪忧，还不能完全适用于 https，所以我又把博客的评论系统从多说换到了 Disqus。

之前多说官方提供了最近评论的 JavaScript 代码，直接加载就好，现在换到 Disqus 又要折腾了。

## 关于 Disqus

Disqus 在国外的网站上很常见，但在国内可能被墙所以用的不多。而且 Disqus 提供的第三方登录（Facebook, Twitter, Google）国内全部无法使用，Disqus 账户国内也不是非常普及。虽然允许不登录留言，但是 Disqus 默认引导注册 Disqus 账号，需要勾选「I'd rather post as a guest」这个隐秘的复选框，才能只输入昵称和邮箱提交评论。

但是人家稳定呀，也没有其他合适的选择，那只能靠自己把需要的最近评论搞定啦。

早些时候，Disqus 也提供了最近评论的 JavaScript 代码，但是官方提示说[不再继续支持](https://help.disqus.com/customer/portal/articles/1179651-widgets)，而是提供了新的 [Disqus API](https://disqus.com/api/docs/) 供开发者使用。虽说 API 自由度更高，但对于我这样的菜鸟来说难度就有点大了，只能祭出 Google 求助了。

Disqus 提供了一大堆的 API，而且 Documents 对我来说比较晦涩。找来找去就只找到一段官方的 [Sample codes](https://github.com/TaltonFiggins/disqus-recent-comments/blob/master/disqus-recent-comments.php)，但用的是 php 写的 ，对于我这样使用 Jekyll 静态网页的来说，用处不大了。

## JavaScript Disqus Widget

搜索过程中发现，Disqus 早先的 `recent_comments_widget.js` 还是可以继续使用的，只是不再提供更新了。

用起来也很方便，使用下面这段代码即可[^1]：

```html
<script type="text/javascript" src="http://example.disqus.com/recent_comments_widget.js?num_items=5&hide_mods=0&hide_avatars=0&avatar_size=32&excerpt_length=100"></script>
```

把代码中的 `example` 换成你注册的 Disqus shortname 就行了，更多的配置可以参见 [How To Add Disqus Recent Comments Widget](http://subinsb.com/add-disqus-recent-comments-widget)。

## Disqus API 用起来

虽说上面的方法我试过能用，但是官方都不建议使用了，那怎能安心的将就下去。

还好搜到一个 [Example of a JavaScript Disqus Recent Comment Widget](http://www.raymondcamden.com/2014/03/21/Example-of-a-JavaScript-Disqus-Recent-Comment-Widget/)，正好解决了我的问题，bravo！

那么，依样画个葫芦画个瓢，把 Disqus API 用起来吧。

1. 首先需要一个 `public Disqus API key`。

    通过 [API Resources - Applications](https://disqus.com/api/applications/) 创建一个新应用就行。你将得到一个 `Secret Key` 和一个 `Public Key`，这里只需要用到 `Public Key`。但是需要设置 `Domains` 以允许那些域名能使用这个 API Key，为了调试方便，我把 localhost 也加进去了[^2]。

2. 虽然 Disqus 提供了几十个 API，但这里用到 `forums/listPosts` 这一个就可以 pull 最近评论了。来一份官方 [Documentation](http://disqus.com/api/docs/forums/listPosts/) 以供参考。

3. Disqus 把你的网站看作一个 `forum`，而其中的一个个评论视作你的 `posts`，所以不要把这个 `posts` 看作是自己的文章了。

4. 这个 API 可以提供多个参数，比如说我这里只需要最近 5 个评论，就设置 `limit=5` (默认是 25，最大为 100)，然后 `related=thread` 用以调取我们相应文章的信息（具体不太理解 😜）。

这样就配置完了，剩下的都是 CSS 的魔法了。将返回的信息自定义好 html 格式，然后通过 CSS 设置相应样式。

我用到的代码如下：

{% highlight js linenos %}
// Disqus comments
<script src="/js/moment.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $commentDiv = $("#recent-comments");
    $.get("https://disqus.com/api/3.0/forums/listPosts.json?forum=flinhong&limit=5&related=thread&api_key=your_public_api_key", function(res, code) {
        if(res.code === 0) {
            var result = "";
            for(var i=0, len=res.response.length; i<len; i++) {
                var post = res.response[i];
                console.dir(post);
                var timeago = moment.utc(post.createdAt).startOf('minute').fromNow();
                var html = "<div class='comment'>";
                html += "<img src='" + post.author.avatar.small.permalink + "'>";
                html += "<a href='"+ post.author.profileUrl + "'>" + post.author.name + "</a>";
                html += " • "+timeago;
                html += "<p class='postRef'>" + post.raw_message + "</p>";
                html += "<p><span>posted on</span> <a href='"+ post.thread.link + "'>" + post.thread.title + "</a></p>";
                html += "</div>";
                result+=html;
            }
            $commentDiv.html(result);
        }
    });
});
</script>
{% endhighlight %}

上面的代码我实际用的时候调整了一下 html 样式，但大概就是这个意思了。把其中的 `forum=flinhong` 替换成你自己的 Disqus shortname，然后填入相应的参数设置（可用的设置参数去上面的官方文档中找）和 api_key，然后去改 html 和 CSS 吧。

由于 Disqus 返回的时间格式 `2008-06-10T01:45:27` 不好直接使用，所以我这里用到了一个 [moment.js](http://momentjs.com/) 将时间转换成 Disqus 评论里常见的 `20 minutes ago` 这样的格式。看这篇文章右侧就是完成的样子啦，多多评论呀 😌！

## Disqus API 的使用限制

Disqus 限制了每小时只能有 1000 次请求，所以如果你的网站访问量很大，你就需要悠着点用了。[Building a Disqus Recent Comments Widget with JavaScript](http://jaimeiniesta.com/articles/building-a-disqus-recent-comments-widget-with-javascript/) 这篇文章里面提到使用 [jquery-ajax-localstorage](https://github.com/paulirish/jquery-ajax-localstorage-cache) 来缓存 Disqus 返回的信息，这样同一个用户访问多个页面就能只记录一次请求了。

我就不折腾这个缓存了，反正我用不到 😊。


参考:

[^1]: [How To Add Disqus Recent Comments Widget](http://subinsb.com/add-disqus-recent-comments-widget)
[^2]: [Example of a JavaScript Disqus Recent Comment Widget](http://www.raymondcamden.com/2014/03/21/Example-of-a-JavaScript-Disqus-Recent-Comment-Widget/)
