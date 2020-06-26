---
title: Projects
layout: default
---

{% assign my_category_name = 'projects' %}
{% assign my_categories = site.categories[my_category_name] %}

# Projects

## Software

<div class='post_item_list'>
  <span class='post_item_list_shim'></span>
  {% assign cat_name = 'software' %}
  {% for post in my_categories %}
    {% if post.categories contains cat_name %}
        <a href="{{ post.url }}" class='post_item'>
        <p class='post_item_title'>{{ post.title }}</p>
        </a>
    {% endif %}
  {% endfor %}
  <span class='post_item_list_shim'></span>
</div>

## Carpentry

<ul>
    {% assign cat_name = 'carpentry' %}
    {% for post in my_categories %}
        {% if post.categories contains cat_name %}
            <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endif %}
    {% endfor %}
</ul>

## Academic

<ul>
    {% assign cat_name = 'academic' %}
    {% for post in my_categories %}
        {% if post.categories contains cat_name %}
            <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endif %}
    {% endfor %}
</ul>

## Other

<ul>
    {% assign cat_name = 'other' %}
    {% for post in my_categories %}
        {% if post.categories contains cat_name %}
            <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endif %}
    {% endfor %}
</ul>
