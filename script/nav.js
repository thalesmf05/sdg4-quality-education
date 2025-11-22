// script/nav.js
//Navbar author: Thales 
//Js for loading the page author: Thales Ferrari

//Source: https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages
//When page finish loading, fetch the html file 
$(function(){
	//load the navigation.html into the place holder
	$("#nav-placeholder").load("navigation.html", function(){
		
		//This navbar effect runs after hte navbar HTML was inserted
		const navEl = document.querySelector(".navbar");

		window.addEventListener("scroll", function(){
			if (window.scrollY >= 56){
				navEl.classList.add("navbar-scrolled")
			}else if(window.scrollY < 56){
				navEl.classList.remove("navbar-scrolled");
			}
		});
	});
});	