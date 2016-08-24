---
layout: page
title: Post Archives
permalink: /archives/
---

{% for post in site.posts %}
{% assign currentdate = post.date | date: "%B %Y" %}
{% if currentdate != date %}
<h2 id="{{ currentdate }}">{{ currentdate }}</h2>
{% endif %}
{% assign date = currentdate %}
<ul class="fa-ul">
	<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
</ul>
{% endfor %}