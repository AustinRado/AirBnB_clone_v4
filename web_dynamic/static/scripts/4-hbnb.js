$(function () {
  const amenities = {};
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  function getPlaces (places) {
    for (const place of places) {
      const article = `<article>
                       <div class="title_box">
                           <h2>${place.name}</h2>
                           <div class="price_by_night">${place.price_by_night}</div>
                       </div>
                       <div class="information">
                       <div class="max_guest">${place.max_guest} Guest</div>
                           <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                           <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                       </div>
                      <div class="description">${place.description}</div>
                      </article>`;
      $('section.places').append(article);
    }
  }

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: getPlaces
  });

  $('container.filters .button').on('click', function (amenities) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      data: `{"amenities": ${JSON.stringify(amenities)}}`,
      success: getPlaces
    });
  });
});
