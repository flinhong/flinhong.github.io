---
layout: post
title: Related posts in Jekyll
category: Front-end
tags: ["Jekyll"]
image: /images/201607/related.jpg
description: Jekyll features a simple “Related posts” variable per post page with site.related_posts, which contains the 10 most recent posts in default. However, it only works perfectly when lsi (latent semantic indexing) option was enabled. The Liquid tags might be helpful here.
toc: false
---

Jekyll features a simple “Related posts” variable per post page with `site.related_posts`, which contains the 10 most recent posts in default. However, it only works perfectly when `lsi` (latent semantic indexing) option was enabled.[^1]

As explained in Jekyll documents, with `lsi` features will slow down the build process and also not supported by GitHub Pages.

So I find a [post](https://anmonteiro.com/2015/08/jekyll-related-posts-revamped/) that solved this issue by using only Liquid tags to generate the related posts with `tags` or `categories`. It works by going through the related posts collection and selecting the posts that contain any tags (or categories) in common with the current post, up to a setted limit. If there are enough posts to fill that limit, fine, it stops there. Otherwise, it goes again through the most recent, possibly unrelated posts, and outputs them until the limit is finally reached.

The full snippet is presented below.[^2]

```html
{% raw %}{% assign RELATED_POSTS_THRESHOLD = 3 %}{% endraw %}

<ul>
  {% raw %}{% assign related_post_count = 0 %}
  {% for post in site.related_posts %}
    {% if related_post_count == RELATED_POSTS_THRESHOLD %}
      {% break %}
    {% endif %}
    {% for tag in post.tags %}
      {% if page.tags contains tag %}{% endraw %}
        <li>
          <h3>
            <a href="{% raw %}{{ site.url }}{{ post.url }}{% endraw %}">
              {% raw %}{{ post.title }}{% endraw %}
              <small>{% raw %}{{ post.date | date_to_string }}{% endraw %}</small>
            </a>
          </h3>
        </li>
        {% raw %}{% assign related_post_count = related_post_count | plus: 1 %}
        {% break %}
      {% endif %}
    {% endfor %}
  {% endfor %}

  {% assign posts_left = RELATED_POSTS_THRESHOLD | minus: related_post_count %}
  {% unless posts_left == 0 %}
    {% for post in site.related_posts %}
      {% if posts_left == 0 %}
        {% break %}
      {% endif %}

      {% assign already_related = false %}
      {% for tag in post.tags %}
        {% if page.tags contains tag %}
          {% assign already_related = true %}
          {% break %}
        {% endif %}
      {% endfor %}
      {% unless already_related %}
        {% assign posts_left = posts_left | minus: 1 %}{% endraw %}
        <li>
          <h3>
            <a href="{% raw %}{{ site.url }}{{ post.url }}{% endraw %}">
              {% raw %}{{ post.title }}{% endraw %}
              <small>{% raw %}{{ post.date | date_to_string }}{% endraw %}</small>
            </a>
          </h3>
        </li>
      {% raw %}{% endunless %}
    {% endfor %}
  {% endunless %}{% endraw %}
</ul>
```

You can also change the `site.related_posts` to `site.posts` if you want more posts beyond the ten recent posts.

Refs:

[^1]: [Variables - Jekll](https://jekyllrb.com/docs/variables/)

[^2]: [Jekyll related posts revamped](https://anmonteiro.com/2015/08/jekyll-related-posts-revamped/)