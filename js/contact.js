$(document).ready(function () {
  // Change the date data to Spanish
  moment.locale("es");

  // Hide the ScrollToTop when loading the page
  $(".follow-screen").hide();

  // Animation of letters in title.
  let words = $(".word");
  let wordArray = [];
  let currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (let i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    let cw = wordArray[currentWord];
    let nw =
      currentWord == words.length - 1
        ? wordArray[0]
        : wordArray[currentWord + 1];
    for (let i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (let i = 0; i < nw.length; i++) {
      nw[i].className = "letter behind";
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function () {
      cw[i].className = "letter out";
    }, i * 80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function () {
      nw[i].className = "letter in";
    }, 340 + i * 80);
  }

  function splitLetters(word) {
    let content = word.innerHTML;
    word.innerHTML = "";
    let letters = [];
    for (let i = 0; i < content.length; i++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  changeWord();
  setInterval(changeWord, 3000);

  // contact form
  $("#formContact").validate({
    rules: {
      name: {
        required: true,
        minlength: 10,
      },
      lastname: {
        required: true,
        minlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
      gender: {
        required: true,
      },
      date: {
        required: true,
        date: true,
      },
      age: {
        required: true,
        digits: true,
        maxlength: 2,
        max: 90,
      },
    },
  });

  // ScrollToTop to return to the top of the page.
  $(".ToTop").on("click", function () {
    let target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.substr(1) + "]");
    if (target.length) {
      $("html,body").animate(
        {
          scrollTop: target.offset().top,
        },
        1000
      );
      return false;
    }
  });

  // Function to hide or show the ScrollToTop.
  $(window).on("scroll", function () {
    let scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
      $(".follow-screen").fadeOut();
    } else {
      $(".follow-screen").fadeIn();
    }
  });
});
