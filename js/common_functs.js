
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

/*@brief extract our theme information colors into a dictionary*/
function getTheme(){

  // initialize and get the name
  var theme_info = {};
  theme_info['name'] = document.querySelector('html').getAttribute('data-theme');

  //now get css variables
  var css_var_names = [
      '--text-color',
      '--text-accent-color',
      '--background-color',
      '--background-accent-color',
      '--border-color',
      '--background-image',
      '--text-font',
      '--header-font'
  ]

  // now get the current style values
  for(i=0;i<css_var_names.length;i++){
    let var_val = getComputedStyle(document.body).getPropertyValue(css_var_names[i]);
    theme_info[css_var_names[i].replace('--','').replace(new RegExp('-', 'g'),'_')] = var_val
  }
  return theme_info;
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

/*
@brief Convert a JSON structure to an HTML table
@param[in] object - JSON object to convert to an HTML table
@note This will assume keys are unpacked in the desired order
@note This assumes each object is the same length
@return an HTML node of the constructed table
*/
function json2table(object){
  //get the keys
  var json_keys = Object.keys(object);

  // create the table element
  var table = document.createElement('table');

  // create the header
  var header = document.createElement('tr')
  for(k of json_keys){
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(k));
    header.appendChild(th);
  }

  // add the content
  var num_rows = object[json_keys[0]];
  for(var i=0;i<num_rows;i++){
    var row = document.createElement('tr');
    for(k of json_keys){
      row.appendChild(document.createTextNode(object[k][i]));
    }
    table.appendChild(row);
  }
  return table;
}

/*
@brief Fill a table from an Object. This will take a json object and fill
  columns based on the column headers and fill rows accrodingly
@param[in] object - javascript object to fill the table with
@param[in] table - HTML table element to fill
@note This assumes the number of rows in the table body (tbody) equals the length of the arrays
  in the json values
*/
function set_table_from_json(object,table){
  var table_rows = table.querySelector('tbody').querySelectorAll('tr');
  var table_headers = table.querySelector('thead').querySelectorAll('th')
  var header_str = Array.prototype.map.call(table_headers,v=>v.textContent);
  var object_keys = Object.keys(object);
  var object_len = object[object_keys[0]].length;
  for(r=0;r<object_len;r++){//fill each row
    for(k of object_keys){//fill the data for corresponding columns
      var c = header_str.indexOf(k);
      var d = table_rows[r].querySelectorAll('td')[c] 
      var v = object[k][r];
      if(d.getElementsByTagName('input').length>0){ // it is an input
        d.getElementsByTagName('input')[0].value = v //assume 1 input
      }else{ //otherwise change the text
        d.textContent = v;
      }
    }
  }
}


/*
@brief Convert a rgb hex value to [r,g,b] array
*/
function hex2rgb(hex_str){
  var r = parseInt(hex_str[1]+hex_str[2],16)
  var g = parseInt(hex_str[3]+hex_str[4],16)
  var b = parseInt(hex_str[5]+hex_str[6],16)
  return [r,g,b]
}


/*
@brief convert rgb to cmyk
@param[in]
@cite From https://stackoverflow.com/questions/22938896/how-convert-rgb-or-cmyk-color-to-percentage-cmyk-javascript
*/
function rgb2cmyk(rgb)
{
  var R = rgb[0]; var G = rgb[1]; var B = rgb[2];
    if ((R == 0) && (G == 0) && (B == 0)) {
        return [0, 0, 0, 1];
    } else {
        var calcR = 1 - (R / 255),
            calcG = 1 - (G / 255),
            calcB = 1 - (B / 255);

        var K = Math.min(calcR, Math.min(calcG, calcB)),
            C = (calcR - K) / (1 - K),
            M = (calcG - K) / (1 - K),
            Y = (calcB - K) / (1 - K);

        return [C, M, Y, K];
    }
}

/*
@brief Convert CMYK to rgb
@param[in] cmyk - array of [c,m,y,k] values
@return [r,g,b] array values (0-255)
*/
function cmyk2rgb(cmyk){
  var r = 255 * (1 - cmyk[0]) * (1 - cmyk[3]);
  var g = 255 * (1 - cmyk[1]) * (1 - cmyk[3]);
  var b = 255 * (1 - cmyk[2]) * (1 - cmyk[3]);
  return [r,g,b];
}

/*
@brief convert RGB to CMY
@param[in] rgb - (0,255) rgb value
@return cmy [0,1]
*/
function rgb2cmy(rgb){
  var c = 1-(rgb[0]/255);
  var m = 1-(rgb[1]/255);
  var y = 1-(rgb[2]/255);
  return [c,m,y];
}

/*
@brief convert CMY to rgb
@param[in] cmy - CMY value [0,1]
@return rgb value (0,255)
*/
function cmy2rgb(cmy){
  var r = 255*(1-cmy[0]);
  var g = 255*(1-cmy[1]);
  var b = 255*(1-cmy[2]);
  return [r,g,b];
}
