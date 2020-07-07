
export {generate_cartesian_array}

// build arrays
// return [x,y,z] list of positions in meters
// nvals [nx,ny,nz] num elements
// exp_vals math expressions where n is the element number (e.g. n*0.005)
function generate_cartesian_array(nvals,exp_vals){ //meshgrid the values
 
    let xr = math.range(0,nvals[0]).toArray();
    let yr = math.range(0,nvals[1]).toArray();
    let zr = math.range(0,nvals[2]).toArray();
    var nmesh = meshgrid3d(xr,yr,zr);
    var out_vals = [];

    // now evaluate
    var scope = {nx:nmesh[0],ny:nmesh[1],nz:nmesh[2],n:math.range(0,nmesh[0].length).toArray()};
    for(var i=0;i<nmesh.length;i++){
        var out_val = math.evaluate(exp_vals[i],scope)
        out_vals.push(out_val)
    }
    return out_vals;
}

// create 1D lists of meshgridded values ()
// input must be javascript arrays
// returns 1D arrays a=repeat([a1,a2,...an],b.length*c.length)
//                   b=repeat([repeat([b1],a.length)],...,[repeat([bn],a.length)],c.length)
//                   c= [repeat([c1],a.length*b.length),...,repeat([cn],a.length*b.length)]
function meshgrid3d(a,b,c){
    // meshgrid the values
    var A=[],B=[],C=[]

    // mesh A
    for(var k=0;k<c.length;k++){
        for(var j=0;j<b.length;j++){
            A = math.concat(A,a);
        }
    }
    // mesh b
    for(var k=0;k<c.length;k++){
        for(var i=0;i<b.length;i++){
        B = math.concat(B,math.multiply(b[i],math.ones(a.length).toArray()));
        }
    }
    // mesh c
    for(var k=0;k<c.length;k++){
        C = math.concat(C,math.multiply(c[k],math.ones(a.length*b.length).toArray()));
    }
    return [A,B,C];
}


