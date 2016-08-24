---
layout: post
title: Spaces or Tabs, and My Choice
category: Tech
tags: ["spaces", "tabs"]
notebook: Posts
image: /images/201607/tabs-spaces.jpg
audio:
video:
description: Traditionally source code has been rendered with a monospace font. This allows for manual horizontal positioning with spaces or tab characters. Of course the tab character doesn’t have a defined width so flame wars have erupted around spaces vs tabs, on par with the great editor wars of the last century. Ultimately these are pointless arguments.
toc: false
---

Traditionally source code has been rendered with a monospace font. This allows for manual horizontal positioning with spaces or tab characters. Of course the tab character doesn’t have a defined width so flame wars have erupted around [spaces vs tabs](https://www.jwz.org/doc/tabs-vs-spaces.html), on par with the great editor wars of the last century. Ultimately these are pointless arguments. Tabs vs spaces is an artifact of trying to render code into a monospace grid of characters. It’s the 21st century! We can do better than our dad's 1970s terminal. In fact, they did better in the *19th century*![^1]

Althogh they have talked a lot about this topic, I have no ideas why these two styles have to fight. After watching the following video, I was shocked that I'm not adapt to the action to continous hit the space button as in the video... And I vote for tabs in most cases!  

<iframe width="853" height="480" src="https://www.youtube.com/embed/SsoOG6ZeyUI" frameborder="0" allowfullscreen></iframe>
<br/>

People generally don't mind reading code that is consistently indented using tabs, or code that is consistently indented using spaces. The problems arise when some lines are indented with tabs, and others with spaces. In such cases, the code will only display nicely if the reader has the same tab stop settings as the authors and if all the authors used consistent settings. One way to solve this problem is to force everyone to be "tab people" or "space people".[^2]

The case for tabs:

- Gives reader control over visual effect.
- A tab has a meaning of "indent one level" (disputed; see below), whereas spaces have many meanings.
- Fewer keystrokes required to get things aligned.
- Files are smaller.
- It's the only way to get vertically aligned columns when we use proportional fonts.

The case for spaces:

- Consistent display across all display hardware, text viewer/editor software, and user configuration options.
- Gives author control over visual effect.
- Tabs are not as "visible" (that is, a tab generally looks just like a bunch of spaces)

The case for random mixture of tabs and spaces:

- Easy (you don't have to think about it).
- People who don't like it can use some sort of tool to automatically indent the code however they want.

For me, `tabs` or `spaces` are both OK when it could make the codes looks nice as the following pictures. But the last style with mixture is totally intolerable!


![tabs](/images/201607/tabs.png "TABS")
{:.hascaption}

![spaces](/images/201607/spaces.png "SPACES")
{:.hascaption}

In the olden days, back when we used manual typewriters, there was such a thing as a tabstop. These were vertical brackets along the page (well, along that metal bar at the bottom of the current line). These tiny pieces of metal literally stopped the tabs, thus giving them the name **tabstops**. We were so creative with names in those days. When you hit the tab key the **cursor** (a rapidly spinning metal ball imprinted with the noun: “Selectric”) would jump from the left edge of the paper to the first tabstop. Hit tab again and it will go to the next tabstop. Now of course, these tab stops were adjustable, so you could choose the indenting style you wanted for your particular document.[^1] This works really nice on the old machines, why not continue to use it in our visual codes?

Just as stated in the blog post [Why tabs are clearly superior](http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/), `tabs` have many advantages:

- Tabs take up less space
- Tabs can be personalized
- Tabs are better for collaboration
- You don’t depend on certain tools
- Tabs are easy to select
- Code indented with tabs is easier to copy & paste

So, I prefer `tabs` in cases it could work. And you can find other people's choice in different programming languages at [this page](https://ukupat.github.io/tabs-or-spaces/).

Refs:

[^1]: [Tabs vs Spaces, the Pointless War](http://joshondesign.com/2014/09/02/bar)

[^2]: [Tabs Versus Spaces](http://c2.com/cgi/wiki?TabsVersusSpaces)