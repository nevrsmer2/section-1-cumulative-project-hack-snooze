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

//Hide/show submit form & add event lister to button in submit story form
$(".submit-story-form").hide();
$(".nav-submit").on("click", function () {
  $(".submit-story-form").show();
});

//Add event lister to favorites tab and invoke myFavStories()
$(".nav-favorites").on("click", function () {
  myFavStories();
});

//Add event listener to My Stories tab and involke hidePageComponents() & renderMyStories()
$(".nav-my-stories").on("click", function () {
  hidePageComponents();
  renderMyStories();
});
