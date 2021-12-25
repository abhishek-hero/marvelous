let mainDiv = document.querySelector(".showDetail-div")
let image = document.querySelector('#charimage')
let charname = document.querySelector('#charname')
let description = document.querySelector("#overview-discription")

let data = JSON.parse(localStorage.getItem('characterDetails'))
image.src = `${data.thumbnail.path}.jpg`
charname.innerHTML = data.name
description.innerHTML = data.description