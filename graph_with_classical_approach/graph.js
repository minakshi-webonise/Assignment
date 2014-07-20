/*Canvas function class to set value
*/
function Canvas( value) {
	this._value = value;

}
/* getAxes method to draw axes on co-ordinate system
*/
Canvas.prototype.getAxes = function() {
	
	this._value.translate(450, 300);
	this._value.fillText("(0,0)",0,0);
	this._value.scale(1,-1);
	this._value.beginPath();
	this._value.moveTo(0,0);
	this._value.lineTo(450, 0);
	this._value.stroke();


	this._value.beginPath();
	this._value.moveTo(0,0);
	this._value.lineTo(0,300);
	this._value.stroke()

	this._value.beginPath();
	this._value.moveTo(0,0);
	this._value.lineTo(0,-300);
	this._value.stroke()
	
	this._value.beginPath();
	this._value.moveTo(0,0);
	this._value.lineTo(-450,0);
	this._value.stroke();

	for(i = 0; i< 450; i = i+20) {
		this._value.fillText("|", i, 0);	
	}
	for(i = 0; i > -450; i = i-20) {
		this._value.fillText("|", i, 0);	
	}
	for(i = 0; i< 300; i = i+20) {
		this._value.fillText("_", 0, i);	
	}
	for(i = 0; i > -300; i = i-20) {
		this._value.fillText("_", 0, i);	
	}
	var temp = this._value;
	
	
}

Canvas.prototype.parseeq = function() {	
	var coeffArray, coeffleft, constant , leftsidevalue, currentValue, currentValueLength, xcoeff, ycoeff;
		coeffArray = this._value.split("=");
		coeffleft = coeffArray[0];
		constant = coeffArray[1];
		leftsidevalue = coeffleft.split("+");
		for(var i = 0; i < leftsidevalue.length; i++) {
			currentValue = leftsidevalue[i];
			currentValueLength = currentValue.length;
			if((currentValueLength ) > 1) {
				if (currentValue.charAt(currentValueLength - 1) == "x") { //Check if current value is a X value
					// Remove X from end of current value
					xcoeff = currentValue.split("x");
				}
				else if (currentValue.charAt(currentValueLength - 1) == "y") { 
					ycoeff = currentValue.split("y");
			
				}
			}
			else {  //id coeffiecient is not given , default is 1
			xcoeff = 1;
			ycoeff = 1;
			}
			
	}
	var p1 = new Canvas(this);
	xcoeff = xcoeff.toString();
	xcoeff = xcoeff.replace(/,/g, ""); //removing , in ycoeffient
	ycoeff = ycoeff.toString();
	ycoeff = ycoeff.replace(/,/g, "");   //removing , in ycoeffient
	p1.drawLine(xcoeff,ycoeff, constant);
}
/*
Function to draw line by getting xcoeffient, y coeffient from user
*/
Canvas.prototype.drawLine = function(xcoeff,ycoeff, constant) {
		var c, ctx, scale, x1, x2, y1, y2, step, s = 0, xc =0;
		c = document.getElementById("myCanvas");
		ctx = c.getContext("2d");
	
		scale = (document.getElementById("scale").value);
		scale = parseInt(scale);
	
		x1 = (document.getElementById("start_point").value) ;
		x2 = document.getElementById("end_point").value ;
	
		y1 = ((constant)-(xcoeff*x1))/ycoeff;
		y2 = ((constant)-(xcoeff*x2))/ycoeff;
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
			yc  = ((constant - (xc*xcoeff)) / ycoeff)
			ctx.fillText("*", scale*xc,scale*yc);
		}
}

function main () {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
 	
	var canvas = new Canvas(ctx);                 	 // creating new object of Canvas to plot co-ordinate sytem.
	canvas.getAxes();
	
	var x = document.getElementById("equation").value ;  //Get equation given by user.
	var p = new Canvas(x);				        //creting object to call parse equation.			
	p.parseeq();
	
	
	
	

}
