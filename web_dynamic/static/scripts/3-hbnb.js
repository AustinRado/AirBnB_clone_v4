$(function () {
	cosnt amenities = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

        $.ajax({
                url=" http://0.0.0.0:5001/api/v1/status/",
                method: 'GET',
                dataType: 'json',
                success: function (result) {
                        if result.status === "OK" {
                                $('#api_status').addClass('available');
                        }
			else {
				$('#api_status').removeClass('available');
			}
                }
        });
});
