---
layout: post
title: Better quality of Google Analytics data for Jekyll blogs
category: Front-end
tags: ["Jekyll", "Google Analytics"]
image: /images/201607/ga.png
description: The default Google Analytics extract the page information from windows.location and document.title by using its default code snippets. However, for some cases, the visitor to the blog post may load the page from Google's cache or use a service such as Google Translate that no longer contains the orginal URL or the title might be modified. As a result, this particular type of page view is still recorded. The solution for this problem is to pass the page information when sending the page view event.
toc: false
---

The default Google Analytics extract the page information from `windows.location` and `document.title` by using its default code snippets. This works fine if the page is loaded directly from its origin file without any modification. However, for some cases, the visitor to the blog post may load the page from Google's cache or use a service such as Google Translate that no longer contains the orginal URL or the title might be modified. As a result, this particular type of page view is still recorded.

The solution for this problem is to pass the page information when sending the page view event. Of course, for this to work these values must appear as constants in the JS scripts returned by the site. With Liquid used by Jekyll, this is easy to achieve because the location and title are available from the YAML such as `page.url` or `page.title`.

```js
ga('send', 'pageview', {
  'page': '{% raw %}{{ page.url }}{% endraw %}',
  'title': '{% raw %}{{ page.title | replace: "'", "\\'" }}{% endraw %}'
});
```

In the generated page these options will indeed appear as constants and they will be sent unmodified to Analytics, even if the page is loaded from Google’s cache or modified by Google Translate:

```js
ga('send', 'pageview', {
  'page': '{{ page.url }}',
  'title': '{{ page.title | replace: "'", "\\'" }}'
});
```