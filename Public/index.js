// const { response } = require("express");

// const { response } = require("express");

function redirectToEvent(event_name) {
  // Construct the URL with the variable value
  var url = '/events?variable=' + encodeURIComponent(event_name);

  // Redirect to the URL
  window.location.href = url;
}

const menuIcon = document.getElementById("menu-icon");
const dropdown = document.getElementById("dropdown");

menuIcon.addEventListener("click", () => {
  dropdown.style.display = (dropdown.style.display === "flex") ? "none" : "flex";
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideDropdown = dropdown.contains(event.target);
  const isClickOnMenuIcon = menuIcon.contains(event.target);

  if (!isClickInsideDropdown && !isClickOnMenuIcon) {
    dropdown.style.display = "none";
  }
});

// Close dropdown when mobile view is maximized
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) { // Adjust the threshold as needed
    dropdown.style.display = "none";
  }
});


window.addEventListener('scroll', reveal);
function reveal() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('activ');
    }
    else {
      reveals[i].classList.remove('activ');
    }
  }
}

window.addEventListener('scroll', rvl);
function rvl() {
  var reveals = document.querySelectorAll('.rvl');
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('act');
    }
    else {
      reveals[i].classList.remove('act');
    }
  }
}



//dropdown in the profile icon
// Get references to the dropdown toggle link and the dropdown menu
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

// Add click event listener to the dropdown toggle link
dropdownToggle.addEventListener('click', function (event) {
  // Prevent the default behavior of the anchor tag (e.g., navigating to a URL)
  event.preventDefault();
  // console.log('Dropdown toggle clicked');
  // Toggle the ' active' class on the dropdown menu to show/hide it
  dropdownMenu.classList.toggle('active');
});



function handleLogout() {
  console.log("hit")
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      alert("Error Logging you out")
    }
    else {
      window.location.href = "/login"
    }
  })

}


async function handleUser() {

  let user = null;
  await fetch('/getUserEmail')
    .then(
      response => response.json())
    .then(async data => {
      if (data.data != "No user in session") {
        user = data.data;
      }
    }
    )
  console.log("user", user)

  var element = document.getElementById("dropdown-toggle")
  if (user) {
    element.removeAttribute('hidden')
  }

}

async function handleHomepageRegister() {
  console.log("hit")
  await fetch("/getUserEmail").then(response => response.json())
    .then(async data => {
      if (data.data == "No user in session") {
        window.location.href = "/login"

      }
      else {
        window.location.href = "#eventpage"
      }
    })
}