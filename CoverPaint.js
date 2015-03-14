;
function CoverPaint(buttonOwner, paintCallback, width, height) {
	var paintMode = false;
	var button = $("<div>")
		.addClass("cp_cover_button")
		.addClass("cp_cover_button_normal")
		.appendTo(buttonOwner)
		.click(paintModeChange);

	this.clickListener = function(x, y, newColor, getCurrentColor, paintCallBack) {
		if (paintMode) {
			paintMode = false;
			button.removeClass("cp_cover_button_selected");
			button.addClass("cp_cover_button_normal");
			paintArround(x, y, newColor, getCurrentColor, paintCallBack);
		} else {
			paintCallBack(x, y, newColor);
		}
	}
	function paintArround(x, y, newColor, getCurrentColor, paintCallBack) {
		var targetColor = getCurrentColor(x, y);
		if (targetColor.equals(newColor)) return;
		_inner(x, y);

		function _inner(x, y) {
			var currentColor = getCurrentColor(x, y);
			if (x < 0 || x >= width
				|| y < 0 || y >= height
				|| ! targetColor.equals(currentColor)) {
				return;
			}
			paintCallBack(x, y, newColor);
			_inner(x + 1, y);
			_inner(x - 1, y);
			_inner(x, y + 1);
			_inner(x, y - 1);
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