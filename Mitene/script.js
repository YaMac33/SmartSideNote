// Basic UI interactions: nav toggle, modal, carousel, simple form validation
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });

  // Modal logic
  const signupModal = document.getElementById('signupModal');
  const openButtons = document.querySelectorAll('#openSignup, #heroSignup, #freeSignup, #paidSignup, #finalSignup, #heroSignup');
  const closeBtn = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');

  function showModal(){
    signupModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus first input
    setTimeout(()=> document.getElementById('email').focus(), 100);
  }
  function hideModal(){
    signupModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn && btn.addEventListener('click', showModal));
  closeBtn && closeBtn.addEventListener('click', hideModal);
  modalCancel && modalCancel.addEventListener('click', hideModal);
  signupModal && signupModal.addEventListener('click', (e) => {
    if(e.target === signupModal) hideModal();
  });

  // Simple form validation (no real submission)
  const signupForm = document.getElementById('signupForm');
  signupForm && signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const pw = document.getElementById('password');
    if(!email.checkValidity()){
      alert('有効なメールアドレスを入力してください。');
      email.focus();
      return;
    }
    if(pw.value.length < 8){
      alert('パスワードは8文字以上で入力してください。');
      pw.focus();
      return;
    }
    // simulate success
    alert('アカウント作成（サンプル） — メール確認リンクが送信されたと仮定します。');
    hideModal();
    signupForm.reset();
  });

  // Carousel
  const carousel = document.getElementById('carousel');
  if(carousel){
    const slides = Array.from(carousel.querySelectorAll('img'));
    let idx = 0;
    function show(i){
      slides.forEach((s, j) => s.classList.toggle('active', i === j));
    }
    show(idx);
    // auto-advance every 3.5s
    let timer = setInterval(() => {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, 3500);

    // pause on hover/touch
    carousel.addEventListener('mouseenter', ()=> clearInterval(timer));
    carousel.addEventListener('mouseleave', ()=> {
      timer = setInterval(()=> { idx = (idx + 1) % slides.length; show(idx); }, 3500);
    });
  }

  // accessibility: close modal with Esc
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      if(signupModal && signupModal.getAttribute('aria-hidden') === 'false') hideModal();
      if(mainNav.classList.contains('show')) mainNav.classList.remove('show');
    }
  });
});
