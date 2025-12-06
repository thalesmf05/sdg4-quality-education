//  =========================================================================
// 		Student: Matheus Borges Mota Reis 
//
// 		Pages owned: 
// 		- index.html (Home)
// 		- resources.html (Resources) 
//
//		Purpose:
//
//		- Custom client-side validation for the "Share a Resource" form.
//		- Sctructure adapted from JavaScript form tutorials and examples such as this CodePen:
//			https://codepen.io/javascriptacademy-stash/pen/oNeNMNR 
// 		- Customised for the SDG4 "Share a Resource" form and error messages with AI assistance.
//  =========================================================================

// =========================== RESOURCES: Form ===========================
// Custom validation for the "Share a Resource" form on resources.html

// Resources page enhancement: custom form validation

document.addEventListener('DOMContentLoaded', () => {

	// Find the form on the page
	const form = document.getElementById('mt-rsc-form');
	if (!form) return; 

	// Diable browser's native validation
	form.setAttribute('novalidate', 'true');

	// ----------------- Field references ----------------- 
	const resourceTitle = document.getElementById('resourceTitle');
	const resourceType = document.getElementById('resourceType');
	const resourceLink = document.getElementById('resourceLink');
	const resourceAuthor = document.getElementById('resourceAuthor');
	const resourceSummary = document.getElementById('resourceSummary');
	const resourceDescription = document.getElementById('resourceDescription');
	const resourceAgree = document.getElementById('resourceAgree');
	const resourceFile = document.getElementById('resourceFile');
	const resourceFileWrapper = document.getElementById('resourceFileWrapper');

	// Types that are mainly URL-based
	const linkTypes = ['video', 'article', 'report', 'website'];
	// Types where file upload makes special sense
	const fileFriendlyTypes = ['lesson-plan', 'toolkit'];

	// ----------------- Type / placeholder UI ----------------- 

	function updateTypeUI(){
		const typeValue = resourceType.value;

		const isLinkType = linkTypes.includes(typeValue);
		const isFileType = fileFriendlyTypes.includes(typeValue);

		// 1) Prefill the link field
		if (resourceLink && resourceLink.value.trim() === '') {
			resourceLink.value = 'https://'
		}

		// 2) Update placeholder text
		if (resourceLink) {
			if (isFileType) {
				resourceLink.placeholder = 'https://example.com (or upload a file below)';
			} else if (isLinkType) {
				resourceLink.placeholder = 'https://example.org/resource';
			} else {
				resourceLink.placeholder = 'https://example.com';
			}
		}
	}

	// React when type changes
	resourceType.addEventListener('change', updateTypeUI);

	// ----------------- Visual feedback ----------------- 

	// Clear all error messages and state on the form
	function resetErrors() {
		// Both .mt-input-control and form-check can hold errors
		const controls = form.querySelectorAll('.mt-input-control, .form-check');
		controls.forEach((control) => {
			control.classList.remove('error', 'success');
			const errorDisplay = control.querySelector('.error');
			if (errorDisplay) {
				errorDisplay.innerText = '';
			}
		});
	}

	// Mark one field or group as having an error
	const setError = (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error');

		errorDisplay.innerText = message;
		inputControl.classList.add('error');
		inputControl.classList.remove('success');
	}

	// Mark one field or group as valid (no error message)
	const setSuccess = element => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error');

		errorDisplay.innerText = '';
		inputControl.classList.add('success');
		inputControl.classList.remove('error');
	}

	// Neutral state
	const setNeutral = element => {
		const inputControl = element.closest('.mt-input-control, .form-check');
		if (!inputControl) return;

		const errorDisplay = inputControl.querySelector('.error');
		if (errorDisplay) {
			errorDisplay.innerText = '';
		}

		inputControl.classList.remove('success', 'error');
	}

	// Basic URL format check - requires https at the start
	const isValidLink = link => {
		const re = /^(https?:\/\/)[^\s]+$/i;
	    return re.test(String(link).toLowerCase());
	}

	// ------------- Main validation routine --------------- 
	// Returns true if the whole form is valid
	const validateInputs = () => {
		let isFormValid = true;

		// Trim values to avoid spaces being counted as text
		const titleValue = resourceTitle.value.trim();
		const typeValue = resourceType.value.trim();
		const linkValue = resourceLink.value.trim();
		const authorValue = resourceAuthor.value.trim();
		const summaryValue = resourceSummary.value.trim();
		const descriptionValue = resourceDescription.value.trim();
		const fileValue = resourceFile ? resourceFile.value.trim() : '';

		// const isFileType = fileFriendlyTypes.includes(typeValue);

		// Title: required
		if (titleValue === '') {
			setError(resourceTitle, 'Title is required');
			isFormValid = false;
		} else {
			setSuccess(resourceTitle);
		}

		// Type: required
		if (typeValue === ''){
			setError(resourceType, 'Please choose a resource type.');
			isFormValid = false;
		} else {
			setSuccess(resourceType);
		}

		// Link / File validation:
		// Lessons plans / toolkits: allow EITHER a valid link OR an uploaded file.
		// For all other types: require a valid link.
			if (linkValue === '' && fileValue === '') {
				// No link and no file: show errors
				setError(resourceLink, 'Provide a link or upload a file for this resource.');
				if (resourceFile) {
					setError(resourceFile, 'Provide a link or upload a file for this resource.');
				}
				isFormValid = false;
			} else {
				// If link is provided, check it	
				if (linkValue !== '') {
					if (!isValidLink(linkValue)) {
						setError(resourceLink, 'Provide a valid link address starting with https://');
						isFormValid = false;
					} else {
							setSuccess(resourceLink);
						}
					} else {
						setNeutral(resourceLink);
					}

					// File: if selected, mark success, otherwise neutral
					if (fileValue !== '') {
						if (resourceFile) setSuccess(resourceFile);
					} else if (resourceFile) {
						setNeutral(resourceFile);
					}
			}

		// Author: required
		if (authorValue === '') {
			setError(resourceAuthor, 'Author is required');
			isFormValid = false;
		} else if (authorValue.length < 2) {
			setError(resourceAuthor, 'Author / Source must be at least 2 character.');
			isFormValid = false;
		} else {
			setSuccess(resourceAuthor);
		}

		// Summary: optional, but if provided should be more than 10 characters
		if (summaryValue !== '' && summaryValue.length < 10){
			setError(resourceSummary, 'If you provide a summary, make it at least 10 charcters.');
			isFormValid = false;
		} else if (summaryValue === '') {
				setNeutral(resourceSummary);
		} else {
			setSuccess(resourceSummary);
		}

		// Description: optional, but if provided should have more details
		if (descriptionValue !== '' && descriptionValue.length < 20){
			setError(resourceDescription, 'If you describe it, add a bit more detail (20+ charcters.');
			isFormValid = false;
		} else {
			setSuccess(resourceDescription);
		}

		// Checkbox: must be ticked before submitting
		if (!resourceAgree.checked){
			setError(resourceAgree, 'You must agree before submitting.');
			isFormValid = false;
			} else {
				setSuccess(resourceAgree);
			}

		return isFormValid;
	}

	// --------------------------- Event wiring ---------------------------
	// When the user submits, run validation and only allow submit if valid
	form.addEventListener(`submit`, e => {
		const isValid = validateInputs();

		if (!isValid){
			e.preventDefault(); // Stop the form from bein sent if there are errors
		}
	});

	// When the form is reset, clear all error/success visuals
	form.addEventListener('reset', () => {
		resetErrors();
	});

	// Initialise UI 
	updateTypeUI();
});
