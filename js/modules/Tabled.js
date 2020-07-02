/* @brief Table interaction         */
/* @author Alec Weiss               */
/* @date 6-2020                     */

/* Much of this assumes a table layout like follows

<table>
  <thead>
    <tr><th>a</th>...<th>n</th></tr>
  <thead>
  <tbody>
  <template> <!-- Table row template -->
    <tr>
      <td>a</td>
      ...
      <td>n</td>
    <tr>
  </template>
  </tbody>
</table>
*/
      

export {table2json,json2table,set_table_from_json};
export {add_row,del_row,del_all_rows};
export {write_table_to_file,read_table_from_file};

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
        if(row_data[c].querySelectorAll('input[type="number"]').length>0){
          table_data[col_names[c]].push(row_data[c].querySelector('input[type="number"]').valueAsNumber);
        }else if(row_data[c].querySelectorAll('input').length>0){
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
    for(var r=0;r<object_len;r++){//fill each row
      for(var k of object_keys){//fill the data for corresponding columns
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
  @brief import data to a table from a json file.
  @param[in] table - table to import data to
  @param[in] fpath - path to file to load data from
  @note This will overwrite any current row information
  @note this only currently works for JSON files
  @note this function will prompt the user
  */
  function read_table_from_file(table){
    //first get the file name from the user
    var finput = document.createElement('input');
    finput.type='file';

    finput.addEventListener('change',(event) => {
        var input_file = event.target.files[0]; //take first file
        var reader = new FileReader();
        reader.readAsText(input_file);
        reader.addEventListener('load',
          function(){
            var json_data = JSON.parse(this.result);
            set_num_rows(table,json_data[Object.keys(json_data)[0]].length) 
            set_table_from_json(json_data,table)}
            )
    })
    // now prompt the user to fire the event
    finput.click(); //prompt the user
    //and cleanup the element
    document.removeChild(finput); //clean up the element
  }

  /*
  @brief write table out to json file
  @param[in] table - table to write out to json
  @param[in] fname - file name to write out to
  @param[in/OPT] keys - what keys to write out (default to all)
  @param[in/OPT] invert_keys - if 'keys' are provided (list of strings), remove values in the key list
  */
  function write_table_to_file(table,fname,keys='all',invert_keys=false){
    //get the JSON
    var table_obj = table2json(table);

    if(keys!='all'){ //then assume a list of keys is passed
      if(invert_keys){
        for(var k of keys){delete table_obj[k]} //remove the keys
      }else{
        var tmp_obj = table_obj;
        table_obj = {};
        for(var k of keys){table_obj[k]=tmp_obj[k]} //new object with all keys
      }
    }

    // create the json string
    //https://stackoverflow.com/questions/6937863/json-stringify-so-that-arrays-are-on-one-line
    var json_string = JSON.stringify(table_obj,null,2);
    //Create the file
    var obj_file = new File([json_string],fname,{type : 'application/json'});
    var obj_path = window.URL.createObjectURL(obj_file);

    //https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
    var a = document.createElement('A');
    a.href = obj_path;
    a.download = obj_file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    //remove file url
    window.URL.revokeObjectURL(obj_path);
  }

  /*
  @brief set the table to have a specific number of rows
  @param[in] table - table to set
  @param[in] num_rows - number of rows to have after setting
  @note we assume a row template exists in <tbody> (and is the only template)
  */
  function set_num_rows(table,num_rows){
    del_all_rows(table); //delete all rows
    var row_template = table.querySelector('tbody').querySelector('template');
    for(var i=0;i<num_rows;i++){add_row(table,row_template);} //add the correct rows back
  }

  /*
  @param[in] table - table to add row to
  @note This adds the row into the <tbody> tag
  @return added row element
  @note we assume a row template exists in <tbody> (and is the only template)
  */
  function add_row(table){
    var row_template = table.querySelector('tbody').querySelector('template');
    var clone = row_template.content.cloneNode(true);
    table.querySelector('tbody').appendChild(clone); //returns empty document fragment
    return table.rows[table.rows.length-1];
  }

  /*
  @brief remove a row from a table
  @param[in] row_elem - row element to remove
  */
  function del_row(row_elem){
    var mytable = row_elem.parentElement;
    mytable.removeChild(row_elem);
  }

  /*
  @brief remove all rows from a table
  @param[in] table_elem - table to remove all rows of (in row body)
  */
  function del_all_rows(table_elem){
    var rows = table_elem.querySelector('tbody').querySelectorAll('tr');
    for(var r of rows){
      del_row(r);
    }
  }
  