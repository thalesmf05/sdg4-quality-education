// Form validation script]
// Authour: Thales Ferrari
//source https://youtu.be/CYlNJpltjMM?si=lw17KHzxEGv7bjvU
const form = document.getElementById('form');
const inputFirstName = document.getElementById('inputFirstName');
const inputSurname = document.getElementById('inputSurname');
const inputEmail = document.getElementById('inputEmail');
const inputPhone = document.getElementById('inputPhone');
const inputComments = document.getElementById('inputTextArea');
const contactYes = document.getElementById('contactYes');
const contactNo = document.getElementById('contactNo');
const checkboxEmail = document.getElementById('checkboxEmail');
const checkboxPhone = document.getElementById('checkboxPhone');
const contactError = document.getElementById('contactError');
const optionError = document.getElementById('optionError');

let isFormValid = true;

// Disable native validation so our custom checks always run, even when the browser
// thinks the pattern/type is invalid (e.g. phone numbers with spaces or dashes).
form.setAttribute('novalidate', true); // Disable native validation, source: https://stackoverflow.com/questions/3090369/disable-validation-of-html-form-elements

form.addEventListener('submit', event => {
    event.preventDefault();
    
    validateInputs();
});

form.addEventListener('reset', event => {
    resetErrors();
});

const resetErrors = () => {
    const inputControls = document.querySelectorAll('.input-control-t'); //select all input control divs

    inputControls.forEach(inputControl => {
        inputControl.classList.remove('error'); //remove error class from all input control divs
        inputControl.classList.remove('success'); //remove success class from all input control divs
        const errorDisplay = inputControl.querySelector('.form-error-t'); //select error message empty div
        errorDisplay.innerText = ''; //clear error message
    });
}
const setNeutral = element => {
    let inputControl;
    //for contact groups (radios and checkboxex), the element is the inputControl itself
    //for normal inputs, the wrapper is the parent div 
    if (element.id === 'contactError' || element.id === 'optionError') {
        inputControl = element; 
    } else {
        inputControl = element.parentElement; 
    }   

    inputControl.classList.remove('error'); //remove error classes from the parent div
    inputControl.classList.remove('success'); 
    const errorDisplay = inputControl.querySelector('.form-error-t'); //select the error message div

    errorDisplay.innerText = "";
}

const setError = (element, message) => { //set error message
    let inputControl;
    //follow the same logic as setNeutral function, the only difference is that this function sets the error message and error class
    if (element.id === 'contactError' || element.id === 'optionError') {
        inputControl = element; 
    } else {
        inputControl = element.parentElement; 
    }

    const errorDisplay = inputControl.querySelector('.form-error-t'); 

    errorDisplay.innerText = message;
    inputControl.classList.add('error'); 
    inputControl.classList.remove('success'); 
    isFormValid = false; //set form validity status to false
}

const setSucces = element => {
    let inputControl;
    //follow the same logic as setNeutral function, the only difference is that this function sets the success class
    if (element.id === 'contactError' || element.id === 'optionError') {
        inputControl = element; 
    } else {
        inputControl = element.parentElement; 
    }

    const errorDisplay = inputControl.querySelector('.form-error-t'); 

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
}

const isValidEmail = email => { //check if the email has the correct format
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateEmail = email => { //email validation
    if(email === ""){ //check if email is empty
        return setError(inputEmail, "Email is required");
    }else if(!isValidEmail(email)){ //calls isValidEmail function to check email format
        return setError(inputEmail, "Provide a valid email address");
    }else{
        return setSucces(inputEmail);
    }
}

const validatePhone = phone => { //phone validation
    const digitsOnly = phone.replace(/\D/g, ''); //strip everything except digits for validation

    if(digitsOnly === ""){ //check if phone is empty
        return setError(inputPhone, "Phone number is required");   
    }else if (digitsOnly.length < 7 || digitsOnly.length > 15){ //check if phone number length is valid
        return setError(inputPhone, "Phone number must be between 7 and 15 digits");
    }else{
        return setSucces(inputPhone);
    }
}


const validateInputs = () => {
    const firstNameValue = inputFirstName.value.trim();
    const surnameValue = inputSurname.value.trim();
    const emailValue = inputEmail.value.trim();
    const phoneValue = inputPhone.value.trim();
    const commentsValue = inputComments.value.trim();

    isFormValid = true; //reset form validity status

    if(firstNameValue === "" || firstNameValue.length < 2){ //check if name is empty or less than 2 characters
        setError(inputFirstName, "User name is required");
    }else{
        setSucces(inputFirstName); //set success if name is valid
    }
    
    if(surnameValue === "" || surnameValue.length < 2){ //check if surname is empty or less than 2 characters
        setError(inputSurname, "Surname is required");
    }else{
        setSucces(inputSurname); //set success if surname is valid
    }

    if (!contactYes.checked && !contactNo.checked){ //valide if users selected any contact option, if not show error 
        setError(contactError, "Please select an option");
    }else if(contactYes.checked){ //only requires email and phone if user chose (yes) to be contacted
        setNeutral(contactError);
        if(checkboxEmail.checked || checkboxPhone.checked){ //at least one contact method must be selected when users wants to be contacted
            setNeutral(optionError);
            setNeutral(contactError);
            //if email contact method is selected, validate email
            if(checkboxEmail.checked){ //validate email if email contact method is selected
                validateEmail(emailValue);
            }else{ //if email contact method is not selected, set success
                setNeutral(inputEmail);
            }
            //if phone contact method is selected, validate phone
            if(checkboxPhone.checked){//validate phone if phone contact method is selected
                validatePhone(phoneValue);
            }else{ //if phone contact method is not selected, set success
                setNeutral(inputPhone);
            }
        }else{ //tell user to select at least one contact method if contactYes is checked but no method is selected
            setError(optionError, "Please select at least one contact method");
            setError(inputEmail, ""); 
            setError(inputPhone, "");
        }
    }else{ //if user does not want to be contacted, no need to validate email and phone
        setNeutral(optionError);
        setNeutral(contactError);
        setNeutral(inputEmail);
        setNeutral(inputPhone);
    }

    if(commentsValue === ""){ //validate comments
        setError(inputComments, "Comments are required");
    }else{
        setSucces(inputComments);
    }

    if(isFormValid){ //if form is valid, submit the form (you can replace this with actual form submission logic)
        alert("Form submitted successfully!");
        form.submit();

        location.replace("index.html");
    }
};
