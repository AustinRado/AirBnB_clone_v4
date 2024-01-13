$(function () {
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
