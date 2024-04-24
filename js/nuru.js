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
    // document.getElementById('pageContainer').style.filter = 'blur(4px)';

    emailjs.send("service_78hj2ag", "template_oj770an", {
        firstName: firstName,
        sum: sum
    })
    .then(function(response) {
        console.log("Email sent successfully", response);
        document.getElementById('loader').style.display = 'none';
        // document.getElementById('pageContainer').style.filter = 'none';
        // Display the sum
        resPage.textContent = `Hey ${firstName}, ${res} ${sum}. Ni rahisi finya Mpesa till number ni 4286772`;
        divRes.style.display = 'inline';
    }, function(error) {
        console.log("Error updating", error);
    }) .catch(function(error) {
        console.log("Error updating", error);
        document.getElementById('loader').style.display = 'none';
        // // Remove blur effect
        // document.getElementById('pageContainer').style.filter = 'none';
    });

    //     resPage.textContent = `Hey ${firstName}, ${res} ${sum}. Ni rahisi finya Mpesa till number ni 4286772`;

    // divRes.style.display = 'inline';
    // console.log('Form submitted'); 
});

exitButton.addEventListener('click', function() {
    window.close();
});