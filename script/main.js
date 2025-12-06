// script/main.js
//page author: Thales Marques Ferrari de Almeida

//Source: https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages
//When page finish loading, fetch the html file 
$(function() {
	//load the navigation.html into the place holder
	$("#nav-placeholder").load("/navigation.html", function() {
		//This function runs after the navbar was inserted 
		navbarScrollEffect();
	});
	//load the footer.html
	$("#footer-placeholder").load("/footer.html");
});


// Navbar scrolling behaviour
function navbarScrollEffect (){
	const navEl = document.querySelector(".navbar");
	if (!navEl) return; // Safety check

	window.addEventListener("scroll", function(){ //Adds an event listener that checks how many pixels the user scrolled down 
		if (window.scrollY >= 56){ //When user scroll more than 56px js adds the class called "navbar-scrolled that adds the background color to the navbar"
			navEl.classList.add("navbar-scrolled");
		}else if(window.scrollY < 56){ //if user scroll up again removes the class that adds the background color. 
			navEl.classList.remove("navbar-scrolled");
		}
	});
};