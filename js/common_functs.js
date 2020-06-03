
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

/*
@brief Save data from a html table. If its an input, grab the value,
  otherwise we will get innerHTML
@note this assumes row 1 has table headers that are our label keys
*/
function table2json(table){
  //first get all of our rows
  var table_rows = table.querySelectorAll('tr');
  //Now extract the names from each of our rows
  var col_names = [];
  var table_data = {};
  var table_headers = table_rows[0].querySelectorAll('th');
  for(var i=0;i<table_headers.length;i++){
    col_names.push(table_headers[i].innerHTML);
    table_data[table_headers[i].innerHTML] = []; //also initialize the arrays
  }
  //Now extract the data
  for(var r=1;r<table_rows.length;r++){//go through each row
    var row_data = table_rows[r].querySelectorAll('td');
    for(var c=0;c<row_data.length;c++){//go through each column
      if(row_data[c].getElementsByTagName('input').length>0){
        table_data[col_names[c]].push(row_data[c].querySelector('input').value);
      }else{
        table_data[col_names[c]].push(row_data[c].innerHTML);
      }
    }
  }
  return table_data;
}

