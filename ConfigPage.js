// getConfig method returns object.
// {
// 	lines,
// 	rows,
// 	background
// }
function ConfigPage(owner, initializer) {
	var obj = {};
	var config = {
		lines: 30,
		rows: 30,
		background: C(0,0,0,0)
	};

	var colorPicker = new ColorPicker(owner, function(c) { config.background = c; });

	var dialog = $("<div>")
		.appendTo(owner);
	var widthInput = $("<input>", { type: "number" }).val(config.rows);
	var heightInput = $("<input>", { type: "number" }).val(config.lines);
	dialog
		.append($("<div>")
			.append($("<label>").text("幅"))
			.append(widthInput))
		.append($("<div>")
			.append($("<label>").text("高"))
			.append(heightInput));
	ColorPicker.generateInput(dialog);

	dialog.dialog({
		width: 400,
		height: 260,
		autoOpen: true,
		closeOnEscape: false,
		modal: true,
		buttons: {
			"OK": function() {
				config.rows = widthInput.val() * 1;
				config.lines = heightInput.val() * 1;
				dialog.dialog("close");
				initializer(config);
			}
		}
	});

	obj.show = function() {
		dialog.dialog("open");
	}
	return obj;
}