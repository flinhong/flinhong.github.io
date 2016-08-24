---
layout: info
title: Book Reading
permalink: /reading/
---

Recent read books recorded on [Douban](https://www.douban.com/people/flinhong/):

<script type="text/javascript" src="https://www.douban.com/service/badge/flinhong/?selection=latest&amp;picsize=medium&amp;hideself=on&amp;show=collection&amp;n=20&amp;hidelogo=on&amp;cat=book&amp;columns=6"></script>

<div class="clear-float do-the-split"></div>

<h2><span id="message">Give Me a Recommendation</span></h2>

{% if site.deploy %}
<div id="disqus_thread"></div>
<script>
var disqus_config = function () {
this.page.url = "{{ page.url | prepend: site.url }}";
this.page.identifier = "{{ site.url }}/{{ page.id }}";
this.page.title = "{{ page.title }}";
};
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//flinhong.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}