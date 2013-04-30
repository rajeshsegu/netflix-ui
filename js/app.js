//Application
var App = function(){};

//Helper Methods

App.Event = {
    
    START: "touchstart mousedown",
    MOVE:  "touchmove mousemove",
    END:   "touchend mouseup",
    
    supportsTouch: function(){
        return ('ontouchstart' in window);
    },
    
    preventBehavior: function(evt){
        return evt.preventDefault();
    },
    
    stopPropagation: function(evt) {
         return evt.stopPropagation();
    },

    on: function(element, eventType, handler) {
        var types = eventType.split(' ');
        for(var i=0; i<types.length; i++) {
            element.addEventListener(types[i], handler, false);
        }
    },
    
    detach: function(element, eventType, handler ) {
        var types = eventType.split(' ');
        for(var i=0; i<types.length; i++) {
            element.detachEvent(types[i], handler);
        }        
    }
              
};

App.Dom = {
    
    onLoad: function(callback){  
        return App.Event.on(window, "load", callback);        
    },
    
    byId: function(id){
        return document.getElementById(id);
    },
    
    redraw: function(element){        
        
          App.Dom.css(element, "display", "none");
          element.offsetHeight; 
          setTimeout(function() { 
              App.Dom.css(element, "display", "block"); 
          }, 10);
        
//      element.style.webkitTransform = element.style.webkitTransform;              
          
            
    },
    
    css: function(element, prop, value ){
        element.style[prop] = value;
    },
    
    addClass : function(element, elClass) {
			var currClass = element.className;
			if (!new RegExp(("(^|\\s)" + elClass + "(\\s|$)"), "i").test(currClass)) {
				element.className = currClass + ((currClass.length > 0) ? " " : "") + elClass;
			}
			return element;
    },

		// Removes class name from element
     removeClass : function(element, elClass) {
			if (elClass) {
				element.className = element.className.replace(elClass, "");
			} else {
				element.className = "";
				element.removeAttribute("class");
			}
			return element;
      },
    
    orientation : function() {
			var orientation = window.orientation;			
			switch (orientation) {				
				// If we're horizontal
				case 90: case -90:								
				orientation =  "landscape";
				break;	
				
				// If we're vertical
				default:								
				orientation = "portrait";
				break;
			}
                                                    
            document.body.parentNode.setAttribute('class', orientation);			
		},
    
        //For better position:fixed    
        setTranslateY : function(element, value) {
			element.style.webkitTransform = "translateY(" + value + "px)";
		},
    
        hideURLBar : function() {
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
        }
    
};

App.startup = function(){
    
    App.Event.on(window, "orientationchange", function(evt){
        
        App.Dom.orientation();                
        
        //TODO: Force redraw not working, width 100% not reflecting        
        //App.Dom.redraw(App.Dom.byId("container"));
    });
    
    //Initial orientation state
    App.Dom.orientation();
    
    //Specially for iPhone Safari
    App.Dom.hideURLBar();
    
    //Disable document rubberband effect
    //App.Event.on(document, App.Event.START, App.Event.preventBehavior);      
    
};
