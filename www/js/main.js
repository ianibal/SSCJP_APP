$(document).ready(function() {
	//JSON
	var url="http://www.siervaspadreyermo.org/app/ws/ws.php";
	$.getJSON(url,function(data){
		//noticias portada
		var noticiasPortada = data[0].noticias;
		for(i = 0; i < noticiasPortada.length; i++){
			//console.log(noticiasPortada[i].titulo)
			var newLi =
			"<li>"
			+"<a href='#noticia' data-link='"+i+"'>"
			+"<div class='imagen-lista'><img src='http://www.siervaspadreyermo.org/app/"+noticiasPortada[i].foto1+"'></div>"
			+"<div class='datos-lista'>"
			+"<h4>"+noticiasPortada[i].titulo+"</h4>"
			+"<span>"+noticiasPortada[i].dia_fecha+"<span>"+noticiasPortada[i].mes_fecha+noticiasPortada[i].anio_fecha+"</span>"+"</span>"
			+"<div>"+(noticiasPortada[i].resumen).slice(0,99)+"..."+"</div>"
			+"</div>"
			+"</a>"
			+"</li>";

			$(newLi).appendTo("#listado_portada");
		}

		$('a[href=#noticia]').click(function(){
			var noticiaDetalle = $(this).attr('data-link');
			
			var newItem =
			"<h1>"+noticiasPortada[noticiaDetalle].titulo+"</h1>"
			+"<span>"+noticiasPortada[noticiaDetalle].dia_fecha+"<span>"+noticiasPortada[noticiaDetalle].mes_fecha+noticiasPortada[noticiaDetalle].anio_fecha+"</span>"+"</span>"
			+"<div class='img-not'><img src='http://www.siervaspadreyermo.org/app/"+noticiasPortada[noticiaDetalle].foto1+"'></div>"
			+"<div class='res-not'>"+noticiasPortada[noticiaDetalle].resumen+"</div>";

			var newVideo =
			"<iframe width='100%' height='300px' src='http://www.youtube.com/embed/"+noticiasPortada[noticiaDetalle].video+"?rel=0 frameborder='0' allowfullscreen></iframe>";

			var newAudio =
			"<iframe width='100%' height='300px' src='http://www.youtube.com/embed/"+noticiasPortada[noticiaDetalle].audio+"?rel=0 frameborder='0' allowfullscreen></iframe>";

			$('#leer_noticia, #videoplayer, #audioplayer').empty()

			$(newItem).appendTo("#leer_noticia");
			$(newVideo).appendTo("#videoplayer");
			$(newAudio).appendTo("#audioplayer");				
		});

		var colorPortada = Math.floor((Math.random() * 10) + 1);

		if(colorPortada > 7){
			$('h4:first').css('background','#335b7e');
				$('#listado_portada li:first .datos-lista > span').css('background','#71b8f8');
		}else if(colorPortada < 4){
			$('h4:first').css('background','#942b29');
			$('#listado_portada li:first .datos-lista > span').css('background','#f74a47');
		}else{
			$('h4:first').css('background','#d77f1e');
			$('#listado_portada li:first .datos-lista > span').css('background','#fdab50');
		}
	});

	//footer
	$('#portada div[data-role="footer"] a').click(function(){
		$('div[data-role="footer"] a').removeClass('active');
		$(this).addClass('active');
	});

	//FLICKR
	var apiKey = 'c2d64c71e95ae71604e95ae775b7cc02';
	var photosetId = '72157633915274589';
	var fotosUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+apiKey+"&photoset_id="+photosetId+"&format=json&jsoncallback=?";
	$.getJSON(fotosUrl,function(data){
		$.each(data.photoset.photo, function(i, flickrPhoto){
	        var basePhotoURL = 'http://farm' + flickrPhoto.farm + '.static.flickr.com/'
	        + flickrPhoto.server + '/' + flickrPhoto.id + '_' + flickrPhoto.secret + ".jpg";            

	        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + flickrPhoto.id + "/";
	        $("<img/>").attr("src", basePhotoURL).appendTo(".galeria").wrap(("<div class='galeria_item'></div>"))
		});
	});

});

$(document).on("pagecreate",function(event){
	$('#noticia div[data-role="header"] .ui-input-search, #imagenes div[data-role="header"] .ui-input-search').css('margin-left','35px');
});