/* @brief beamforming functions. This should probably be in webassembly       */
/* @author Alec Weiss               */
/* @date 6-2020                     */

import {frequency2wavelength,azel2uvw} from './Generic.js';

export {synthesize_data,beamform};


/*
@brief Calculate beamformed output
@param[in] vals - values at each element (depends on steering vector)
@param[in] x - array of x element positions (meters)
@param[in] y - array of y element positions (meters)
@param[in] z - array of z element positions (meters)
@param[in] az - azimuth angle (radians)
@param[in] el - elevation angle (radians)
@param[in] weights - weighting on each element
@param[in] freq - frequency to beamform at
@return complex beamformed value for an angle
@note This is given as the sum(val_n*weightn*exp(-j*k*(x_n*u+y_n*v+z_n*w))
*/
function beamform(vals,x,y,z,az,el,weights,freq){
    // get our angles in sine space
    let uvw = azel2uvw(az,el);
    var u=uvw[0],v=uvw[1],w=uvw[2];

    // calculate wavenumber
    var k = 2*Math.PI/frequency2wavelength(freq);

    // now lets coherently sum across elements
    var bf_sum = math.complex();
    for(var n=0;n<vals.length;n++){
        // unpack the array values
        var valn = vals[n]; var weightn = weights[n];
        var xn = x[n], yn = y[n], zn = z[n];

        // calculate the steering vector, then calc full beamformed value
        let svn = math.exp(math.multiply(math.complex(0,-1),k,math.add(xn*u,yn*v,zn*w)))
        bf_sum = math.add(bf_sum,math.multiply(valn,weightn,svn))
    }
    // now normalize to the weight sum
    var bf_val = math.divide(bf_sum,math.sum(weights));
    return bf_val;
}

/*
@brief Synthesize data for an array for an incident plane wave
@param[in] mag - linear magntiude of incident wave
@param[in] x - array of x element positions (meters)
@param[in] y - array of y element positions (meters)
@param[in] z - array of z element positions (meters)
@param[in] az - incident azimuth angle (radians)
@param[in] el - incident elevation angle (radians)
@param[in] freq - frequency to synthesize for
*/
function synthesize_data(mag,x,y,z,az,el,freq){
    // get our angles in sine space
    let uvw = azel2uvw(az,el);
    var u=uvw[0],v=uvw[1],w=uvw[2];

    // calculate wavenumber
    var k = 2*Math.PI/frequency2wavelength(freq);

    // now lets coherently sum across elements
    var valn = []
    for(var n=0;n<x.length;n++){
        // unpack the array values
        var xn = x[n], yn = y[n], zn = z[n];

        // calculate the steering vector, then calc full beamformed value
        let svn = math.exp(math.multiply(math.complex(0,1),k,math.add(xn*u,yn*v,zn*w)))
        valn.push(math.multiply(mag,svn))
    }
    return valn;
}

