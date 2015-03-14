;
var iConPainter;
(function() {
	var DISPLAY_SIZE = 360;
	var LINES = 30;
	var CELL_SIZE = DISPLAY_SIZE / LINES;
	var BLACK = C(0,0,0,255);
	iConPainter = function(owner) {
		var canvas = $("<canvas>", {width: DISPLAY_SIZE + 1, height: DISPLAY_SIZE + 1})
			.addClass("cp_painter")
			.appendTo(owner)
			.click(clickedACell);
		var cnv = canvas[0];
		cnv.width = DISPLAY_SIZE + 1;
		cnv.height = DISPLAY_SIZE + 1;
		var output = $("<canvas>", {width: LINES, height: LINES})
			.addClass("cp_output")
			.appendTo(owner);
		var otp = output[0];
		otp.width = LINES;
		otp.height = LINES;
		var painter1 = new CellPainter(cnv);
		var painter2 = new CellPainter(otp);

		var currentColor;
		var control = $("<div>")
			.addClass("cp_control")
			.appendTo(owner);
		var coverPaint = new CoverPaint(control, null, LINES, LINES);
		var colorPallette = new ColorPalette(control, function(color) {
			currentColor = color;
		});
		drawgrid();
		var buttonExport = $("<button>")
			.text("Export")
			.appendTo(control)
			.click(function() {
				alert(output[0].toDataURL());
			});

		function drawgrid() {
			for (var x = 0; x <= LINES; x ++) {
				painter1.putPoints(BLACK, x*CELL_SIZE, 0, 1, DISPLAY_SIZE);
			}
			for (var y = 0; y <= LINES; y ++) {
				painter1.putPoints(BLACK, 0, y*CELL_SIZE, DISPLAY_SIZE, 1);
			}
		}
		function clickedACell(e) {
			var x = (e.clientX - cnv.getBoundingClientRect().left)
					* cnv.width / cnv.offsetWidth;
			var y = (e.clientY - cnv.getBoundingClientRect().top)
					* cnv.height / cnv.offsetHeight;
			var lx = Math.floor(x / CELL_SIZE);
			var ly = Math.floor(y / CELL_SIZE);
			coverPaint.clickListener(
				lx, ly, currentColor, 
				function(x, y) { return painter2.getColor(x, y); }, 
				paintACell);
//			paintACell(lx, ly, currentColor);
		}
		function getCurrentColor(x, y) {
			
		}
		function paintACell(x, y, c) {
			if (x < 0 || x >= LINES
				|| y < 0 || y >= LINES) return;

			painter1.putPoints(c, x * CELL_SIZE+1, y * CELL_SIZE+1, CELL_SIZE - 1, CELL_SIZE - 1);
			painter2.putPoints(c, x, y, 1, 1);
		}
	};
})();
