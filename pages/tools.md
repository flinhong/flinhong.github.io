---
layout: page
title: Tools
permalink: /categories/tools/
---

{% for post in site.categories.Tools %}
<ul class="fa-ul">
	<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
</ul>
{% endfor %}