;(function($){

	/**
	* @author Sebastian Romero
	* Maachi 2014
	***/
	var Maachi = function(){

		var navigationButtons = $(".site .nav a"),
			siteContainer = $("#site"),
			sections = $(".section");

		/** Navigation event **/
		var onNavigationButton = function(event){
			event.preventDefault();
			var action = this.href.split("/")[this.href.split("/").length - 1];
			loadSection(action);
			history.pushState(action, event.target.textContent, event.target.href);
		};


		var onCloseSection = function(event){
			event.preventDefault();
			loadSection(null);
			history.pushState("/", event.target.textContent, event.target.href);
		};


		var loadSection = function(section){
			navigationButtons.removeClass("selected");
			sections.removeClass("show");
			navigationButtons.parent().find('a[href$="'+section+'"]').addClass("selected");
			siteContainer.addClass("open");
			if(!section){
				siteContainer.removeClass("open");
			} else {
				var sectionElement = $("#"+section);
				if(sectionElement.size()>0){
					sectionElement.addClass("show");
				} else {
					siteContainer.removeClass("open");
				}
			}
		};


		var onWindowPopState = function(event){
			loadSection(event.originalEvent.state);
		};

		/** Adds the event to the site **/
		var addEvents = function(){
			navigationButtons.on("click", onNavigationButton);
			$(window).on("popstate", onWindowPopState);
			$(".close").on("click", onCloseSection);
		};

		/**
		* @constructor
		**/
		(function(){
			addEvents();
			loadSection(window.location.href.split("/")[window.location.href.split("/").length - 1]);
		}());


		return {

		};

	}();
}(jQuery));