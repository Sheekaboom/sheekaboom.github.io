/*
@brief Set whether or not to have transitions on the site
@param[in] state - true (transitions on) false (transitions off)
@note this requires a css selector like:
    :root[data-transition='false'] {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
    }
*/
function set_transitions(state){
    // set the current value
    document.getElementsByTagName('html')[0].setAttribute('data-transition',theme_value); 
    // store to viable location
    if (typeof(Storage) !== "undefined") { // set the user values
        sessionStorage.setItem('data-transition',theme_value);
    } else { //otherwise use cookies
        document.cookie = "data-transition="+theme_value+";path=/";
    }
}