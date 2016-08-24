---
layout: page
title: Front-End
permalink: /categories/front-end/
---

{% for post in site.categories.Front-end %}
<ul class="fa-ul">
	<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
</ul>
{% endfor %}