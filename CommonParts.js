;
function CellPainter(canvas) {
	var context = canvas.getContext("2d");
	this.putPoints = function(color, x, y, width, height) {
		var id = context.getImageData(x, y, width, height);
		var data = id.data;
		for (var i = 0, max = data.length; i < max; i += 4) {
			data[i + 0] = color.r;
			data[i + 1] = color.g;
			data[i + 2] = color.b;
			data[i + 3] = color.a;
		}
		context.putImageData(id,x,y);
	};
	this.getColor = function(x, y) {
		var data = context.getImageData(x, y, 1, 1).data;
		return C(data[0],data[1],data[2],data[3]);
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