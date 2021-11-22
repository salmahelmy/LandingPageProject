/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */
//wait for the page to be created fully
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Define Global Variables
   *
   */
  //get the ul element
  const navigationList = document.getElementById("navbar__list");
  //get the sections
  const sections = document.querySelectorAll("section");
  //create a document fragment
  const fragment = document.createDocumentFragment(); //created a document fragment
  //the go up button
  const goTopButton = document.getElementById("go_top");
  //variable used to get the return of setTimeOut function to be given to clearTimeOut function to stop the setTimeOut effect
  let userScrolling;
  /**
   * End Global Variables
   * Start Helper Functions
   *
   */

  /**
   * End Helper Functions
   * Begin Main Functions
   *
   */
  // build the navigation list items
  for (let i = 0; i < sections.length; i++) {
    const listItem = document.createElement("li");
    const listAnchor = document.createElement("a");
    const listItemTitle = sections[i].getAttribute("data-nav");
    const listItemId = sections[i].getAttribute("Id");
    listAnchor.href = `#${listItemId}`;
    listAnchor.textContent = listItemTitle;
    listItem.appendChild(listAnchor);
    fragment.appendChild(listItem);
  }
  navigationList.appendChild(fragment);

  /**
   * End Main Functions
   * Begin Events
   *
   */
  //on click event on the nav bar list items the page scrolls to the adjacent section with toggling the active classes
  navigationList.addEventListener("click", function (event) {
    event.preventDefault();
    const sectionNumber = event.target.textContent.split(" ");
    const sectionId = "section" + sectionNumber[1];
    const currentSection = document.getElementById(sectionId);
    sections.forEach(function (section) {
      if (section.id !== sectionId) {
        section.classList.remove("active_section");
        const anchorReference = "#" + section.id;
        document
          .querySelector(`a[href="${anchorReference}"]`)
          .classList.remove("active");
      }
    });
    //add class active to the clicked list item
    event.target.classList.add("active");
    currentSection.classList.add("active_section");
    // Scroll to section on link click
    currentSection.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  //go to top button on click event
  goTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Add class 'active' to section when near top of viewport

  //event listener on page scrolling to show the go to top button
  //and to toggle active classes between appearing sections
  window.addEventListener("scroll", function (event) {
    navigationList.style.display = "block";
    //detect the position the page is scrolled to, upon which show or hide the go to top button
    if (document.body.scrollTop > 500) {
      goTopButton.classList.remove("page_top_hidden");
      goTopButton.classList.add("page_top_seen");
    } else {
      goTopButton.classList.remove("page_top_seen");
      goTopButton.classList.add("page_top_hidden");
    }
    //loop on the sections & detect which is appearing to give it & its adjacent list item the class active
    const observer = new IntersectionObserver(
      function (entries) {
        const anchorReference = "#" + entries[0].target.id;
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add("active_section");
          document
            .querySelector(`a[href="${anchorReference}"]`)
            .classList.add("active");
        } else {
          entries[0].target.classList.remove("active_section");
          document
            .querySelector(`a[href="${anchorReference}"]`)
            .classList.remove("active");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
    /*
                // Clear our timeout throughout the scroll
                window.clearTimeout(userScrolling);
                // Set a timeout to run after scrolling ends after which(3 seconds) the nav bar will be hidden
                userScrolling = setTimeout(function () {
                    navigationList.style.display = "none";
                }, 3000);
                */
  });
});

//function for toggling the view of the navigation bar between vertical & horizontal on click on the nav bar icon
function navBarToggle() {
  const navBarList = document.getElementById("navbar__list");
  //check whether it has the class responsive or not
  navBarList.classList.toggle("responsive");
}
