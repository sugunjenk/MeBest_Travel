function register () {
  nickname_receive = $('#nickname').val()
  username_receive = $('#username').val()
  password_receive = $('#password').val()
  password2_receive = $('#password2').val()

  // statement

  // nickname
  if (nickname_receive.length === 0 || nickname_receive === ' ') {
    $('#nicknameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('Nickname anda masih kosong, Silahkan isi kembali')
    $('#nickname').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#nicknameFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('Nickname anda Benar')
    $('#nickname').removeClass('is-invalid').addClass('is-valid').focus()
  }
  // end nickname

  // username
  $('#usernameFeedback').removeClass('text-warning')
  if (username_receive.length === 0 || username_receive === ' ') {
    $('#usernameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('username anda masih kosong, Silahkan isi kembali')
    $('#username').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else if (!is_username(username_receive)) {
    $('#usernameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text(
        'username anda tidak memenuhi Syarat diantaranya 2-10 aphabet, nomor dan special character -_.'
      )
    $('#username').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#usernameFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('username anda benar')
    $('#username').removeClass('is-invalid').addClass('is-valid').focus()
  }
  // end username

  // password
  $('#passwordFeedback').removeClass('text-warning')
  if (password_receive.length === 0 || password_receive === ' ') {
    $('#passwordFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('password anda Kosong')
    $('#password').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else if (!is_password(password_receive)) {
    $('#passwordFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text(
        'password anda tidak memenuhi Syarat diantara 8-20 aphabet, nomor dan special character !@#$%^&*'
      )
    $('#password').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#passwordFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('password anda benar')
    $('#password').removeClass('is-invalid').addClass('is-valid').focus()
  }
  // end password

  // confirm password
  if (password2_receive.length === 0 || password_receive === ' ') {
    $('#password2Feedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('confirm password anda masih kosong, Silahkan isi kembali')
    $('#password2').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else if (password2_receive !== password_receive) {
    $('#password2Feedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('password anda tidak sama')
    $('#password2').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#password2Feedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('confirm password anda benar')
    $('#password2').removeClass('is-invalid').addClass('is-valid').focus()
  }
  // end confirm password

  // end statement

  // pengiriman ajax
  $.ajax({
    type: 'POST',
    url: '/register',
    data: {
      nickname_give: nickname_receive,
      username_give: username_receive,
      password_give: password_receive
    },
    success: function (response) {}
  })
}

function is_username (asValue) {
  var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/
  return regExp.test(asValue)
}

function is_password (asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/
  return regExp.test(asValue)
}
