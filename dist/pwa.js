(() => {
  'use strict';
  const button = document.getElementById('install-app');
  const dialog = document.getElementById('install-dialog');
  const nativeInstall = document.getElementById('native-install');
  let installPrompt;
  const installed = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const updateInstalled = () => { button.hidden = installed(); };
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; nativeInstall.hidden = false; });
  window.addEventListener('appinstalled', () => { installPrompt = null; button.hidden = true; nativeInstall.hidden = true; if(dialog.open) dialog.close(); });
  window.matchMedia('(display-mode: standalone)').addEventListener('change', updateInstalled);
  button.addEventListener('click', () => dialog.showModal());
  nativeInstall.addEventListener('click', async () => {
    if (installPrompt) {
      const prompt = installPrompt;
      installPrompt = null;
      nativeInstall.hidden = true;
      await prompt.prompt();
      await prompt.userChoice;
    }
  });
  document.getElementById('close-install-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  const updateConnection = () => { document.getElementById('offline-notice').hidden = navigator.onLine; };
  window.addEventListener('online', updateConnection);
  window.addEventListener('offline', updateConnection);
  updateConnection();
  updateInstalled();
  const offlineStatus = document.getElementById('offline-ready-status');
  if ('serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:') {
    (async () => {
      try {
        await navigator.serviceWorker.register('./sw.js', {scope:'./', updateViaCache:'none'});
        await navigator.serviceWorker.ready;
        offlineStatus.textContent = 'この端末に一覧を保存しました。オフラインでも作品を探せます。';
      } catch (error) {
        offlineStatus.textContent = 'このブラウザではオフライン保存を利用できません。オンラインでお楽しみください。';
        console.warn('Offline mode unavailable:', error.message);
      }
    })();
  } else offlineStatus.textContent = 'このブラウザではオフライン保存を利用できません。オンラインでお楽しみください。';
})();
