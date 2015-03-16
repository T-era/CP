;
function CellPainter(canvas, times) {
	var context = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var imageData = context.getImageData(0, 0, width, height);

	this.putPoints = function(color, x, y) {
		var data = imageData.data;
		for (var dx = 0; dx < times; dx ++) {
			for (var dy = 0; dy < times; dy ++) {
				var i = ((y * times + dy) * width + (x * times + dx)) * 4;
				data[i + 0] = color.r;
				data[i + 1] = color.g;
				data[i + 2] = color.b;
				data[i + 3] = color.a;
			}
		}
	};
	this.draw = function() {
		context.putImageData(imageData,0,0);
	}
	this.getColor = function(x, y) {
		var i = ((y * times * width) + x * times) * 4
		var data = imageData.data;
		return C(data[i+0],data[i+1],data[i+2],data[i+3]);
	}
}
function C(r,g,b,a) {
	var obj = {}
	obj.r = r;
	obj.g = g;
	obj.b = b;
	obj.a = a;

	obj.css = function() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	};
	obj.equals = function(arg) {
		return this.r == arg.r
			&& this.g == arg.g
			&& this.b == arg.b
			&& this.a == arg.a;
	};
	return obj;
}