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
map.addControl(new mapboxgl.NavigationControl());

const createMetroCard = ({ time, price, metro }) =>
  `
    <img src="${metro.image}"
      alt="${metro.name}">
    <div class="metro-info">
      <h1>${metro.name}</h1>
      <div>Schedule: <span class="value">${time}</span></div>
      <div>Price: <span class="value">₹ ${price}</span></div>
      <div id="buy-ticket">Buy Ticket</div>
    </div>
  `;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const from = document.querySelector('#from').value;
  const to = document.querySelector('#to').value;
  const bookings = document.querySelector('#bookings').value;

  const responseJSON = await fetch(
    `/metro?from=${from}&to=${to}&bookings=${bookings}`
  );
  const response = await responseJSON.json();
  console.log(response);

  if (response.message) {
    const errorMessage = `
      <h1 class="error-message">${response.message}</h1>
    `;
    console.log(errorMessage);
    metro.innerHTML = errorMessage;
    return;
  }

  const {
    schedule,
    coords: { latitude, longitude },
    session_id,
  } = response;

  metro.innerHTML = createMetroCard(schedule);
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
