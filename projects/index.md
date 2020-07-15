---
title: Projects
layout: default
description: Find all projects on WeissWorks! There is everything from woodworking to software projects to browse here.
authors: [aweiss]
---

{% assign my_category_name = 'projects' %}
{% assign my_categories = site.categories[my_category_name] %}

# Projects

## Software

{% assign post_item_list = site.categories['projects'] | where_exp:"post","post.categories contains 'software'" %}
{% include post_item_list.html %}

## Carpentry

{% assign post_item_list = site.categories['projects'] | where_exp:"post","post.categories contains 'carpentry'" %}
{% include post_item_list.html %}





