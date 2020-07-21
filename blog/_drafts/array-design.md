---
layout: blog_post
title:  "Design and Test Phased Arrays Online!"
tags: [rf-design,electronics,wireless,antenna,phased-array]
description: Here we discuss how you can design and test antenna arrays using only your browser and the array designer on this site! This allows you to generate any array you would like, steer the array by changing element phases, and see the output results... and all for free!
icon: /projects/software/assets/icons/array_designer_image.png
---
# {{ page.title }}
<img src='/projects/software/assets/icons/array_designer_image.png' class='post_image' alt='Phased Array 3D antenna Pattern'>
In this post, I am going to give a brief tutorial on how to use the [Phased Array Designer]({% post_url /projects/software/2020-07-01-array-designer %}) that I built as a fun project to improve my javascript skills.
We will also go over some examples on how to create and simulate a few different types of array shapes for different frequencies.

## What is a Phased Array?
Antenna arrays have been used for nearly a century for a wide range of applications ranging from radar to communications. 
They provide multiple benefits over using a single antenna such as increased gain and the ability to electronically 'steer' the antenna. Increased gain allows for better signal to noise ratio while electronic steering reduces mechanical parts which can increase the lifespan of a device. There exist many (many!) resources for how arrays work so I will not discuss that in depth here. I really like the articles over at [Microwaves101](https://www.microwaves101.com/encyclopedias/phased-array-antennas), but there are a lot of other good tutorials from videos to books to blogs on the subjects (it's not a new thing).

## Motivation
<p>
Personally, I work a lot with antenna arrays for 5G communications (I put the coronavirus in the 5G cell towers ;) ). 5G systems are looking to utilize millimeter-waves (mmWaves) to increase the possible bandwidth that you can send over a set of frequencies. This in turn allows more cat videos to be streamed in 8K resolution simultaneously!
Unfortunately, as we <span class='tooltip' data-tooltip-text='Friis Transmission Equation'>increase frequency we incur more losses</span> as the electromagnetic waves travel through the air (thanks physics). Therefore 5G systems are going to rely heavily on large antenna arrays to be able to connect with users. Obviously there are a lot more pros and cons to utilizing mmWaves and all sorts of other interesting discussions around 5G, but that is a discussion for another post. 
The [Phased Array Designer]({% post_url /projects/software/2020-07-01-array-designer %}) is a tool I designed to help build and test the capabilities of large arrays for these types of applications all in the browser. It was build to improve my javascript skills so it is definitely a work in progress. It was something I have worked a lot on in the past and was a good project for playing around with web development (I am definitely no web developer). Currently the tool is capable of quickly generating arbitrary array layouts, letting the user upload and download the array element positions, steer the array, and view both 2D and 3D array patterns within the browser. 
</p>


## Walkthrough

linear example

### Creating the Array

We use th emath library, what variables are available? 

### Downloading and Uploading Arrays

Why would I ever want to use this? (could be useful for my work)

### Steering the Array

how do we calculate steering vectors?

what settings are possible

### Viewing the Array Pattern

how do we calculate the array pattern

what settings are possible, what plotting software?


## Example arrays

### Planar

l

### Circular

l

### Arbitrary 3D Shapes

spiral? 

## So Whats Missing?

Well it seems like the array designer can just do everything! Ok obviously it has many shortcomings, but its not a terrible start to a very useful and fun tool for visualizing phased arrays.

Some things that are currently missing include:
- Antenna Patterns
- Element Coupling

Some of these I would like to implement, others I could really care less and this is a decent approximation



