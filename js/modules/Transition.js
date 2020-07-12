import { set_user_data } from "./Generic.js";

export {transitionEventListener};

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
function set_transition(state){
    // set the current value
    document.getElementsByTagName('html')[0].setAttribute('data-transition',state); 
    // store to viable location
    set_user_data('data-transition',state);
}

/*
@brief event listener for turning on and off transitions
@param[in] elem - checkbox element to get the state from
*/
function transitionEventListener(elem){
    set_transition(elem.checked);
}