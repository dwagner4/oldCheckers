
function dialogUIinit () {
  document.getElementById('auth-dialog-btn').addEventListener('click', function () {
    let dial = document.getElementById('auth-dialog');
    dial.open = true;
  }, false);
  document.getElementById('cancel-btn').addEventListener('click', function () {
    document.getElementById('auth-dialog').open = false;
  }, false);
}


document.addEventListener( 'newuserevent',
  e => {
    alert("user is " + e.detail.email);
    document.getElementById("msg").innerHTML = "logged in as " + e.detail.email;
    var emailVerified = e.detail.emailVerified;
    if (!emailVerified) {
      document.getElementById('donut-verify-email').disabled = false;
    }
    document.getElementById('donut-sign-in').textContent = 'Sign out';
    document.getElementById('auth-dialog').open = false;
  },
  false);

document.addEventListener( 'nouserevent',
  e => {
    alert("no user")
    document.getElementById('msg').innerHTML = "";
    document.getElementById('donut-sign-in').textContent = 'Sign in';
    document.getElementById('auth-dialog').open = false;
  },
  false);

document.addEventListener( 'loginmsg',
  e => {
    alert(e.detail.msg);
    document.getElementById('auth-dialog').open = false;
  },
  false);
