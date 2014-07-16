//function to plot xy co-ordinate system and shift origin to center
window.onload = function(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.translate(450, 300);
	ctx.fillText("(0,0)",0,0);
	ctx.scale(1,-1);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(450, 0);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,300);
	ctx.stroke()

	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,-300);
	ctx.stroke()
	
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(-450,0);
	ctx.stroke()
	for(i = 0; i< 450; i = i+20) {
		ctx.fillText("|", i, 0);	
	}
	for(i = 0; i > -450; i = i-20) {
		ctx.fillText("|", i, 0);	
	}
	for(i = 0; i< 300; i = i+20) {
		ctx.fillText("_", 0, i);	
	}
	for(i = 0; i > -300; i = i-20) {
		ctx.fillText("_", 0, i);	
	}	
}
//parsing equation
function parseEquation (x){
	var coeffArray, coeffleft, constant , leftsidevalue, currentValue, currentValueLength, xvalue, yvalue;
	this._x = x;
	 
	coeffArray = this._x.split("=");
        coeffleft = coeffArray[0];
	constant = coeffArray[1];
	leftsidevalue = coeffleft.split("+");
	for(var i = 0; i < leftsidevalue.length; i++) {
		currentValue = leftsidevalue[i];
		currentValueLength = currentValue.length;
		if((currentValueLength ) > 1) {
			if (currentValue.charAt(currentValueLength - 1) == "x") { //Check if current value is a X value
				// Remove X from end of current value
				xvalue = currentValue.split("x");
			}
			else if (currentValue.charAt(currentValueLength - 1) == "y") { 
				yvalue = currentValue.split("y");
			
			}
		}
		else {  //id coeffiecient is not given , default is 1
		xvalue = 1;
		yvalue = 1;
		}
			
	}
	xvalue = xvalue.toString();
	xvalue = xvalue.replace(/,/g, ""); //removing , in xvalue
	yvalue = yvalue.toString();
	yvalue = yvalue.replace(/,/g, "");
	this._xvalue = xvalue;
	this._yvalue = yvalue;
	this._constant = constant;

}
parseEquation.prototype.drawLine=function() {             // prototype of main function parseEquation
	
	xv = this._xvalue;
	
	yv = this._yvalue;
	
	constant = this._constant;
	
	var c, ctx, scale, x1, x2, y1, y2, step, s = 0, xc =0;
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	
	scale = (document.getElementById("scale").value);
	scale = parseInt(scale);
	
	x1 = (document.getElementById("start_point").value) ;
	x2 = document.getElementById("end_point").value ;
	
	y1 = ((constant)-(xv*x1))/yv;
	y2 = ((constant)-(xv*x2))/yv;
	x1 = parseInt(x1);
	x2 = parseInt(x2);
	
	ctx.beginPath();
	ctx.moveTo(x1*scale,y1*scale);
	ctx.lineTo(x2*scale,y2*scale);
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	ctx.fillStyle = '#ff00ff';
	ctx.fillText("*", scale*x1,scale*y1);
	ctx.fillText("*", scale*x2,scale*y2);	
	step = document.getElementById("step").value;
	step = parseInt(step);
	while(x2 > xc) {
		s  = step+s;
		xc = x1 + s;
		yc  = ((constant - (xc*xv)) / yv)
		ctx.fillText("*", scale*xc,scale*yc);
	}
} 
function callParseEquation() {
	var x = document.getElementById("equation").value ;
	var object = new parseEquation(x);         //creationg object of parseEquation
	object.drawLine();                         //calling drawLine function which is prototype of parseEquation
}
 
