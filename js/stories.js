"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
<i class="fa-star ${isFavorite(story) ? "fas" : "far"}" data-id="${
    story.storyId
  }"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

$(".submit-story-btn").on("click", (e) => submitStory(e));

async function submitStory(e) {
  e.preventDefault();
  const $author = $("#author-name").val();
  const $title = $("#story-title").val();
  const $url = $("#story-url").val();
  const data = {
    user: currentUser,
    newStory: {
      author: $author,
      title: $title,
      url: $url,
    },
  };
  const postResponse = await storyList.addStory(data.user, data.newStory);
  $(".submit-story-form")[0].reset();
  $(".submit-story-form").hide();
}

async function renderMyStories() {
  currentUser.ownStories;
  $allStoriesList.empty();
  $(".submit-story-form").hide();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $story.prepend(
      $("<i>").data("id", story.storyId).addClass("fas fa-trash-alt")
    );
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//Return boolean based on star's status - marked or not marked as favorite
function isFavorite(story) {
  let isFav = false;
  currentUser.favorites.forEach(function (fav) {
    if (story.storyId === fav.storyId) {
      isFav = true;
    }
  });
  return isFav;
}

//Show/hide favorite status & invoke functions to add/delete favorite stories in favorites []
function updateFavorite(e) {
  const $storyId = $(e.target).data("id");
  const $isFavorite = $(e.target).hasClass("fas");
  let story = storyList.stories.find((item) => {
    return item.storyId === $storyId;
  });
  $(e.target).toggleClass("fas far");
  if ($isFavorite) {
    currentUser.removeFavorite(story);
  } else {
    currentUser.addToFavorites(story);
  }
}

//Add event listener to star element and call updaeFavorite function
$allStoriesList.on("click", ".fa-star", updateFavorite);

// Function to render user's favorite stories (copied from a bov e)
async function myFavStories() {
  currentUser.favorites;
  $allStoriesList.empty();
  $(".submit-story-form").hide();

  // loop through all of our stories in favorites [] and push them to the DOM
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// //Add event listener  to trash can and invoke deleteStory()
$allStoriesList.on("click", ".fa-trash-alt", async (e) => {
  await storyList.deleteStory(currentUser, $(e.target).data("id"));
});
