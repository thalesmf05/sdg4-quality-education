//  =========================================================================
// 		Student: Matheus Borges Mota Reis 
//
// 		Pages owned: 
// 		- index.html (Home)
// 		- resources.html (Resources) 
//
//		Purpose:
//
//		- Enhace the hero section with a spinning SDG wheel
//		- Layout inspired by the Global Goals homepage
//			https://globalgoals.org
// 		- Core code adapted and simplified from a CodePen by Felipe Mendez
//	    	https://codepen.io/felipemendez/pen/nqMaKY
//  =========================================================================

// ===========================  HOME PAGE: Wheel =========================== 
// Evenly <li> slices distributed arround the circle and colour each one.

document.addEventListener("DOMContentLoaded", setupWheelSlices);

// Home page enhancement: spinning SDG wheel
function setupWheelSlices() {
  const orbit = document.querySelector(".mt-sdg-wheel-orbit");
  if (!orbit) return; // Only run on the home page where the wheel exists.

  const slices = orbit.querySelectorAll("li");
  if (!slices.length) return;

  const total = slices.length; 				// Number of items in the wheel
  const step = 360 / total; 					// Angle between each slice

  // SDG-style colours for each slice, repeated around the wheel
  const colours = [
  	"#C5192D", // 1
  	"#4C9F38", // 2
  	"#FF3A21", // 3
  	"#26BDE2", // 4
  	"#FCC30B", // 5
  	"#A21942", // 6
  	"#DD1367", // 7
  	"#3F7E44", // 8
  ];

  // Loop through slices, set their angle and colour
  slices.forEach((slice, index) => {
    const angle = index * step;

    // Position each slice around the center and turn it into a triangle-like wedge:
    // 1) rotate = make the slices spread arround the circle
    // 2) skew = make the square become a wedge-shaped slice
    slice.style.transform = `rotate(${angle}deg) skew(50deg)`; 

    // Adding colours to each slice:
  	// 1) Take the link inside this slice
  	const link = slice.querySelector(".mt-sdg-wheel-item");
  	if (!link) return;
	
		// 2) Pick a colour based on index
		const colour = colours[index % colours.length];

		// 3) Set the radial-gradient background so the coloured part hugs te edge of the wheel
		link.style.backgroundImage = 
		`radial-gradient(circle closest-side at 50% 50%,
		transparent 58%, ${colour} 58%, ${colour} 99%, transparent 99%)`;
	 });
}

