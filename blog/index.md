---
title: Blog
layout: default
---

# Disclaimer

<p>
The contents of this blog are for educational and entertainment purposes only. 
The view expressed in this blog are my own and do not represent the opinions of 
any other organization, person, or entity other than myself. If there is an issue or a dispute,
the blame should all be placed on me. While I do have advanced degrees in electrical engineering,
I by no means have an exhaustive knowledge of the field. I always welcome healthy discussion and 
am here to learn just as much as you are! Feel free to contact me with any questions, comments, concerns,
corrections, or to just say hi at {% include email.html %}.
</p>

While most of the posts in here are informational and family friendly, I don't mind using profanity to get my point across. So, if you don't like that... well I guess don't read the blog. Enjoy!

# Blog Posts

{% assign my_category_name = 'blog' %}
{% assign my_categories = site.categories[my_category_name] %}

<div class='post_item_list'>
  <span class='post_item_list_shim'></span>
  {% for post in my_categories %}
    <a href="{{ post.url }}" class='post_item'>
      <p class='post_item_title'>{{ post.title }}</p>
    </a>
  {% endfor %}
  <span class='post_item_list_shim'></span>
</div>