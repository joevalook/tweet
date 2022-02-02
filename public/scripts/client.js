/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const layout = `
  <section>
      <article class="tweets" id="boxShadow">
        <header class="oppositeSide ">
          <div class="picName">
            <div class="imageBox" >
              <img src="${tweetData.user.avatars}" alt="Random Man Face">
            </div>
            <div >
              <p style = "margin-left: 10px;">${tweetData.user.name}</p>
            </div>
          </div>
          <div class="handle">
            <p>${tweetData.user.handle}</p>
          </div>

        </header>
        <p class="tweetContainer">
        ${tweetData.content.text}
        </p>
        <footer class = "oppositeSide small">
          <span> ${timeago.format(Number(tweetData.created_at))}</span>
          <div class = "horizontal">
            <i class="fa-solid fa-flag icon1"></i>
            <i class="fa-solid fa-retweet icon2"></i>
            <i class="fa-solid fa-heart icon3"></i>
          </div>
        </footer>
      </article>
  `
  $('main').append(layout);
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    createTweetElement(tweet)
  }
}



$(function() {
  const loadRecentTweet = function(url) {
    $.get(url).then((data) => {
      createTweetElement(data.slice(-1)[0]);
  })
  }
  const loadTweets = function(url) {
    $.get(url).then((data) => {
      renderTweets(data);
  })
  }
  loadTweets("/tweets/");

  const $form = $('#tweetForm');
  $form.on('submit', function (e) {
    e.preventDefault();
    if(counter < 0) {
      alert("You have exceeded the amount of characters allowed!")
    }
    else if (counter === 140){
      alert("You must type something in order to post!")
    }
    else {
      $.post("/tweets/", $(this).serialize(),() => {
        loadRecentTweet("/tweets/")
      });
    }
  })
});

// const $form = $('#tweetForm');
// $form.on('submit', function (e) {
//   e.preventDefault();
//   console.log(this)
//   console.log(e.value)
//   $.post("/tweets/", {text: e.value},(data) => {
//     console.log(data);
//     //$('main').append(tweets);
//   });
// })
// });