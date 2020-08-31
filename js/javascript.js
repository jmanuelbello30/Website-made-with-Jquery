$(document).ready(function () {
  
  //Se verifica que el localStorage tenga valor true para mostrar alerta de Logout
  if (localStorage.getItem('message') === 'true') {
    $('#alertLogin').fadeIn();
    localStorage.clear();
  }
  
  //Luego de limpiar el storage, se verifica que este vacío para ocultar la alerta de Logout
  if (localStorage.getItem('message') != 'true') {
    $('#alertLogin').fadeOut(4000);
  }

  //Cambia los datos de fecha a español
  moment.locale('es');

  // Oculta el ScrollToTop al cargar la página
  $('.follow-screen').hide();

  // Animación de letras en título.
  let words = $('.word');
  let wordArray = [];
  let currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (let i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    let cw = wordArray[currentWord];
    let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (let i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (let i = 0; i < nw.length; i++) {
      nw[i].className = 'letter behind';
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function () {
      cw[i].className = 'letter out';
    }, i * 80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function () {
      nw[i].className = 'letter in';
    }, 340 + (i * 80));
  }

  function splitLetters(word) {
    let content = word.innerHTML;
    word.innerHTML = '';
    let letters = [];
    for (let i = 0; i < content.length; i++) {
      let letter = document.createElement('span');
      letter.className = 'letter';
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  changeWord();
  setInterval(changeWord, 3000);

  //Post - Listados
  let templatePosts = [
    {
      title: 'Prueba de Post 1',
      date: 'Publicado el día ' + moment().date() + ' de ' + moment().format('MMMM') + ' de ' + moment().format('YYYY'),
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id'
    },

    {
      title: 'Prueba de Post 2',
      date: 'Publicado el día ' + moment().date() + ' de ' + moment().format('MMMM') + ' de ' + moment().format('YYYY'),
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id'
    },

    {
      title: 'Prueba de Post 3',
      date: 'Publicado el día ' + moment().date() + ' de ' + moment().format('MMMM') + ' de ' + moment().format('YYYY'),
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id'
    },

    {
      title: 'Prueba de Post 4',
      date: 'Publicado el día ' + moment().date() + ' de ' + moment().format('MMMM') + ' de ' + moment().format('YYYY'),
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id'
    },

    {
      title: 'Prueba de Post 5',
      date: 'Publicado el día ' + moment().date() + ' de ' + moment().format('MMMM') + ' de ' + moment().format('YYYY'),
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos qui tenetur commodi sed quia totam fugit id'
    }
  ];

  //Recorre la variable posts, para mostrarlos y pinta el HTML según se indica.
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

  //Tomamos el div "post" para reemplazar los datos con la variables post.
    $('#post-section').append(postInformation);
  });

  //Login Falso
  $('#login').submit(function(e){
    //e.preventDefault();

    let formName = $('#form-name').val();
    let formEmail = $('#form-email').val();

    localStorage.setItem('form_name', formName);
    localStorage.setItem('form_email', formEmail);
    
    formName = localStorage.getItem('form_name');
    formEmail = localStorage.getItem('form_email');

    let loginInformation = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Hola! ${formName}<i class="far fa-laugh"></i></h5>
        <p class="card-text">El correo que usaste para el Log fue ${formEmail}</p>
        <a id="logout" href="#" class="btn btn-primary">¿Log out?</a>
      </div>
    </div>
    `;

  //Indicamos si el resultado es null o indefinido
  if (formName && formEmail != null ||  formName && formEmail != undefined) {
    $('#testStorage').html(loginInformation);
    $('#loginTest').hide();
  }else{
    $('#testStorage').hide();
  }

  logout();

  });

  //Función Logout para limpiar el LocalStorage
  function logout () {
    $('#logout').click(function(){
      localStorage.clear();
      localStorage.setItem('message', true);
      location.reload();
    });
  }  

  //ScrollToTop
  $('.ToTop').on('click', function () {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  });

  $(window).on("scroll", function () {
    let scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
      $('.follow-screen').fadeOut();
    } else {
      $('.follow-screen').fadeIn();
    }
  });

});