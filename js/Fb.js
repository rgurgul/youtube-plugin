(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = cfg.getCfg('fb');
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function createNewLikeButton(url)
{
    var elem = $(document.createElement("fb:like"));
    elem.attr("href", url);
    elem.attr("layout", 'button_count');
    elem.attr("show_faces", 'false');
    elem.attr("send", 'false');
    elem.attr("colorscheme", 'light');
    $("div#like-container").empty().append(elem).show();
    FB.XFBML.parse($("#like-container").get(0));
}