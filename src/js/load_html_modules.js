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
