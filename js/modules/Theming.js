/* @brief All of our theme stuff    */
/* @author Alec Weiss               */
/* @date 6-2020                     */

export {set_theme,get_theme,themeEventListener}

/*
@brief Set the website theme by setting 'data-theme' attribute of <html>
@param[in] theme_value - value to set the theme. can be 'dark','light','default'
*/
function set_theme(theme_value){
    // set the current value
    document.getElementsByTagName('html')[0].setAttribute('data-theme',theme_value); 
    // store to viable location
    if (typeof(Storage) !== "undefined") { // set the user values
        sessionStorage.setItem('data-theme',theme_value);
    } else { //otherwise use cookies
        document.cookie = "data-theme="+theme_value+";path=/";
    }
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
@param[in] select_item - <select> html item to set theme from
*/
function themeEventListener(){
    var select_item = document.querySelector('#common_navbar_theme_selector');
    var theme_str = select_item.value;
    set_theme(theme_str);
}