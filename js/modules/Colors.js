/* @brief Color manipulation        */
/* @author Alec Weiss               */
/* @date 6-2020                     */

export {rgb2cmyk,cmyk2rgb,rgb2cmy,cmy2rgb,hex2rgb}

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
