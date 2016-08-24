---
layout: page
title: Search
permalink: /search/
---

<form action="/search/" target="_self" method="get">
    <input type="text" placeholder="Type and press enter..." name="q">
</form>

<div class="search-results">
<script>
  (function() {
    var cx = '005105319929643229323:e9fsi_yc9ng';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:searchresults-only></gcse:searchresults-only>
</div>
