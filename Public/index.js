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


window.addEventListener('scroll',reveal);
  function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0;i<reveals.length;i++){
      var windowheight = window.innerHeight;
      var revealtop = reveals[i].getBoundingClientRect().top;
      var revealpoint = 150;

      if(revealtop <windowheight - revealpoint){
        reveals[i].classList.add('activ');
      }
      else{
        reveals[i].classList.remove('activ');
      }
    }
  }

  window.addEventListener('scroll',rvl);
  function rvl(){
    var reveals = document.querySelectorAll('.rvl');
    for (var i = 0;i<reveals.length;i++){
      var windowheight = window.innerHeight;
      var revealtop = reveals[i].getBoundingClientRect().top;
      var revealpoint = 150;

      if(revealtop <windowheight - revealpoint){
        reveals[i].classList.add('act');
      }
      else{
        reveals[i].classList.remove('act');
      }
    }
  }