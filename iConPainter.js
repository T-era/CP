;
var iConPainter;
(function() {
	var LINES = 30;
	var ROWS = 30;
	var CELL_SIZE = 12;

	var BLACK = C(0,0,0,255);
	iConPainter = function(owner) {
		var canvas = $("<canvas>", {width: ROWS * CELL_SIZE + 1, height: LINES * CELL_SIZE + 1})
			.addClass("cp_painter")
			.appendTo(owner)
			.click(clickedACell);
		var cnv = canvas[0];
		cnv.width = ROWS * CELL_SIZE + 1;
		cnv.height = LINES * CELL_SIZE + 1;
		var output = $("<canvas>", {width: ROWS, height: LINES})
			.addClass("cp_output")
			.appendTo(owner);
		var otp = output[0];
		otp.width = ROWS;
		otp.height = LINES;
		var painter1 = new CellPainter(cnv, CELL_SIZE);
		var painter2 = new CellPainter(otp, 1);

		var currentColor;
		var control = $("<div>")
			.addClass("cp_control")
			.appendTo(owner);
		var coverPaint = new CoverPaint(control, [painter1, painter2], ROWS, LINES);
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
			var context = cnv.getContext("2d");
			for (var x = 0; x <= ROWS; x ++) {
				context.moveTo(x * CELL_SIZE, 0);
				context.lineTo(x * CELL_SIZE, LINES * CELL_SIZE);
			}
			for (var y = 0; y <= LINES; y ++) {
				context.moveTo(0, y * CELL_SIZE);
				context.lineTo(ROWS * CELL_SIZE, y * CELL_SIZE);
			}
			context.stroke();
		}
		function clickedACell(e) {
			var x = (e.clientX - cnv.getBoundingClientRect().left)
					* cnv.width / cnv.offsetWidth;
			var y = (e.clientY - cnv.getBoundingClientRect().top)
					* cnv.height / cnv.offsetHeight;
			var lx = Math.floor(x / CELL_SIZE);
			var ly = Math.floor(y / CELL_SIZE);
			coverPaint.clickListener(lx, ly, currentColor);
			drawgrid();
		}
	};
})();
