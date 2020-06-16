---
title: Blog
layout: default
---

{% assign my_category_name = 'blog' %}
{% assign my_categories = site.categories[my_category_name] %}

# Blog Posts

<ul>
  {% for post in my_categories %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>