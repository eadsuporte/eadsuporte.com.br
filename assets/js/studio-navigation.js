/* Controle único do menu Studio. */
(() => {
  'use strict';
  const head = document.querySelector('[data-studio-header]');
  if (!head) return;
  const button = head.querySelector('[data-studio-menu-toggle]');
  const nav = head.querySelector('[data-studio-nav]');
  if (!button || !nav) return;
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); button.focus(); }
  });
  document.addEventListener('click', e => {
    if (!head.contains(e.target)) close();
  });
  const breakpoint = window.matchMedia('(min-width:1191px)');
  if (breakpoint.addEventListener) breakpoint.addEventListener('change', close);
  else if (breakpoint.addListener) breakpoint.addListener(close);
  const path = window.location.pathname.replace(/\/index\.html?$/, '/').replace(/\/$/, '') || '/';
  const current = (() => {
    if (path === '/') return 'Início';
    if (path === '/plugins' || path.startsWith('/plugin/')) return 'Plugins';
    if (path === '/moodle-upgrades') return 'Atualizações';
    if (path === '/service/moodlemobile') return 'Mobile';
    if (path === '/service/moodle-hosting') return 'Preços';
    if (path.startsWith('/case/')) return 'Cases';
    if (path.startsWith('/service/') || path === '/services') return 'Serviços';
    return null;
  })();
  head.querySelectorAll('[data-site-menu]').forEach(a => {
    if (a.dataset.siteMenu === current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const languageLink = head.querySelector('a[hreflang="en"]');
  if (languageLink) languageLink.href = 'https://mylearn.space' + (path === '/' ? '/' : (path.endsWith('.html') ? path : path + '/'));
  const privacy = document.querySelector('[data-open-privacy]');
  if (privacy && !document.querySelector('#privacy-dialog')) privacy.addEventListener('click', () => { window.location.href = '/#contato'; });
  const back = document.querySelector('[data-studio-back-top]');
  if (back && path !== '/') back.setAttribute('href', '/');

  // Um único popup de contato compartilhado pelas páginas brasileiras.
  const contactDialog = document.createElement('dialog');
  contactDialog.className = 'ead-contact-dialog';
  contactDialog.setAttribute('aria-labelledby', 'ead-contact-dialog-title');
  contactDialog.setAttribute('aria-describedby', 'ead-contact-dialog-description');
  contactDialog.innerHTML = [
    '<div class="ead-contact-dialog__head">',
      '<span class="ead-contact-dialog__eyebrow">EaDSuporte • Atendimento</span>',
      '<button class="ead-contact-dialog__close" type="button" aria-label="Fechar janela de contato">×</button>',
    '</div>',
    '<div class="ead-contact-dialog__body">',
      '<h2 id="ead-contact-dialog-title">Fale conosco</h2>',
      '<p id="ead-contact-dialog-description">Como prefere conversar com nossa equipe?</p>',
      '<p class="ead-contact-dialog__context" hidden></p>',
      '<div class="ead-contact-dialog__options">',
        '<a class="ead-contact-dialog__option" data-contact-whatsapp href="https://wa.me/5541996906673" target="_blank" rel="noopener noreferrer">',
          '<span class="ead-contact-dialog__icon" aria-hidden="true">W</span>',
          '<span class="ead-contact-dialog__option-text"><strong>Fale conosco pelo WhatsApp</strong><small>+55 (41) 99690-6673</small></span>',
          '<span class="ead-contact-dialog__arrow" aria-hidden="true">↗</span>',
        '</a>',
        '<a class="ead-contact-dialog__option" data-contact-email href="mailto:contato@eadsuporte.com.br">',
          '<span class="ead-contact-dialog__icon" aria-hidden="true">@</span>',
          '<span class="ead-contact-dialog__option-text"><strong>Fale conosco por e-mail</strong><small>contato@eadsuporte.com.br</small></span>',
          '<span class="ead-contact-dialog__arrow" aria-hidden="true">↗</span>',
        '</a>',
        '<a class="ead-contact-dialog__option" href="tel:+5541996906673">',
          '<span class="ead-contact-dialog__icon" aria-hidden="true">☎</span>',
          '<span class="ead-contact-dialog__option-text"><strong>Fale conosco pelo telefone</strong><small>+55 (41) 99690-6673</small></span>',
          '<span class="ead-contact-dialog__arrow" aria-hidden="true">↗</span>',
        '</a>',
      '</div>',
      '<p class="ead-contact-dialog__note">Escolha um canal para iniciar o contato diretamente.</p>',
    '</div>'
  ].join('');
  document.body.append(contactDialog);
  const closeContact = contactDialog.querySelector('.ead-contact-dialog__close');
  let contactReturnFocus = null;
  function getContactSubject(trigger) {
    const panel = trigger && trigger.closest('.ead-contact-cta');
    const selected = panel && panel.querySelector('[data-selected-upgrade-text]');
    const packageText = selected && selected.textContent.trim();
    const meaningfulPackage = packageText && !/^Escolha um pacote/i.test(packageText);
    const heading = panel && panel.querySelector('h2, h3');
    const headingText = heading && heading.textContent.trim();
    const fromLink = trigger && trigger.dataset.interest;
    const pageTitle = document.querySelector('main h1');
    const topic = (meaningfulPackage && packageText) || fromLink || headingText ||
      (pageTitle && pageTitle.textContent) || 'um projeto Moodle';
    return topic.replace(/\s+/g, ' ').trim().slice(0, 160);
  }
  function openContact(subject, trigger) {
    if (contactDialog.open) return;
    contactReturnFocus = trigger || document.activeElement;
    const topic = (subject || 'um projeto Moodle').trim();
    const context = contactDialog.querySelector('.ead-contact-dialog__context');
    context.textContent = 'Assunto: ' + topic;
    context.hidden = false;
    const message = 'Olá, EaDSuporte! Gostaria de conversar sobre ' + topic + '.';
    contactDialog.querySelector('[data-contact-whatsapp]').href =
      'https://wa.me/5541996906673?text=' + encodeURIComponent(message);
    contactDialog.querySelector('[data-contact-email]').href =
      'mailto:contato@eadsuporte.com.br?subject=' + encodeURIComponent('Contato EaDSuporte - ' + topic);
    contactDialog.showModal();
    document.body.classList.add('ead-contact-active');
    closeContact.focus();
  }
  window.EaDSuporteContact = { open: openContact };
  closeContact.addEventListener('click', () => contactDialog.close());
  contactDialog.addEventListener('click', event => {
    if (event.target === contactDialog) contactDialog.close();
  });
  contactDialog.addEventListener('close', () => {
    document.body.classList.remove('ead-contact-active');
    if (contactReturnFocus && contactReturnFocus.isConnected) {
      contactReturnFocus.focus({ preventScroll: true });
    }
    contactReturnFocus = null;
  });
  document.addEventListener('click', event => {
    const trigger = event.target.closest(
      '[data-contact-open], a[href="#contato"], a[href="/#contato"], a[href="#contact"], a[href="/#contact"]'
    );
    if (!trigger || trigger.closest('dialog')) return;
    event.preventDefault();
    openContact(getContactSubject(trigger), trigger);
  });

})();
