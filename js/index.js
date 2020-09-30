'use strict';

// === Tabs ===

const tabcontent = document.querySelectorAll('.tabcontent');
const tabItems = document.querySelector('.tabheader__items');
const tabItem = document.querySelectorAll('.tabheader__item');

const hideTabContent = () => {
   tabcontent.forEach(item => {
      item.style.display = 'none';
   });

   tabItem.forEach(item => {
      item.classList.remove('tabheader__item_active');
   });
};

const showTabContent = (i = 0) => {
   tabcontent[i].style.display = 'block';
   tabItem[i].classList.add('tabheader__item_active');
};

tabItems.addEventListener('click', (e) => {
   const target = e.target;

   if (target && target.classList.contains('tabheader__item')) {
      tabItem.forEach((item, i) => {
         if (target === item) {
            hideTabContent();
            showTabContent(i);
         }
      });
   }
});

hideTabContent();
showTabContent();

// === Tabs ===

// === Timer ===

const deadLine = new Date().getFullYear() + 1;

const getTimeRemaining = (endtime) => {
   const t = Date.parse(endtime) - Date.parse(new Date());
   const days = Math.floor(t / (1000 * 60 * 60 * 24));
   const hours = Math.floor(t / (1000 * 60 * 60) % 24);
   const minutes = Math.floor((t / 1000 / 60) % 60);
   const seconds = Math.floor((t / 1000) % 60);

   return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
   };
};

const getZero = (num) => {
   if (num >= 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
};

const setClock = (selector, endtime) => {
   const timer = document.querySelector(selector);
   const days = timer.querySelector('#days');
   const hours = timer.querySelector('#hours');
   const minutes = timer.querySelector('#minutes');
   const seconds = timer.querySelector('#seconds');

   const updateClock = () => {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
         clearInterval(timeInterval);
      }
   };

   updateClock();

   const timeInterval = setInterval(updateClock, 1000);
};

setClock('.timer', deadLine);

// === Timer ===

// === Modal ===

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('[data-modal-close]');

const showModal = () => {
   modal.style.display = 'block';
   document.body.style.overflow = 'hidden';
};

const showModalByScroll = () => {
   const docElem = document.documentElement;

   if (window.pageYOffset + docElem.clientHeight >= docElem.scrollHeight) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
   }
};

const closeModal = () => {
   modal.style.display = 'none';
   document.body.style.overflow = '';
};

modalTrigger.forEach(item => {
   item.addEventListener('click', showModal);
});

modal.addEventListener('click', (e) => {
   const target = e.target;

   if (target && target.classList.contains('modal')) {
      closeModal();
   }
});

modalCloseButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
   if (e.code === 'Escape') {
      closeModal();
   }
});

window.addEventListener('scroll', showModalByScroll);

// === Modal ===

// === Cards ===

class MenuCard {
   constructor(options) {
      this.src = options.src;
      this.alt = options.alt;
      this.title = options.title;
      this.descr = options.descr;
      this.price = options.price;
      this.parent = document.querySelector(options.parentSelector);
      this.transfer = 27;
      this.changeToUAH();
   }

   changeToUAH() {
      this.price *= this.transfer;
   }

   render() {
      const elem = document.createElement('div');
      elem.innerHTML = `
            <div class="menu__item">
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            </div>
         `;

      this.parent.append(elem);
   }
}

new MenuCard({
   src: "img/tabs/vegy.jpg",
   alt: "vegy",
   title: 'Меню "Фитнес"',
   descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
      Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
   price: 10,
   parentSelector: '.menu .container'
}).render();

new MenuCard({
   src: "img/tabs/elite.jpg",
   alt: "elite",
   title: 'Меню “Премиум”',
   descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. 
      Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
   price: 20,
   parentSelector: '.menu .container'
}).render();

new MenuCard({
   src: "img/tabs/post.jpg",
   alt: "post",
   title: 'Меню "Постное"',
   descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
      молоко из миндаля, овса, кокоса или гречки, 
      правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
   price: 15,
   parentSelector: '.menu .container'
}).render();

// === Cards ===

// === Slider ===

const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const current = document.querySelector('#current');
const total = document.querySelector('#total');

let slideIndex = 1;

if (slides.length < 10) {
   total.textContent = `0${slides.length}`;
} else {
   total.textContent = slides.length;
}

const showSlide = (n) => {
   if (n > slides.length) {
      slideIndex = 1;
   }

   if (n < 1) {
      slideIndex = slides.length;
   }

   slides.forEach(item => item.style.display = 'none');

   slides[slideIndex - 1].style.display = 'block';

   if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
   } else {
      current.textContent = slideIndex;
   }
};

showSlide(slideIndex);

const nextSlider = (n) => {
   showSlide(slideIndex += n);
};

prev.addEventListener('click', () => {
   nextSlider(-1);
});

next.addEventListener('click', () => {
   nextSlider(1);
});


// === Slider ===

// === Calc ===

const calcResult = document.querySelector('.calculating__result span');

let sex, height, weight, age, ration;

if (localStorage.getItem('sex')) {
   sex = localStorage.getItem('sex');
} else {
   sex = 'female';
   localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ration')) {
   ration = localStorage.getItem('ration');
} else {
   ration = 1.375;
   localStorage.setItem('ration', 1.375);
}

const initLocalSettings = (selector, activeClass) => {
   const elements = document.querySelectorAll(selector);

   elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') === localStorage.getItem('sex')) {
         item.classList.add(activeClass);
      }

      if (item.getAttribute('data-ration') === localStorage.getItem('ration')) {
         item.classList.add(activeClass);
      }
   });
};

initLocalSettings('#gender', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

const calcTotal = () => {
   if (!sex || !height || !weight || !age || !ration) {
      calcResult.textContent = '____';
      return;
   }

   if (sex === 'female') {
      calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ration);
   } else {
      calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
   }
};

const getStaticInfo = (parentSelector, activeClass) => {
   const elements = document.querySelectorAll(`${parentSelector} div`);

   document.querySelector(parentSelector).addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('calculating__choose-item')) {
         if (target.getAttribute('data-ration')) {
            ration = +target.getAttribute('data-ration');
            localStorage.setItem('ration', +target.getAttribute('data-ration'));
         } else {
            sex = target.getAttribute('id');
            localStorage.setItem('sex', target.getAttribute('id'));
         }

         elements.forEach(item => {
            item.classList.remove(activeClass);
         });

         target.classList.add(activeClass);

         calcTotal();
      }
   });
};

const getDynamicInfo = (selector) => {
   const input = document.querySelector(selector);

   input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
         input.style.border = '1px solid red';
      } else {
         input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
         case 'height':
            height = +input.value;
            break;
         case 'weight':
            weight = +input.value;
            break;
         case 'age':
            age = +input.value;
            break;
      }

      calcTotal();
   });
};

calcTotal();
getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
getDynamicInfo('#height');
getDynamicInfo('#weight');
getDynamicInfo('#age');

// === Calc ===