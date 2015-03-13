;
ColorPalette = {};
(function() {
	var PALETTE_SIZE = 120;
	var DEFAULT_COLORS = [{b:0,r:0,g:0,a:255},{b:255,r:0,g:0,a:255},{b:0,r:255,g:0,a:255},{b:255,r:255,g:0,a:255},{b:0,r:0,g:255,a:255},{b:255,r:0,g:255,a:255},{b:0,r:255,g:255,a:255},{b:255,r:255,g:255,a:255}];
	var MARGIN = 3;

	ColorPalette = function(owner, onColorClicked) {
		var that = this;
		var colorPicker = new ColorPicker(owner, function(c) { that.addColor(c); });

		$("<button>")
			.text("Add color")
			.appendTo(owner)
			.click(colorPicker.show);

		var div = $("<div>")
			.appendTo(owner)
			.width(PALETTE_SIZE)
			.height(PALETTE_SIZE)
			.css({
				display: "block",
				position: "relative",
				background: "#ccc"
			});
		var colors = DEFAULT_COLORS;
		var colorMassList = map(
			function(c) { return new ColorMass(c, div, onColorClicked) },
			colors);

		this.disposit = function() {
			var rows = Math.ceil(Math.sqrt(colors.length));
			var cellSize = div.width() / rows;
			for (var i = 0, max = colors.length; i < max; i ++) {
				var lx = i % rows;
				var ly = Math.floor(i / rows);
				var x = lx * cellSize;
				var y = ly * cellSize;
				colorMassList[i].setPos(x, y, cellSize - 2 * MARGIN);
			}
		}
		this.disposit();
		this.addColor = function(color) {
			colors.push(color);
			colorMassList.push(new ColorMass(color, div, onColorClicked));
			this.disposit();
		}

		function ColorMass(color, ownerDom, clickListener) {
			this.color = color;
			var dom = $("<div>")
				.appendTo(ownerDom)
				.css({
					background: c_s(color),
					margin: MARGIN + "px",
					position: "absolute"
				}).click(function() {
					clickListener(color)
				});

			this.setPos = function(x, y, size) {
				dom.css({
					left: x + "px",
					top: y + "px",
					width: size + "px",
					height: size + "px"
				});
			}
		}
	};
})();

function map(f, list) {
	var ret = [];
	for (var i = 0, max = list.length; i < max; i ++) {
		ret.push(f(list[i]));
	}
	return ret;
}
function c_s(color) {
	return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}
