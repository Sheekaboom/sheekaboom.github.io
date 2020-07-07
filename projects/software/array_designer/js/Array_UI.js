/* @brief array UI functionality       */
/* @author Alec Weiss               */
/* @date 6-2020                     */

import {add_row,del_row,del_all_rows,set_table_from_json} from '/js/modules/Tabled.js';
import { table2json, write_table_to_file } from "/js/modules/Tabled.js";
import { toggle_display } from "/js/modules/Interfacey.js";
import {frequency2wavelength,lin2db,deg2rad,azel2cart} from './Generic.js';
import {synthesize_data,beamform} from './Beamform.js';
import {generate_cartesian_array} from './ArrayBuilder.js';
import { read_table_from_file } from '../../../../js/modules/Tabled.js';

export {updateBeamformedE2D,updateBeamformedH2D,updateBeamformed2D}
export {updateBeamformed3D,updateElementPositions}

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

//Array Builder handlers
document.querySelector('#generate_array').addEventListener('click',buildCartesianArray);
//input/export
document.querySelector('#user_element_table_export').addEventListener('click',
    function(){write_table_to_file(document.querySelector('#user_element_table')
                ,'element_positions.json',[''],true)})
document.querySelector('#user_element_table_import').addEventListener('click',
    function(){read_table_from_file(document.querySelector('#user_element_table'))})

//Element Table Handler
document.querySelector('#user_element_table').addEventListener('change',updateElementPositions);

//add count and slider handlers
document.querySelector('#az_angle_slider').addEventListener('mouseup' ,function(){updateAzCounter();updateBeamformed2D();updateBeamformed3D();})
document.querySelector('#az_angle_slider').addEventListener('touchend',function(){updateAzCounter();updateBeamformed2D();updateBeamformed3D();})
document.querySelector('#az_angle_count' ).addEventListener('change'  ,function(){updateAzSlider() ;updateBeamformed2D();updateBeamformed3D();})
document.querySelector('#el_angle_slider').addEventListener('mouseup' ,function(){updateElCounter();updateBeamformed2D();updateBeamformed3D();})
document.querySelector('#el_angle_slider').addEventListener('touchend',function(){updateElCounter();updateBeamformed2D();updateBeamformed3D();})
document.querySelector('#el_angle_count' ).addEventListener('change'  ,function(){updateElSlider() ;updateBeamformed2D();updateBeamformed3D();})

document.querySelector('#e_cut_plot_angle').addEventListener('change',updateBeamformedE2D);
document.querySelector('#h_cut_plot_angle').addEventListener('change',updateBeamformedH2D);

//toggle handlers
document.querySelector('#show_hide_instructions' ).addEventListener('click',function(){toggle_display(document.querySelector('#instructions_list'));updateBeamformed3D();});
document.querySelector('#show_hide_E2D').addEventListener('click',function(){toggle_display(document.querySelector('#beamformE_2D'));updateBeamformedE2D();});
document.querySelector('#show_hide_H2D').addEventListener('click',function(){toggle_display(document.querySelector('#beamformH_2D'));updateBeamformedH2D();});
document.querySelector('#show_hide_3D' ).addEventListener('click',function(){toggle_display(document.querySelector('#beamform3D'));updateBeamformed3D();});


// counter/slider updates
function updateAzCounter(){document.querySelector('#az_angle_count').value = document.querySelector('#az_angle_slider').value;}
function updateAzSlider() {document.querySelector('#az_angle_slider').value = document.querySelector('#az_angle_count').value;}
function updateElCounter(){document.querySelector('#el_angle_count').value = document.querySelector('#el_angle_slider').value;}
function updateElSlider() {document.querySelector('#el_angle_slider').value = document.querySelector('#el_angle_count').value;}

// add elements
function add_element_row(){
    var table = document.querySelector('#user_element_table');
    var elem = add_row(table);
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
@brief Update the element phases
@param[in] phase vals - 
*/
function set_element_phases(phase_vals){
    // get each of the numeric inputs on the table
    var table = document.querySelector('#user_element_table');
    set_table_from_json({'Phase':phase_vals},table);
}



/* Plot updaters */

// 2D plot angles
// sweep angles
var az_vals = deg2rad(math.range(-90,90));
var el_vals = deg2rad(math.range(-90,90));

//functions
function updateBeamformedE2D(){

    let plot_div = document.querySelector('#beamformE_2D');

    if(plot_div.style.display!='none'){ //only update if we are displaying

        let elem_info = get_element_info();
        let x=elem_info[0],y=elem_info[1],z=elem_info[2],weights=elem_info[4];

        let cur_az = deg2rad(document.querySelector('#az_angle_slider').valueAsNumber);
        let cur_el = deg2rad(document.querySelector('#e_cut_plot_angle').valueAsNumber);
        let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);
        set_element_phases(math.arg(vals));

        // update 1D azimuth sweep
        let az_bf_vals = az_vals.map(az=>beamform(vals,x,y,z,az,0,weights,freq));
        Plotly.deleteTraces(plot_div,0); //remove trace
        Plotly.addTraces(plot_div, {x:az_vals.toArray(),y: lin2db(math.abs(az_bf_vals).toArray())});

    }
}

function updateBeamformedH2D(){

    let plot_div = document.querySelector('#beamformH_2D');

    if(plot_div.style.display!='none'){ 

        let cur_az = deg2rad(document.querySelector('#h_cut_plot_angle').valueAsNumber);
        let cur_el = deg2rad(document.querySelector('#el_angle_slider').valueAsNumber);
        let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);
        set_element_phases(math.arg(vals));

        // update 2D azimuth sweep
        let el_bf_vals = el_vals.map(el=>beamform(vals,x,y,z,0,el,weights,freq));
        Plotly.deleteTraces(plot_div,0); //remove trace
        Plotly.addTraces(plot_div, {
            x: az_vals.toArray(),
            y: lin2db(math.abs(el_bf_vals).toArray())});
        }
}

function updateBeamformed2D(){
    updateBeamformedE2D();updateBeamformedH2D();
    
    //update table phase
    let elem_info = get_element_info();
    let x=elem_info[0],y=elem_info[1],z=elem_info[2],weights=elem_info[4];
    let cur_az = deg2rad(document.querySelector('#az_angle_slider').valueAsNumber);
    let cur_el = deg2rad(document.querySelector('#el_angle_slider').valueAsNumber);
    let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);
    set_element_phases(math.arg(vals));
}

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

    var plot_div = document.querySelector('#beamform3D');

    if(plot_div.style.display!='none'){ 

        let cur_az = deg2rad(document.querySelector('#az_angle_slider').valueAsNumber);
        let cur_el = deg2rad(document.querySelector('#el_angle_slider').valueAsNumber);
        let elem_info = get_element_info();
        let x=elem_info[0],y=elem_info[1],z=elem_info[2],weights=elem_info[4];
        let vals = synthesize_data(1,x,y,z,cur_az,cur_el,freq);

        // update 2D azimuth sweep
        var bf_vals = [];
        for(i=0;i<el_mesh.length;i++){
            bf_vals.push(beamform(vals,x,y,z,az_mesh[i],el_mesh[i],weights,freq));
        }  

        // calculate adjusted dB values
        var bf_db = lin2db(math.abs(bf_vals));
        var max_db = math.max(bf_db);
        var mean_db = math.mean(bf_db);
        var range_db = math.abs(mean_db*2);

        //adjust our db values. Add our minimum desired and cut the rest at 0
        var bf_db_adj = math.subtract(bf_db,max_db-range_db).map((a)=>{return a*(a>0)})
        var bf_db_color_vals_adj = bf_db.map((a)=>{return a*(a>(max_db-range_db))})

        // calculate in cartesian
        var cart_vals = azel2cart(bf_db_adj,az_mesh,el_mesh);



        var mesh_size = [az_vals_3d.size()[0],el_vals_3d.size()[0]]
        Plotly.deleteTraces(plot_div,0); //remove trace
        Plotly.addTraces(plot_div, {
            x: math.reshape(cart_vals[1],mesh_size),
            y: math.reshape(cart_vals[2],mesh_size),
            z: math.reshape(cart_vals[0],mesh_size),
            surfacecolor: math.reshape(bf_db_color_vals_adj,mesh_size),
            type:'surface',});
    }
}

function updateElementPositions(){
    // get the plot div
    let plot_div = document.querySelector('#element_position_plot');

    // get our x,y,z positions
    let elem_info = get_element_info();
    let xe=elem_info[0],ye=elem_info[1],ze=elem_info[2],weights=elem_info[4];

    Plotly.deleteTraces(plot_div,0); //remove trace
    Plotly.addTraces(plot_div, {x:xe,y:ye,z:ze,type:'scatter3d',mode:'markers'});
}

function buildCartesianArray(){
    var xn = document.querySelector('#input_cartesian_nx').valueAsNumber;
    var xe = document.querySelector('#input_cartesian_x_expr').value;
    var yn = document.querySelector('#input_cartesian_ny').valueAsNumber;
    var ye = document.querySelector('#input_cartesian_y_expr').value;
    var zn = document.querySelector('#input_cartesian_nz').valueAsNumber;
    var ze = document.querySelector('#input_cartesian_z_expr').value;

    var nvals = [xn,yn,zn];
    var exp_vals = [xe,ye,ze];

    var vals = generate_cartesian_array(nvals,exp_vals)
    var val_obj = {'X (m)':vals[0],'Y (m)':vals[1],'Z (m)':vals[2]};
    
    //now delete all rows in array and add the number we want back
    var mytable = document.querySelector('#user_element_table');
    //delete all
    del_all_rows(mytable); 
    //add the number we need back
    for(i=0;i<vals[0].length;i++){add_element_row()}
    //and fill
    set_table_from_json(val_obj,mytable);
    updateElementPositions();
}

