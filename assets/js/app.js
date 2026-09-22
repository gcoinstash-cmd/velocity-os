/**
 * VELOCITY — Application Helpers & Interactive UI
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  window.showToast = function(message, type = 'cyan') {
    const existing = document.getElementById('velocity-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'velocity-toast';
    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border flex items-center gap-3 backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 font-medium text-sm ${
      type === 'cyan' 
        ? 'bg-[#121216]/95 border-[#06B6D4]/40 text-white' 
        : 'bg-[#121216]/95 border-emerald-500/40 text-emerald-300'
    }`;

    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'cyan' ? 'bg-[#06B6D4]' : 'bg-emerald-400'} animate-ping"></span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };
});
