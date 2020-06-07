
function initialize_mixer(){
    load_user_colors();
    update_mixed_color(document.querySelector('#user_colors_table'));
}

/*
@brief Add a new row for a color in the table
*/
function add_color_row(){
    var table = document.querySelector('#user_colors_table');
    var row_template = document.querySelector('#user_colors_table_row_template');
    var clone = row_template.content.cloneNode(true);
    table.querySelector('tbody').appendChild(clone);
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
    delete(table_data['Delete']);
    var string_data = JSON.stringify(table_data);
    window.localStorage.setItem('user_color_table_data',string_data);
}

/*
@brief Load user colors from localStorage item 'user_color_table_data'
*/
function load_user_colors(){
    var user_colors_obj = JSON.parse(window.localStorage.getItem('user_color_table_data'));
    var user_table = document.querySelector('#user_colors_table');
    if(user_colors_obj!=null){
        var required_len = user_colors_obj[Object.keys(user_colors_obj)[0]].length;
        //remove all table rows
        var ut_rows = user_table.querySelector('tbody').querySelectorAll('tr'); 
        for(r of ut_rows){
            user_table.querySelector('tbody').removeChild(r);
        }
        //now add back as many as needed
        for(var i=0;i<required_len;i++){
            add_color_row(); //add a row
        }
        //and populate
        set_table_from_json(user_colors_obj,user_table);
    }
}


/*
@brief Update the 'mixed' color on the display
@param[in] table - table to calculate the data from
*/
function update_mixed_color(table){
    // get each of the numeric inputs on the table
    var table_vals = table2json(document.querySelector('#user_colors_table'));

    var rsum = 0, gsum=0, bsum=0, count=0;
    //could probably be done better... but get the weighted average
    for(var i=0;i<table_vals['Count'].length;i++){
        if(table_vals['Count'][i].value!=""){
            // first convert to rgb and get the current weight
            let cur_rgb = hex2rgb(table_vals['Color'][i]);
            let cur_count = parseInt(table_vals['Count'][i]);
            count += cur_count;
            rsum += cur_rgb[0]*cur_count;
            gsum += cur_rgb[1]*cur_count;
            bsum += cur_rgb[2]*cur_count;
            //console.log("Current Count is " + count);
            //console.log("Color: "+ rsum + "," + gsum + "," + bsum);
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

/*
@brief Calculate count for each of the colors in the user_colors_table
*/
function calculate_desired_color(){
    //total count value
    var total_count = document.querySelector('#desired_total_count').value;

    //first get the rgb of the desired color
    var desired_color = hex2rgb(document.querySelector('#desired_color').value);

    //Now get our table colors and place them in a fnn
    var table_vals = table2json(document.querySelector('#user_colors_table'));

    //Extract the colors into a array and convert to CMYK
    var cvals = [];
    var mvals = [];
    var yvals = [];
    var kvals = [];
    for(c of table_vals['Color']){
        var cur_cmyk = rgb2cmyk(hex2rgb(c));
        cvals.push(cur_cmyk[0]);
        mvals.push(cur_cmyk[1]);
        yvals.push(cur_cmyk[2]);
        kvals.push(cur_cmyk[3]);
    }

    //Now lets solve for our count using ml-fcnnls
    var X = new mlMatrix.Matrix([cvals,mvals,yvals,kvals]); //color list
    var cmyk_desired = rgb2cmyk(desired_color);
    var counts = fcnnlsVector(X,cmyk_desired);

    //normalize to sum to total_count
    var count_sum = counts.reduce((a,b)=>a+b);
    var norm_counts = counts.map(a=>a/count_sum);
    var int_counts = norm_counts.map(a=>Math.round(a*total_count))

    //set the values in the table and update the mixed color
    set_table_from_json({'Count':int_counts},document.querySelector('#user_colors_table'));
    update_mixed_color();
}




