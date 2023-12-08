$(document).ready(function () {
  const linker = $('#linker li')
  let select = ''
  for (const data of linker.siblings().children()) {
    if (data.text != 'Documentation') continue
    select = data
    break
  }
  select.id = 'active'
})

window.onscroll = function () {
  scrollFunction()
}

function scrollFunction () {
  const querys = document.querySelectorAll('#linker li')

  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    for (let i = 0; i < querys.length; i++) {
      console.log(querys[i])
      querys[i].classList.add('scroll')
    }
    document.getElementById('navbar').style.backgroundColor = 'orange'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('active').style.borderBottom = '2px solid #ffffff'
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
