// script/main.js
//page author: Thales Ferrari

//Source: https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages
//When page finish loading, fetch the html file 
$(function() {
	//load the navigation.html into the place holder
	$("#nav-placeholder").load("navigation.html", function() {
		//This runs after the navbar was inserted 
		navbarScrollEffect();
	});
	//load the footer.html
	$("#footer-placeholder").load("footer.html");
});


// Navbar behaviour
function navbarScrollEffect (){
	const navEl = document.querySelector(".navbar");
	if (!navEl) return; // Safety check

	window.addEventListener("scroll", function(){
		if (window.scrollY >= 56){
			navEl.classList.add("navbar-scrolled");
		}else if(window.scrollY < 56){
			navEl.classList.remove("navbar-scrolled");
		}
	});
};