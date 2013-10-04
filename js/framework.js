/*
 * ----------------------------- FRAMEWORK -------------------------------------
	Developer: André dos Santos D´Angelo
	01/07/2013
	
 */
 
	



		
 
 
 /* Init */
 
	$(document).ready(function(e) {
		/** Component: Table Ordenada **/
		$(".table-ordenada").tablesorter();
		
		
		/** Component: Tabs **/
			menuTabs();
	
	
		/** Component: maskForms **/
			masksForms();
		
		
		/** Component: scrollFixed **/
		//scrollFixed();
		
		
	});




/* Components *****************************************************************/





/** Component: The Banner **/
	(function($) { 
	
	
		/* Default Options *******/
		var defaults = {
		   option : true,
		   speed: 500,
		   timer: 4000,
		   effect: "default",
		   bannerWidth: "100%",
		   bannerHeight: "100%",
		   clickAndStop:true,
		   autoAnimate:true,
		   arrow:true,
		   slides: false,
		   slideMargin:0,
		   thumb:false
		};
		/* end: Default Options *******/
		
		
		
		$.fn.thebanner = function(options) { 
	
			var settings = $.extend({}, defaults, options); 
			
			/* private vars */
			var thebanner = $(this);
			var arrList = new Array();
			var arrListHtml = new Array();
			var widthBanner = 0;
			var widthTotalBanners = 0;
			var totalNumbersBanners = 0;
			var marginRightControl = 0;
			var bannerAtual = 0;
			var initialPosition = 0;
			var isDrag = false;
			var isResizing = false;
			var speedOriginal = settings.speed;
			
			this.each(function(){ 
			   var currentElement = $(this);
			});
			
		
			/* Call Functions **/
			initialSettings();
			
			if(settings.autoAnimate){
				var intervalListener = self.setInterval(function () {bannerTimer()}, settings.timer);
			}
		
			
		
		
	/* Core */	
			
			
			
			/* Initial Settings  ***************************/
			function initialSettings(){
				
				
				/* Set width and height to Banner and ul and li 100%*/
				thebanner.css("width", settings.bannerWidth);
				
				
				//thebanner.css("height", settings.bannerHeight);
				thebanner.css("position", "relative");
				//thebanner.css("overflow", "hidden");
				
				thebanner.prepend("<div class='thebanner-mask'></div>");
				thebanner.find("> ul").appendTo(thebanner.find(".thebanner-mask"));
				
				thebanner.find(".thebanner-mask").css("overflow", "hidden");
				
				thebanner.find(".thebanner-mask ul").css("width", settings.bannerWidth);
				thebanner.find(".thebanner-mask ul").css("height", settings.bannerHeight);
				
				if(!settings.slides){
					thebanner.find(".thebanner-mask ul li").css("height", thebanner.height());
					thebanner.find(".thebanner-mask ul li").css("width", thebanner.width());
				}else{
					thebanner.find(".thebanner-mask ul li").css("height", thebanner.height());
					thebanner.find(".thebanner-mask ul li").css("margin-right", settings.slideMargin);
					thebanner.find(".thebanner-mask ul li").css("margin-left", settings.slideMargin);
				}
				
				
				
				thebanner.find(".thebanner-mask ul").addClass("the-banner");
				thebanner.css("visibility", "hidden");
				thebanner.append("<div class='thebanner-title'></div>");

				
				/* Resize */
				
				$("#base").bind('resized', function(){
				  resizeTheBanner();
				});
				$("#base").bind('resize', function(){
				  resizeTheBanner();
				});
				$(window).resize(function() {
					resizeTheBanner();
				});
				
				
				
				
	
				
				/* Create UL  Controls */
				thebanner.append("<div class='the-banner-controls'><ul></ul></div>");
				
				
				
				
				
				
				/* Organize Banners */
				thebanner.find(" .thebanner-mask ul li").each(function(index, element) {
					
					if(settings.slides == 0){
					
					}
					else{
					
					}
					
					
					if($(this).attr("data-title") && index == 0){
						thebanner.find(".thebanner-title").html("<h3>"+ $(this).attr("data-title") +"</h3>");
					}
					
					
					$(this).attr("data-index", index);
					
					arrList.push($(this));
					arrListHtml.push($(this).html())
					
					
					
					widthBanner = $(this).width() + (settings.slideMargin*2);
					widthTotalBanners += widthBanner;
					
					if(!settings.slides){
						
						if(settings.thumb){
							$(thebanner).find(".the-banner-controls ul").append("<li><a data-index="+index+"><img src='"+ $(this).attr("data-thumb") +"'/></a></li>");
							$(thebanner).find(".the-banner-controls ul > li a").css("width", "auto");
							$(thebanner).find(".the-banner-controls ul > li a").css("height", "auto");
							
						}else{
							$(thebanner).find(".the-banner-controls ul").append("<li><a data-index="+index+"></a></li>");
						}
					}
					
					
					
					
					totalNumbersBanners = index +1;
					
					if($(this).attr("data-link")){
						$(this).addClass("pointer");
					}
					
				});
			
								

			
				// Set Total Width of Banners
				thebanner.find(".the-banner").css("width", widthTotalBanners)
				thebanner.find(".the-banner-controls ul > li:last a").css("margin-right", "0px");
			}
				
			/* end: Initial Settings ***********************/
			
			
			
			
			
			
			
			
			/* Monta slides / Identify *****/
			montaSlides();
			
			function montaSlides(){
				if(settings.slides){
					thebanner.find(".the-banner-controls ul").html("");
					thebanner.find(".the-banner-controls ul").append("<li><a data-index=0></a></li>");
					var quandoCabe =0;
					var loopItens = 1;
					
					for(n=0; n< thebanner.find(".thebanner-mask ul li").length; n++){
						
						quandoCabe += (thebanner.find(".thebanner-mask ul li").width() + (settings.slideMargin*2));
						
						if(quandoCabe > thebanner.width() * loopItens){
							
							thebanner.find(".the-banner-controls ul").append("<li><a data-index="+n+"></a></li>");
							loopItens++;
							
						}
						
						
					
					}
					
					thebanner.find(".the-banner-controls ul > li:last a").css("margin-right", "0px");
					
					thebanner.css("width", settings.bannerWidth);
					
					if(thebanner.width() < thebanner.find(".thebanner-mask ul li").width() * 2){
						thebanner.css("width", thebanner.find(".thebanner-mask ul li").width()+ settings.slideMargin*2);
					}
					
				}
			
			}
			/* end: Monta slides / Identify *****/
			

			
			
			
			
			
			/* Resize Banner */
			function resizeTheBanner(){
				
				
				if(settings.slides){
					montaSlides();
					callClick();
					
				}else{
					widthBanner =  thebanner.width();
								
					thebanner.find(".thebanner-mask ul li").css("height", thebanner.height());
					thebanner.find(".thebanner-mask ul li").css("width", widthBanner);
					thebanner.find(".the-banner").css("width", widthBanner*arrList.length);
					
					
					if(settings.effect == "default"){
						isResizing = true;
						controlClick(bannerAtual);
					}else{
						thebanner.find(".the-banner").stop().animate({left: -widthBanner}, 0)
	
					}
				}
				
				marginRightControl = Number(thebanner.find(">.the-banner-controls ul li a").css("margin-right").replace("px", ""));
				thebanner.find(">.the-banner-controls").css("margin-left", -thebanner.find("> .the-banner-controls").width()/2);
				
			}
			/* end: Resize Banner */
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			function linkBanner(){
				if(isDrag){
					
				}else if($(this).attr("data-link")){
					//alert("a");
					if($(this).attr("data-target")){
						
						if($(this).attr("data-target") == "_blank"){
							window.open($(this).attr("data-link"))
						}else{
							window.location = $(this).attr("data-link");
						}
						
					}else{
						window.location = $(this).attr("data-link");
					}
					
				}
			}
			
			
			
			/* Controls  ***************************/
				/* Align Controls */
				marginRightControl = Number(thebanner.find(">.the-banner-controls ul li a").css("margin-right").replace("px", ""));
				
				// Define a largura dos controles
				//thebanner.find(">.the-banner-controls").css("width", totalNumbersBanners * (thebanner.find(".the-banner-controls ul li a").width() + marginRightControl));
				
				// Centraliza itens
				thebanner.find(">.the-banner-controls").css("margin-left", -thebanner.find("> .the-banner-controls").width()/2);
				
				var controlAtual = thebanner.find("> .the-banner-controls ul li a:first");
				controlAtual.addClass("active");
				
				
				thebanner.css("visibility", "visible");	
					
				callClick();	
					
				//Call Click
				function callClick(){
					thebanner.find("> .the-banner-controls ul li a").click(function(){
					
						window.clearInterval(intervalListener);
						if(settings.clickAndStop){}else{
							intervalListener = self.setInterval(function () {bannerTimer()}, settings.timer);
						}
						
						controlClick($(this).attr("data-index"), true);
					
					});
				}
			/* end: Controls  *********************/
					
			
			
			/* Arrows	 */
			
			if(settings.arrow){
				arrows();
			}
			function arrows(){
				
				thebanner.append("<div id='the-banner-left' class='the-banner-arrow'></div>");
				thebanner.append("<div id='the-banner-right' class='the-banner-arrow'></div>");
				
				thebanner.find(".the-banner-arrow").stop().animate({opacity: 0.5}, 800);
				thebanner.find(".the-banner-arrow").mouseover(function(){
					$(this).stop().animate({opacity: 1}, 200);
				})
				thebanner.find(".the-banner-arrow").mouseout(function(){
					$(this).stop().animate({opacity:  0.5}, 200);
				})
				thebanner.find(".the-banner-arrow").click(clickArrow);
			}
			
			function clickArrow(event){
				
				window.clearInterval(intervalListener);
				if(settings.clickAndStop){}else{
					intervalListener = self.setInterval(function () {bannerTimer()}, settings.timer);
				}
				
				var strLink = 0;
				
				if(settings.slides){
					var left = Number(thebanner.find(".the-banner").css("left").replace("px", ""));
					
					
				}
				
				if(-left > thebanner.find(".the-banner").width() - thebanner.width()){
					
				}else{
					if($(this).attr("id") == "the-banner-right"){
						strLink = Number(bannerAtual)+1;
						if(bannerAtual == totalNumbersBanners-1){
							strLink = 0;
						}
					}else{
						var strLink = Number(bannerAtual)-1;
						if(bannerAtual <= 0){
							strLink = totalNumbersBanners-1;
						}
					}
				}
				
				controlClick(strLink, false);
				thebanner.find(".the-banner-arrow").unbind("click");
			}
			
			/* end: Arrows */
			
			
			
				
			thebanner.find(".the-banner").css("left", 0);
				
			/* Effect  ***************************/
				function controlClick(index, timer){
					
					//alert(bannerAtual + "___novo:" + index);
					
					var n = index;
						
					if(isResizing){
						settings.speed = 0;
					}
					
						
									
					if(isDrag){
						var diferenca = 0;
						var atualPosition = thebanner.find(".the-banner").position().left;
						
						if(index < bannerAtual){
							
							if(index == 0){
								diferenca = 0;
								thebanner.find(".the-banner").stop().animate({left: diferenca}, settings.speed, drag);
							}else{
								diferenca = +(widthBanner - (widthBanner*bannerAtual));
								thebanner.find(".the-banner").animate({left: diferenca}, settings.speed, drag);
							}
						}else{
							diferenca = -(widthBanner + (widthBanner*bannerAtual));
							thebanner.find(".the-banner").animate({left: diferenca}, settings.speed, drag);
						}
						
					}else{
						switch (settings.effect) {
							// Together Effect
							case "slider":
								thebanner.find(" .thebanner-mask ul li").click(linkBanner);
								thebanner.find(".the-banner").stop().animate({marginLeft: 0}, 0);
								thebanner.find(".the-banner").html("");
								thebanner.find(".the-banner").append(arrList[bannerAtual]);
								thebanner.find(".the-banner").append(arrList[n]);
								thebanner.find(" .thebanner-mask ul li").css("width", widthBanner);
								thebanner.find(".the-banner").stop().animate({marginLeft: -widthBanner}, settings.speed, function(){
									$(".the-banner-arrow").click(clickArrow);
								});
							break
							
							
							
							case "fade":
								
								if(bannerAtual == index){
								
								}else{
									thebanner.find("> .the-banner-controls ul li a").off("click");
									
									thebanner.find(".the-banner").stop().animate({marginLeft: 0}, 0);
									thebanner.find(".the-banner").html("");
									thebanner.find(".the-banner").append(arrList[bannerAtual]);
									thebanner.find(".the-banner").append(arrList[n]);
									thebanner.find(".thebanner-mask ul li:nth-child(1)").css("position", "relative");
									thebanner.find(".thebanner-mask ul li:nth-child(2)").css("position", "absolute");
									
									thebanner.find(".thebanner-mask ul li:nth-child(2)").addClass("fadeBanner");
									thebanner.find(".thebanner-mask ul li:nth-child(2)").stop().animate({opacity:0 }, 0);
									thebanner.find(".thebanner-mask ul li:nth-child(2)").animate({opacity:1 }, settings.speed, function(){
										thebanner.find(".thebanner-mask ul li:nth-child(2)").css("position", "relative");
										thebanner.find(".thebanner-mask ul li:nth-child(1)").remove();
										callClick();
										thebanner.find(".the-banner-arrow").unbind("click");
										thebanner.find(".the-banner-arrow").click(clickArrow);
									});
									thebanner.find(".thebanner-mask ul li:nth-child(2)").html("");
									thebanner.find(".thebanner-mask ul li:nth-child(2)").append(arrListHtml[n]);
									//thebanner.find(" .thebanner-mask ul li:nth-child(2)").append($(arrList[n]).html());
									//thebanner.find(" .thebanner-mask ul li:nth-child(2)").append("<h3>"+ thebanner.find(" .thebanner-mask ul li:nth-child(2)").attr("data-title") +"</h3>");
									
									thebanner.find(".thebanner-mask ul li").css("width", widthBanner);
									thebanner.find(".thebanner-mask ul li").click(linkBanner);
								}
	
							break
							
							// Default Effect
							default:
								thebanner.find(".the-banner-arrow").unbind("click");
								var andaBanner = n * widthBanner
								thebanner.find(".the-banner").stop().animate({left: -andaBanner}, settings.speed, function(){
									thebanner.find(".the-banner-arrow").click(clickArrow);
								}); 
								
							}
						}
					
						
						controlAtual.removeClass("active");
						thebanner.find("> .the-banner-controls ul li a[data-index='"+ n +"']").addClass("active");
						controlAtual = thebanner.find("> .the-banner-controls ul li a[data-index='"+ n +"']");
						bannerAtual = index;
						
						if($(arrList[bannerAtual]).attr("data-title") !== undefined){
							thebanner.find(".thebanner-title").html("<h3>"+ arrList[bannerAtual].attr("data-title") +"</h3>");
						}
						
						isResizing = 0;
						settings.speed = speedOriginal;
						
				}
			/* end: Effect  ***************************/
			
			
			
			
			
			
			
			
			
			
			
			
			/* Draggable */
				drag();
				function drag(){
					thebanner.find(" .thebanner-mask ul li").bind('click', linkBanner);
					
					var cursorAtual;
					
					if(settings.effect == "default"){
						thebanner.find(".the-banner").draggable({
							axis:"x",
							drag:function(){
								
								
							},
							start:function(){
								window.clearInterval(intervalListener);
								initialPosition = Number(thebanner.find(".the-banner").position().left);
								isDrag = true;
								thebanner.find(" .thebanner-mask ul li").unbind('click');
								thebanner.find(" .thebanner-mask ul li").addClass("dragging");
								//thebanner.find(" .thebanner-mask ul li").css("cursor", "url(../img/framework/grabbing.png)");
								
								
								
								
							},
							stop: function(){
								thebanner.find(" .thebanner-mask ul li").removeClass("dragging");
								thebanner.find(" .thebanner-mask ul li").css("cursor", cursorAtual);
								
								var range = 0;
								var dif = widthBanner / 10;
								
								if(thebanner.find(".the-banner").position().left < initialPosition){
									range = initialPosition-dif;
									if(thebanner.find(".the-banner").position().left < range && Number(bannerAtual)+1 < arrList.length){
										controlClick(Number(bannerAtual)+1, true);
									}else{
										thebanner.find(".the-banner").stop().animate({left:initialPosition }, settings.speed, drag);
									}
									
								}else{
									range = initialPosition+dif;
									
									if(thebanner.find(".the-banner").position().left > range && Number(bannerAtual)-1 >= 0){
										
										controlClick(Number(bannerAtual)-1, true);
									}else{
										thebanner.find(".the-banner").stop().animate({left:initialPosition }, settings.speed, drag);
									}
								}
	
								thebanner.find(".the-banner").draggable("destroy");
								isDrag = false;
							
							}
						});
					}
				}
			/* */
			
			
			
			
			
			
			
			
			
			
			
			
			
			/* Timer  ***************************/
			var isTimerOn = true;
			function bannerTimer(){
				var strLink = Number(bannerAtual)+1;
				if(bannerAtual == totalNumbersBanners-1){
					strLink = 0;
				}
				
				controlClick(strLink, false);
			}
			/* end: Timer  ***************************/
			
			
			
			
			
			
			
			
			
	/* end: Core */	
			
			
			
			
			
	
	
			
			return this; 
		};
		$.fn.thebanner.defaults = defaults; 
	
	})(jQuery); 
/** end Component: The Banner **/












/** Component: The Box **/
	(function($) { 
	
		var defaults = {
		   timer : 400,
		   type: "image",
		   showButtons: false,
		   bgOpacity: 0.6,
		   zoom100pct: false,
		   speed: 500,
		   animate: false,
		   
		   /*** Call Backs ***/
		   afterClose: function(){}
		   
		};
	
		$.fn.thebox = function(options) { 
			var settings = $.extend({}, defaults, options); 
			this.each(function() { 
			   var currentElement = $(this);
			});
			
			
			
			/* Reset 9999 index **/
			$('*').each(function(){
				if($(this).css("z-index") == 9999){
					//alert($(this).zIndex());
					$(this).css("z-index") == 9900;
				}
			});		
			
			
			
			
			$(this).click(function(event){
				var scrollAtual = $(window).scrollTop();
				var hrefAtual = $(this).attr("href");
				var This = $(this);
				var paddingContent = 0;
				
				event.preventDefault();
				scrollAtual = $(window).scrollTop();
				
				
				/* Inicialize Methods **/
				 init();
				 types();
				 closeButton();
				
				
				function init(){
					/* Add BG **/
					$('body').append('<div class="thebox-bg"></div>');
					$('.thebox-bg').stop().animate({opacity: 0}, 0);
					$('.thebox-bg').css("height", $(document).height());
					$('.thebox-bg').css("width", $(document).width());
					$('.thebox-bg').stop().animate({opacity: settings.bgOpacity}, settings.timer);
					
					
					/* Add Content **/
					$('body').append('<div class="thebox-content"><div class="relative"><div id="thebox-close">X</div></div></div>');
					$('.thebox-content').stop().animate({opacity: 0}, 0);
					

				}
				
				
				
				
				
				
				/* Identify Types **/
				function types(){
									
					var arrBox = new Array();
					var isRight;
					var imageAtual = 0;
					var padding = Number($('.thebox-content').css('padding').replace('px', ''));
					
					
									
					switch(settings.type){
						
						case "inline":
							var div = $("#"+This.attr("href"));
							var classPop = $("#"+This.attr("href")).attr('class');
							var iframeWidth;
							var iframeHeight;
							
							if(This.attr('data-iframe-width')){
								iframeWidth = This.attr('data-iframe-width');
							}else{
								iframeWidth = "100%"
							}
							
							if(This.attr('data-iframe-height')){
								iframeHeight = This.attr('data-iframe-height');
							}else{
								iframeHeight = "100%"
							}
							
							$('.thebox-content').addClass(classPop);
							$(".thebox-content").append(div.html());
							
							$('.thebox-content').css('width', div.width() + padding * 2);
							$('.thebox-content').css('height', div.height() + padding * 2);
							
							if(This.attr('data-iframe')){
								$(".thebox-content").append("<iframe frameborder='0' src='"+ This.attr('data-iframe') +"' name='' width='" + iframeWidth + "' height='" + iframeHeight + "'></iframe>")
							}
							
							$(".thebox-content").css("top", scrollAtual + $(window).height()/2);
							$(".thebox-content").css("left", "50%");
							$(".thebox-content").css("margin-left", -($('.thebox-content').width() + (padding*2)) /2);
							$(".thebox-content").css("margin-top", -($('.thebox-content').height()+ (padding*2)) /2);
						break
						
						
						default:
							$(".thebox-content").addClass("thebox-loader");
							$(".thebox-content").css("top", scrollAtual + $(window).height()  /2);
							$(".thebox-content").css("left", "50%");
							$(".thebox-content").css("margin-left", ($(".thebox-content").width()+ (padding*2)) /2);
							$(".thebox-content").css("margin-top", ($(".thebox-content").height() + (padding*2)) /2);
							
							$(".thebox-content").append("<img src='"  + This.attr("href")+ "' style='display:none;'/>");
							
							
							
							
							/* is a Grop Images *******/
							if(This.attr("data-group")){
								
								
								
								
								/* Include controls */
								$(".thebox-content").append("<div id='thebox-controls'><div id='thebox-control-left' class='thebox-control'><</div><div id='thebox-control-right' class='thebox-control'>></div></div>");
								
								
								
								/* Feed Array **/
								$("a[data-group='"+ This.attr("data-group") +"']").each(function(index){
									arrBox.push($(this).attr("href"));
									$(this).attr("data-index", index);
								});
								imageAtual = This.attr("data-index");
								
								
								$(".thebox-content").css("cursor", "pointer");
								$(".thebox-content").mousemove(function(e){
									if(e.pageX > $(document).width()/2){
										$("#thebox-control-right").css("display", "block");
										$("#thebox-control-left").css("display", "none");
										isRight = true;
									}else{
										$("#thebox-control-right").css("display", "none");
										$("#thebox-control-left").css("display", "block");
										isRight = false;
									}
								});
								$(".thebox-content").mouseleave(function(e){
									$("#thebox-control-right").css("display", "none");
									$("#thebox-control-left").css("display", "none");
								});
								
								$(".thebox-content").click(function(){
									nextImage();								
								});
								
								function nextImage(){
									
									$(".thebox-content").addClass("thebox-loader");
									if(isRight){
										if(imageAtual >= arrBox.length-1){
											imageAtual = 0;
										}else{
											imageAtual++;
										}
										
									}else{
										if(imageAtual > 0 && imageAtual <= arrBox.length){
											imageAtual--;
											
										}else{
											imageAtual = arrBox.length-1;
										}
									}
									$(".thebox-content img").animate({opacity: 0}, settings.speed, function(){
										$(".thebox-content img").attr("src", arrBox[imageAtual]);
									});
									
									$(this).css("visibility", "hidden");
									
									
								
								}
								
								
								/** Keypress **/
								function key(){
									$(document).keydown(function(e){
										// alert(e.keyCode);
										  
										  if(e.keyCode == 37) { // left
											isRight = false;
										  }
										  else if(e.keyCode == 39) { // right
											isRight = true;
										  }	
										  nextImage();	
										  		
									});	
								}
								key();
								
								
								
								
							}
							/* end: Is a Group Images *******/
	
							
							
							/* Resize */
								$(window).resize(function(){
									$(".thebox-content img").css("width", "");
									$(".thebox-content img").css("height", "");
									
									if($(".thebox-content img").width() >= $(window).width() - 200){
										$(".thebox-content img").css("width",$(window).width() - 200);
										$(".thebox-content img").css("height","auto");
									}
									if($(".thebox-content img").width() >= $(window).height() - 200){
										$(".thebox-content img").css("height",$(window).height() - 200);
									}
									
									$(".thebox-content img").css("height","auto");
									$(".thebox-content").css("top",  scrollAtual + $(window).height()/2);
									$(".thebox-content").css("margin-left", -($(".thebox-content").width()/2 + Number($(".thebox-content").css("padding-left").replace("px", ""))));
									$(".thebox-content").css("margin-top", -$(".thebox-content").height()/2);
									$(".thebox-content #thebox-control-left").css("left", 10);
									$(".thebox-content #thebox-control-left").css("top", -($(".thebox-content").height()/2 + $(".thebox-content #thebox-control-left").height()));
									$(".thebox-content #thebox-control-right").css("top", -($(".thebox-content").height()/2 + $(".thebox-content #thebox-control-right").height()));
									$(".thebox-content #thebox-control-right").css("right", 10);
									$(".thebox-bg").css("width", $(window).width());
									
								});
							/* end: Resize */							
							
							
							$(".thebox-content img").load(function(){
								
								$(".thebox-content img").css("display", "block");
								$(".thebox-content img").animate({opacity: 1}, settings.speed);
								
								if(settings.zoom100pct){
									$(".thebox-content img").css("width", "");
									$(".thebox-content img").css("height", "");
									
									if($(".thebox-content img").width() >= $(window).width() - 200){
										$(".thebox-content img").css("width",$(window).width() - 200);
										$(".thebox-content img").css("height","auto");
									}
								}
								
								
								$(".thebox-content").css("top",  scrollAtual + $(window).height()/2);	
								$(".thebox-content").removeClass("thebox-loader");
								
								if(settings.showButtons){
									$(".thebox-control").css("display", "block");
								}else{}
								$("#thebox-control-right").css("display", "none");
								$("#thebox-control-left").css("display", "none");
							
								$(".thebox-content").css("margin-left", -($(".thebox-content").width() + (padding*2)) /2);
								$(".thebox-content").css("margin-top", -($(".thebox-content").height() + (padding*2))/2);
						
						
								$(".thebox-content #thebox-control-left").css("left", 10);
								$(".thebox-content #thebox-control-left").css("top", -($(".thebox-content").height()/2 + $(".thebox-content #thebox-control-left").height()));
								$(".thebox-content #thebox-control-right").css("top", -($(".thebox-content").height()/2 + $(".thebox-content #thebox-control-right").height()));
								$(".thebox-content #thebox-control-right").css("right", 10);
								
								$(this).css("visibility", "visible");
								
	
							});
						}
				}
				
				
				
				
				
				/*  Close Button **/
				function closeButton(){
					paddingContent = Number($('.thebox-content').css("padding").replace('px', '')) + 5;
					$('#thebox-close').css("top", -paddingContent);
					$('#thebox-close').css("right", -paddingContent);
					
					$('#thebox-close').click(function(){
						 remove();
					});
					
					$('.thebox-bg').click(function(){
						 remove();
					});
				}
				
				
				
				function remove(){
					$(".thebox-content").unbind('click');
					
					$('.thebox-bg').stop().animate({opacity: 0}, settings.timer);
					$('.thebox-content').stop().animate({opacity: 0}, settings.timer, function(){
					
						$('.thebox-bg').remove();
						$('.thebox-content').remove();
														
					});
					
					settings.afterClose();
	
				}
				
				
				
				
				
				/* Effects **/
				$('.thebox-content').stop().animate({opacity: 1}, settings.timer);
			
				
				
				
	
				
				
			
			
			
			});
			
				
			
			return this; 
		};
		$.fn.thebox.defaults = defaults; 
	
	})(jQuery); 
/** end Component: The Box **/













/** Component: Accordion **/
	(function($) { 
	
		var defaults = {
		   firstOn : false,
		   closeOthers:true,
		   speed: "fast"
		};
	
		$.fn.theaccordion = function(options) { 
			var arrList = new Array();
			var itemAtual;
			var This = $(this);
			
			var settings = $.extend({}, defaults, options); 
			
			
			this.each(function() { 
	
			   var currentElement = $(this);
	
			});
			
			$(this).find('div').css("display", "none");
			if(settings.firstOn){
				$(this).find('div').first().css("display", "block");
			}
			
			
			
			$(this).find('h2').each(function(index, element) {
				$(this).attr("data-index", index);			
				$(this).css("cursor", "pointer");		
				arrList.push(this);
				
				if(index == 0){
					itemAtual = $(this);
				}
			});
			
			
			
			
			$(this).find('h2').click(function(){
				var indexH2 = $(this).attr('data-index');
				itemAtual.removeClass("active");	
				$(this).addClass("active");		
				
				
				This.find('div').each(function(index, element) {
					if(index == indexH2){
						$(this).stop().slideToggle(settings.speed);
					}
				});
	
				var indexAntigo =$(itemAtual).attr('data-index');
				
				if(indexAntigo != indexH2){
					if(settings.closeOthers){
						if(This.find('div:eq('+indexAntigo+')').css("display") == "block"){
							This.find('div:eq('+indexAntigo+')').slideToggle(settings.speed);
						}
					}
				}
				
				itemAtual = $(this);
				
			});
			
			
			

			
			return this; 
		};
		$.fn.theaccordion.defaults = defaults; 
	
	})(jQuery); 
/** end: Component: Accordion **/













/** Component: Menu-left **/
	var toogleMenuLeft = false;
	
	function menuLeft(){
		
		var menuWidth = $("#menu-left").width();
		
		$("#menu-left").css("height",  $(document).height());
		
		$(window).resize(function(){
			$("#menu-left").css("height",  $(document).height());
		});
		
	
		if(!toogleMenuLeft){
			$('#menu-left').stop().animate({left: '0'}, 1000, function() {
				// Animation complete.
			});
			$('#base').stop().animate({marginLeft: menuWidth}, 1000, function() {
				// Animation complete.
				$(this).trigger('resized');
			});
			toogleMenuLeft = true; 
		}else{
			$('#menu-left').stop().animate({left: -menuWidth}, 1000, function() {
				// Animation complete.
			});
			$('#base').stop().animate({marginLeft: '0'}, 1000, function() {
				// Animation complete.
				
				$(this).trigger('resized');
				
			});
	
			toogleMenuLeft = false; 
			
		}
		
	}
/** end Component: Menu-left **/













/** Component: Menu + Submenu **/
/*function menuSub(totalLevel){
		if(typeof(totalLevel)==='undefined') totalLevel = 3;
		
		var n=1;
		var stMenu = ".level";
		var stMenu2 = "";
		var topStartMenu = 0;
		
		for(n; n <= totalLevel; n++){
						
			 stMenu2 += stMenu+n+">";
			$(stMenu+n).mouseover({param1: n, param2: stMenu+n}, fOver);
			$(stMenu+n).mouseleave({param1: n, param2: stMenu+n}, fOut);
			
		}
		
		function fOver(event){
			
			topStartMenu = $(this).height();
			leftMenu = $(this).width();
			
			var menuAbrir = event.data.param2 + " > .menu-submenu";
			
			if(event.data.param1 == 1){
				$(menuAbrir).css("top", topStartMenu);
			}else{
				$(menuAbrir).css("left", $(this).width());
			}
							
			$(this).find("> .menu-submenu").css("display", "block");
		}
		
		function fOut(event){
			
			$(this).find("> .menu-submenu").css("display", "none");
			
		}
}*/
/** end: Component: Menu + Submenu **/









/*Component: Menu Responsive **/
(function($) { 

    var defaults = {
       minWidth: 500,
	   time: 1000,
	   base: "#base",
	   responsive: true,
	   labelButtonMenu: "",
	   htmlMiniBar: "",
	   totalLevel: 3
    };

    $.fn.themenu = function(options) { 

        var settings = $.extend({}, defaults, options); 
		var estruturaMenu = $(this).html();
		var This = $(this);
		var toogleMenu = true;
		var isResponsive = true;
		
        this.each(function() { 
           var currentElement = $(this);
        });
		
		
		if(settings.responsive){
			createMenu();
			responsiveMenu();
			$(window).resize(function(){
				responsiveMenu();
			});
			
			function responsiveMenu(){
				
				$('.the-menu-responsive').css('minHeight', $(window).height());
				
				if($(window).width() < settings.minWidth){
					
					if(!toogleMenu){
					
					}else{
						This.html("<div class='the-menu-minibar'><a class='the-menu-ico btn'>"+ settings.labelButtonMenu +"</a>"+settings.htmlMiniBar+"</div>");
					}
					
					
					$('.the-menu-minibar .the-menu-ico').click(function(){
							
						if(toogleMenu){
							$(settings.base).css('width', $(settings.base).width());
							
							$(settings.base).stop().animate({marginLeft: $('.the-menu-responsive').width()}, settings.time);
							$('.the-menu-minibar').stop().animate({left: $('.the-menu-responsive').width()}, settings.time, function(){
								$(settings.base).css('width', '100%');
							});
							$('.the-menu-responsive').stop().animate({left: 0}, settings.time);
							$('.the-menu-responsive').css("display", "block");
							toogleMenu = false;
						}else{
							$(settings.base).stop().animate({marginLeft: 0}, settings.time);
							$('.the-menu-minibar').stop().animate({left: 0}, settings.time);
							$('.the-menu-responsive').stop().animate({left: -$('.the-menu-responsive').width()}, settings.time, function(){
								$(settings.base).css('width', '100%');
							});
							toogleMenu = true;
						}
					});
					
				}else{
					This.html(estruturaMenu);
					$('.the-menu-responsive').css('left', -$('.the-menu-responsive').width());
					$(settings.base).css('margin-left', 0);
					toogleMenu = true;
					$('body').css('overflow-x', '');
					addOver();
				}
				
			}
			
			
			function createMenu(){
				$('body').prepend("<div class='the-menu-responsive'></div>");
				$('.the-menu-responsive').html(estruturaMenu);
				$('.the-menu-responsive ul').css('display', 'block');
				$('.the-menu-responsive li').css('display', 'block');
				
				$('.the-menu-responsive ul').each(function(){
					if($(this).hasClass('menu-submenu')){
						$(this).removeClass('menu-submenu');
						$(this).addClass('sub-resp');
					}
				});
				
				$('.the-menu-responsive ul').removeClass('menu');
				
				$('body').css('overflow-x', 'hidden');
				
			}
		}
		
		/** Sub Menu **************/
			var n=1;
			var stMenu = ".level";
			var stMenu2 = "";
			var topStartMenu = 0;
			
			addOver();
			function addOver(){
				n=1;
				
				for(n; n <= settings.totalLevel; n++){
								
					stMenu2 += stMenu+n+">";
					$(stMenu+n).mouseover({param1: n, param2: stMenu+n}, fOver);
					$(stMenu+n).mouseleave({param1: n, param2: stMenu+n}, fOut);
					
				}
				
			}
			
			function fOver(event){
				
				topStartMenu = $(this).height();
				leftMenu = $(this).width();
				
				var menuAbrir = event.data.param2 + " > .menu-submenu";
				
				if(event.data.param1 == 1){
					$(menuAbrir).css("top", topStartMenu);
				}else{
					$(menuAbrir).css("left", $(this).width());
				}
								
				$(this).find("> .menu-submenu").css("display", "block");
			}
			
			function fOut(event){
				
				$(this).find("> .menu-submenu").css("display", "none");
				
			}
		/** end: Sub Menu **************/
		
		
		
		
		
		
        return this; 
    };
    $.fn.themenu.defaults = defaults; 

})(jQuery); 
/*Component: Menu Responsive **/



















/** Component: Tabs **/
function menuTabs(){
	var arrTabs = new Array();
	var arrContents = new Array();
	var tabAtual;
	var atual;
	
	$(".menu-tab li a").each(function(index, element) {
		$(this).attr("data-tab", index);
		arrTabs.push(this);
    });
	
	$(".menu-tab-options > li").each(function(index, element) {
		arrContents.push(this);
    });
	
	/* Init Tab on */
	$(arrContents[0]).css("display", "block");
	atual = $(arrContents[0]);
	tabAtual = arrTabs[0];


	/* Click Tab Open Content */
	$(".menu-tab li a").click(function(){
		$(atual).css("display", "none");
		$(tabAtual).removeClass("active");
		
		atual = arrContents[$(this).attr("data-tab")];
		tabAtual = this;
		
		$(atual).css("display", "block");
		$(tabAtual).addClass("active"); 
		
	});
}
/** Component: Tabs **/














/** Component: Masks **/
function masksForms(){
	/* Mascara telefone */
	// jQuery Masked Input
		$('textarea').html('');
	
		$('.maskTel').mask("(99) 9999-9999?9").ready(function(event) {
			var target, phone, element;
			target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			phone = target.value.replace(/\D/g, '');
			element = $(target);
			element.unmask();
			if(phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");  
			}
		});
		 

		$('.maskTel').focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');
			if(phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");
			}
		}).trigger('focusout');

		$('.cep').mask("99999-999");
		$('.cpf').mask("999.999.999-99");
		$('.cnpj').mask("99.999.999/9999-99");
		$(".maskDate").mask("99/99/9999");
		
		
		$( ".maskDate" ).datepicker({
			dateFormat: 'dd/mm/yy',
			dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
			dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
			dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
			monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
			nextText: 'Próximo',
			prevText: 'Anterior'
		});
}
/** end: Component: Masks **/













/** Component: Scroll Fixed **/
function scrollFixed(id){

	//alert($("#menu-inside").scroll());
	$(window).scroll(function(index){
	
		var scrollAtual = $(window).scrollTop();
		
		$(id).stop().css("top", scrollAtual);
		
		
	});
}
/** end: Component: Scroll Fixed **/















/** Component: The Load **/
(function($) { 

    var defaults = {
       baseSite : "#base-all",
	   mainLoad: true
    };
	

    $.fn.theload = function(options) { 

        var settings = $.extend({}, defaults, options); 

        this.each(function() {
           var currentElement = $(this);
        });
		
		$(settings.baseSite).css("visibility", "hidden");
		$(settings.baseSite).animate({opacity: 0}, 0);
		
		if(settings.mainLoad){
			$("#theload-bg").css("height", $(document).height());
			$("#theload-bg img").css("position", "absolute");
			$("#theload-bg img").css("left", "50%");
			$("#theload-bg img").css("top",  $(window).height()/2);
			$("#theload-bg img").css("display", "block");
		}
		
		
		
		$(window).load(function() {
			$("#theload-bg").stop().animate({opacity: 0}, 1000, function(){
				$(this).css("display", "none");
				$("body").remove("#theload-bg");
			})
			
			$(settings.baseSite).css("visibility", "visible");
			$(settings.baseSite).animate({opacity: 1}, 500, function(){
			})
			
			
			
		})		
		
		
		
		
        return this; 
    };
    $.fn.theload.defaults = defaults; 

})(jQuery); 
/** end Component: The Load **/













/** Responsive Table */
(function($) { 

    var defaults = {
       minWidth : 700
    };

    $.fn.thetable = function(options) { 

       var settings = $.extend({}, defaults, options); 
	   var This = $(this);
       var windowWidth = $(window).width();
	   var table;
       var arrTableTd = new Array();
       var arrTableTh = new Array();
       var arrTable = new Array();
	   
	   this.each(function() { 

           var currentElement = $(this);

        });
		
		
		
		$(This).each(function(index){
			arrTable.push($(this).html());
		});
		responsive();
		
		function responsive(){
			windowWidth = $(window).width();
			
			$(This).each(function(index){
				
				$(this).html(arrTable[index]);
				arrTableTd = new Array();
				arrTableTh = new Array();
				$(this).find("thead tr > th").each(function (index) {
					 arrTableTh.push($(this).html());
				});
				
				$(this).find("tr > td").each(function (index) {
					 arrTableTd.push($(this).html());
				});
				
				var n = 0;
				var nTh = 0;
				
				
				if(windowWidth < settings.minWidth){
					$(this).html("");	
					$(this).append("<tbody></tbody>");	
					
					
					for (n; n < arrTableTd.length; n++) {
						
						$(this).find("tbody").append("<tr><td class='thetable-th'>" +arrTableTh[nTh]+ "</th></td>");
						$(this).find("tbody").append("<tr><td class='thetable-td'>" +arrTableTd[n]+ "</th></td>");
						
						if(nTh < arrTableTh.length-1){
							nTh++;
						}else{
							nTh = 0
							$(this).find("tbody").append("<tr><td class='thetable-divide'>---</td></tr>");
						}
						
					}
				}
				
				
			});
		}

		
		
		
		
		
		
		$(window).resize(function(){
			
			responsive();
		});
		
		
		
		
        return this; 
    };
    $.fn.thetable.defaults = defaults; 

})(jQuery); 
/** end: Responsive Table **/




/*
        $(document).ready(function () {
            var arrTable = new Array();
            //var arrTd = new Array('00', '01');
            var classTable = $(".divTableless table").attr("class");

            $(".divTableless").each(function () {

                arrTable = new Array(); 

                $(this).find("table tr > td").each(function (index) {
                     arrTable.push($(this).html());
                });

                 $(this).html("<ul class=" + classTable + ">");

                 for (n = 0; n < arrTable.length; n++) {
                     $(this).append("<li class=itemLoja" + n + ">" + arrTable[n] + "</li>")
                 }

                 $(this).append("</ul>");
            });


         });

*/



















/** Padrão OOP 
(function($) { 

    var defaults = {
       option : true
    };

    $.fn.myPlugin = function(options) { 

       var settings = $.extend({}, defaults, options); 

        this.each(function() { 

           var currentElement = $(this);

        });
		
		//alert(settings.option);
		//$(this).css("display", "none");
		
		
        return this; 
    };
    $.fn.myPlugin.defaults = defaults; 

})(jQuery); 
 end: Padrão OOP **/



