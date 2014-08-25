$(document).ready(function() {
	var url="http://www.siervaspadreyermo.org/app/ws/ws.php";
	$.getJSON(url,function(data){
		var noticiasPortada = data[0].noticias;

		for(i = 0; i < noticiasPortada.length; i++){
			
			var tipoN = noticiasPortada[i].tipo_noticia;

			//portada
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

			//noticias
			if(tipoN === 'Noticias'){
				$(newLi).appendTo("#listado_noticias");
			}	
		
			//articulos
			if(tipoN === 'Artículos'){
				$(newLi).appendTo("#listado_articulos");
			}

			//tareas
			if(tipoN === 'Tareas'){
				$(newLi).appendTo("#listado_tareas");
			}

			$(newLi).appendTo("#listado_portada");
		}

		//detalle
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

			//LIMPIA
			$('#leer_noticia, #videoplayer, #audioplayer, .galeria').empty()

			//FLICKR
			var apiKey = '9d5c2158fc84fa7bfb39facf94799f94'; //secreto: d2c2ec5c1a081ac1
			var fotoSet = noticiasPortada[noticiaDetalle].galeria;
			var fotosUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+apiKey+"&photoset_id="+fotoSet+"&format=json&jsoncallback=?";
			$.getJSON(fotosUrl,function(data){
				$.each(data.photoset.photo, function(i, flickrPhoto){
			        var basePhotoURL = 'http://farm' + flickrPhoto.farm + '.static.flickr.com/'
			        + flickrPhoto.server + '/' + flickrPhoto.id + '_' + flickrPhoto.secret + ".jpg";            

			        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + flickrPhoto.id + "/";
			        //$("<img/>").attr("src", basePhotoURL).appendTo(".galeria").wrap(("<div></div>"));
			        var laImagen =
			        "<div style='background:url("+basePhotoURL+") no-repeat center center;background-size:100%;'></div>";
			        $(laImagen).appendTo('.galeria');
				});
			});			

			$(newItem).appendTo("#leer_noticia");
			$(newVideo).appendTo("#videoplayer");
			$(newAudio).appendTo("#audioplayer");			
		});
		
		//colores portada
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

	//adelante
	$('.galeria-adelante').click(function(){
		$('.galeria div.active').next().addClass('active');
		$('.galeria div.active:last').prev().removeClass('active');

		$('.galeria div').fadeOut();
		$('.galeria div.active').fadeIn();
	});
	
	//atras
	$('.galeria-atras').click(function(){
		$('.galeria div.active').prev().addClass('active');
		$('.galeria div.active:first').next().removeClass('active');

		$('.galeria div').fadeOut();
		$('.galeria div.active').fadeIn();
	});
});

//GALERIA
$(document).on( "pagechange", function(event){
	var alturaPagina = ($(document).height()) - 85; 
	$('.galeria div').css('height', alturaPagina+'px');
	$('.galeria div:first').addClass('active');
	$('.galeria div.active').show();
});