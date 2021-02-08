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

  // Post, by means of a variable (templatePosts) an array of objects is created that
  // contains the post information that is displayed in the articles section.
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
      <button type="button" class="btn btn-primary reaction-margin shape">
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
  // validation Login form
  $("#login").validate({
    rules: {
      user: {
        required: true,
        minlength: 4,
      },
      emailUser: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    submitHandler: function (form, event) {
      event.preventDefault();

      // 2 variables are created to get the values of the inputs "Name" and "Email" in the LocalStorage
      let formName = $("#form-name").val();
      let formEmail = $("#form-email").val();

      // The information is saved in the local storage, of the inputs referring to #form-name and #form-email
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
          <h5 class="card-title letters-style login-title">!Hola ${formName}! <em class="far fa-laugh"></em></h5>
          <p class="card-text p-login">Tu usuario falso es ${formEmail}</p>
          <a id="logout" href="#" class="btn btn-primary logout">Probar Logout</a>
        </div>
      </div>
      `;

      // Conditional to show Login information
      // isLogin
      if (isLogin(formName, formEmail)) {
        // Show the information of the variable "loginInformation"
        $("#testStorage").html(loginInformation);
        $("#exampleModal").modal();
        // Hide the Login information (Inputs)
        $("#loginTest").hide();
      } else {
        // Hide the Login information or the div where all the "loginInformation" information is displayed
        $("#testStorage").hide();
      }

      // Function to clean the LocalStorage
      logout();
    },
  });

  // Function to clean the LocalStorage, reload the page, and indicate the value "true" to execute the
  // logout alert
  function logout() {
    $("#logout").click(function () {
      localStorage.clear();
      localStorage.setItem("message", true);
      location.reload();
    });
  }

  // isLogin is a function to verify that "formName and formEmail" is different from null or undefined
  function isLogin(formName, formEmail) {
    return (
      (formName != null && formEmail != null) ||
      (formName != undefined && formEmail != undefined)
    );
  }
});
