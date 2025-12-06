//  =========================================================================
// 		Student: Matheus Borges Mota Reis 
//
// 		Pages owned: 
// 		- index.html (Home)
// 		- resources.html (Resources) 
//
//		Purpose:
//		- Show a floating "Back to top" button after the user scrools down the page.
//		- Smmothly scrool back to the top when clicked.
//  =========================================================================

document.addEventListener('DOMContentLoaded', () => {
	const backToTopBtn = document.querySelector('.mt-back-to-top');
	if (!backToTopBtn) return;

	// Toggle visibility on scroll
	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			backToTopBtn.classList.add('show');
		} else {
			backToTopBtn.classList.remove('show');
		}
	});

	// Smooth scroll to top on click
	backToTopBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	});
});