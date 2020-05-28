const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const SERVER = 'https://api.themoviedb.org/3';
const API_KEY =  '531c4487462b99dcc453e2c2eedf56e2';


const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const tvShows = document.querySelector('.tv-shows');
const tvCardImg = document.querySelector('.tv-card__img');
const modalTitle = document.querySelector('.modal__title');
const genresList = document.querySelector('.genres-list');
const rating= document.querySelector('.rating');
const description = document.querySelector('.description');
const modalLinck= document.querySelector('.moda__linck');
searchForm = document.querySelector('.search__form');
searchFormInput = document.querySelector('.search__form-input');

//const div = document.querySelectorAll('div');

const loading = document.createElement('div');
loading.className = 'loading';
  
class DBService  {
  getData = async (url) => {
   const res = await fetch(url);
    if (res.ok) {
       return res.json();
    } else {
      throw new Error (`Не удалось получить данные по адресу ${url}`)
    }
   
  }
  getTestData = () => {
    return this.getData('test.json');
  }
  getTestCard = () => {
    return this.getData('card.json');
  }

  getSearchResult = query => this
    .getData(`${SERVER}search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU&query=${query}`);
  

  getTvShow = id => this  
    .getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
  
}

 const renderCard = response => {
 console.log(response);
 tvShowsList.textContent = '';

 response.results.forEach(item => {
   const {
    backdrop_path: backdrop, 
    name: title, 
    poster_path: poster,
    vote_average: vote,
    id
     } = item;

     const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
     const backdropIMG = backdrop ? IMG_URL + backdrop : '';
     const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

  const card = document.createElement('li');
  card.idTV = id;
  card.className = 'tv-show__item';
  card.innerHTML = `
       <a href="#" id="${id}" class="tv-card">
          ${voteElem}
          <img class="tv-card__img"
         src="${posterIMG}"
         data-backdrop="${backdropIMG}"
         alt="${modalTitle}">
         <h4 class="tv-card__head">${title}</h4>
      </a> 
  `;
  loading.remove();
  tvShowsList.append(card);

 });
 };

 searchForm.addEventListener("submit", event => {
   event.preventDefault();
   const value = searchFormInput.value.trim();
   
   if(value) {
     tvShows.append(loading);
     new DBService().getSearchResult(value).then(renderCard);
   }
   searchFormInput.value = '';
   
 });


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
  preventDefault();
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

    new DBService().getTVShow(card.id)
     .then(data => {
      console.log(data);

      tvCardImg.src = IMG_URL + data.poster_path;
      modalTitle.textContent = data.name;
      //  data.genre.reduce((acc, item) => {
      //   returne `${acc} <li>${item.name}</li>`
      //  }, '')
      genresList.textContent = '';
      for(const item of data.genres) {
        genresList.innerHTML += `<li>${item.name}</li>`;
      }
       rating.textContent = data.vote_average;
       description.textContent = data.overview;
       modalLinck.href = data.homepage;
      
     })
     //; -не ставить!!!!
     .then(() => {
       document.body.style.owerflow = 'hidden';
       modal.classList.remove('hide');
     })

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