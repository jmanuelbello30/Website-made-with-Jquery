$(document).ready(function () {
  // Change the date data to Spanish
  moment.locale("es");

  // contact form
  $("#formContact").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      lastname: {
        required: true,
        minlength: 3,
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
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      $("#exampleModal").modal();
      closeModal();
    },
  });

  // function to reload the page, when the modal is closed
  function closeModal() {
    $(".exit-m").click(function () {
      location.reload();
    });
  }
});
