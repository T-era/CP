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
}