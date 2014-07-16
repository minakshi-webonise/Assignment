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
	ctx.lineTo(0,450);
	ctx.stroke()

	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,-450);
	ctx.stroke()
	
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(-450,0);
	ctx.stroke()

}
//Get euation written by user in text box
function getEquation() {
   	var x = document.getElementById("equation").value ;
	parseEquation(x)

}
//parsing equation
function parseEquation( x) {
	var coeffArray, coeffleft, coeffright , leftsidevalue, currentValue, currentValueLength, xvalue, yvalue;
	coeffArray = x.split("=");
        coeffleft = coeffArray[0];
	coeffright = coeffArray[1];
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
		else {
		xvalue = 1;
		yvalue = 1;
		}
			
	}
	xvalue = xvalue.toString();
	xvalue = xvalue.replace(/,/g, "");
	yvalue = yvalue.toString();
	yvalue = yvalue.replace(/,/g, "");
	alert("values are " + xvalue + yvalue + coeffright);
	drawLine(xvalue,yvalue,coeffright);

}
//function for drawing line and plotting points on line
function drawLine(xv,yv,coeffright) {
	var c, ctx, scale, x1, x2, y1, y2, step, s = 0, xc =0;
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	
	scale = (document.getElementById("scale").value);
	scale = parseInt(scale);
	
	x1 = (document.getElementById("start_point").value) ;
	x2 = document.getElementById("end_point").value ;
	y1 = ((coeffright)-(xv*x1))/yv;
	y2 = ((coeffright)-(xv*x2))/yv;
	x1 = parseInt(x1);
	x2 = parseInt(x2);
	
	ctx.beginPath();
	ctx.moveTo(x1*scale,y1*scale);
	ctx.lineTo(x2*scale,y2*scale);
	ctx.stroke();
	
	ctx.fillText("*", scale*x1,scale*y1);
	ctx.fillText("*", scale*x2,scale*y2);	
	step = document.getElementById("step").value;
	step = parseInt(step);
	while(x2 > xc) {
	
		s  = step+s;
		xc = x1 + s;
		yc  = ((coeffright - (xc*xv)) / yv)
		ctx.fillText("*", scale*xc,scale*yc);
		
		
	}

}
