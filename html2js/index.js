function updateCode() {
	let quoteType = $('[name="quote"]:checked').val();
	let keepSpacing = JSON.parse($('[name="spacing"]:checked').val());
	var maxColumns = $('[name="maxcols"]').val();
	var text = $('#html').val();

	$('#alert-box').hide();

	if (text === '') return;

	if ( (maxColumns.match(/\D/)) || (maxColumns < 15) ) {
		$('#alert-box').show();
		return;
	}
	
	if (quoteType === "'") {
		text = text.replace(/'/g, "\\'");
	}
	else {
		text = text.replace(/"/g, '\\"');
	}
	var code = "let html = " + quoteType;
	maxColumns = maxColumns - code.length - 1;
	if (keepSpacing) {
		text = text.replace(/\n/g, '\\n' + quoteType + ' +\n' + quoteType);
	}
	else {
		text = text.replace(/^\s+/, '');
		text = text.replace(/\n\s+/g, '');
		text = text.replace(/[\n\r]/g, '');
		let pattern = new RegExp('(.{' + maxColumns.toString() + '})', 'g');
		text = text.replace(pattern, "$1" + quoteType + ' +\n' + quoteType);
	}
	code += text + quoteType + ';';
	$('#js').val(code);
}
$('#html').keyup(function () {
	updateCode();
});
$('input').change(function() {
	updateCode();
});