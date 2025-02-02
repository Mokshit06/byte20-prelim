const form = document.querySelector('#search-form');
const metro = document.querySelector('#metro');
const stripe = Stripe(
  'pk_test_51HFjqKKaWtllu6cPzKBPF57PCkFWpDJD5rVscsB5wgONo98XERSJyvXPknBW3n71UBR5M9gt8yF5md7Nio6Pesp600UK7dwmEr'
);
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2Fobmluc2giLCJhIjoiY2s4ODJlOXM0MDNweDNvbXEzZW92eGdwOSJ9.OQi8qRzqCtnMnETnRpBo0g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mokshit06/cke7d1cu73yon19og3kxseglc',
  zoom: 1,
});

let width = window.innerWidth;
const navigation = new mapboxgl.NavigationControl();

if (window.innerWidth > 800) {
  map.addControl(navigation);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    map.addControl(navigation);
  } else {
    map.removeControl(navigation);
  }
});

const createMetroCard = ({ time, price, metro }, bookings) =>
  `
    <img src="${metro.image}"
      alt="${metro.name}">
    <div class="metro-info">
      <h1>${metro.name}</h1>
      <div>Schedule: <span class="value">${time}</span></div>
      <div>Price: <span class="value">₹ ${
        price * bookings
      } </span>(₹ ${price} each)</div>
      <div id="buy-ticket">Buy Ticket</div>
    </div>
  `;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const from = document.querySelector('#from').value;
  const to = document.querySelector('#to').value;
  const bookings = document.querySelector('#bookings').value;

  if (bookings < 1) {
    const errorMessage = `
      <h1 class="error-message">Bookings should be greater than 0</h1>
    `;
    metro.innerHTML = errorMessage;
    return;
  }

  const responseJSON = await fetch(
    `/metro?from=${from}&to=${to}&bookings=${bookings}`
  );
  const response = await responseJSON.json();

  if (response.message && response.message.includes('Schedule')) {
    const errorMessage = `
      <h1 class="error-message">${response.message}</h1>
    `;
    metro.innerHTML = errorMessage;
    return;
  }

  const {
    schedule,
    coords: { latitude, longitude },
    session_id,
  } = response;

  metro.innerHTML = createMetroCard(schedule, bookings);
  metro.querySelector('img').style.height = `${
    metro.querySelector('.metro-info').clientHeight
  }px`;

  map.flyTo({
    center: [longitude, latitude],
    zoom: 9,
    speed: 1,
    curve: 2,
  });

  const buyBtn = metro.querySelector('#buy-ticket');
  buyBtn.addEventListener('click', async () => {
    await stripe.redirectToCheckout({
      sessionId: session_id,
    });
  });
});
