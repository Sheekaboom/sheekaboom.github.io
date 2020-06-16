---
title: Projects
layout: default
---

{% assign my_category_name = 'projects' %}
{% assign my_categories = site.categories[my_category_name] %}

# Projects

## Academic

- None Yet!


## Software

<ul>
    {% assign cat_name = 'software' %}
    {% for post in my_categories %}
        {% if post.categories contains cat_name %}
            <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endif %}
    {% endfor %}
</ul>


## Carpentry

- None Yet!


## Other

- None Yet!
