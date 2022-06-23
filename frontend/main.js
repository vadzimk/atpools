/*------------------- Theme change --------------------------*/
const btnMode = document.querySelector('#mode')
const theme = document.querySelector('#theme-link')
const preferDark = window.matchMedia('(prefers-color-scheme: dark)')
const mapImg = document.querySelector('#map')

// NOTE uncomment this for production
// synchronizes theme with user OS preferences
if (preferDark.matches) {
  theme.href = 'dark.css'
}

btnMode.addEventListener('click', function (e) {
  e.stopPropagation()
  if (theme.getAttribute('href') === 'light.css') {
    theme.href = 'dark.css'
    btnMode.setAttribute('src', 'images/figma-export/mode-light.svg')
    mapImg.setAttribute('src', 'images/figma-export/map2dark.png')
  } else {
    theme.href = 'light.css'
    btnMode.setAttribute('src', 'images/figma-export/mode-dark.svg')
    mapImg.setAttribute('src', 'images/figma-export/map2light.png')

  }
})

/*------------------- Form inputs animation -----------------------*/

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

inputs.forEach((input) => {
  if (input.value) {
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
  }
});

/*------------------- Service image animation --------------------------*/

const images = document.querySelectorAll(".feature-img, #map")

images.forEach(image => {
  image.addEventListener('click', (e) => {
    e.stopPropagation()
    image.classList.toggle("enlarged")
  })
})

document.addEventListener('click', () => {

  images.forEach(image => {
    if (image.classList.contains('enlarged')) {
      image.classList.remove('enlarged')
    }
  })
})

/*------------------- Form submission --------------------------*/

const form = document.querySelector('form');
const thank = document.querySelector('#thank-you')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const data = Object.fromEntries(new FormData(form).entries());

  // const res = await postMessage(data); // Todo commented to test form animation
  animateForm(form, thank)
  // if (res.status === 200) {
  //   // form.style.display = 'none';
  //   // thank.style.display = 'flex';
  // } else {
  //   console.log('error: status', res.status)
  // }
});

async function postMessage(data = {}) {
  return await fetch('/api/contact', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
}


/*--------------------Form animation -----------------------*/

function animateForm (form, thank){
form.classList.add('move-form');
thank.classList.add('move-thank-you', 'show');
thank.style.opacity = 1;
// thank.classList.remove('hide');
}