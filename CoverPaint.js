;
function CoverPaint(buttonOwner, painters, width, height) {
	var paintMode = false;
	var button = $("<div>")
		.addClass("cp_cover_button")
		.addClass("cp_cover_button_normal")
		.appendTo(buttonOwner)
		.click(paintModeChange);
	var forEachPainter = function(f) {
		for (var i = 0, max = painters.length; i < max; i ++) {
			f(painters[i]);
		}
	}

	this.clickListener = function(x, y, newColor) {
		if (paintMode) {
			paintMode = false;
			button.removeClass("cp_cover_button_selected");
			button.addClass("cp_cover_button_normal");
			paintArround(x, y, newColor);

			forEachPainter(function(painter) {
				painter.draw();
			});
		} else {
			forEachPainter(function(painter) {
				painter.putPoints(newColor, x, y);
				painter.draw();
			});
		}
	}
	function paintArround(x, y, newColor) {
		var targetColor = painters[0].getColor(x, y);
		if (targetColor.equals(newColor)) return;
		_inner(x, y);

		function _inner(x, y) {
			var currentColor = painters[0].getColor(x, y);
			if (x < 0 || x >= width
				|| y < 0 || y >= height
				|| ! targetColor.equals(currentColor)) {
				return;
			}
			forEachPainter(function (painter) {
				painter.putPoints(newColor, x, y);
			});
			_inner(x + 1, y);
			_inner(x - 1, y);
			_inner(x, y + 1);
			_inner(x, y - 1);
		}
		function paint(x, y, newColor) {
			var index = (y * canvas.width + x) * 4;
			imageData[index + 0] = newColor.r;
			imageData[index + 1] = newColor.g;
			imageData[index + 2] = newColor.b;
			imageData[index + 3] = newColor.a;
		}
	}
	function paintModeChange() {
		paintMode = ! paintMode;
		if (paintMode) {
			button.removeClass("cp_cover_button_normal");
			button.addClass("cp_cover_button_selected");
		} else {
			button.removeClass("cp_cover_button_selected");
			button.addClass("cp_cover_button_normal");
		}
	}
}