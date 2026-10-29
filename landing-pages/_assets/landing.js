/* Mantém o menu original; corrige apenas a rota do seletor de idioma em páginas de campanha. */
document.addEventListener("DOMContentLoaded", () => {
  const routes = {"hospedagem-moodle":"service/moodle-hosting","atualizacao-moodle":"moodle-upgrades","performance-moodle":"service/performance-optimisation","migracao-moodle":"service/migration","suporte-moodle":"service/support-maintenance","desenvolvimento-plugins-moodle":"service/custom-development","integracao-moodle":"service/integrations","personalizacao-tema-moodle":"service/themes-customisation","treinamento-moodle":"service/training","aplicativo-moodle":"service/moodlemobile","myhome-moodle":"service/local-myhome","subplugins-kopere-dashboard":"service/local-kopere-dashboard","relatorios-moodle":"plugin/local_kopere_bi"};
  const slug = location.pathname.match(/^\/landing-pages\/([^/]+)/)?.[1];
  const en = document.querySelector('[data-studio-header] a[hreflang="en"]');
  const pt = document.querySelector('[data-studio-header] a[hreflang="pt-BR"]');
  if (slug && routes[slug] && en) en.href = "https://mylearn.space/" + routes[slug] + "/";
  if (pt) pt.href = location.pathname;
  document.querySelectorAll(".lp-form").forEach(form => {
    const input = form.querySelector('[name="landing_source"]');
    if (input) input.value = location.href;
  });
});