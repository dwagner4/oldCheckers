

document.addEventListener( 'newuserevent',
  e => {
    alert("user is " + e.detail.email);
    document.getElementById("msg").innerHTML = "logged in as " + e.detail.email;
    var emailVerified = e.detail.emailVerified;
    if (!emailVerified) {
      document.getElementById('donut-verify-email').disabled = false;
    }
    document.getElementById('donut-sign-in').textContent = 'Sign out';
    document.getElementById('email').style.display = "none";
    document.getElementById('password').style.display = "none";
  },
  false);

document.addEventListener( 'nouserevent',
  e => {
    alert("no user")
    document.getElementById('msg').innerHTML = "";
    document.getElementById('donut-sign-in').textContent = 'Sign in';
    document.getElementById('email').style.display = "inline";
    document.getElementById('password').style.display = "inline";
  },
  false);

document.addEventListener( 'loginmsg',
  e => {
    alert(e.detail.msg);
  },
  false);
