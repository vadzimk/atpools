const btn = document.querySelector('#mode')

const theme = document.querySelector('#theme-link')
const preferDark = window.matchMedia('(prefers-color-scheme: dark)')

// todo uncomment this
// if (preferDark.matches){
//   theme.href = 'dark.css'
// }

btn.addEventListener('click', function (e){
  e.stopPropagation()
  if(theme.getAttribute('href')==='light.css'){

    theme.href='dark.css'
  } else {

    theme.href='light.css'
  }
})

const inputs = document.querySelectorAll("input, textarea")

inputs.forEach((input) => {
  input.addEventListener("blur", (event) => {
    if (event.target.value) {
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
    }
  });
});

const images = document.querySelectorAll(".feature-img")

images.forEach(image=>{
  image.addEventListener('click', (e)=>{
    e.stopPropagation()
    image.classList.toggle("enlarged")
  })
})

document.addEventListener('click', ()=>{

  images.forEach(image=>{
    if(image.classList.contains('enlarged')){
      image.classList.remove('enlarged')
    }
  })
})