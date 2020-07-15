---
title: Homepage
layout: default
description: Welcome to the home page of WeissWorks! Explore the various electronics, software, and woodworking projects and blog posts from a fellow nerdy human.
authors: [aweiss]
---

# Welcome

Hello! Welcome to my site. This site serves as a place to hold blog posts, various projects, and as a platform to learn web development. This site is continuously being improved, so check back in the future for new features, projects, and blog posts!

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