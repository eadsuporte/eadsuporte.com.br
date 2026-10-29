# Landing pages — EaDSuporte

Estrutura de campanhas planejadas: **12 landing pages de serviços** e **1 landing de plugin (Kopere BI, apresentado como relatórios Moodle)**.

| Página | Palavra-chave exclusiva | Orçamento inicial hipotético/mês |
|---|---|---:|
| [Hospedagem Moodle](./hospedagem-moodle/index.html) | `hospedagem moodle` | R$ 1.500 |
| [Atualização Moodle](./atualizacao-moodle/index.html) | `atualização moodle` | R$ 900 |
| [Performance Moodle](./performance-moodle/index.html) | `otimização de desempenho moodle` | R$ 800 |
| [Migração Moodle](./migracao-moodle/index.html) | `migração moodle` | R$ 800 |
| [Suporte técnico Moodle](./suporte-moodle/index.html) | `suporte técnico moodle` | R$ 650 |
| [Desenvolvimento de plugins Moodle](./desenvolvimento-plugins-moodle/index.html) | `desenvolvimento de plugins moodle` | R$ 800 |
| [Integrações Moodle](./integracao-moodle/index.html) | `integração moodle com sistemas` | R$ 700 |
| [Personalização de temas Moodle](./personalizacao-tema-moodle/index.html) | `personalização de tema moodle` | R$ 400 |
| [Treinamento Moodle](./treinamento-moodle/index.html) | `treinamento moodle para professores` | R$ 400 |
| [Aplicativo Moodle personalizado](./aplicativo-moodle/index.html) | `aplicativo moodle personalizado` | R$ 800 |
| [MyHome para Moodle](./myhome-moodle/index.html) | `página inicial personalizada moodle` | R$ 550 |
| [Subplugins Kopere Dashboard](./subplugins-kopere-dashboard/index.html) | `subplugins kopere dashboard` | R$ 400 |
| [Relatórios Moodle com Kopere BI](./relatorios-moodle/index.html) | `relatórios moodle` | R$ 0 |

Cada pasta contém `index.html` e `campanha.md`. O arquivo Markdown documenta SEO, anúncios, palavras negativas, argumentos de vendas, orçamento e simulações comerciais. Orçamentos são hipóteses e **não** representam campanhas ativas.

As páginas reutilizam o menu institucional da EAD Suporte sem criar links novos na home ou no catálogo de navegação. Os arquivos compartilhados ficam em `assets`. A categoria plugins inclui **somente Kopere BI**, sem licença paga: o plugin gratuito é apresentado como relatórios, e a implantação pode ser orçada como serviço.

**Publicação e validação:** o envio de formulários reutiliza o endpoint existente do site e precisa de teste real antes de lançar anúncios. Revisar também o rastreamento de conversão, canibalização SEO e o fato de esta documentação comercial ficar em repositório público.

## Arquivos e fontes

Os recursos CSS/JS usam `/landing-pages/assets/` (sem prefixo `_`) para compatibilidade com o publicador do GitHub Pages. As landings utilizam fontes de sistema como fallback para não depender dos arquivos WOFF2 de outro domínio bloqueados por CORS. Não substitui a folha de fontes do restante do site.
