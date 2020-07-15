//import some things
import {get_user_data} from '/js/modules/Generic.js';

// initialize the user settings
initializeUserSettings();
document.body.style.visibility = 'visible'; //only make visible after setting user settings

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

