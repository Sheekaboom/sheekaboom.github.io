$(function(){
    // initialize the user settings
    initializeUserSettings();

    // navigation bar and components
    $('#common_navbar_placeholder').load('/common/nav.html'); //navigation bar

    // footer and components
    $('#common_footer_placeholder').load('/common/footer.html'); //page footer

});

/*
@brief Initialize user settings on each page
*/
function initializeUserSettings(){
    
    // list of user settings and default values
    var user_settings = ['data-theme'];
    var default_user_setting_values = ['default'];

    // set the values from storage
    for(i=0;i<user_settings.length;i++){
      if (typeof(Storage) !== "undefined") { // set the user values
        var setting_value = localStorage.getItem(user_settings[i]) || default_user_setting_values[i];
      } else {
        var setting_value = getCookie(user_settings);
      }
      document.getElementsByTagName('html')[0].setAttribute(user_settings[i],setting_value);
    }
}

/*
@brief Load any modules on the page (as seen with <import> tags) from its src attribute
@note The <import> tag is NOT valid html. It will be replaced with anything in its src
*/
function import_html_modules(){
  // first lets get all of our import tags on the page
  var import_tag = 'html-import';
  var import_elements = document.getElementsByTagName(import_tag);

  // now lets loop through each one
  for(i=1;i<import_elements.length,i++){
    // get the path  
    var src_path = import_elements.getAttribute('src')
    //load in the source data (or create request to do so)
    replace_element_from_file(import_elements[i],src_path);
  }
}

/*
@brief Replace a given element with html from a file
@note this creates an XMLHttpRequest to get the data
@param[in] element - element to replace
@param[in] file_path - path to the html file to replace the element with
*/
function replace_element_from_file(element,file_path){
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", function(){
    element.parentNode.insertBefore(this,element);
    element.parentNode.remove(element);
  });
  xhttp.open("GET", file_path, true);
  xhttp.send();
}
