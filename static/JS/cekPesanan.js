$(document).ready(function () {
  const linker = $('#linker li')
  let select = ''
  for (const data of linker.siblings().children()) {
    if (data.text != 'Cek Pesanan') continue
    select = data
    break
  }
  select.id = 'active'
})
