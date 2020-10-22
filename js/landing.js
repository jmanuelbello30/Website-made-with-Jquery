$(document).ready(function () {
  // It is verified that the localStorage has value true to show Logout alert
  if (localStorage.getItem("message") === "true") {
    $("#alertLogout").fadeIn();
    localStorage.clear();
  }

  // After cleaning the Localstorage, it is verified that it is empty to hide the Logout alert
  if (localStorage.getItem("message") != "true") {
    $("#alertLogout").fadeOut(6000);
  }

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

  // Post, by means of a variable (templatePosts) an array of objects is created that
  // contains the post information that is displayed in the articles section
  // momentJS was used to show the date when all posts are made

  let templatePosts = [
    {
      title: "Prueba de Post 1",
      date:
        "Publicado el día " +
        moment().date() +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY"),
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id",
    },

    {
      title: "Prueba de Post 2",
      date:
        "Publicado el día " +
        moment().date() +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY"),
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id",
    },

    {
      title: "Prueba de Post 3",
      date:
        "Publicado el día " +
        moment().date() +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY"),
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id",
    },

    {
      title: "Prueba de Post 4",
      date:
        "Publicado el día " +
        moment().date() +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY"),
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id",
    },

    {
      title: "Prueba de Post 5",
      date:
        "Publicado el día " +
        moment().date() +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY"),
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id",
    },
  ];

  // Loop through variable templatePosts, to display them and paint the HTML as indicated.
  templatePosts.forEach((element, index) => {
    let postInformation = `
    <article>
      <h2 class="post-title">${element.title}</h2>
      <button type="button" class="btn btn-primary reaction-margin">
        Reacciones <span class="badge badge-light">4</span>
      </button>
      <div>${element.date}</div>
      <div class="post-text">
        <p>${element.content}</p>
      </div>
    </article>
    `;

  // The "post-section" div is taken to replace the data with the postInformation variable.
    $("#post-section").append(postInformation);
  });

  // Login false
  $("#login").submit(function (e) {
    // preventDefault is used to prevent the default action from being executed and
    // save the information correctly
    e.preventDefault();

    // 2 variables are created to get the values of the inputs "Name" and "Email" in the LocalStorage
    let formName = $("#form-name").val();
    let formEmail = $("#form-email").val();

    // The information is saved in the local storage, of the inputs referring to # form-name and # form-email
    localStorage.setItem("form_name", formName);
    localStorage.setItem("form_email", formEmail);

    // With getItem the value is returned in the localStorage, this information is saved in a variable
    // and then add it to the HTML
    formName = localStorage.getItem("form_name");
    formEmail = localStorage.getItem("form_email");

    // A variable is created that contains the information to be displayed when the send event is executed
    // the form with the information, showing what was saved in the "formName" and formEmail variables
    let loginInformation = `
    <div class="card card-login" style="width: 15rem;">
      <div class="card-body">
        <h5 class="card-title">Hola! ${formName} <i class="far fa-laugh"></i></h5>
        <p class="card-text">El correo que usaste para el Log fue ${formEmail}</p>
        <a id="logout" href="#" class="btn btn-primary">Probar Logout</a>
      </div>
    </div>
    `;

    // Conditional to show Login information
    // isLogin 
    if (isLogin(formName, formEmail)) {
      // Show the information of the variable "loginInformation"
      $("#testStorage").html(loginInformation);
      // Hide the Login information (Inputs) 
      $("#loginTest").hide();
    } else {
      // Hide the Login information or the div where all the "loginInformation" information is displayed
      $("#testStorage").hide();
    }

  // Function to clean the LocalStorage 
    logout();
  });

  // isLogin is a function to verify that "formName and formEmail" is different from null or undefined
  function isLogin(formName, formEmail) {
    return (
      (formName != null && formEmail != null) ||
      (formName != undefined && formEmail != undefined)
    );
  }

  // Function to clean the LocalStorage, reload the page, and indicate the value "true" to execute the
  // logout alert
  function logout() {
    $("#logout").click(function () {
      localStorage.clear();
      localStorage.setItem("message", true);
      location.reload();
    });
  }

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
