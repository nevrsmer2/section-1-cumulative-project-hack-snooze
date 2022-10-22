"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
console.log("Nav JS");

// START MY CODE - Add Event Listener to Navbar: Submit, Favorites, My Stories

// Event Listener - Submit
//onClick, it needs to show form so user can add a story
//Form contains 3 inputs (Author, Title, URL) and a submit <button>
// Form appears in <section> element with class of . stories-container container
$(".submit-story-form").hide();
$(".nav-submit").on("click", function () {
  $(".submit-story-form").show();
});

// Event Listener - Favorites
//Need to create functiality that allows user to mark stories as a favorite
//on click, it need to show a list of user's favorite stories
//If text of favorites === undefined, set it to "No Favorites Added."
//Favorites are added to .stories-container container
//Favorits list is posted to
$(".nav-favorites").on("click", function () {
  myFavStories();
  // alert("I clicked Favorites");
});

// Event Listener - My Stories
//// If text  of My Stories === undefined, set it to "No Stories Added."

$(".nav-my-stories").on("click", function () {
  hidePageComponents();
  renderMyStories();
  // alert("I clicked My Stories");
});

// END MY CODE code for Submit Story Form
