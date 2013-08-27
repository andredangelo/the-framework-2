		var Browser = {
		  Version: function() {
			var version = 999; // we assume a sane browser
			if (navigator.appVersion.indexOf("MSIE") != -1)
			  // bah, IE again, lets downgrade version number
			  version = parseFloat(navigator.appVersion.split("MSIE")[1]);
			return version;
		  }
		}
		
				
		if (Browser.Version() < 9) {
			//alert("a");
			
			// Deletar a variavel para testar
			//$.jStorage.deleteKey("key");
			
			// Check if "key" exists in the storage
			var value = $.jStorage.get("key");
			//alert(value);
			
			if(value){
				//alert("ja foi a primeira vez");
			}else{
				
						
				
				$(document).ready(function(e) {
				
					$('body').append("<div id='fallback'><font class='titulo'>Sua versão de navegador é antiga, <br />e não exibirá este site corretamente.</font><br /><a class='bt' href='http://windows.microsoft.com/pt-br/internet-explorer/download-ie' target='_blank'>Atualize seu Navegador</a><a href='javascript:void(0);' id='fallContinuar' >Desejo visualizar este site mesmo assim</a><br /><br /><p>Atualizando o seu navegador Internet Explorer, você terá uma versão mais segura e conseguirá visualizar qualquer tipo de site.</p></div>");
					
					
					
					$('#base').stop().animate({ opacity: '0'}, 2000, function(){
						
						$('body').css('background', '#efefef');
						$('#base').css('display', 'none');
						
						$('#fallback').css('display', 'block');
						$('#fallback').stop().animate({ opacity: '0'}, 0);
						$('#fallback').stop().animate({ opacity: '1'}, 2000);
						$('#fallback a').stop().animate({ opacity: '1'}, 0);
						
					});
					
					
					$('#fallContinuar').click(function(){
					
						//alert("a");
						$('#fallback').css('display', 'none');
						$('body').css('background', '');
						
						$('#base').css('display', 'block');	
						$('#base').stop().animate({ opacity: '0'}, 0);
						$('#base').stop().animate({ opacity: '1'}, 2000);
							
						/**
						 * Guarda/salva um valor dentro 
						 * do ITEM em questão
						 */
						$.jStorage.set("key",true);
						 
						/**
						 * Traz/ler as informações do ITEM 
						 * em questão
						 */
									
						
						
						});
					
					
				});
			}
		  	
		}		
