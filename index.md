---
title: Home
layout: default
---

# Welcome

Hello! Welcome to my site. This site serves as a place to hold blog posts, my previous projects, and serves as a platform to learn web development. This site isare continuously being improved, so check back in the future for new features, projects, and blog posts!

# Latest Posts

{% assign post_item_list = site.categories['blog'] | slice: 0,3 %}
{% include post_item_list.html %}


# Latest Projects

{% assign post_item_list = site.categories['projects'] | slice: 0,3 %}
{% include post_item_list.html %}


<!--
You can use HTML elements in Markdown, such as the comment element, and they won't
be affected by a markdown parser. However, if you create an HTML element in your
markdown file, you cannot use markdown syntax within that element's contents.
-->