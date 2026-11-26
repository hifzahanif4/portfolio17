/* Hifza Hanif creative portfolio — small, accessible interactions. */
(() => {
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
  }

  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.brand-card[data-category]'));
  const status = document.querySelector('.filter-status');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let shown = 0;
    filters.forEach(other => {
      const selected = other === button;
      other.classList.toggle('is-active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
      card.hidden = !matches;
      if (matches) shown++;
    });
    if (status) status.textContent = filter === 'all'
      ? `Showing all ${shown} brands`
      : `Showing ${shown} ${shown === 1 ? 'brand' : 'brands'}`;
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // A thin, unobtrusive reading progress bar.
  const progressBar = document.querySelector('.scroll-progress span');
  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
    document.body.classList.toggle('scrolled', window.scrollY > 25);
  };
  if (progressBar) {
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();
  }

  // Only one Taara reel plays at a time.
  const videos = [...document.querySelectorAll('.reels-grid video')];
  videos.forEach(current => current.addEventListener('play', () => {
    videos.forEach(other => { if (other !== current && !other.paused) other.pause(); });
  }));
})();


/* THK Glow: local review filtering + accessible screenshot preview */
(() => {
 const buttons=[...document.querySelectorAll('[data-review-filter]')];
 const cards=[...document.querySelectorAll('.thk-review-card')];
 const status=document.querySelector('.thk-review-count');
 buttons.forEach(button=>button.addEventListener('click',()=>{
   const type=button.dataset.reviewFilter;
   buttons.forEach(b=>{const on=b===button;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
   let count=0;
   cards.forEach(card=>{const show=type==='all'||card.dataset.reviewType===type;card.hidden=!show;if(show)count++;});
   if(status)status.textContent=`Showing ${count} feedback screenshot${count===1?'':'s'}`;
 }));
 const modal=document.getElementById('thk-lightbox');
 if(!modal)return;
 const modalImg=modal.querySelector('img');
 const close=modal.querySelector('.thk-lightbox-close');
 let previousFocus=null;
 const dismiss=()=>{modal.hidden=true;modalImg.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus();};
 document.querySelectorAll('[data-review-image]').forEach(btn=>btn.addEventListener('click',()=>{
   previousFocus=btn;
   modalImg.src=btn.dataset.reviewImage;
   modalImg.alt=btn.dataset.reviewAlt||'Customer review screenshot';
   modal.hidden=false;
   document.body.style.overflow='hidden';
   close.focus();
 }));
 close?.addEventListener('click',dismiss);
 modal.addEventListener('click',e=>{if(e.target===modal)dismiss();});
 document.addEventListener('keydown',e=>{
   if(modal.hidden)return;
   if(e.key==='Escape')dismiss();
   if(e.key==='Tab'){e.preventDefault();close.focus();}
 });
})();

// Scroll-in reveals with accessible reduced-motion fallback.
(()=>{if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const els=document.querySelectorAll('.section-head,.brand-card,.community-card,.proof-collection');const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');obs.unobserve(e.target)}}),{threshold:.06});els.forEach((e,i)=>{e.classList.add('playful-reveal');e.style.transitionDelay=`${i%3*65}ms`;obs.observe(e)})})();


// Studio Edition: color direction switcher, accessible and local to the page.
(()=>{
 const controls=[...document.querySelectorAll('[data-palette]')];
 controls.forEach(btn=>btn.addEventListener('click',()=>{
   document.body.dataset.palette=btn.dataset.palette;
   controls.forEach(other=>{const active=other===btn;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active));});
 }));
})();


 document.querySelectorAll('.experience-card').forEach(card=>{const front=card.querySelector('.experience-front'),back=card.querySelector('.experience-back'),open=card.querySelector('.experience-toggle'),close=card.querySelector('.experience-close'),inner=card.querySelector('.experience-inner');function flip(show){front.hidden=show;back.hidden=!show;open.setAttribute('aria-expanded',String(show));inner.classList.remove('flipping');void inner.offsetWidth;inner.classList.add('flipping');(show?close:open).focus({preventScroll:true});}open.addEventListener('click',()=>flip(true));close.addEventListener('click',()=>flip(false));card.addEventListener('keydown',e=>{if(e.key==='Escape'&&!back.hidden)flip(false)});});

(()=>{const role=document.getElementById('rotating-role');if(role&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const words=['Brand strategist','Creative marketer','Content storyteller','E-commerce founder'];let i=0;setInterval(()=>{if(document.hidden)return;role.textContent=words[++i%words.length];role.classList.remove('role-enter');void role.offsetWidth;role.classList.add('role-enter')},3400)}document.querySelectorAll('.brand-card').forEach(c=>{const a=c.querySelector('.brand-original'),b=c.querySelector('.brand-flip'),d=c.querySelector('.brand-detail'),back=c.querySelector('.brand-return');if(!a||!b||!d||!back)return;function show(v){a.hidden=v;b.hidden=v;d.hidden=!v;b.setAttribute('aria-expanded',String(v));c.classList.remove('brand-turn');void c.offsetWidth;c.classList.add('brand-turn');(v?back:b).focus({preventScroll:true})}b.addEventListener('click',()=>show(true));back.addEventListener('click',()=>show(false));c.addEventListener('keydown',e=>{if(e.key==='Escape'&&!d.hidden)show(false)})})})();

(()=>{const url='https://www.linkedin.com/in/hifza-hanif-373825299';const b=document.getElementById('copy-profile');if(b)b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(url);document.getElementById('copy-status').textContent=' Link copied.'}catch{document.getElementById('copy-status').textContent=url}});const form=document.getElementById('contact-compose');if(form)form.addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('sender-name').value;const m=document.getElementById('sender-message').value;const email=document.getElementById('sender-email').value;location.href='mailto:?subject='+encodeURIComponent('Portfolio inquiry from '+n)+'&body='+encodeURIComponent(m+'\n\nFrom: '+n+' ('+email+')');document.getElementById('compose-status').textContent='Your draft opens in your email app. Choose the recipient before sending.'})})();

(()=>{const slider=document.querySelector('.recognition-slider'),top=document.getElementById('return-top');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(top){const update=()=>{top.hidden=scrollY<500};addEventListener('scroll',update,{passive:true});update();top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'}))}if(!slider)return;const slides=[...slider.querySelectorAll('.recognition-slide')],count=document.getElementById('rec-count'),pause=document.querySelector('[data-rec-pause]');let i=0,paused=reduced,hover=false,x=0;function show(n){i=(n+slides.length)%slides.length;slides.forEach((s,j)=>s.hidden=j!==i);count.textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0')}function toggle(){pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-pressed',String(paused))}toggle();document.querySelector('[data-rec-prev]').addEventListener('click',()=>show(i-1));document.querySelector('[data-rec-next]').addEventListener('click',()=>show(i+1));pause.addEventListener('click',()=>{paused=!paused;toggle()});slider.addEventListener('mouseenter',()=>hover=true);slider.addEventListener('mouseleave',()=>hover=false);slider.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(i+(e.key==='ArrowLeft'?-1:1))}});slider.addEventListener('touchstart',e=>x=e.changedTouches[0].clientX,{passive:true});slider.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>45)show(i+(d<0?1:-1))},{passive:true});setInterval(()=>{if(!paused&&!hover&&!document.hidden&&!slider.contains(document.activeElement))show(i+1)},6000)})();

(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const nav=[...document.querySelectorAll('.site-header .nav a[href^="#"]')];const targets=nav.map(a=>[a,document.getElementById(a.hash.slice(1))]).filter(x=>x[1]);function active(){let current=null;for(const [a,s] of targets)if(s.getBoundingClientRect().top<=160)current=a;nav.forEach(a=>{a.classList.toggle('motion-current',a===current);if(a===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}addEventListener('scroll',active,{passive:true});active();if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-arrive');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.campaign-intro,.campaign-metrics,.thk-section-intro,.recognition-slider').forEach(e=>observer.observe(e))}if(!document.getElementById('return-top')){const b=document.createElement('button');b.id='return-top';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='<span aria-hidden="true">✳</span><small>TOP ↑</small>';document.body.append(b);const update=()=>b.hidden=scrollY<500;addEventListener('scroll',update,{passive:true});update();b.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'instant':'smooth'}))}})();
