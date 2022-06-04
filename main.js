const btn = document.querySelector('#mode')

const theme = document.querySelector('#theme-link')
const preferDark = window.matchMedia('(prefers-color-scheme: dark)')

if (preferDark.matches){
  theme.href = 'dark.css'
}

btn.addEventListener('click', function (){

  if(theme.getAttribute('href')==='light.css'){

    theme.href='dark.css'
  } else {

    theme.href='light.css'
  }
})