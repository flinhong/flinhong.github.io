---
layout: page
title: Contact
permalink: /contact/
---

<div class="map-inner">
	<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8658104087326!2d114.13325781436062!3d22.28307244915237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ff85af39ecbb%3A0xea1597b626ef3c1e!2sChow+Yei+Ching+Bldg%2C+Pok+Fu+Lam+Rd%2C+Lung+Fu+Shan!5e0!3m2!1sen!2shk!4v1463247502320" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
</div>

## Getting in touch is easy!

Please feel free to contact me using the comments form below. Or you can send me emails via: <a href="mailto:franklin@flinhong.com"> franklin@flinhong.com</a>.

<div class="clear-float do-the-split"></div>

<h3><span id="message">Drop Me a Line</span></h3>

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