/* @brief All of our theme stuff    */
/* @author Alec Weiss               */
/* @date 6-2020                     */

export {set_theme,get_theme,themeEventListener}

import {set_user_data} from './Generic.js';

/*
@brief Set the website theme by setting 'data-theme' attribute of <html>
@param[in] theme_value - value to set the theme. can be 'dark','light','default'
*/
function set_theme(theme_value){
    // set the current value
    document.getElementsByTagName('html')[0].setAttribute('data-theme',theme_value); 
    // store to viable location
    set_user_data('data-theme',theme_value)
}

/*@brief extract our theme information colors into a dictionary*/
function get_theme(){

  // initialize and get the name
  var theme_info = {};
  theme_info['name'] = document.querySelector('html').getAttribute('data-theme');

  //now get css variables
  var css_var_names = [
      '--text-color',
      '--text-accent-color',
      '--background-color',
      '--background-accent-color',
      '--border-color',
      '--background-image',
      '--text-font',
      '--header-font'
  ]

  // now get the current style values
  for(i=0;i<css_var_names.length;i++){
    let var_val = getComputedStyle(document.body).getPropertyValue(css_var_names[i]);
    theme_info[css_var_names[i].replace('--','').replace(new RegExp('-', 'g'),'_')] = var_val
  }
  return theme_info;
}

/*
@brief Change the current theme from a <select> item
@param[in] select_elem - <select> html item to set theme from
*/
function themeEventListener(select_elem){
    var theme_str = select_elem.value;
    set_theme(theme_str);
}