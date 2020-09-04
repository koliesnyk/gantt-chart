$(document).ready(function () {
	if ($("#gantt").length > 0) {
		var tasks = [{
			id: 'Task 1',
			name: 'Task 1',
			start: '2020-08-08',
			end: '2020-12-27',
			progress: 0,
			phases: [{
					name: 'Phase 1',
					start: '2020-08-18',
					end: '2020-10-01',
					color: 'gray'
				},
				{
					name: 'Phase 2',
					start: '2020-10-01',
					end: '2020-11-20',
					color: 'yellow'
				},
				{
					name: 'Phase 3',
					start: '2020-11-20',
					end: '2020-12-24',
					color: 'green'
				}
			],
			stones: [{
					name: '300 M',
					start: '2020-09-18',
					end: '2020-09-18',
				},
				{
					name: '500 M',
					start: '2020-09-18',
					end: '2020-10-21',
				},
				{
					name: '800 M',
					start: '2020-11-19',
					end: '2020-12-24',
				}
			]
		}];

		var gantt = new Gantt("#gantt", tasks, {
			column_width: 30,
			bar_height: 20,
			padding: 70,
			view_mode: 'Month',
			on_view_change: function (mode) {
				if (mode == 'Day') {
					$('.gantt .today-highlight').css('width', 38);
				} else {
					$('.gantt .today-highlight').css('width', 5);
				}
			}
		});

		$(document).on('click', '.bar-wrapper', function (e) {
			e.preventDefault();
			$('.gantt .bar-wrapper').css('opacity', 0);
			$('.gantt .arrow').css('opacity', 0);
			$(this).css('opacity', 1);
		});
	}

	$(".btn-group").on("click", "button", function () {
		$btn = $(this);
		var mode = $btn.text();
		gantt.change_view_mode(mode);
		$btn.parent().find('button').removeClass('active');
		$btn.addClass('active');
	});

	if (document.querySelector('#file-input')) {
		let result = document.querySelector('.result'),
			save = document.querySelector('.save'),
			cropped = document.querySelector('.cropped'),
			dwn = document.querySelector('.download'),
			upload = document.querySelector('#file-input'),
			cropper = '';

		upload.addEventListener('change', (e) => {
			if (e.target.files.length) {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target.result) {
						let img = document.createElement('img');
						img.id = 'image';
						img.src = e.target.result;
						result.innerHTML = '';
						result.appendChild(img);
						save.classList.remove('hide');
						cropper = new Cropper(img);
					}
				};
				reader.readAsDataURL(e.target.files[0]);
			}
		});

		save.addEventListener('click', (e) => {
			e.preventDefault();
			let imgSrc = cropper.getCroppedCanvas().toDataURL();
			cropped.src = imgSrc;
			cropped.classList.remove('hide');
			dwn.classList.remove('hide');
			dwn.download = 'imagename.png';
			dwn.setAttribute('href', imgSrc);

			var blobBin = atob(imgSrc.split(',')[1]);
			var array = [];
			for (var i = 0; i < blobBin.length; i++) {
				array.push(blobBin.charCodeAt(i));
			}
			var file = new Blob([new Uint8Array(array)], {
				type: 'image/png'
			});
			console.log(file);
		});
	}
});
