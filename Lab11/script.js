let currentLang = localStorage.getItem('language') || 'uk'; // За замовчуванням українська мова, якщо немає збереженого вибору

// Функція для зміни мови
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang); // Зберігаємо вибір мови в localStorage
  fetchData(); // Завантажити відповідний JSON-файл
}

// Функція для завантаження даних
function fetchData() {
  const langFile = currentLang === 'uk' ? 'products.json' : 'lang-en.json'; // Вибір файлу відповідно до мови

  fetch(langFile)
    .then(response => response.json())
    .then(data => {
      const productContainer = document.getElementById('product-container');
      productContainer.innerHTML = ''; // Очищаємо контейнер перед додаванням нових карток

      data.products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('card-item', 'swiper-slide');

        // Викликаємо функцію для генерації елементів
        productItem.innerHTML = generateProductHTML(product);

        productContainer.appendChild(productItem);
      });

      // Ініціалізація слайдера Swiper
      new Swiper('.slider-wrapper', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      });
    })
    .catch(error => console.error('Error fetching product data:', error));
}

// Універсальна функція для створення HTML-контенту для товару
function generateProductHTML(product) {
  const labelText = product.tags.includes('new') ? (currentLang === 'uk' ? 'Новинка' : 'New') : product.tags.includes('hit') ? (currentLang === 'uk' ? 'Хіт Продаж' : 'Top Sale') : '';
  const buttonText = product.available ? (currentLang === 'uk' ? 'До кошика' : 'Add to Cart') : (currentLang === 'uk' ? 'Нема в наявності' : 'Out of Stock');
  const oldPriceHTML = product.old_price ? `<p class="old-price">${product.old_price} грн</p>` : '';
  const sellPriceClass = product.old_price ? '' : 'no-old-price';
  const sellPrice = product.sell_price || product.price;

  return `
    <p class="catalog">${product.category}</p>
    <p class="item-label ${product.tags.includes('new') ? 'new-item' : product.tags.includes('hit') ? 'hit-item' : ''}">${labelText}</p>
    <img src="${product.image}" class="item-image" alt="${product.name}">
    <h2 class="product-name">${product.name}</h2>
    ${oldPriceHTML}
    <p class="sell-price ${sellPriceClass}">${sellPrice} грн</p>
    <button class="button ${product.available ? '' : 'out-of-stock'}" ${product.available ? '' : 'disabled'}>${buttonText}</button>
  `;
}

// Вибір мови через кнопки
document.getElementById('lang-uk').addEventListener('click', () => switchLanguage('uk'));
document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));

// Завантажити дані відповідно до вибору мови при завантаженні сторінки
fetchData();
