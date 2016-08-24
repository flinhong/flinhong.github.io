---
layout: page
title: Tags
permalink: /tags/
---

<div class="panel">
	<div class="panel-content">

		<div class="tagcloud">
			{% for tag in site.tags %}<a href="{{ site.url }}/tags/#{{ tag | first }}">{{ tag | first }}</a>{% endfor %}
		</div>

	</div>
<!-- END .panel -->
</div>

<div class="breaking-line"></div>

<div class="accordion">
	{% for tag in site.tags limit:1 %}
	<div class="accordion-tab active">
		<a href="{{ tag.first }}" id="{{ tag.first }}">{{ tag.first }}</a>
		<div class="accordion-block">
			<p>
				{% for post in site.tags[tag.first] %}
				<ul class="fa-ul">
					<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
				</ul>
				{% endfor %}
			</p>
		</div>
	</div>
	{% endfor %}
	{% for tag in site.tags offset:1 %}
	<div class="accordion-tab">
		<a href="{{ tag.first }}" id="{{ tag.first }}">{{ tag.first }}</a>
		<div class="accordion-block">
			<p>
				{% for post in site.tags[tag.first] %}
				<ul class="fa-ul">
					<li><i class="fa-li fa fa-angle-double-right"></i><a href="{{ post.url | prepend: site.url }}">{{ post.date | date: "%Y/%m/%d" }} - {{ post.title }}</a></li>
				</ul>
				{% endfor %}
			</p>
		</div>
	</div>
	{% endfor %}
</div>