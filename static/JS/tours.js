$(document).ready(function () {
  const linker = $('#linker li')
  let select = ''
  for (const data of linker.siblings().children()) {
    if (data.text != 'Tours') continue
    select = data
    break
  }
  select.id = 'active'
  document.getElementById('active').style.borderBottom = '2px solid #ffa500'
})

window.onscroll = function () {
  scrollFunction()
}

$(window).on('resize', function () {
  const querys = document.querySelectorAll('#linker li')
  const lebarSize = $(window).width()
  const heightSize = $(window).scrollTop()
  console.log(heightSize)
  if (lebarSize > 992 && heightSize < 80) {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.remove('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'transparent'
    document.getElementById('navbar').style.transition = '0.3s'
    document.getElementById('active').style.color = '#ffa500'
    document.getElementById('active').style.borderBottom = '2px solid #ffa500'
  } else {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.add('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'orange'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('active').style.borderBottom = 'none'
  }
})

function scrollFunction () {
  const querys = document.querySelectorAll('#linker li')
  const lebarSize = $(window).width()

  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.add('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'orange'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('active').style.borderBottom = '2px solid #ffffff'
  } else if (
    (document.body.scrollTop < 80 && lebarSize < 992) ||
    (document.documentElement.scrollTop < 80 && lebarSize < 992)
  ) {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.add('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'orange'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('active').style.border = 'none'
  } else {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.remove('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'transparent'
    document.getElementById('navbar').style.transition = '0.3s'
    document.getElementById('active').style.color = '#ffa500'
    document.getElementById('active').style.borderBottom = '2px solid #ffa500'
  }
}
