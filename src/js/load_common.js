$(function(){
    // initialize the user settings
    initializeUserSettings();

    // navigation bar and components
    $('#common_navbar').load('/common/nav.html'); //navigation bar

    // footer and components
    $('#common_footer').load('/common/footer.html'); //page footer

    // update the UI to the current user settings
    window.onload = initializeUIUserSettings();
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
@brief this will set all UI components on the screen to the correct values.forEach
For example this will set the theme selector button to the current theme
*/
function initializeUIUserSettings(){
    // Get the theme for setting out selector
    var theme_value = document.getElementsByTagName('html')[0].getAttribute('data-theme');
    document.getElementById('common_navbar_theme_selector').value = theme_value;
}

