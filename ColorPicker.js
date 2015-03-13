;
ColorPicker = {};
(function() {
	var SAMPLE_VEIW_SIZE = 120;
	var INPUT_WIDTH = 200;
	ColorPicker = function(parent, callback) {
		var owner = $("<div>")
			.appendTo(parent);
		owner.css({
			width: 20 + SAMPLE_VEIW_SIZE + INPUT_WIDTH + "px",
			height: 10 + SAMPLE_VEIW_SIZE + "px"
		}).dialog({
			width: 400,
			height: 260,
			autoOpen: false,
			closeOnEscape: true,
			modal: true,
			buttons: {
				"追加": function() {
					callback(currentColor());
				},
				"追加して閉じる": function() {
					callback(currentColor());
					owner.dialog("close")
				}
			}
		});
		var color = {r:0,g:0,b:0};

		var sampleView = $("<div>")
			.css({
				width: SAMPLE_VEIW_SIZE + "px",
				height: SAMPLE_VEIW_SIZE + "px",
				float: "left"
			})
			.appendTo(owner);
		var pointDiv = $("<div>")
			.css({
				float: "left"
			}).appendTo(owner);
		var rInput = addColorPointer("R", pointDiv, 0);
		var gInput = addColorPointer("G", pointDiv, 0);
		var bInput = addColorPointer("B", pointDiv, 0);
		var aInput = addColorPointer("A", pointDiv, 255);
		repaintSample();

		function addColorPointer(caption, parent, defValue) {
			var owner = $("<div>").appendTo(parent);
			$("<label>")
				.text(caption)
				.appendTo(owner);
			return $("<input>", { type:"number", min:0, max:255 })
				.val(defValue)
				.css("width", INPUT_WIDTH + "px")
				.appendTo(owner)
				.change(repaintSample);
		}

		this.show = function() {
			owner.dialog("open");
		}
		function repaintSample() {
			color = {
				r:rInput.val() * 1,
				g:gInput.val() * 1,
				b:bInput.val() * 1,
				a:aInput.val() * 1
			};
			sampleView.css("background", c_s(color));
		}
		function currentColor() {
			return color;
		}
	};
})();