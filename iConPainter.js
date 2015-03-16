;
var iConPainter;
(function() {
	var CELL_SIZE = 12;
	var BLACK = C(0,0,0,255);

	var LINES = 30;
	var ROWS = 30;
	var BACK_COLOR = C(0,0,0,0);

	iConPainter = function(owner) {
		var canvas = $("<canvas>", {width: ROWS * CELL_SIZE + 1, height: LINES * CELL_SIZE + 1})
			.addClass("cp_painter")
			.appendTo(owner)
			.click(clickedACell);
		var cnv = canvas[0];
		var output = $("<canvas>", {width: ROWS, height: LINES})
			.addClass("cp_output")
			.appendTo(owner);
		var otp = output[0];
		var painter1 = new CellPainter(cnv, CELL_SIZE);
		var painter2 = new CellPainter(otp, 1);
		var currentColor;
		var control = $("<div>")
			.addClass("cp_control")
			.appendTo(owner);
		var config = ConfigPage($("<div>").appendTo(owner), initWithConfig);

		$("<button>")
			.text("init")
			.appendTo(control)
			.click(function() {
				config.show();
			});
		var coverPaint = new CoverPaint(control, [painter1, painter2], ROWS, LINES);
		var colorPallette = new ColorPalette(control, function(color) {
			currentColor = color;
		});
		var buttonExport = $("<button>")
			.text("Export")
			.appendTo(control)
			.click(function() {
				var dataUrl = output[0].toDataURL();
				console.log(dataUrl);
				alert(dataUrl);
			});

		init();

		function initWithConfig(config) {
			LINES = config.lines;
			ROWS = config.rows;
			BACK_COLOR = config.background;
			init();
		}
		function init() {
			function setSize(jqObj, dom, width, height) {
				dom.width = width;
				dom.height = height;
				jqObj.css({
					width: dom.width + "px",
					height: dom.height + "px" })
			}
			setSize(canvas, cnv, ROWS * CELL_SIZE + 1, LINES * CELL_SIZE + 1);
			setSize(output, otp, ROWS, LINES);

			painter1.init();
			painter2.init();
			fillAll(BACK_COLOR);
			drawgrid();
		}
		function fillAll(color) {
			painter1.clear(color);
			painter2.clear(color);
			painter1.draw();
			painter2.draw();
		}
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
			coverPaint.paint(lx, ly, currentColor);
			drawgrid();
		}
	};
})();
