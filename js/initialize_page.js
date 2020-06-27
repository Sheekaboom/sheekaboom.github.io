$(function(){
    // initialize the user settings
    initializeUserSettings();

    // navigation bar and components
    //$('#common_navbar_div').load('/components/nav.html'); //navigation bar

    // footer and components
    //$('#common_footer_div').load('/components/footer.html'); //page footer

    // load any <html-import> statements (e.g. navigation, footer)
    import_html_modules();

});

/*
@brief Initialize user settings on each page
*/
function initializeUserSettings(){
    
    // list of user settings and default values
    var user_settings = ['data-theme','data-language-filter'];
    var default_user_setting_values = ['default',false];

    // set the values from storage
    for(i=0;i<user_settings.length;i++){
      if (typeof(Storage) !== "undefined") { // set the user values
        var setting_value = sessionStorage.getItem(user_settings[i]) || default_user_setting_values[i];
      } else {
        var setting_value = get_cookie(user_settings);
      }
      document.getElementsByTagName('html')[0].setAttribute(user_settings[i],setting_value);
    }
}

 /*
  @brief get a cookie value
  @cite https://www.w3schools.com/js/js_cookies.asp
  */
 function get_cookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}