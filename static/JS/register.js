function register () {
  nickname_receive = $('#nickname').val()
  username_receive = $('#username').val()
  password_receive = $('#password').val()
  password2_receive = $('#password2').val()
  console.log(nickname_receive.length)

  // statement
  if (username_receive.length === 0 || username_receive === ' ') {
    $('#usernameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('username anda masih kosong, Silahkan isi kembali')
    $('#username').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#usernameFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('username anda benar')
    $('#username').removeClass('is-invalid').addClass('is-valid').focus()
  }

  if (nickname_receive.length === 0 || nickname_receive === ' ') {
    $('#nicknameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('Nickname anda masih kosong, Silahkan isi kembali')
    $('#nickname').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else if (!is_nickname(username)) {
    $('#nicknameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('Nickname anda tidak memenuhi Syarat')
    $('#nickname').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#nicknameFeedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('Nickname anda Benar')
    $('#nickname').removeClass('is-valid').addClass('is-invalid').focus()
  }

  if (password_receive.length === 0 || password_receive === ' ') {
    $('#passwordFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('password anda Benar')
    $('#password').removeClass('is-invalid').addClass('is-valid').focus()
    return
  } else {
    $('#passwordFeedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('password anda benar')
    $('#password').removeClass('is-invalid').addClass('is-valid').focus()
  }

  if (password2_receive.length === 0 || password_receive === ' ') {
    $('#password2Feedback')
      .removeClass('valid-feedback')
      .addClass('invalid-feedback')
      .text('confirm password anda masih kosong, Silahkan isi kembali')
    $('#password2').removeClass('is-valid').addClass('is-invalid').focus()
    return
  } else {
    $('#password2Feedback')
      .removeClass('invalid-feedback')
      .addClass('valid-feedback')
      .text('confirm password anda benar')
    $('#password2').removeClass('is-invalid').addClass('is-valid').focus()
  }
}

function is_nickname (asValue) {
  var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/
  return regExp.test(asValue)
}

function is_password (asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/
  return regExp.test(asValue)
}
