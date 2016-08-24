---
layout: page
title: Tips
permalink: /categories/tips/
---

{% for post in site.categories.Tips %}
<ul class="fa-ul">
	<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
</ul>
{% endfor %}