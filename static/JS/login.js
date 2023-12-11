function login () {
  username_receive = $('#username').val()
  password_receive = $('#password').val()

  if (username_receive.length === 0 || username_receive === ' ') {
    $('#usernameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('username anda masih kosong, Silahkan isi kembali')
    $('#username').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#usernameFeedback')
      .removeClass('valid-feedback')
      .removeClass('invalid-feedback')
      .text('')
    $('#username').addClass('is-valid').removeClass('is-invalid').focus()
  }
  if (password_receive.length === 0 || password_receive === ' ') {
    $('#passwordFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('password anda Kosong')
    $('#password').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#passwordFeedback')
      .removeClass('valid-feedback')
      .removeClass('invalid-feedback')
      .text('')
    $('#password').addClass('is-valid').removeClass('is-invalid').focus()
  }

  $.ajax({
    type: 'POST',
    url: '/login',
    data: {
      username_give: username_receive,
      password_give: password_receive
    },
    success: function (response) {
      if (response.result === 'success') {
        $.cookie(response.token_key, response.token, { path: '/' })
        window.location.replace('/')
        alert('You Have logged in!')
      } else {
        alert(response.msg)
        window.location.reload()
      }
    }
  })
}
