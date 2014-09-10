//splash android
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady(){
    navigator.splashscreen.hide();
}

//loader
$.ajaxSetup({
	timeout: 10000,
		error: function(request, status, maybe_an_exception_object) {
		if(status == 'timeout')
			alert("No hay conexión a Internet");
		}
});

$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
    var interval = setInterval(function(){
        $.mobile.loading('show');        clearInterval(interval);
    },1);    
});

$(document).on('pageshow', '[data-role="page"]', function(){  
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
    },300);      
});

$(document).ready(function(){
	var url="http://www.siervaspadreyermo.org/app/ws/ws.php";
	$.getJSON(url,function(data){
		var noticiasPortada = data[0].noticias;

		for(i = 0; i < noticiasPortada.length; i++){
			var tipoN = noticiasPortada[i].tipo_noticia;
			var sedeN = noticiasPortada[i].sede_noticia;
			var temaN = noticiasPortada[i].tema_noticia;

			sedeN = sedeN.replace(/\s/g,'');
			temaN = temaN.replace(/\s/g,'');
			//portada
			var newLi =
			"<li class='"+sedeN+temaN+"'>"
			+"<a href='#noticia' class='detalleNoticiasBtn' data-link='"+i+"'>"
			+"<div class='imagen-lista'><img src='http://www.siervaspadreyermo.org/app/"+noticiasPortada[i].foto1+"'></div>"
			+"<div class='datos-lista'>"
			+"<h4>"+noticiasPortada[i].titulo+"</h4>"
			+"<h3>"+noticiasPortada[i].sede_noticia+noticiasPortada[i].tema_noticia+",&nbsp;</h3>"
			+"<span>"+noticiasPortada[i].dia_fecha+"<span>"+noticiasPortada[i].mes_fecha+noticiasPortada[i].anio_fecha+"</span>"+"</span>"
			+"<div>"+(noticiasPortada[i].resumen).slice(0,99)+"..."+"</div>"
			+"</div>"
			+"</a>"
			+"</li>";

			//noticias
			if(tipoN === 'Noticias'){
				$(newLi).appendTo("#listado_noticias");
		
				var container = $("#listado_noticias");    
				 container.find("li").sort(function (a, b) {
				     var classA = $(a).attr("class");
				     var classB = $(b).attr("class");
				     if (classA > classB) return 1;
				     if (classA < classB) return -1;
				     return 0;
				 }).appendTo(container);
			}	
		
			//articulos
			if(tipoN === 'Artículos'){
				$(newLi).appendTo("#listado_articulos");
				
				var container = $("#listado_articulos");    
				 container.find("li").sort(function (a, b) {
				     var classA = $(a).attr("class");
				     var classB = $(b).attr("class");
				     if (classA > classB) return 1;
				     if (classA < classB) return -1;
				     return 0;
				 }).appendTo(container);
			}

			//tareas
			if(tipoN === 'Tareas'){
				$(newLi).appendTo("#listado_tareas");
				$('#listado_tareas li h3').hide();
			}

			$(newLi).appendTo("#listado_portada");
			$('#listado_portada li h3').hide();
		}

		//detalle
		$('.detalleNoticiasBtn').click(function(){
			var noticiaDetalle = $(this).attr('data-link');
			
			var newItem =
			"<h1>"+noticiasPortada[noticiaDetalle].titulo+"</h1>"
			+"<span>"+noticiasPortada[noticiaDetalle].dia_fecha+"<span>"+noticiasPortada[noticiaDetalle].mes_fecha+noticiasPortada[noticiaDetalle].anio_fecha+"</span>"+"</span>"
			+"<div class='img-not'><img src='http://www.siervaspadreyermo.org/app/"+noticiasPortada[noticiaDetalle].foto1+"'></div>"
			+"<div class='res-not'>"+noticiasPortada[noticiaDetalle].resumen+"</div>";

			var pageId = $(this).parent().parent().parent().parent().attr('id');

			if(pageId === 'portada'){
				$('#detalle_back').attr('href','#portada');
			}else if(pageId === 'seccion_noticias'){
				$('#detalle_back').attr('href','#seccion_noticias');
			}else if(pageId === 'seccion_articulos'){
				$('#detalle_back').attr('href','#seccion_articulos');
			}else if(pageId === 'seccion_tareas'){
				$('#detalle_back').attr('href','#seccion_tareas');
			}

			if(noticiasPortada[noticiaDetalle].video === ''){
				$('.ico-video').attr('href','#').addClass('inactive');
			}else{
				$('.ico-video').attr('href','#video_popup').removeClass('inactive');
				var newVideo =
				"<iframe width='100%' height='300px' src='http://www.youtube.com/embed/"+noticiasPortada[noticiaDetalle].video+"?rel=0 frameborder='0' allowfullscreen></iframe>";
			}

			if(noticiasPortada[noticiaDetalle].audio === ''){
				$('.ico-audio').attr('href','#').addClass('inactive');
			}else{
				$('.ico-audio').attr('href','#audio_popup').removeClass('inactive');
				var newAudio =
				"<iframe width='100%' height='300px' src='http://www.youtube.com/embed/"+noticiasPortada[noticiaDetalle].audio+"?rel=0 frameborder='0' allowfullscreen></iframe>";
			}

			//LIMPIA
			$('#leer_noticia, #videoplayer, #audioplayer, .galeria').empty()

			if(noticiasPortada[noticiaDetalle].galeria === ''){
				$('.ico-imagenes').attr('href','#').addClass('inactive');
			}else{
				$('.ico-imagenes').attr('href','#imagenes').removeClass('inactive');
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
			}

			$(newItem).appendTo('#leer_noticia');
			$(newVideo).appendTo('#videoplayer');
			$(newAudio).appendTo('#audioplayer');

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

		/*var minHeaderN = data[1].sedes;
		for(i = 0; i < minHeaderN.length; i++){
			var minHeaderC = minHeaderN[i].sede.replace(/\s/g,'');
			var listD =
			"<li data-role='list-divider' class='"+minHeaderC+"'>"+minHeaderN[i].sede+"</li>";

			$(listD).appendTo('#listado_noticias');
		}*/
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

	//galeria
	$('.ico-imagenes').click(function(){
		var alturaPagina = ($(document).height()) - 85; 
		$('.galeria div').css('height', alturaPagina+'px');
		$('.galeria div:first').addClass('active');
		$('.galeria div.active').show();
	});
});