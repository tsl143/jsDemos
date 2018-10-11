(function(){
  const passwords = Array.from(document.querySelectorAll('input[type="password"]'));
  const changedPasswords = Array.from(document.querySelectorAll('input[data-toggled-password="true"]'))

  if(passwords.length) {
    passwords.forEach(p => {
      p.setAttribute('type', 'text');
      p.setAttribute('data-toggled-password', 'true');
    })
  } else if (changedPasswords.length) {
    changedPasswords.forEach(p => {
      p.setAttribute('type', 'password');
      p.removeAttribute('data-toggled-password');
    })
  }
})();