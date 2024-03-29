const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const googleFontsGif = document.querySelector("#googlefonts-gif");
const marshallGif = document.querySelector("#marshall-gif");
const churchGif = document.querySelector("#church-gif");
const lynelGif = document.querySelector("#lynel-gif");
const projects = document.querySelectorAll(".project");
const email = document.querySelector("#email");
const emailButton = document.querySelectorAll(".email-button");
const navButtons = document.querySelectorAll(".nav-links li");
const containers = document.querySelectorAll("main > div"); //get the immediate children of the main tag

let controller = new ScrollMagic.Controller();
//highlights the corresponding button of the navbar depending where the user is on the webpage
function highlightNavButtons() {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    //if at the bottom of the page (used to highlight contactme button since it is at the bottom it doesn't get highlighted from just using the code in the else block)
    navButtons[2].classList.remove("highlight"); //remove and add highlight class to the aboutme and contactme buttons respectively
    navButtons[3].classList.add("highlight");
  } else {
    navButtons[3].classList.remove("highlight"); //make sure contactme button isn't highlighted
    navButtons.forEach((navButton, i) => {
      //for every nav button
      let scene = new ScrollMagic.Scene({
        triggerHook: 0.3, //trigger for animation start and end is 30% from the top
        triggerElement: containers[i], //start it when trigger reaches the top of the container
        duration: containers[i].clientHeight //stop it when trigger reaches bottom of the container
      })
        .setClassToggle(navButtons[i], "highlight") //highlight the appropriate nav button, by toggling the class highlight at start and end triggers
        .addTo(controller);
    });
  }
}

//add a eventlistener to window resize, since container sizes resize (when window resizes) so need to recalulate start and end triggers
var resizing; // short delay on resize and scroll so it doesn't use up too much resources caclulating
window.addEventListener("resize", () => {
  clearTimeout(resizing);
  resizing = setTimeout(highlightNavButtons, 1000);
});
//add a eventlistener onscroll, so that the contacme button gets highlighted properly when screen is at bottom
window.addEventListener("scroll", () => {
  clearTimeout(resizing);
  resizing = setTimeout(highlightNavButtons, 10);
});

highlightNavButtons(); //run the function on page load

//scroll to correct part on click of nav buttons
navButtons.forEach((navButton, i) => {
  navButton.addEventListener("click", () => {
    let pos = containers[i].getBoundingClientRect().top - 70;
    window.scrollBy({
      top: pos,
      behavior: "smooth"
    });
  });
});

//copy my email to clipboard when clicking email buttons
emailButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    email.select(); //select the email from the hidden textarea
    email.setSelectionRange(0, 99999); //for mobile
    document.execCommand("copy"); //copy the selected text to clipboard
    alert("Copied Allan's email (" + email.value + ") to the clipboard");
  });
});

//animate the burger button on click
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});

//changes the images in the project cards into an animated gif when hovering over the image
googleFontsGif.addEventListener("mouseover", () => {
  googleFontsGif.src = "images/googlefonts.gif";
});
googleFontsGif.addEventListener("mouseout", () => {
  googleFontsGif.src = "images/googlefonts.png";
});

marshallGif.addEventListener("mouseover", () => {
  marshallGif.src = "images/marshall.gif";
});
marshallGif.addEventListener("mouseout", () => {
  marshallGif.src = "images/marshall.png";
});

churchGif.addEventListener("mouseover", () => {
  churchGif.src = "images/church.gif";
});
churchGif.addEventListener("mouseout", () => {
  churchGif.src = "images/church.png";
});

lynelGif.addEventListener("mouseover", () => {
  lynelGif.src = "images/lynel.gif";
});
lynelGif.addEventListener("mouseout", () => {
  lynelGif.src = "images/lynel.png";
});
