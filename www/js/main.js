$(document).ready(function() {
	//inicializar panel
	$( "body>[data-role='panel']" ).panel();

	var url="http://www.siervaspadreyermo.org/app/ws/ws.php";
	$.getJSON(url,function(data){
		//noticias portada
		var noticiasPortada = data[0].noticias;
		for(i = 0; i < noticiasPortada.length; i++){
			console.log(noticiasPortada[i].titulo)
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
			+"<span>"+noticiasPortada[noticiaDetalle].dia_fecha+noticiasPortada[noticiaDetalle].mes_fecha+noticiasPortada[noticiaDetalle].anio_fecha+"</span>"
			+"<div class='img-not'><img src='http://www.siervaspadreyermo.org/app/"+noticiasPortada[noticiaDetalle].foto1+"'></div>"
			+"<div class='res-not'>"+noticiasPortada[noticiaDetalle].resumen+"</div>";

			$('#leer_noticia').empty()

			$(newItem).appendTo("#leer_noticia");				
		});
		
		$('.ico-video').click(function(){
			$(this).append('<iframe width="100%" height="100%" src="//www.youtube.com/embed/'+noticiasPortada[noticiaDetalle].video+'?rel=0" frameborder="0" allowfullscreen></iframe>')
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

		//panel
		$.each(data[1].sedes, function(i,sede){
			var newSede =
			"<li><a href='panel_noticias.html'>"+sede.sede+"</a></li>";

			$(newSede).appendTo('#panel_noticias');
		});

		//tema
		$.each(data[2].temas, function(i,tema){
			var newTema =
			"<li><a href='panel_temas.html'>"+tema.tema+"</a></li>";

			$(newTema).appendTo('#panel_articulos');
		});

	});

	//footer
	$('div[data-role="footer"] a').click(function(){
		$('div[data-role="footer"] a').removeClass('active');
		$(this).addClass('active');
	});

	//panel
	$('#myPanel h2').click(function(){
		var textoH2 = $(this).text();

		if(textoH2 === 'Noticias'){
			$('#myPanel ul').height(0);
			$('#myPanel i').css('transform','rotate(0)');
			$('#myPanel i').css('-ms-transform','rotate(0)');
			$('#myPanel i').css('-webkit-transform','rotate(0)');

			$(this).children().css('transform','rotate(90deg)');
			$(this).children().css('-ms-transform','rotate(90deg)');
			$(this).children().css('-webkit-transform','rotate(90deg)');
			$('#panel_noticias').height('auto');
		}
		if(textoH2 === 'Artículos'){
			$('#myPanel ul').height(0);
			$('#myPanel i').css('transform','rotate(0)');
			$('#myPanel i').css('-ms-transform','rotate(0)');
			$('#myPanel i').css('-webkit-transform','rotate(0)');
			
			$(this).children().css('transform','rotate(90deg)');
			$(this).children().css('-ms-transform','rotate(90deg)');
			$(this).children().css('-webkit-transform','rotate(90deg)');
			$('#panel_articulos').height('auto');
		}
		if(textoH2 === 'Información'){
			$('#myPanel ul').height(0);
			$('#myPanel i').css('transform','rotate(0)');
			$('#myPanel i').css('-ms-transform','rotate(0)');
			$('#myPanel i').css('-webkit-transform','rotate(0)');
			
			$(this).children().css('transform','rotate(90deg)');
			$(this).children().css('-ms-transform','rotate(90deg)');
			$(this).children().css('-webkit-transform','rotate(90deg)');
			$('#panel_info').height('auto');
		}
	});

	//FLICKR
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		{
			tags: "padre yermo",
			tagmode: "any",
			format: "json"
		}, function(data){
			$.each(data.items, function(i,item){
				$("<img/>").attr("src", item.media.m).appendTo(".galeria");
				if ( i == 999 ) return false;
			});
	});
	
});

$(document).on("pagecreate",function(event){
	$('#noticia div[data-role="header"] .ui-input-search, #imagenes div[data-role="header"] .ui-input-search').css('margin-left','35px');
});