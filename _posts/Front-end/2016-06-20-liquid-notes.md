---
layout: post
title: 简单学学 Liquid 在 Jekyll 中的使用
category: Front-end
tags: ["Jekyll", "Liquid"]
image: /images/201606/liquid.jpg
description: Liquid 是个简单有效的模板工具，而 Jekyll 处理页面时常使用 Liquid 调用变量或是进行一些循环操作，使得我们的 Jekyll 模板更具逻辑性和易用性。
toc: true
---

## Liquid 基础

Liquid 是个简单有效的模板工具，而 Jekyll 处理页面时常使用 Liquid 调用变量或是进行一些循环操作，使得我们的 Jekyll 模板更具逻辑性和易用性。

Liquid 中有两种 tag：

* 使用两个花括号调用变量，例如：`{% raw %}{{ varibale }}{% endraw %}`
* 使用花括号和百分号进行逻辑操作，例如：`{% raw %}{% if statement %}{% endraw %}`

### 变量

以下是一个简单的页面（本文中的所有例子均来自 [Jekyll Tips](http://jekyll.tips/)），通过 Liquid 调取 `front matter` 中的变量 `heading`：

```html
---
heading: I like cupcakes
---
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>{% raw %}{{ page.heading }}{% endraw %}</h1>
  </body>
</html>
```

同时我们可以在变量后添加 "filter" 条件来改变所调用变量的输出，例如把上面的 `heading` 大写：

```html
...
<h1>{% raw %}{{ page.heading | upcase }}{% endraw %}</h1>
...
```

当然，还能使用多个 `filter`，例如截取 `heading` 中的字符：

```html
...
<h1>{% raw %}{{ page.heading | upcase | truncate: 8 }}{% endraw %}</h1>
...
```

### 逻辑操作

如下例，可以通过条件语句调整输出结果，只有当 `show_heading` 为 `true` 时才显示 `<h1>`：

```html
---
heading: I like cupcakes
show_heading: true
---
...
{% raw %}
{% if page.show_heading %}
  <h1>{{ page.heading | upcase | truncate: 8 }}</h1>
{% endif %}
{% endraw %}
...
```

下例增加了 `elsif` 语句进行多个条件的判断，当 `show_heading` 不为真时，判断 `heading` 中是否包含 "cupcake"：

```html
---
heading: I like cupcakes
show_heading: false
---
...
{% raw %}
{% if page.show_heading %}
  <h1>{{ page.heading | upcase | truncate: 8 }}</h1>
{% elsif page.heading contains "cupcake" %}
  <h1>I want cupcakes</h1>
{% else %}
  <h1>I don't want cupcakes</h1>
{% endif %}
{% endraw %}
...
```

除了 `if` 外，Liquid 中的 `for` 循环也很简单：

```html
---
heading: I like cupcakes
show_heading: false
cupcakes:
  - chocolate
  - lemon
  - strawberry
---
...
<ul>
{% raw %}
{% for cupcake in page.cupcakes %}
  <li>{{ cupcake }}</li>
{% endfor %}
{% endraw %}
</ul>
...
```

上面，将 `front matter` 中定义的 "cupcakes" 循环输出到列表中。另外 `case` 也是支持的：

```html
<p class="rating">
  {% raw %}
  {% case cupcake.rating %}
    {% when 1 %}
      <img src="/images/rating/sick.png"/>
    {% when 2 %}
      <img src="/images/rating/unhappy.png"/>
    {% when 3 %}
      <img src="/images/rating/ok.png"/>
    {% when 4 %}
      <img src="/images/rating/happy.png"/>
    {% when 5 %}
      <img src="/images/rating/super_happy.png"/>
  {% endcase %}
  {% endraw %}
</p>
```

## Liquid 中的 filter

下表是 Liquid 中常用的 `filter`，你也可以访问 [Jekyll Cheat Sheet](http://cheat.jekyll.tips/) 查看所有可用的 `filter` 及样例。

---

| **filter** |  **输出**    |
|:----------------------------------------------|:------------------|
|   `{% raw %}{{ "cupcake" | prepend: "chocolate " }}{% endraw %}`   | chocolate cupcake |
|   `{% raw %}{{ "lemon" | append: " cake" }}{% endraw %}`   | lemon cake |
|   `{% raw %}{{ "i like cupcakes" | capitalize }}{% endraw %}`   | I like cupcakes |
|   `{% raw %}{{ "BakeryStore" | downcase }}{% endraw %}`   | bakerystore |
|   `{% raw %}{{ "apple pie" | upcase }}{% endraw %}`   | APPLE PIE |
|   `{% raw %}{{ "muffin&cupcake?" | cgi_escape }}{% endraw %}`   | muffin%26cupcake%3F |
|   `{% raw %}{{ "<h1>Banana Split</h1>" | escape }}{% endraw %}`  | <h1>Banana Split</h1> |
|   `{% raw %}{{ "blueberry muffin.html" | slugify }}{% endraw %}`  | blueberry-muffin-html |
|   `{% raw %}{{ "<h1>Greentea cheesecake</h1>" | strip_html }}{% endraw %}`  | Greentea cheesecake |
|   `{% raw %}{{ "**Sour dough** bread" | markdownify }}{% endraw %}`  | Sour dough bread |
|   `{% raw %}{{ "I really really like cupcakes" | remove_first: 'really' }}{% endraw %}`  | I really like cupcakes |
|   `{% raw %}{{ "I really really like cupcakes" | remove: 'really' }}{% endraw %}`  | I like cupcakes |
|   `{% raw %}{{ "I really really like cupcakes" | replace_first: "really", "truly" }}{% endraw %}`  | I truly really like cupcakes |
|   `{% raw %}{{ "I really really like cupcakes" | replace: "really", "truly" }}{% endraw %}`  | I truly truly like cupcakes |
|   `{% raw %}{{ "Carrot cake" | size }}{% endraw %}`   | 11 |
|   `{% raw %}{{ "Peanut butter cheesecake" | number_of_words }}{% endraw %}`   | 3 |
|   `{% raw %}{{ "Souffle" | slice: 0 }}{% endraw %}`   | S |
|   `{% raw %}{{ "Souffle" | slice: 1 }}{% endraw %}`   | o |
|   `{% raw %}{{ "Souffle" | slice: -2 }}{% endraw %}`   | l |
|   `{% raw %}{{ "Souffle" | slice: 2,4 }}{% endraw %}`   | uffl |
|   `{% raw %}{{ "apple,banana,carrot" | split:"," | jsonify }}{% endraw %}`   | ["apple","banana","carrot"] |
|   `{% raw %}{{ "The freshest bread in San Francisco" | truncate: 15 }}{% endraw %}`   | The freshest... |
|   `{% raw %}{{ "Who ate all the cupcakes?" | truncatewords: 3 }}{% endraw %}`   | Who ate all... |

---

## Liquid 中的循环

除了基础的 `for` 循环，Liquid 还有一些进阶的循环可以使用。

![images with different filter](/images/201606/style-cycle.png)

上面这个网页中，不同图片使用了不同的 `filter` 样式，我们可以结合 Liquid 中的 `cycle` 和 `for` 循环实现：

```html
---
layout: page
title: Muffins
---
<h1>Our cupcakes</h1>

<div class="cupcakes">
  {% raw %}
  {% for cupcake in site.cupcakes %}
    <div class="cupcake">
      <div class="image">
        <img src="{{ cupcake.image_path }}" alt="{{ cupcake.type }}" style="-webkit-filter: {% cycle "grayscale", "sepia", "invert" %}(100%)" />
      </div>
      <h2>{{ cupcake.type }}</h2>
      <p>{{ cupcake.description }}</p>
    </div>
  {% endfor %}
  {% endraw %}
</div>
```

通过 `forloop.index` 还能获得当前循环的次数：

```html
...
<h2>{% raw %}{{ forloop.index }}. {{ cupcake.type }}{% endraw %}</h2>
...
```

![Forloop Index](/images/201606/forloop-index.png)

如果要从 "0" 还是计数，可以改为：

```html
...
<h2>{% raw %}{{ forloop.index0 }}. {{ cupcake.type }}{% endraw %}</h2>
...
```

另外，可以使用 `reversed` 使 `for` 循环逆向进行：

```html
...
{% raw %}
{% for cupcake in site.cupcakes reversed %}
{% endraw %}
...
```

要限制 `for` 循环的输出个数可以使用 `limit`，而要跳过前 `x` 个输出可以使用 `offset`：

```html
...
{% raw %}
{% for cupcake in site.cupcakes reversed limit: 3 offset: 3 %}
{% endraw %}
...
```

一个简单的 Jekyll 博客不需要太多复杂的东西，到这里就差不多了。要学习更多关于 Liquid 的内容，请参考 [Liquid Docs](https://shopify.github.io/liquid/)。