function handleLogin() {
    const postData = {
        // Add your login data here, for example:
        email: document.getElementsByName('email').value,
        password: document.getElementsByName('password').value
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

window.onload = function () {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('hashchange', function () {
        window.location.hash = '';
        window.history.pushState(null, '', window.location.href);
    });
};
// JavaScript functions to populate dropdowns remain unchanged
function showDepartments() {
    var programmeSelect = document.getElementById("programme");
    var departmentDiv = document.getElementById("departmentDiv");
    var departmentSelect = document.getElementById("department");
    departmentSelect.innerHTML = "<option value=''>Select Department</option>";
    
    if (programmeSelect.value === "engineering") {
        departmentDiv.style.display = "block";
        var engineeringDepartments = [
            "Automobile Engineering",
            "Biomedical Engineering",
            "Civil Engineering",
            "Computer Science and Engineering (AI and ML)",
            "Computer Science Engineering",
            "Electrical and Electronics Engineering",
            "Electronics and Communication Engineering",
            "Instrumentation and Control Engineering",
            "Mechanical Engineering",
            "Metallurgical Engineering",
            "Production Engineering",
            "Robotics and Automation",
            "Bio Technology",
            "Fashion Technology",
            "Information Technology",
            "Textile Technology",
            "Electrical and Electronics Engineering Sandwich",
            "Mechanical Engineering Sandwich",
            "Production Engineering Sandwich"
        ];
        engineeringDepartments.forEach(function(department) {
            var option = document.createElement("option");
            option.text = department;
            option.value = department;
            departmentSelect.add(option);
        });
    } else if (programmeSelect.value === "science") {
        // Add departments for Bachelor of Science Programmes
        // You can add similar logic here for other programmes
    } else if (programmeSelect.value === "master") {
        // Add departments for Post Graduate Programmes
        // You can add similar logic here for other programmes
    } else if (programmeSelect.value === "postgradscience") {
        // Add departments for Post Graduate Programmes in Science
        // You can add similar logic here for other programmes
    } else {
        departmentDiv.style.display = "none";
        document.getElementById("yearDiv").style.display = "none";
    }
  }
  
  function showYears() {
    var departmentSelect = document.getElementById("department");
    var yearDiv = document.getElementById("yearDiv");
    var yearSelect = document.getElementById("year");
    yearSelect.innerHTML = "<option value=''>Select Year</option>";
  
    if (departmentSelect.value !== "") {
        yearDiv.style.display = "block";
        var years = ["First Year", "Second Year", "Third Year", "Fourth Year"];
        years.forEach(function(year) {
            var option = document.createElement("option");
            option.text = year;
            option.value = year;
            yearSelect.add(option);
        });
    } else {
        yearDiv.style.display = "none";
    }
  }