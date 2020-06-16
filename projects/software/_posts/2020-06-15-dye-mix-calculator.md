---
title: Dye Mix Calculator
layout: default
permalink: /:categories/:title:output_ext
---

<!-- Custom CSS and javascript -->
<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}color_mixer/css/color_mixer.css">
<script src='{{ site.baseurl }}color_mixer/js/color_mixer.js'></script>

<!-- NNLS Solver Library -->
<script src="https://cdn.jsdelivr.net/npm/ml-fcnnls@1.1.0/fcnnls.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ml-matrix@6.5.0/matrix.umd.min.js"></script>


# Color Mixer  <b style='color:orangered;'>UNDER CONSTRUCTION</b>

This is a color mixing tool. Like many others, this tool allows you to to add a set of input colors 
and add/remove amounts of the color to get a desired mixture color. 
Unlike other tools, this tool also allows you to specify a desired output color and will calculate
the required mixture of the colors you have to get a specific output.


## Instructions

### Adding Colors:

1. Click the 'Add' Button
1. Set the name of the Color
1. Click on the color in the table to open the color selector
1. Select the color from the wheel or by value
1. Click 'Save' after all colors have been added to store for next time


### Mixing Colors:

1. In the table of available colors, change the value of 'Count'
1. Add or remove amounts of each color until the final color is seen in the 'Mixed Color' box


### Calculating colors

1. Click on the 'Desired Color' color box
1. Select the color by wheel or value
1. Click 'Calculate' to automatically populate the 'Count' in the table


<h2>Output Colors</h2>
<div id='desired_and_mixed_color'>

  <div id='desired_color_and_header' class='color_viewer'>
    <h2>Desired Color</h2>
    <input type='color' name='desired_color' id='desired_color' class='color_selection' value='#555555'>
    <button onclick='calculate_desired_color()'>Calculate</button>
    <input type='number' min=0 value=100 id='desired_total_count'>
  </div>

  <div id='mixed_color_and_header' class='color_viewer'>
    <h2>Mixed Color</h2>
    <div id='mixed_color' class='color_selection' style='background:#555555'></div>
  </div>

</div>

  <h2>Available Colors</h2>
  <!-- Colors Available for Mixing -->
  <div id='user_colors'>
    <!-- Color Table -->
    <template id='user_colors_table_row_template'>
      <tr>
        <td contenteditable=True>Blue</td>
        <td><input type='color' value='#0000ff'></td>
        <td><input type='number' min=0 placeholder='###'></td>
        <td><button onclick='remove_color_row(this)'>Trash</button></td>
      </tr>
    </template>
    <table id='user_colors_table' oninput="update_mixed_color(this)">
      <thead>
        <tr>
          <th>Name</th><th>Color</th><th>Count</th><th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td contenteditable=True>Blue</td>
          <td><input type='color' value='#0000ff'></td>
          <td><input type='number' min=0 placeholder='###'></td>
          <td><button onclick='remove_color_row(this)'>Trash</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Save Colors -->
    <div id='user_colors_buttons'>
      <button id='add_color_button' onclick='add_color_row()'>Add</button>
      <button id='add_color_button' onclick='save_user_colors(document.querySelector("#user_colors_table"))'>Save</button>
    </div>

  </div>
  

