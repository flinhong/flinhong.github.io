---
layout: post
title: Jekyll 中的日期格式
category: Front-end
notebook: Posts
tags: ["Jekyll"]
image: /images/201603/date format.jpg
video:
audio:
description: 博客中，经常需要调用文章发表日期，而且需要各种长短不一的日期格式以适配不同的场景。好在 Jekyll 使用 Liquid 标记语言来显示日期，可以方便地自定义显示格式，另外其他用到 Liquid 的地方都能用下面的方法来调整日期显示格式。
toc: true
---

博客中，经常需要调用文章发表日期，而且需要各种长短不一的日期格式以适配不同的场景。好在 Jekyll 使用 Liquid 标记语言来显示日期，可以方便地自定义显示格式，另外其他用到 Liquid 的地方都能用下面的方法来调整日期显示格式。

## Liquid默认样式

Jekyll 使用 Shopify's Liquid Template Engine[^1]，显示日期可以直接使用 Liquid tag: `page.date`，当然外面加上双大括号（由于会直接显示结果了，所以这里和下文都不加大括号了）。这种默认格式显示结果为：

```
page.date
{{ page.date }}
```

当然，一般情况下使用 Jekyll 很少去定义一个文章的具体时间，所以看到的 time 都是 `00:00:00`，当然你也可以在 YAML 中加上 time。如果对上面的默认 tag 加以修饰，就能生成各种不同格式的日期样式，更方便我们查看。例如，加上一个 `date:`的 filter，我们就可以只取日期而不取时间，这也是我们最常使用的，比如下面的样式：

```
page.date | date: '%B %d, %Y'
{{ page.date | date: '%B %d, %Y' }}

page.date | date: '%b %d, %Y'
{{ page.date | date: '%b %d, %Y' }}

page.date | date: '%b %-d, %Y'
{{ page.date | date: '%b %-d, %Y' }}

page.date | date: '%Y-%m-%d'
{{ page.date | date: '%Y-%m-%d' }}
```

用到上面这些其实已经相当足够了，可以按自己的需要做各种自定义。当然还可以对结果进一步处理，具体可参见 Jekyll Date Formatting Examples 中更多的示例[^2]。这篇文章也主要是简单做个总结，方便自己参考。

## Jekyll 内置样式

### Date to String

```
page.date | date_to_string
{{ page.date | date_to_string }}

Output Example 1: 03 May 2016
Output Example 2: 04 Jul 2016
Output Example 3: 23 Sep 2016
Output Example 4: 26 Nov 2016
```

### Date to Long String

```
page.date | date_to_long_string
{{ page.date | date_to_long_string }}

Output Example 1: 03 May 2016
Output Example 2: 04 July 2016
Output Example 3: 23 September 2016
Output Example 4: 26 November 2016
```

### Date to XML Schema

```
page.date | date_to_xmlschema
{{ page.date | date_to_xmlschema }}

Output Example 1: 2016-05-03T09:14:00-04:00
Output Example 2: 2016-07-04T09:14:00-04:00
Output Example 3: 2016-09-23T09:14:00-04:00
Output Example 4: 2016-11-26T08:14:00-05:00
```

### Date to RFC-822

```
page.date | date_to_rfc822
{{ page.date | date_to_rfc822 }}

Output Example 1: Fri, 03 May 2016 09:14:00 -0400
Output Example 2: Thu, 04 Jul 2016 09:14:00 -0400
Output Example 3: Mon, 23 Sep 2016 09:14:00 -0400
Output Example 4: Tue, 26 Nov 2016 08:14:00 -0500
```

## Jekyll 中自定义 Liquid 样式

### 非英文月份

Outside U.S. Style with Non-English Full Month Name，这里就用中文简单举例好了，其实很不适合中文呢，不过大概意思就是这样了。

<script src="https://gist.github.com/flinhong/2e903284c59e84abbccb.js"></script>

```
{% assign m = page.date | date: "%-m" %}{% case m %}{% when '1' %}一月{% when '2' %}二月{% when '3' %}三月{% when '4' %}四月{% when '5' %}五月{% when '6' %}六月{% when '7' %}七月{% when '8' %}八月{% when '9' %}九月{% when '10' %}十月{% when '11' %}十一月{% when '12' %}十二月{% endcase %}{{ page.date | date: "%-d" }}号，{{ page.date | date: "%Y" }}
```

### 英文有序日期

U.S. Style with Full Month Names and Ordinalized Days:
<script src="https://gist.github.com/flinhong/533a14966a01cddd60c4.js"></script>

```
Output Example 1: May 3rd, 2016
Output Example 2: July 4th, 2016 
Output Example 3: September 23rd, 2016 
Output Example 4: November 26th, 2016
```

### 英文月份缩写

U.S. Style with AP Month Abbreviations and Ordinalized Days:
<script src="https://gist.github.com/flinhong/ab6fd80d7eae4164529f.js"></script>

```
Output Example 1: May 3rd, 2016
Output Example 2: July 4th, 2016 
Output Example 3: Sept. 23rd, 2016
Output Example 4: Nov. 26th, 2016
```

### 英文加上星期

U.S. Style Full Day and Full Month Names:

```
page.date | date: "%A, %B %-d, %Y"
{{ page.date | date: "%A, %B %-d, %Y" }}

Output Example 1: Friday, May 3, 2016
Output Example 2: Thursday, July 4, 2016 
Output Example 3: Monday, September 23, 2016 
Output Example 4: Tuesday, November 26, 2016
```

### 英文星期缩写

Chicago Manual of Style Day Abbreviations and U.S. Style Date:
<script src="https://gist.github.com/flinhong/837b5d9fc307e86f3166.js"></script>

```
Output Example 1: Fri. ~ May 3, 2016
Output Example 2: Thurs. ~ July 4, 2016
Output Example 3: Mon. ~ September 23, 2016 
Output Example 4: Tues. ~ November 26, 2016
```

真是不看不知道，一看吓一跳，前辈们真是好好和时间约了一次，才有现在这些结果 🐤。

参考：

[^1]: [Shopify's Liquid template engine](http://wiki.shopify.com/Liquid). "A small and fast template language which is quick to learn but very powerful for full customization."
[^2]: [Jekyll Date Formatting Examples](http://alanwsmith.com/jekyll-liquid-date-formatting-examples). "Everything you wanted to know about Jekyll date formatting but were afraid to ask."
