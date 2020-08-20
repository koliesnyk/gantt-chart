var imageId = 0;
var baseFiles = [];

$(".browse").on("click", () => {
	$("#Image").click();
});

$(".capture").on("click", () => {
	$("#PhotoImage").click();
});

$('.file-input').change(function (e) {
	var input = e.target;
	var files = input.files;
	var images = $('.images');

	for (var i = 0; i < files.length; i++) {
		imageId++;

		((file) => {
			var reader = new FileReader();
			var fileName = file.name.replace(/\.[^.]*$/, ''); // without file extension
			var fileId = file.size + imageId;
			var baseFile = '';

			reader.onload = (e) => {
				var preview = '<div class="image image_' + i + '" data-id="' + fileId + '">' +
					'<div class="img"><img src="' + e.target.result + '"></div>' +
					'<button class="btn remove">Remove</button>' +
					'</div>';
				images.append(preview);

				baseFile = reader.result;

				baseFiles.push({
					id: fileId,
					name: file.name,
					file: baseFile,
					uploaded: 0
				});
			}

			reader.readAsDataURL(file);
		})(files[i]);
	}

	console.log('after upload :>> ', baseFiles);
});

$(document).on('click', '.remove', function (e) {
	e.preventDefault();

	var parent = $(this).parent();
	var id = parent.data('id');
	var removeIndex = baseFiles.map(function (item) {
		return item.id;
	}).indexOf(id);

	baseFiles.splice(removeIndex, 1);
	parent.remove();
	console.log('after remove :>> ', baseFiles);
	// var myJSON = JSON.stringify(baseFiles);
	// $('.files-text').val(myJSON);
});
