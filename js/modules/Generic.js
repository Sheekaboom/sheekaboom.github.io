/* Generic functionality for some javascript things */

export { get_user_data, set_user_data };

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
@brief set user data to either sessionStorage or cookies (if session not supported)
@param[in] key - data name to set
@param[in] val - value to set
*/
function set_user_data(key,val){
    if (typeof(Storage) !== "undefined") { // set the user values
        sessionStorage.setItem(key,val);
    } else { //otherwise use cookies
        document.cookie = key+"="+theme_value+";path=/";
    }
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