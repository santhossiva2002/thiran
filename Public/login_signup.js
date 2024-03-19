function handleLogin(){
    const postData = {
        // Add your login data here, for example:
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Options for the fetch request
    const options = {
        method: 'POST', // Specify the method as POST
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert data to JSON string and send in the body
    };

    fetch("/login", options) // Pass options as the second parameter
        .then(response => {
            // Check if the response is successful (status code in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            // sessionStorage.setItem("email", )
            alert("success")
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}