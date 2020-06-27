/* @brief Table interaction         */
/* @author Alec Weiss               */
/* @date 6-2020                     */

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
  