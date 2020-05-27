const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 531c4487462b99dcc453e2c2eedf56e2;

const DBService = class {
  getData = async (url) => {
   // const res = await fetch(url);
    if (res.ok) {
       return res.json();
    } else {
      throw new Error (`Не удалось получить данные по адресу ${url}`)
    }
   
  }
  getTestData = async () => {
    return await this.getData('test.json')
  }
}

 const renderCard = response => {
 console.log(response);
 tvShowList.textContent = '';

 response.results.forEach(item => {

   const {
    backdrop_path: backdrop, 
    name: title, 
    poster_path: poster,
    vote_average: vote
     } = item;

     const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
     const backdropIMG = backdrop ? IMG_URL + backdrop : 'img/no-backdrop.jpg';
     const voteElem = voteElem ? IMG_URL + voteElem : 'img/no-voteElem.jpg';

  const card = document.createElement('li');
  card.className = 'tv-show__item';
  card.innerHTML = `
       <a href="#" class="tv-card">
          <span class="tv-card__vote">${vote}</span>
          <img class="tv-card__img"
         src="${posterIMG}"
         data-backdrop="${IMG_URL + backdrop}"
         alt="Звёздные войны: Войны клонов">
         <h4 class="tv-card__head">${title}</h4>
      </a> 
  `;
  console.log(card);

  tvShowsList.append(card);

 });
 }

new DBService().getTestData().then(renderCard);



const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

const tvCardImg = document.querySelector('.tv-card__img');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');


hamburger.addEventListener('click', () => {
	leftMenu.classList.toggle('openMenu');
	hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.left-menu')) {
		leftMenu.classList.remove('openMenu');
		hamburger.classList.remove('open');
	}
})

leftMenu.addEventListener('click', () => {
  const target = event.target;
  const dropdown = target.closest('.dropdown');
  if (dropdown) {
  	dropdown.classList.toggle('active');
  	leftMenu.classList.add('openMenu');
  	hamburger.classList.add('open');
  }

  
});

// tvCardImg.addEventListener('mouseover', () =>{
//   tvCardImg.hidden = true;

// });

// tvCardImg.addEventListener('mouseout', () =>{
//   tvCardImg.hidden = false;

// });

tvShowsList.addEventListener('click', event => {

  event.preventDefault();

  const target = event.target;
  const card = target.closest('.tv-card');

  if(card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});

modal.addEventListener('click', event => {

  if(event.target.closest('.cross') ||
    event.target.classList.contains('modal')){
    document.body.style.overflow = '';
     modal.classList.add('hide');
  }
});

// card change
const changeImage = event => {
  const card = event.target.closest('.tv-shows__item');
 

  if(card) {
    const img = card.querySelector('.tv-card__img');
  
    const changeImg = img.dataset.backdrop;

    if(card) {
      const img = card.querySelector('.tv-card__img');
      if(img.dataset.backdrop) {
        [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
      }
    }
   
  }
};
tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);