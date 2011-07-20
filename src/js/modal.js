
/**
 * Is a centered floated window UI-Object.
 * @name Modal
 * @class Modal
 * @augments ch.Floats
 * @memberOf ch
 * @param {Configuration Object} conf Object with configuration properties
 * @returns {Chico-UI Object}
 * @see ch.Tooltip
 * @see ch.Layer
 * @example
 * // Simple modal
 * $("link").modal();
 * @example
 * // Simple configuration
 * $("link").modal({
 *     content: "Content for my modal window.",
 *     onShow: function(){
 *         // Some code here
 *     }
 * }); 
 * @example
 * // Width and height configuration
 * $("link").modal({
 *     width: "200px",
 *     height: "500"
 * });
 * @example
 * // Callbacks configuration
 * $("input").modal({
 *     onContentLoad: function() {
 *         // Do something here!
 *     },
 *     onHide: function() {
 *         // Do something here!
 *     }
 * });
 */

ch.modal = function(conf){

    /**
     * Reference to a internal component instance, saves all the information and configuration properties.
     * @private
     * @name that
     * @type {Object}
     * @memberOf ch.Modal
     */
  	var that = this;
	conf = ch.clon(conf);
	conf.closeButton = (that.type == "modal") ? true : false;
	conf.classes = "box";

	that.conf = conf;

/**
 *	Inheritance
 */

    that = ch.floats.call(that);
    that.parent = ch.clon(that);

/**
 *  Private Members
 */

    /**
     * Reference to the dimmer object, the gray background element.
     * @private
     * @name $dimmer
     * @type {jQuery Object}
     * @memberOf ch.Modal
     */
	var $dimmer = $("<div class=\"ch-dimmer\">");
	
	// Set dimmer height for IE6
	if (ch.utils.html.hasClass("ie6")) { $dimmer.height( parseInt(document.documentElement.clientHeight, 10) * 3) };
	
    /**
     * Reference to dimmer control, turn on/off the dimmer object.
     * @private
     * @name dimmer
     * @type {Object}
     * @memberOf ch.Modal
     */
	var dimmer = {
		on: function() { //TODO: posicionar el dimmer con el positioner
			$dimmer
				.css("z-index", ch.utils.zIndex += 1)
				.appendTo("body")
				.fadeIn();
		
			if (that.type == "modal") {
				$dimmer.one("click", function(event){ that.hide(event) });
			};
			
			if (!ch.features.fixed) {
			  	ch.positioner({ element: $dimmer });
			};

			if ($("html").hasClass("ie6")) {
				$("select, object").css("visibility", "hidden");
			};
		},
		off: function() {
			$dimmer.fadeOut("normal", function(){
				$dimmer.detach();

				if ($("html").hasClass("ie6")) {
					$("select, object").css("visibility", "visible");
				};
			});
		}
	};

/**
 *  Protected Members
 */ 
 
	that.$trigger = that.$element;
	
	that.show = function(event) {	
		dimmer.on();
		that.parent.show(event);		
		that.$trigger.blur();

		return that;
	};
	
	that.hide = function(event) {
		dimmer.off();		
		that.parent.hide(event);

		return that;
	};
	
/**
 *  Public Members
 */
 
    /**
     * The component's instance unique identifier.
     * @public
     * @name uid
     * @type {Number}
     * @memberOf ch.Modal
     */

    /**
     * The element reference.
     * @public
     * @name element
     * @type {HTMLElement}
     * @memberOf ch.Modal
     */

    /**
     * The component's type.
     * @public
     * @name type
     * @type {String}
     * @memberOf ch.Modal
     */

    /**
     * Set and get component's content.
     * @public
     * @name content
     * @function
     * @param {String} Static content, DOM selector or URL. If argument is empty then will return the content.
     * @memberOf ch.Modal
     * @example
	 * // Getting the modal's content
	 * modal.content();
	 * @example
	 * // Setting a new content by parameter
	 * myModal.content("New content");
	 * @example
	 * // Setting a new content by DOM
	 * myModal.content("#newContent");
	 * @example
	 * // Setting a new content by AJAX
	 * myModal.content("http://www.chico-ui.com.ar/newcontent.html");
     */

    /**
     * Returns true if the component is active.
     * @public
     * @name isActive
     * @function 
     * @returns {Boolean}
     * @memberOf ch.Modal
   	 * @example
	 * // Setting a new content by AJAX
	 * if (myModal.isActive()) {
	 *     // Do something here!
	 * };
     */
	that["public"].isActive = function(){
	   return that.active;
	}
    /**
     * Create the UI necesary, added to the DOM tree and show the modal.
     * @public
     * @name show
     * @function
     * @returns {Chico-UI Object}
     * @memberOf ch.Modal
   	 * @example
	 * // Showing modal on DOM Ready
	 * $(function(){
	 *     myModal.show();
	 * });
     */

    /**
     * Removes component from DOM tree and hide the modal.
     * @public
     * @name hide
     * @function
     * @returns {Chico-UI Object}
     * @memberOf ch.Modal
   	 * @example
	 * // Hiding modal
	 * myModal.hide();
     */

    /**
     * Positioning configuration.
     * @public
     * @name position
     * @see ch.Object.position
     * @memberOf ch.Modal
     * @example
	 * // Refreshing modal's position
	 * myModal.position("refresh");
     */

    /**
     * Sets or gets the width of the Modal element.
     * @public
     * @name width size
     * @function
     * @returns {Chico-UI Object}
     * @memberOf ch.Modal
     * @example
	 * // Setting width
	 * myModal.width("200px");
	 * // or 
	 * myModal.width(200);
     */

    /**
     * Sets or gets the height of the Modal element.
     * @public
     * @name height
     * @function
     * @returns {Chico-UI Object}
     * @memberOf ch.Modal
     * @example
	 * // Setting height size
	 * myModal.height("500px"); 
	 * // or 
	 * myModal.height(500);	    
     */
/**
 *  Default event delegation
 */	
	that.$trigger
		.css("cursor", "pointer")
		.bind("click", function(event){ that.show(event); });

	return that;
};


/**
 * Transition
 * @name Transition
 * @interface Transition
 * @augments ch.Modal
 * @memberOf ch.Modal
 * @returns {Chico-UI Object}
 */
ch.extend("modal").as("transition", function(conf) {
	conf.closeButton = false;
	conf.msg = conf.msg || conf.content || "Please wait...";
	conf.content = $("<div>")
		.addClass("loading")
		.after( $("<p>").html(conf.msg) );
	return conf;
});
