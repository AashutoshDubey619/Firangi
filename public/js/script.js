// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// Wishlist Toggle (async, no page reload)
async function toggleWishlist(event, listingId) {
    event.preventDefault();
    event.stopPropagation();
    
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');

    try {
        const res = await fetch(`/listings/${listingId}/wishlist`, { method: 'POST' });
        
        if(res.status === 401 || res.redirected) {
            window.location.href = '/login';
            return;
        }

        const data = await res.json();

        if(data.wishlisted) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    } catch(err) {
        console.error('Wishlist error:', err);
    }
}


// Dark Mode Toggle
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    
    // Update icon
    const icon = document.querySelector('.theme-toggle i');
    if(icon) {
        icon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
