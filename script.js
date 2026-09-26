const services = {
  redno: {
    title: 'Redno čiščenje',
    intro: 'Čist in urejen prostor brez skrbi.',
    text: 'Redno čiščenje je namenjeno vzdrževanju čistega, urejenega in prijetnega doma ali poslovnega prostora.',
    items: ['sesanje in pomivanje tal','brisanje prahu in površin','čiščenje kuhinjskih površin','čiščenje kopalnice in sanitarij','brisanje vrat, kljuk in drugih površin','praznjenje košev','osnovno urejanje prostora'],
    note: 'Čiščenje prilagodimo velikosti prostora, vašim željam in pogostosti obiskov.'
  },
  okna: {
    title: 'Čiščenje oken',
    intro: 'Več svetlobe, čistejši pogled.',
    text: 'Profesionalno čiščenje oken poskrbi za čiste steklene površine brez madežev in sledi.',
    items: ['steklene površine','okenske okvirje','okenske police','balkonska in terasna vrata','težje dostopna okna'],
    note: 'Obseg čiščenja določimo glede na stanje, velikost in dostopnost oken.'
  },
  temeljito: {
    title: 'Temeljito čiščenje',
    intro: 'Ko prostor potrebuje nekaj več.',
    text: 'Temeljito čiščenje je namenjeno prostorom, ki potrebujejo bolj podrobno in intenzivno čiščenje.',
    items: ['po selitvi','pred vselitvijo','po prenovi','po daljšem obdobju brez čiščenja','za generalno osvežitev stanovanja, hiše ali poslovnega prostora'],
    note: 'Posebno pozornost namenimo površinam, kjer se sčasoma nabere več umazanije, prahu in maščob.'
  },
  kuhinje: {
    title: 'Čiščenje kuhinj',
    intro: 'Čista kuhinja je srce urejenega doma.',
    text: 'Kuhinja zahteva posebno pozornost, saj se na površinah hitro nabirajo maščoba, vodni kamen in ostanki hrane.',
    items: ['kuhinjske omarice in fronte','delovne površine','kuhalne površine','napo in zunanje dele','pomivalno korito','stenske obloge','gospodinjske aparate po dogovoru'],
    note: 'Notranjost pečice, hladilnika, omaric in drugih elementov se lahko opravi kot dodatna storitev.'
  },
  kopalnice: {
    title: 'Čiščenje kopalnic',
    intro: 'Sveža, čista in prijetna kopalnica.',
    text: 'Kopalnico očistimo z ustreznimi čistili in posebno pozornost namenimo sanitarnim površinam.',
    items: ['umivalnik','WC školjko','tuš ali kad','armature','ogledala','ploščice','talne površine','odstranjevanje vodnega kamna in oblog'],
    note: 'Obseg čiščenja prilagodimo stanju in potrebam prostora.'
  },
  fasade: {
    title: 'Čiščenje fasad',
    intro: 'Osvežimo videz vaših zunanjih površin.',
    text: 'Profesionalno čiščenje fasade pomaga odstraniti umazanijo, prah, zelene obloge in druge nečistoče, ki se sčasoma naberejo na zunanjih površinah.',
    items: ['stanovanjske hiše','poslovne objekte','garaže','zidove','druge zunanje površine'],
    note: 'Pred izvedbo ocenimo stanje površine in izberemo primeren način čiščenja.'
  },
  dodatne: {
    title: 'Dodatne storitve',
    intro: 'Čiščenje po vaših željah in dogovoru.',
    text: 'Poleg osnovnih storitev nudimo tudi različna dodatna čiščenja glede na vaše potrebe.',
    items: ['čiščenje balkonov in teras','čiščenje garaž','čiščenje stopnišč','čiščenje skladišč','čiščenje po manjših prenovah','čiščenje notranjosti pečic','čiščenje hladilnikov','čiščenje notranjosti omaric','odstranjevanje trdovratnih oblog','dezinfekcija prostorov po dogovoru'],
    note: 'Za večje ali zahtevnejše storitve pripravimo ponudbo glede na obseg dela.'
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
}, {rootMargin:'-25% 0px -60% 0px', threshold:[0,.15,.5]});
sections.forEach(s => observer.observe(s));

const serviceModal = document.getElementById('service-modal');
const modalTitle = document.getElementById('service-modal-title');
const modalContent = document.getElementById('service-modal-content');
document.querySelectorAll('.service-more').forEach(btn => btn.addEventListener('click', () => {
  const s = services[btn.dataset.service];
  if (!s) return;
  modalTitle.textContent = s.title;
  modalContent.innerHTML = `<p><strong>${s.intro}</strong></p><p>${s.text}</p><ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul><p>${s.note}</p>`;
  serviceModal.showModal();
}));
serviceModal?.querySelector('.modal-close').addEventListener('click', () => serviceModal.close());
serviceModal?.querySelector('.modal-cta').addEventListener('click', () => serviceModal.close());
serviceModal?.addEventListener('click', e => { if (e.target === serviceModal) serviceModal.close(); });

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
document.querySelectorAll('.gallery-item').forEach(btn => btn.addEventListener('click', () => {
  lightboxImage.src = btn.dataset.src;
  lightboxImage.alt = btn.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox?.querySelector('.modal-close').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Prosimo, izpolnite vsa obvezna polja.';
    status.style.color = '#b42318';
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Povpraševanje DALIJA – ${data.get('service')}`);
  const body = encodeURIComponent(
    `Ime in priimek: ${data.get('name')}\n` +
    `E-pošta: ${data.get('email')}\n` +
    `Telefon: ${data.get('phone') || '-'}\n` +
    `Storitev: ${data.get('service')}\n\n` +
    `Sporočilo:\n${data.get('message')}`
  );
  status.textContent = 'Odpiram vaš e-poštni program …';
  status.style.color = '#078b87';
  window.location.href = `mailto:info@cistilniservis-dalija.si?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();