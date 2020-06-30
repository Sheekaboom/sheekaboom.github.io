export {azel2uvw,deg2rad,rad2deg,lin2db,db2lin};
export {frequency2wavelength,azel2cart};

export const SPEED_OF_LIGHT = 299792458;

/*
@brief convert azimuth elevation to UVW coordinates
@param[in] az -azimuth in radians
@param[in] el - elevation in radians
@return [u,v,w]
*/
function azel2uvw(az,el){
    var u = Math.sin(az)*Math.cos(el);
    var v = Math.sin(el);
    var w = Math.cos(az)*Math.cos(el);
    return [u,v,w]
}

/*@brief convert degrees to radians*/
function deg2rad(val){return math.multiply(val,Math.PI/180);}

/*@brief convert radians to degrees*/
function rad2deg(val){return math.multiply(val,180/Math.PI);}

/*@brief convert frequency to wavelength (free space)*/
function frequency2wavelength(freq){return math.divide(SPEED_OF_LIGHT,freq);}

/*@brief convert linear to dB*/
function lin2db(val){return math.multiply(20,math.log10(val));}

/*@brief convert dB to linear*/
function db2lin(val){return math.pow(10,math.divide(val,20));}

/*@brief change mag/az/el data to cartesian values*/
function azel2cart(mag,az,el){
    var x = math.multiply(mag,math.cos(az),math.cos(el));
    var y = math.multiply(mag,math.sin(az),math.cos(el));
    var z = math.multiply(mag,math.sin(el));
    return [x,y,z];
}