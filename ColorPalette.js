;
ColorPalette = {};
(function() {
	var PALETTE_SIZE = 120;
	var DEFAULT_COLORS = [
		C(0,0,0,255), C(255,0,0,255), C(0,255,0,255),
		C(255,255,0,255), C(0,0,255,255), C(255,0,255,255),
		C(0,255,255,255), C(255,255,255,255)];
	var MARGIN = 3;

	ColorPalette = function(owner, onColorClicked) {
		var that = this;
		var colorPicker = new ColorPicker(owner, function(c) { that.addColor(c); });

		$("<div>")
			.addClass("cp_add_color_button")
			.appendTo(owner)
			.click(colorPicker.show);

		var palette = $("<div>")
			.appendTo(owner)
			.width(PALETTE_SIZE)
			.height(PALETTE_SIZE)
			.addClass("cp_palette");
		var colors = DEFAULT_COLORS;
		var colorMassList = map(
			function(c) { return new ColorMass(c, palette, onColorClicked) },
			colors);

		this.disposit = function() {
			var rows = Math.ceil(Math.sqrt(colors.length));
			var cellSize = palette.width() / rows;
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
			colorMassList.push(new ColorMass(color, palette, onColorClicked));
			this.disposit();
		}

		function colorMassSelected(color) {
			for (var i = 0, max = colorMassList.length; i < max; i ++) {
				var mass = colorMassList[i];
				if (mass.color.equals(color)) {
					mass.selected();
				} else {
					mass.unSelected();
				}
			}
		}

		function ColorMass(color, ownerDom, clickListener) {
			this.color = color;
			var dom = $("<div>")
				.appendTo(ownerDom)
				.addClass("cp_color_mass")
				.addClass("cp_color_mass_normal")
				.css({
					background: color.css(),
				}).click(function() {
					colorMassSelected(color);
					clickListener(color)
				});

			this.setPos = function(x, y, size) {
				dom.css({
					left: x - 2 + "px",
					top: y - 2 + "px",
					width: size + "px",
					height: size + "px"
				});
			};
			this.unSelected = function() {
				dom.removeClass("cp_color_mass_selected");
				dom.addClass("cp_color_mass_normal");
			};
			this.selected = function() {
				dom.addClass("cp_color_mass_selected");
				dom.removeClass("cp_color_mass_normal");
			};
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
