import {add_row,del_row,set_table_from_json} from '/js/modules/Tabled.js';
import { table2json } from "/js/modules/Tabled.js";
import {frequency2wavelength,lin2db,deg2rad} from './Generic.js';
import {synthesize_data,beamform} from './Beamform.js';

export {updateBeamformedE2D,updateBeamformedH2D,updateBeamformed2D,updateElementPositions}

/* intialize the ui */
// set intial table values
document.querySelector('#add_element_button').addEventListener('click',add_element_row);
for(var i=0;i<4;i++){add_element_row();} //make 4 rows in total
var freq = 28e9;
var lam_2 = frequency2wavelength(freq)/2;
//var x = math.multiply(math.range(0,16).toArray(),lam_2);
//var y = math.multiply(x,0);
//var z = math.multiply(x,0);
var x = math.multiply(math.range(0,4).toArray(),lam_2);
var y = math.multiply(x,0);
var z = math.multiply(x,0);
var vals = synthesize_data(1,x,y,z,0,0,freq);
var weights = math.ones(vals.length).toArray();
var init_table_vals = {'X (m)':x,'Y (m)':y,'Z (m)':z,'Phase':math.arg(vals),'Weight':weights};
set_table_from_json(init_table_vals,document.querySelector('#user_element_table'));

//add count and slider handlers
document.querySelector('#az_angle_slider').addEventListener('mouseup' ,function(){updateAzCounter();updateBeamformed2D();})
document.querySelector('#az_angle_slider').addEventListener('touchend',function(){updateAzCounter();updateBeamformed2D();})
document.querySelector('#az_angle_count' ).addEventListener('change'  ,function(){updateAzSlider() ;updateBeamformed2D();})
document.querySelector('#el_angle_slider').addEventListener('mouseup' ,function(){updateElCounter();updateBeamformed2D();})
document.querySelector('#el_angle_slider').addEventListener('touchend',function(){updateElCounter();updateBeamformed2D();})
document.querySelector('#el_angle_count' ).addEventListener('change'  ,function(){updateAzSlider() ;updateBeamformed2D();})

document.querySelector('#e_cut_plot_angle').addEventListener('change',updateBeamformedE2D);
document.querySelector('#h_cut_plot_angle').addEventListener('change',updateBeamformedH2D);

/* user interface things*/
function updateAzCounter(){document.querySelector('#az_angle_count').value = document.querySelector('#az_angle_slider').value;}
function updateAzSlider() {document.querySelector('#az_angle_slider').value = document.querySelector('#az_angle_count').value;}
function updateElCounter(){document.querySelector('#el_angle_count').value = document.querySelector('#el_angle_slider').value;}
function updateElSlider() {document.querySelector('#el_angle_slider').value = document.querySelector('#el_angle_count').value;}

function add_element_row(){
    var table = document.querySelector('#user_element_table');
    var row_template = document.querySelector('#user_element_table_row_template');
    var elem = add_row(table,row_template);
    elem.querySelector('button').addEventListener('click',function (){del_element_row(this)});
    elem.querySelector('td').innerText = table.rows.length-2; // we added a row so length is +1 so we get -2
}

/*
@brief Remove a new row in a table
@param[in] remove_button_element - button element in the row of the table
*/
function del_element_row(remove_button_element){
    var mytr = remove_button_element.parentElement.parentElement;
    del_row(mytr);
}

/*
@brief return element information from user table
@return [x,y,z,phase,weight]
*/
function get_element_info(){
    var element_table = document.querySelector('#user_element_table');
    var data = table2json(element_table)
    return [data['X (m)'],data['Y (m)'],data['Z (m)'],data['Phase'],data['Weight']]
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
function load_user_elements(){
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
@brief Update the element phases
@param[in] phase vals - 
*/
function update_element_phases(phase_vals){
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



/* Plot updaters */

// 2D plot angles
// sweep angles
var az_vals = deg2rad(math.range(-90,90));
var el_vals = deg2rad(math.range(-90,90));

//functions
function updateBeamformedE2D(){

    let plot_div = document.querySelector('#beamformE_2D');

    let elem_info = get_element_info();
    let x=elem_info[0],y=elem_info[1],z=elem_info[2];

    let cur_az = deg2rad(document.querySelector('#az_angle_slider').valueAsNumber);
    let cur_el = deg2rad(document.querySelector('#e_cut_plot_angle').valueAsNumber);
    let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);

    // update 1D azimuth sweep
    let az_bf_vals = az_vals.map(az=>beamform(vals,x,y,z,az,0,weights,freq));
    Plotly.deleteTraces(plot_div,0); //remove trace
    Plotly.addTraces(plot_div, {x:az_vals.toArray(),y: lin2db(math.abs(az_bf_vals).toArray())});
    //Plotly.deleteTraces(beamformE_2D_polar,0); //remove trace
    //Plotly.addTraces( beamformE_2D_polar, {theta:rad2deg(az_vals.toArray()),r:math.abs(az_bf_vals).toArray(),type:'scatterpolar'});
}

function updateBeamformedH2D(){

    let plot_div = document.querySelector('#beamformH_2D');

    let elem_info = get_element_info();
    let x=elem_info[0],y=elem_info[1],z=elem_info[2];

    let cur_az = deg2rad(document.querySelector('#h_cut_plot_angle').valueAsNumber);
    let cur_el = deg2rad(document.querySelector('#el_angle_slider').valueAsNumber);
    let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);

    // update 2D azimuth sweep
    let el_bf_vals = el_vals.map(el=>beamform(vals,x,y,z,0,el,weights,freq));
    Plotly.deleteTraces(plot_div,0); //remove trace
    Plotly.addTraces(plot_div, {
        x: az_vals.toArray(),
        y: lin2db(math.abs(el_bf_vals).toArray())});
}

function updateBeamformed2D(){updateBeamformedE2D();updateBeamformedH2D();}

// 3D things

// sweep angles
var az_vals_3d = deg2rad(math.range(-90,90,5));
var el_vals_3d = deg2rad(math.range(-90,90,5));

// meshgrid the values
var az_mesh = [];
for(i=0;i<el_vals_3d.toArray().length;i++){az_mesh = math.concat(az_mesh,az_vals_3d.toArray())}
var el_mesh = [];
for(i=0;i<az_vals_3d.toArray().length;i++){el_mesh = math.concat(el_mesh,math.multiply(el_vals_3d._data[i],math.ones(az_vals_3d.size())));}


function updateBeamformed3D(){

    let plot_div = document.querySelector('#beamformPattern_3D');

    let cur_az = deg2rad(document.querySelector('#az_angle_slider').valueAsNumber);
    let cur_el = deg2rad(document.querySelector('#el_angle_slider').valueAsNumber);
    let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);

    // update 2D azimuth sweep
    var bf_vals = [];
    for(i=0;i<el_mesh.length;i++){
        bf_vals.push(beamform(vals,x,y,z,az_mesh[i],el_mesh[i],weights,freq));
    }  

    var mesh_size = [az_vals_3d.size()[0],el_vals_3d.size()[0]]
    Plotly.deleteTraces(plot_div,0); //remove trace
    Plotly.addTraces(plot_div, {
        x: math.reshape(az_mesh,mesh_size),
        y: math.reshape(el_mesh,mesh_size),
        z: math.reshape(lin2db(math.abs(bf_vals)),mesh_size),
        type:'surface',
        cmin:-60,
        cmax:5});
}

function updateElementPositions(){
    // get the plot div
    let plot_div = document.querySelector('#element_position_plot');

    // get our x,y,z positions
    let elem_info = get_element_info();
    let xe=elem_info[0],ye=elem_info[1],ze=elem_info[2];

    Plotly.deleteTraces(plot_div,0); //remove trace
    Plotly.addTraces(plot_div, {x:xe,y:ye,z:ze,type:'scatter3d',mode:'markers'});
}

