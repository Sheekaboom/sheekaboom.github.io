
// initialize the user settings
initializeUserSettings();

/*
@brief Initialize user settings on each page
*/
function initializeUserSettings(){
    
    // list of user settings and default values
    var user_settings = ['data-theme','data-language-filter','data-transition'];
    var default_user_setting_values = ['default',false,true];

    // set the values from storage
    for(var i=0;i<user_settings.length;i++){
      var setting_value = get_user_data(user_settings[i]) || default_user_setting_values[i];
      document.getElementsByTagName('html')[0].setAttribute(user_settings[i],setting_value);
    }
}


// Copies from Generic to allow running before page load
/*
@brief get user data from either sessionStorage or cookies (whatever is supported)
@param[in] key - data name to get
*/
function get_user_data(key){
  if (typeof(Storage) !== "undefined") { // set the user values
      var user_data = sessionStorage.getItem(key);
  } else {
      var user_data = get_cookie(user_settings);
  }
  return user_data
}

/*
@brief get a cookie value
@param[in] cname - name of cookie
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