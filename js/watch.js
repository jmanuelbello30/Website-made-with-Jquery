$(document).ready(function () {
  // Change the date data to Spanish
  moment.locale("es");

  // Digital watch
  setInterval(function () {
    let clock = moment().format("H:mm:ss");
    $("#clock").html(clock);
  }, 1000);

  $(".biliboard").click(function () {
    $("#clock").fadeIn(1000);
    $(".biliboard").hide(0);
  });

  $(".biliboard").hide(0).delay(2500).show(0);
});
