/*
 * ----------------------------- FRAMEWORK -------------------------------------
	Developer: André dos Santos D´Angelo
	01/07/2013
	
 */
 

(function($) { 

    var defaults = {
       opcao : "opcao default"
    };

    $.fn.testeOOP = function(options) { 

       var settings = $.extend({}, defaults, options); 
	   

        this.each(function() { 
           var currentElement = $(this);
        });
		
		alert("init!")
		
        return this; 
    };
    $.fn.testeOOP.defaults = defaults; 

})(jQuery); 







