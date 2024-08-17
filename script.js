document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
        });
    });
});

// Button interaction alert
//document.querySelectorAll('.btn').forEach(button => {
  //  button.addEventListener('click', function () {
    //    alert("Redirecting now...");
    //});
//});

