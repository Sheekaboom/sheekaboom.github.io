---
title: Home
layout: default
---

# Welcome
<!--# {{ page.title }}-->

This site is very much still under construction. It is currently working as a development 
platform to learn web development.

# Latest Posts

<div class='post_item_list'>
  <span class='post_item_list_shim'></span>
  {% for post in site.categories['blog'] limit:3 %}
    <a href="{{ post.url }}" class='post_item'>
      <p class='post_item_title'>{{ post.title }}</p>
    </a>
  {% endfor %}
  <span class='post_item_list_shim'></span>
</div>


# Latest Projects

<div class='post_item_list'>
  <span class='post_item_list_shim'></span>
  {% for post in site.categories['projects'] limit:3 %}
    <a href="{{ post.url }}" class='post_item'>
      <p class='post_item_title'>{{ post.title }}</p>
    </a>
  {% endfor %}
  <span class='post_item_list_shim'></span>
</div>

<!--
You can use HTML elements in Markdown, such as the comment element, and they won't
be affected by a markdown parser. However, if you create an HTML element in your
markdown file, you cannot use markdown syntax within that element's contents.
-->