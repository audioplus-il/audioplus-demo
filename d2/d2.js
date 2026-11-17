/* Audio Plus demo interactions: sticky nav, smart-home widget, contact form */
(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'he';

  /* --- sticky nav --- */
  var nav = document.querySelector('.d-nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.d-nav-burger');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? (lang === 'en' ? 'Close menu' : 'סגירת תפריט') : (lang === 'en' ? 'Open menu' : 'פתיחת תפריט'));
    });
    nav.querySelectorAll('.d-nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- smart-home demo widget --- */
  var hero = document.querySelector('.d-hero');
  var note = document.querySelector('[data-note]');
  var T = {
    he: {
      idle: 'לחצו על אחד המערכות כדי לראות את ההדמיה',
      lights: { on: 'דולק - 80%', off: 'כבוי', msgOn: 'התאורה נדלקת בהדרגה בכל הבית', msgOff: 'התאורה נכבית' },
      blinds: { on: 'סגורים', off: 'פתוחים', msgOn: 'הווילונות יורדים בשקט', msgOff: 'הווילונות נפתחים לאור הבוקר' },
      ac: { on: '23°', off: 'כבוי', msgOn: 'המיזוג מכוון ל-23 מעלות', msgOff: 'המיזוג נכבה' },
      music: { on: 'ג׳אז רך בסלון', off: 'כבוי', msgOn: 'מנגן ג׳אז רך בכל רמקולי הבית', msgOff: 'המוסיקה מושתקת' }
    },
    en: {
      idle: 'Tap a system to see the demo',
      lights: { on: 'On - 80%', off: 'Off', msgOn: 'The lights fade up across the house', msgOff: 'The lights fade out' },
      blinds: { on: 'Closed', off: 'Open', msgOn: 'The shades lower quietly', msgOff: 'The shades open to the morning light' },
      ac: { on: '23°', off: 'Off', msgOn: 'Climate set to 23 degrees', msgOff: 'Climate off' },
      music: { on: 'Soft jazz in the lounge', off: 'Off', msgOn: 'Soft jazz plays through the whole-home speakers', msgOff: 'Music muted' }
    }
  }[lang];
  document.querySelectorAll('.d-tgl').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sys = btn.getAttribute('data-sys');
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var st = btn.querySelector('.d-tgl-st');
      var t = T[sys];
      if (st && t) st.textContent = on ? t.on : t.off;
      if (note && t) note.textContent = on ? t.msgOn : t.msgOff;
      if (hero) {
        if (sys === 'lights') hero.classList.toggle('lights-on', on);
        if (sys === 'blinds') hero.classList.toggle('blinds-closed', on);
      }
    });
  });

  /* --- contact form: compose a WhatsApp message (demo, no backend) --- */
  var form = document.getElementById('contactForm');
  if (form) {
    var fnote = form.querySelector('[data-form-note]');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var msg = form.message.value.trim();
      var bad = null;
      if (!name) bad = 'name'; else if (!phone) bad = 'phone';
      form.name.classList.toggle('d-err', bad === 'name');
      form.phone.classList.toggle('d-err', bad === 'phone');
      if (bad) {
        if (fnote) { fnote.textContent = lang === 'en' ? 'Please fill in your name and phone number.' : 'נא למלא שם וטלפון.'; fnote.classList.add('err'); fnote.classList.remove('ok'); }
        form[bad].focus();
        return;
      }
      var text = lang === 'en'
        ? 'Hello Aspire Home Audio Plus! My name is ' + name + ' (' + phone + '). ' + (msg || 'I would like to book a consultation.')
        : 'שלום אספייר הום אודיו פלוס! שמי ' + name + ' (' + phone + '). ' + (msg || 'אשמח לקבוע פגישת ייעוץ.');
      window.open('https://wa.me/972502552212?text=' + encodeURIComponent(text), '_blank', 'noopener');
      if (fnote) {
        fnote.textContent = lang === 'en'
          ? 'Opening WhatsApp with your message - we will get back to you within one business day.'
          : 'ההודעה נפתחת בוואטסאפ - נחזור אליכם תוך יום עבודה.';
        fnote.classList.add('ok'); fnote.classList.remove('err');
      }
      form.reset();
    });
  }
})();
