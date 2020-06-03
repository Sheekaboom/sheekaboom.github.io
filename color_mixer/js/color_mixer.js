
/*
@brief Add a user color thats available to mix
*/
function add_user_color(){
    
}

/*
@brief Add a new row for a color in the table
*/
function add_color_row(){
    var table = document.querySelector('#user_colors_table')
    var row_template = document.querySelector('#user_colors_table_row_template');
    var clone = row_template.content.cloneNode(true);
    table.appendChild(clone);
}

/*
@brief Remove a new row for a color in the table
@param[in] remove_button_element - button element in the row of the table
*/
function remove_color_row(remove_button_element){
    var mytr = remove_button_element.parentElement.parentElement;
    var mytable = mytr.parentElement;
    mytable.removeChild(mytr);
}

/*
@brief Save user color table to localStorage
*/
function save_user_colors(user_color_table){
    var table_data = table2json(user_color_table);
    var string_data = JSON.stringify(table_data);
    window.localStorage.setItem('user_color_table_data',string_data);
}

/*
@brief Update the 'mixed' color on the display
@param[in] table - table to calculate the data from
*/
function update_mixed_color(table){
    // get each of the numeric inputs on the table
    var input_vals = table.querySelectorAll('input[type="number"]')
    // get each of the corresponding colors
    var color_vals = table.querySelectorAll('input[type="color"]')
    console.log(input_vals.length + " values and "+color_vals.length+' colors');

    var rsum = 0, gsum=0, bsum=0, count=0;
    //could probably be done better... but get the weighted average
    for(var i=0;i<input_vals.length;i++){
        if(input_vals[i].value!=""){
            // first convert to rgb and get the current weight
            let cur_rgb = hex2rgb(color_vals[i].value);
            let cur_count = input_vals[i].valueAsNumber;
            count += cur_count;
            rsum += cur_rgb[0]*cur_count;
            gsum += cur_rgb[1]*cur_count;
            bsum += cur_rgb[2]*cur_count;
            console.log("Current Count is " + count);
            console.log("Color: "+ rsum + "," + gsum + "," + bsum);
        }
    }
    var rfin = Math.round(rsum/count);
    var gfin = Math.round(gsum/count);
    var bfin = Math.round(bsum/count);

    // now set the mixed color
    var color_div = document.querySelector('#mixed_color');
    color_div.style.backgroundColor = 'rgb('+rfin+','+gfin+','+bfin+')';
    console.log(color_div.style.backgroundColor);
}

function hex2rgb(hex_str){
    var r = parseInt(hex_str[1]+hex_str[2],16)
    var g = parseInt(hex_str[3]+hex_str[4],16)
    var b = parseInt(hex_str[5]+hex_str[6],16)
    return [r,g,b]
}

