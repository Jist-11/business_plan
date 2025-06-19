// Plans
const plans = [
  {
    name: 'Basic',
    price: '₹200',
    features: ['1-Page Portfolio', 'Responsive Design', 'Contact Form'],
    popular: false
  },
  {
    name: 'Standard',
    price: '₹300',
    features: ['3-Page Portfolio', 'Responsive Design', 'Project Gallery', 'Contact Form'],
    popular: true
  },
  {
    name: 'Premium',
    price: '₹400',
    features: ['Multi-Page Portfolio', 'Custom Design', 'Project Gallery', 'Contact Form', 'Priority Support'],
    popular: false
  }
];

const plansContainer = document.getElementById('plans-container');

plans.forEach((plan, index) => {
  const card = document.createElement('div');
  card.classList.add('plan-card');
  if (plan.popular) card.classList.add('popular');

  card.innerHTML = `
    <h2>${plan.name}</h2>
    <p class="price">${plan.price}</p>
    <ul>
      ${plan.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <button class="cta-btn">Book Now</button>
  `;

  setTimeout(() => card.classList.add('show'), 200 * index);

  card.querySelector('.cta-btn').addEventListener('click', () => {
    window.open('https://forms.gle/sRxeSVGx6SPJ9jhWA', '_blank');
    confetti.start();
    setTimeout(() => confetti.stop(), 3000);
  });

  plansContainer.appendChild(card);
});

// Countdown
const countdown = document.getElementById('countdown');
const endDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  countdown.textContent = `Limited Slots: ${d}d ${h}h ${m}m ${s}s left!`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
let current = 0;

setInterval(() => {
  testimonials[current].classList.remove('active');
  current = (current + 1) % testimonials.length;
  testimonials[current].classList.add('active');
}, 4000);

// Particles.js config
particlesJS.load('particles-js', 'particles.json');