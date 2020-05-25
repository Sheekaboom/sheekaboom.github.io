
/*
@brief Set the website theme by setting 'data-theme' attribute of <html>
@param[in] theme_value - value to set the theme. can be 'dark','light','default'
*/
function setTheme(theme_value){
    // Get the current value
    document.getElementsByTagName('html')[0].setAttribute('data-theme',theme_value); 
    // store to viable location
    if (typeof(Storage) !== "undefined") { // set the user values
        sessionStorage.setItem('data-theme',theme_value);
    } else { //otherwise use cookies
        document.cookie = "data-theme="+theme_value+";path=/";
    }
}
/*
@brief Change the current theme from a <select> item
@param[in] select_item - <select> html item to set theme from
*/
function themeSelectHandler(select_item){
    var theme_str = select_item.value;
    setTheme(theme_str);
}

/*
@brief get a cookie value
@cite https://www.w3schools.com/js/js_cookies.asp
*/
function getCookie(cname) {
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