const nameForm = document.getElementById('nameForm');
const resPage = document.getElementById('resPage');
const divRes = document.getElementById('divres'); 
const exitButton = document.getElementById('exitButton');

nameForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to prevent page reload
   
    const firstNameInput = document.getElementById('firstName');
    const firstName = firstNameInput.value;

    if (!firstName.trim()) {
        alert('Cheza chini na uweke jina.'); 
        return; 
    }

    if (firstName.includes(' ')) {
        alert('Your only first name'); 
        firstNameInput.value = '';
        return;
    }

    let sum = 0;
    let res = 'today you are our sponsor. only Ksh '
    for (let i = 0; i < firstName.length; i++) {
        const charCode = firstName.charCodeAt(i) - 96;
        sum += charCode;
    }

    if (sum > 100) {
        sum /= 2;
        res = 'today you are our sponsor. Imagine tumedivide na 2 ikuwe only Ksh'
    }

    document.getElementById('loader').style.display = 'block';

    emailjs.send("service_78hj2ag", "template_oj770an", {
        firstName: firstName,
        Amount: sum
    })
    .then(function(response) {
        console.log("Email sent successfully", response);
        document.getElementById('loader').style.display = 'none';
    
        resPage.textContent = `Hey ${firstName}, ${res} ${sum}. Ni rahisi finya Mpesa till number ni 4286772`;
        divRes.style.display = 'inline';
    }, function(error) {
        console.log("Error updating", error);
    }) .catch(function(error) {
        console.log("Error updating", error);
        document.getElementById('loader').style.display = 'none';
    });

});


function closeWindow() {
    window.close();
}

// Add event listener to the exit button
exitButton.addEventListener('click', function() {
    window.clearTimeout(timer); // Clear the timeout if the button is clicked
    closeWindow(); // Close the window
});

// Schedule the window to close after 40 seconds
var timer = setTimeout(closeWindow, 50000);