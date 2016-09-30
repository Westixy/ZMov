var max = 20;

var loadMore = function () {
  for (var i = max-20; i < max; i++) {
    $(".inner").append("<p>test "+i+"</p>");
  }
  max += 20;
}

$('.on').scroll(function () {
  var top = $('.on').scrollTop();
  $('.two').html("top: "+top+" diff: "+($(".inner").height() - $(".on").height()));
  if (top >= $(".inner").height() - $(".on").height()) {
    $('.two').append(" bottom");
    loadMore();
  }
});

loadMore();
