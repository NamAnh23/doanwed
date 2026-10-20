import './styles.css';

const images = {
  hero: '/manus-storage/async-images/gdfai50Vs9cYBiG1ozTSAx/image-1.webp',
  dishes: [
    '/manus-storage/async-images/gdfai50Vs9cYBiG1ozTSAx/image-2.webp',
    '/manus-storage/async-images/gdfai50Vs9cYBiG1ozTSAx/image-3.webp',
    '/manus-storage/async-images/xj76ALhFXpcmrGf0nof5N4/image-1.webp',
    '/manus-storage/async-images/xj76ALhFXpcmrGf0nof5N4/image-2.webp',
    '/manus-storage/async-images/xj76ALhFXpcmrGf0nof5N4/image-3.webp',
  ],
  space: [
    '/manus-storage/async-images/gdfai50Vs9cYBiG1ozTSAx/image-4.webp',
    '/manus-storage/async-images/gdfai50Vs9cYBiG1ozTSAx/image-5.webp',
  ],
};

const dishes = [
  { name: 'Bún cá cay Bembon', type: 'Món chủ đạo', text: 'Bát bún nóng hổi với cá, rau thơm và vị cay đặc trưng.', image: images.dishes[0] },
  { name: 'Bún cá cá giòn', type: 'Đậm vị', text: 'Miếng cá vàng giòn, kết hợp cùng sợi bún mềm và nước dùng nóng.', image: images.dishes[1] },
  { name: 'Bún cá rau thơm', type: 'Tươi mát', text: 'Hương rau thơm và hành xanh làm bát bún thêm tròn vị.', image: images.dishes[2] },
  { name: 'Bát cay vừa đủ', type: 'Gọi theo vị bạn thích', text: 'Một lựa chọn dễ bắt đầu cho buổi sáng hoặc bữa ăn thân mật.', image: images.dishes[3] },
  { name: 'Cá vàng & nước dùng', type: 'Bembon selection', text: 'Cá nóng, nước dùng thơm — gọi thêm chút cay cho đúng gu.', image: images.dishes[4] },
];

const reasons = [
  { number: '01', title: 'Tập trung vào bún cá cay', text: 'Bembon chọn một món chủ đạo rõ ràng để mỗi lần ghé là một lần ăn đúng vị mình thích.' },
  { number: '02', title: 'Bắt đầu ngày từ 6h30', text: 'Mở cửa từ 6h30 đến 22h, phù hợp cho một bữa sáng nóng hổi hoặc một bữa ăn thân mật cuối ngày.' },
  { number: '03', title: 'Cho mọi người', text: 'Bembon hướng tới tất cả mọi người — ghé một mình, đi cùng gia đình hay hẹn bạn bè đều được.' },
  { number: '04', title: 'Ở Hoàng Mai, Hà Nội', text: 'Một địa chỉ thân thuộc để bạn tìm đến khi muốn một bát bún cá cay nóng và dễ gọi món.' },
];

const news = [
  { tag: 'ĐANG CẬP NHẬT', title: 'Tin mới từ Bembon', text: 'Thông tin về món mới, câu chuyện quán và những điều Bembon muốn chia sẻ sẽ được cập nhật tại đây.' },
  { tag: 'ĐANG CẬP NHẬT', title: 'Góc ăn ngon mỗi ngày', text: 'Một góc nhỏ để lưu lại những khoảnh khắc bát bún vừa bưng ra và vị cay vừa chạm môi.' },
  { tag: 'ĐANG CẬP NHẬT', title: 'Hẹn bạn ở Hoàng Mai', text: 'Theo dõi website để không bỏ lỡ những thông tin mới nhất từ Bembon.' },
];

const dishMarkup = dishes.map((dish, index) => `
  <article class="dish-card reveal ${index === 0 ? 'dish-card--featured' : ''}">
    <div class="dish-card__image-wrap">
      <img class="dish-card__image" src="${dish.image}" alt="${dish.name}" loading="lazy" />
      <span class="dish-card__index">0${index + 1}</span>
    </div>
    <div class="dish-card__body">
      <span class="eyebrow">${dish.type}</span>
      <h3>${dish.name}</h3>
      <p>${dish.text}</p>
      <span class="price-note">Giá: đang cập nhật</span>
    </div>
  </article>
`).join('');

const reasonMarkup = reasons.map((reason) => `
  <article class="reason reveal">
    <span class="reason__number">${reason.number}</span>
    <div><h3>${reason.title}</h3><p>${reason.text}</p></div>
  </article>
`).join('');

const newsMarkup = news.map((item, index) => `
  <article class="news-card reveal">
    <div class="news-card__top"><span>${item.tag}</span><span>0${index + 1}</span></div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    <a href="#lien-he" class="text-link">Xem thông tin <span>↗</span></a>
  </article>
`).join('');

document.querySelector('#app').innerHTML = `
  <div class="site-shell">
    <header class="site-header" id="top">
      <a class="brand" href="#top" aria-label="Bembon — về đầu trang">
        <span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><path class="fish-body" d="M9 24c3-7 10-11 18-11 6 0 11 2 15 6l3-4v18l-3-4c-4 4-9 6-15 6-8 0-15-4-18-11Z"/><path class="fish-tail" d="M9 24 3 17v14l6-7Z"/><path class="fish-fin" d="M22 14c1-4 5-6 8-5-1 4-4 6-8 7Z"/><circle class="fish-eye" cx="34" cy="20" r="1.7"/></svg></span>
        <span class="brand__text"><strong>Bembon</strong><small>bún cá cay</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false"><span></span><span></span></button>
      <nav class="site-nav" aria-label="Điều hướng chính">
        <a href="#gioi-thieu">Giới thiệu</a>
        <a href="#thuc-don">Thực đơn</a>
        <a href="#khong-gian">Không gian</a>
        <a href="#tin-tuc">Tin tức</a>
        <a href="#lien-he">Liên hệ</a>
      </nav>
      <a class="header-cta" href="#dat-ban">Đặt bàn <span>↗</span></a>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <img class="hero__image" src="${images.hero}" alt="Bát bún cá cay nóng hổi của Bembon" />
        <div class="hero__overlay"></div>
        <div class="hero__content">
          <span class="hero__kicker"><i></i> Hoàng Mai · Hà Nội</span>
          <h1 id="hero-title">Ăn là<br /><em>ghiền.</em></h1>
          <p>Bát bún cá cay nóng hổi, vị thân quen và một nơi thật dễ ghé.</p>
          <div class="hero__actions">
            <a class="button button--primary" href="#thuc-don">Xem thực đơn <span>↗</span></a>
            <a class="button button--ghost" href="#gioi-thieu">Câu chuyện Bembon</a>
          </div>
        </div>
        <div class="hero__stamp" aria-hidden="true"><span>BB</span><small>EST.<br />HOÀNG MAI</small></div>
        <a class="scroll-cue" href="#gioi-thieu"><span>Cuộn để khám phá</span><i></i></a>
      </section>

      <section class="intro section-pad" id="gioi-thieu">
        <div class="section-label"><span>01</span><span>Chuyện Bembon</span></div>
        <div class="intro__content">
          <p class="lead reveal">Có những ngày chỉ cần một bát bún nóng là thấy mọi thứ <em>dịu lại.</em></p>
          <div class="intro__copy reveal">
            <p>Bembon là một điểm hẹn bún cá cay tại Hoàng Mai, Hà Nội — nơi món ăn được gọi tên thật rõ ràng và cảm giác ghé quán thì thật thân thiện.</p>
            <p>Từ 6h30 đến 22h, bát bún nóng hổi luôn sẵn sàng. Đến một mình hay đi cùng mọi người, cứ gọi món bạn thấy ngon là được.</p>
            <a href="#thuc-don" class="text-link">Khám phá vị Bembon <span>↗</span></a>
          </div>
        </div>
      </section>

      <section class="menu-section section-pad" id="thuc-don">
        <div class="section-heading reveal">
          <div><div class="section-label"><span>02</span><span>Thực đơn</span></div><h2>Một bát nóng.<br /><em>Một vị nhớ.</em></h2></div>
          <p>Thực đơn Bembon tập trung vào những lựa chọn bún cá cay dễ gọi, dễ ăn và dễ thương.</p>
        </div>
        <div class="dish-grid">${dishMarkup}</div>
        <p class="menu-disclaimer">* Giá món đang được cập nhật. Vui lòng liên hệ Bembon để biết thông tin mới nhất.</p>
      </section>

      <section class="reasons-section section-pad">
        <div class="reasons-intro reveal"><div class="section-label"><span>03</span><span>Vì sao là Bembon?</span></div><h2>Thật lòng với món ăn,<br /><em>tử tế với người ghé.</em></h2></div>
        <div class="reasons-list">${reasonMarkup}</div>
      </section>

      <section class="space-section section-pad" id="khong-gian">
        <div class="space-heading reveal"><div class="section-label"><span>04</span><span>Không gian</span></div><h2>Ghé một chút,<br /><em>ngồi lâu một chút.</em></h2><p>Những góc nhỏ mang tinh thần Bembon — sáng, gần gũi và đủ để bữa ăn trở nên dễ chịu hơn.</p></div>
        <div class="space-gallery">
          <button class="gallery-item gallery-item--large reveal" type="button" data-image="${images.space[0]}" data-alt="Không gian Bembon tại Hoàng Mai"><img src="${images.space[0]}" alt="Không gian Bembon tại Hoàng Mai" loading="lazy" /><span class="gallery-caption">Góc Bembon <b>↗</b></span></button>
          <button class="gallery-item gallery-item--small reveal" type="button" data-image="${images.space[1]}" data-alt="Bàn ăn tại Bembon"><img src="${images.space[1]}" alt="Bàn ăn tại Bembon" loading="lazy" /><span class="gallery-caption">Bàn ăn của bạn <b>↗</b></span></button>
          <div class="gallery-note reveal"><span class="gallery-note__mark">✦</span><p>Chưa có ảnh thực tế? <strong>Đây là hình ảnh minh họa</strong> theo tinh thần không gian Bembon.</p></div>
        </div>
      </section>

      <section class="news-section section-pad" id="tin-tuc">
        <div class="section-heading reveal"><div><div class="section-label"><span>05</span><span>Tin tức & sự kiện</span></div><h2>Chuyện mới,<br /><em>sẽ kể bạn nghe.</em></h2></div><p>Bembon đang chuẩn bị những câu chuyện đầu tiên. Ghé lại đây để cập nhật nhé.</p></div>
        <div class="news-grid">${newsMarkup}</div>
      </section>

      <section class="booking-section section-pad" id="dat-ban">
        <div class="booking-card reveal">
          <div class="booking-card__intro"><div class="section-label"><span>06</span><span>Đặt bàn</span></div><h2>Hẹn nhau<br /><em>ở Bembon.</em></h2><p>Để lại thông tin, Bembon sẽ ghi nhận yêu cầu và lưu lại để quán tiện liên hệ với bạn.</p><div class="booking-card__aside"><span>Giờ mở cửa</span><strong>6h30 – 22h</strong></div></div>
          <form class="booking-form" id="booking-form">
            <label>Họ và tên <span>*</span><input name="name" type="text" autocomplete="name" placeholder="Tên của bạn" required /></label>
            <label>Số điện thoại <span>*</span><input name="phone" type="tel" autocomplete="tel" placeholder="0981******" pattern="[0-9*+\\s-]{7,}" required /></label>
            <label>Email <small>không bắt buộc</small><input name="email" type="email" autocomplete="email" placeholder="email@example.com" /></label>
            <label>Số khách <span>*</span><select name="guests" required><option value="" disabled selected>Chọn số khách</option><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option><option>5+ người</option></select></label>
            <button class="button button--dark" type="submit">Gửi yêu cầu đặt bàn <span>↗</span></button>
            <p class="form-status" id="form-status" role="status"></p>
          </form>
        </div>
      </section>

      <section class="contact-section section-pad" id="lien-he">
        <div class="contact-section__intro reveal"><div class="section-label"><span>07</span><span>Liên hệ</span></div><h2>Ghé Bembon<br /><em>khi bạn muốn.</em></h2></div>
        <div class="contact-grid reveal">
          <div class="contact-item"><span>Địa chỉ</span><strong>Hoàng Mai,<br />Hà Nội</strong><small>Google Maps: đang cập nhật</small></div>
          <div class="contact-item"><span>Điện thoại</span><strong>0981******</strong><small>Vui lòng gọi để biết thông tin mới nhất</small></div>
          <div class="contact-item"><span>Giờ mở cửa</span><strong>6h30 – 22h</strong><small>Mở cửa mỗi ngày</small></div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-top"><a class="brand brand--footer" href="#top"><span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><path class="fish-body" d="M9 24c3-7 10-11 18-11 6 0 11 2 15 6l3-4v18l-3-4c-4 4-9 6-15 6-8 0-15-4-18-11Z"/><path class="fish-tail" d="M9 24 3 17v14l6-7Z"/><path class="fish-fin" d="M22 14c1-4 5-6 8-5-1 4-4 6-8 7Z"/><circle class="fish-eye" cx="34" cy="20" r="1.7"/></svg></span><span class="brand__text"><strong>Bembon</strong><small>bún cá cay</small></span></a><p>Bát nóng vừa bưng,<br /><em>vị cay vừa đủ.</em></p><a class="button button--primary" href="#dat-ban">Đặt bàn ngay <span>↗</span></a></div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Bembon</span><span>Ăn là ghiền</span><a href="#top">Về đầu trang ↑</a></div>
    </footer>
  </div>
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh không gian" aria-hidden="true"><button class="lightbox__close" type="button" aria-label="Đóng ảnh">×</button><img src="" alt="" /></div>
`;

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

document.querySelectorAll('.reveal').forEach((element) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { element.classList.add('is-visible'); observer.unobserve(element); }
  }, { threshold: 0.12 });
  observer.observe(element);
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const closeLightbox = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); };
document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.dataset.alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}));
lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

document.querySelector('#booking-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  const button = event.target.querySelector('button');
  const formData = new FormData(event.target);
  button.disabled = true;
  button.textContent = 'Đang gửi...';
  status.classList.remove('is-success');
  status.textContent = '';

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Không thể gửi yêu cầu.');
    status.textContent = 'Đã lưu yêu cầu đặt bàn. Bembon sẽ liên hệ lại với bạn.';
    status.classList.add('is-success');
    event.target.reset();
    button.textContent = 'Đã ghi nhận ✓';
  } catch (error) {
    status.textContent = error.message || 'Có lỗi xảy ra, vui lòng thử lại.';
    button.textContent = 'Gửi lại yêu cầu ↗';
  } finally {
    button.disabled = false;
  }
});
