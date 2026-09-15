document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
      toggle.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'เปิดเมนู');
      toggle.textContent = '☰';
    }));
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = 'your.email@example.com';
      const subject = encodeURIComponent(data.get('subject') || `ข้อความจาก ${data.get('name')}`);
      const body = encodeURIComponent(`ชื่อ: ${data.get('name')}\nอีเมล: ${data.get('email')}\n\n${data.get('message')}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'กำลังเปิดโปรแกรมอีเมลของคุณ...';
    });
  }
});
