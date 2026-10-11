(() => {
  'use strict';
  const projects = window.CADMIUM_PROJECTS;
  const $ = id => document.getElementById(id);
  const grid = $('project-grid');
  const search = $('search');
  const sort = $('sort');
  const filters = $('tag-filters');
  const normalise = text => text.normalize('NFKC').toLocaleLowerCase('ja').replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const kindOf = project => project.kind || 'game';
  const tagCounts = new Map();
  projects.forEach(project => project.tags.forEach(tag => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)));
  const preferredTags = ['お絵かき', 'アクション', '育成', '対戦', 'パズル', 'RPG', 'カード', '育成支援', 'デザイン', '図解'];
  const tags = [...new Set([...preferredTags.filter(tag => tagCounts.has(tag)), ...tagCounts.keys()])];
  const params = new URLSearchParams(location.search);
  let activeTag = tags.includes(params.get('tag')) ? params.get('tag') : '';
  let activeKind = ['game', 'tool'].includes(params.get('kind')) ? params.get('kind') : '';
  if (activeTag && activeKind && !projects.some(p => kindOf(p) === activeKind && p.tags.includes(activeTag))) activeTag = '';
  let expandedTags = false;
  let view = params.get('view') === 'list' ? 'list' : 'grid';
  search.value = (params.get('q') || '').slice(0, 100);
  sort.value = ['name-asc', 'name-desc'].includes(params.get('sort')) ? params.get('sort') : 'default';
  let visibleProjects = [];

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(svg.namespaceURI, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.append(use);
    return svg;
  }
  function externalLink(href, className, label) {
    const link = make('a', className);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (label) link.setAttribute('aria-label', label + '（新しいタブで開く）');
    return link;
  }
  function createCard(project, position) {
    const card = make('article', 'project-card');
    card.dataset.kind = kindOf(project);
    card.style.animationDelay = Math.min(position * 35, 180) + 'ms';
    card.style.setProperty('--cover-color', project.color);
    if (project.position) card.style.setProperty('--cover-position', project.position);
    const imageLink = externalLink(project.url, 'project-image-link', project.title + 'を開く');
    if (project.coverStyle) imageLink.classList.add('cover-' + project.coverStyle);
    const image = make('img', 'project-image');
    image.src = project.image;
    image.alt = project.imageAlt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 680;
    image.height = 400;
    const number = make('span', 'card-index', String(project.order).padStart(2, '0'));
    number.append(make('span', '', '/'), document.createTextNode(kindOf(project) === 'tool' ? 'TOOL' : 'GAME'));
    const arrow = make('span', 'cover-arrow');
    arrow.append(icon('arrow'));
    imageLink.append(image, number, arrow);
    if (project.coverStyle === 'punch') {
      const lettering = make('span', 'punch-lettering', 'PUNCH!');
      lettering.setAttribute('aria-hidden', 'true');
      imageLink.append(lettering);
    }
    const body = make('div', 'card-body');
    const kicker = make('div', 'card-kicker', project.subtitle);
    const title = make('h3', 'card-title');
    const titleLink = externalLink(project.url, '', project.title);
    titleLink.textContent = project.title;
    title.append(titleLink);
    const description = make('p', 'card-description', project.description);
    const tagRow = make('div', 'card-tags');
    project.tags.forEach(tag => {
      const button = make('button', 'card-tag', '# ' + tag);
      button.type = 'button';
      button.dataset.tag = tag;
      button.setAttribute('aria-label', tag + 'の作品で絞り込む');
      tagRow.append(button);
    });
    const footer = make('div', 'card-footer');
    const play = externalLink(project.url, 'play-link', project.title + 'を開く');
    play.append(document.createTextNode(kindOf(project) === 'tool' ? '使ってみる' : '遊んでみる'), icon('arrow'));
    const source = externalLink(project.github, 'source-link', project.title + 'のGitHub');
    source.append(icon('github'), document.createTextNode('GitHub'));
    footer.append(play, source);
    body.append(kicker, title, description, tagRow, footer);
    card.append(imageLink, body);
    return card;
  }
  function renderFilters() {
    filters.replaceChildren();
    const kindProjects = projects.filter(p => !activeKind || kindOf(p) === activeKind);
    const availableTags = tags.filter(tag => kindProjects.some(p => p.tags.includes(tag)));
    const displayedTags = expandedTags ? availableTags : availableTags.filter((tag, index) => index < 6 || tag === activeTag);
    [['', '全タグ', kindProjects.length], ...displayedTags.map(tag => [tag, tag, kindProjects.filter(p => p.tags.includes(tag)).length])].forEach(([tag, title, count]) => {
      const button = make('button', 'filter-chip' + (activeTag === tag ? ' active' : ''));
      button.type = 'button';
      button.dataset.tag = tag;
      button.setAttribute('aria-pressed', String(activeTag === tag));
      button.append(document.createTextNode(title), make('span', 'chip-count', String(count).padStart(2, '0')));
      filters.append(button);
    });
    if (availableTags.length > 6) {
      const more = make('button', 'filter-chip more-tags', expandedTags ? 'タグをたたむ −' : 'ほかのタグ ＋');
      more.type = 'button';
      more.id = 'more-tags';
      more.setAttribute('aria-expanded', String(expandedTags));
      more.addEventListener('click', () => { expandedTags = !expandedTags; renderFilters(); $('more-tags')?.focus({preventScroll:true}); });
      filters.append(more);
    }
    [...$('kind-filters').querySelectorAll('button')].forEach(button => {
      const selected = button.dataset.kind === activeKind;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('.kind-count').textContent = String(projects.filter(p => !button.dataset.kind || kindOf(p) === button.dataset.kind).length);
    });
  }
  function syncUrl() {
    const url = new URL(location.href);
    ['tag', 'kind', 'q', 'sort', 'view'].forEach(key => url.searchParams.delete(key));
    if (activeTag) url.searchParams.set('tag', activeTag);
    if (activeKind) url.searchParams.set('kind', activeKind);
    if (search.value.trim()) url.searchParams.set('q', search.value.trim());
    if (sort.value !== 'default') url.searchParams.set('sort', sort.value);
    if (view === 'list') url.searchParams.set('view', view);
    try { history.replaceState(null, '', url); } catch (_) { /* file:// preview can still filter */ }
  }
  function updateView() {
    grid.classList.toggle('list-mode', view === 'list');
    ['grid', 'list'].forEach(mode => {
      const button = $(mode + '-view');
      button.classList.toggle('active', view === mode);
      button.setAttribute('aria-pressed', String(view === mode));
    });
  }
  function render() {
    const terms = normalise(search.value.trim()).split(/\s+/).filter(Boolean);
    visibleProjects = projects.filter(project => {
      if (activeKind && kindOf(project) !== activeKind) return false;
      if (activeTag && !project.tags.includes(activeTag)) return false;
      const haystack = normalise([project.title, project.subtitle, project.description, ...project.tags, project.slug].join(' '));
      return terms.every(term => haystack.includes(term));
    });
    if (sort.value.startsWith('name-')) {
      const direction = sort.value === 'name-asc' ? 1 : -1;
      visibleProjects.sort((a, b) => a.reading.localeCompare(b.reading, 'ja') * direction);
    } else visibleProjects.sort((a, b) => a.order - b.order);
    grid.replaceChildren(...visibleProjects.map(createCard));
    $('empty-state').hidden = visibleProjects.length > 0;
    $('result-count').textContent = activeTag || activeKind || terms.length ? visibleProjects.length + ' / ' + projects.length + '作品' : '全' + projects.length + '作品';
    $('clear-search').hidden = !search.value;
    $('filter-info').hidden = !(activeTag || activeKind || terms.length);
    $('filter-summary').textContent = [activeKind ? activeKind === 'tool' ? 'ツール' : 'ゲーム' : '', activeTag ? '# ' + activeTag : '', search.value.trim() ? '「' + search.value.trim() + '」' : ''].filter(Boolean).join(' ＋ ');
    $('random-link').setAttribute('aria-disabled', String(!visibleProjects.length));
    if (visibleProjects.length) $('random-link').href = visibleProjects[Math.floor(Math.random() * visibleProjects.length)].url;
    renderFilters();
    updateView();
    syncUrl();
  }
  function reset() {
    activeTag = '';
    activeKind = '';
    expandedTags = false;
    search.value = '';
    render();
  }
  $('kind-filters').addEventListener('click', event => {
    const button = event.target.closest('button[data-kind]');
    if (!button) return;
    activeKind = button.dataset.kind;
    expandedTags = false;
    if (activeTag && !projects.some(p => (!activeKind || kindOf(p) === activeKind) && p.tags.includes(activeTag))) activeTag = '';
    render();
  });
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-tag]');
    if (!button) return;
    const selected = button.dataset.tag;
    activeTag = selected;
    render();
    [...filters.querySelectorAll('button')].find(button => button.dataset.tag === selected)?.focus({ preventScroll: true });
  });
  grid.addEventListener('click', event => {
    const button = event.target.closest('button[data-tag]');
    if (!button) return;
    activeTag = button.dataset.tag;
    render();
    const selected = [...filters.querySelectorAll('button')].find(button => button.dataset.tag === activeTag);
    selected?.focus({ preventScroll: true });
    $('collection').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  $('clear-search').addEventListener('click', () => { search.value = ''; render(); search.focus(); });
  $('reset-filters').addEventListener('click', reset);
  $('empty-reset').addEventListener('click', () => { reset(); search.focus(); });
  ['grid', 'list'].forEach(mode => $(mode + '-view').addEventListener('click', () => { view = mode; updateView(); syncUrl(); }));
  $('random-link').addEventListener('click', event => {
    if (!visibleProjects.length) { event.preventDefault(); return; }
    $('random-link').href = visibleProjects[Math.floor(Math.random() * visibleProjects.length)].url;
  });
  $('copyright-year').textContent = String(new Date().getFullYear());
  $('work-total').textContent = String(projects.length).padStart(2, '0') + ' LITTLE DISCOVERIES';
  render();
})();
