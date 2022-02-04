/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function htmlEncode(str){
  return String(str).replace(/[^\w. ]/gi, function(c){
     return '&#'+c.charCodeAt(0)+';';
  });
}
const createTweetElement = (tweetData) => {
  const layout = `
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
      ${(htmlEncode(tweetData.content.text))}
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
  return layout
}
const appendTweetElement = (tweetData) => {
  $('#tweetBox').append(createTweetElement(tweetData));
}

const prependTweetElement = (tweetData) => {
  $('#tweetBox').prepend(createTweetElement(tweetData));
}

const renderTweets = function(tweets) {
  for (let i = tweets.length-1; i >=0; i--) {
    appendTweetElement(tweets[i])
  }
}

$(function() {
  const loadRecentTweet = function(url) {
    $.get(url).then((data) => {
      prependTweetElement(data.slice(-1)[0]);
  })
  }
  const loadTweets = function(url) {
    $.get(url).then((data) => {
      renderTweets(data);
  })
  }
  loadTweets("/tweets/");

  const $form = $('#tweetForm');
  const $textbox = $('#tweet-text')
  $textbox.on('input', function() {
    if (document.getElementById('tweetForm')[0].value.length <= 140 && document.getElementById('tweetForm')[0].value.length !== 0 ) {
      $(document.getElementById('tweet-text')).removeClass("error");
      $("#error").slideUp("fast")
    }
  })
  $form.on('submit', function (e) {
    e.preventDefault();
    console.log();
    if(this[0].value.length > 140) {
      $(document.getElementById('tweet-text')).addClass("error");
      document.getElementById('error').innerHTML = "* Error: You can not have over 140 characters!";
      $("#error").slideDown("fast")
    }
    else if (this[0].value.length === 0){
      $(document.getElementById('tweet-text')).addClass("error");
      document.getElementById('error').innerHTML = "* Error: You can not post nothing!";
      $("#error").slideDown("fast")
    }
    else {
      $.post("/tweets/", $(this).serialize(),() => {
        loadRecentTweet("/tweets/")
        document.getElementById('counter').innerHTML = '140';
        $('#tweetBox').animate({ scrollTop: 0 }, 'slow');
      });
      $form[0].reset();
    }
  })
  $('#writeTweet, #angles').on('click', function() {
    if ($('#newTweet').is(":hidden")){  
      $("#newTweet").slideDown("slow")
      $('.container').css("height", "74vh")
      $('#angles').removeClass('fa-angles-down')
      $('#angles').addClass('fa-angles-up')
    }
    else {
      $("#newTweet").slideUp("slow")
      $('.container').css("height", "94vh")
      $('#angles').removeClass('fa-angles-up')
      $('#angles').addClass('fa-angles-down')
    }
  })
});
