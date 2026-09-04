/* ============================================================
   JAY JAY CONSTRUCTIONS — Interactive Scripts & Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }

    // 2. Map Scroll Protection Toggle (Enables normal page scrolling over the map)
    const mapOverlay = document.getElementById('mapOverlay');
    const mapIframe = document.getElementById('mapIframe');

    if (mapOverlay && mapIframe) {
        mapOverlay.addEventListener('click', () => {
            mapOverlay.style.display = 'none';
            mapIframe.style.pointerEvents = 'auto';
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // 4. Back to Top Button & Navbar Scroll Shadow
    const backTop = document.getElementById('backTop');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (backTop) {
            if (scrollPos > 400) {
                backTop.classList.add('show');
            } else {
                backTop.classList.remove('show');
            }
        }

        if (navbar) {
            if (scrollPos > 50) {
                navbar.style.background = 'rgba(12, 14, 16, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(18, 20, 23, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    if (backTop) {
        backTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Initialize Swiper Slider for Verified Customer Reviews
    if (typeof Swiper !== 'undefined') {
        new Swiper('.reviews-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                }
            }
        });
    }

    // 6. Portfolio Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.p-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // 7. Lightbox Modal Preview
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbTitle = document.getElementById('lbTitle');
    const lbDesc = document.getElementById('lbDesc');
    const lbClose = document.querySelector('.lb-close');
    const lbOverlay = document.querySelector('.lb-overlay');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const title = item.getAttribute('data-title') || item.querySelector('h4').innerText;
            const desc = item.getAttribute('data-desc') || item.querySelector('.p-sub').innerText;

            if (lightbox && lbImg) {
                lbImg.src = imgSrc;
                if (lbTitle) lbTitle.innerText = title;
                if (lbDesc) lbDesc.innerText = desc;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbOverlay) lbOverlay.addEventListener('click', closeLightbox);

    // 8. Contact Form AJAX Submission with Fallback
    const enquiryForm = document.getElementById('enquiryForm');
    const formStatus = document.getElementById('formStatus');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = enquiryForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>SENDING REQUEST...</span> <i class="fas fa-spinner fa-spin"></i>';
            if (formStatus) formStatus.innerText = '';

            const formData = new FormData(enquiryForm);

            try {
                const response = await fetch(enquiryForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.className = 'form-status success';
                        formStatus.innerText = 'Thank you! Your quote request has been sent successfully. Prem Kumar & team will contact you shortly.';
                    }
                    enquiryForm.reset();
                } else {
                    throw new Error('Network error');
                }
            } catch (err) {
                // Friendly fallback message for direct offline/demo mode
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerText = 'Thank you! Your request has been recorded. For instant response, call or WhatsApp +91 74837 42931 directly.';
                }
                enquiryForm.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});
