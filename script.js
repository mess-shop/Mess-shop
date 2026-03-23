/* ============================================
   MESS Brand - JavaScript (FIXED VERSION)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Configuration
    // ============================================
    const WHATSAPP_NUMBER = '212673991904';

    let selectedSize = "";

    // ============================================
    // SIZE SELECTION
    // ============================================
    const sizeButtons = document.querySelectorAll(".size-btn");

    sizeButtons.forEach(btn => {
        btn.addEventListener("click", function () {

            // remove old active
            sizeButtons.forEach(b => b.classList.remove("active"));

            // add new active
            this.classList.add("active");

            // save size
            selectedSize = this.dataset.size;
        });
    });

    // ============================================
    // Order Button Functionality
    // ============================================
    const orderButtons = document.querySelectorAll('.order-btn');
    const productNameInput = document.getElementById('productName');
    const productSizeInput = document.getElementById('productSize');
    const orderSection = document.getElementById('order');

    orderButtons.forEach(button => {
        button.addEventListener('click', function () {

            // check size first
            if (!selectedSize) {
                alert("Choose size first");
                return;
            }

            const productName = this.getAttribute('data-product');

            // fill form automatically
            if (productNameInput) {
                productNameInput.value = productName;
            }

            if (productSizeInput) {
                productSizeInput.value = selectedSize;
            }

            // scroll to form
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ============================================
    // WhatsApp Button
    // ============================================
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const productName = this.getAttribute('data-product');

            if (!selectedSize) {
                alert("Choose size first");
                return;
            }

            const message =
                `Hello, I want to order ${productName} - Size: ${selectedSize}`;

            const whatsappUrl =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // ============================================
    // Order Form Handling
    // ============================================
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    const newOrderBtn = document.getElementById('newOrderBtn');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {

            const formAction = orderForm.getAttribute('action');

            if (formAction.startsWith('mailto:')) {
                setTimeout(() => {
                    orderForm.style.display = 'none';
                    successMessage.classList.add('active');
                    orderForm.reset();
                }, 500);
                return;
            }

            if (formAction.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert('Please configure your form first.');
                return;
            }

            e.preventDefault();

            const formData = new FormData(orderForm);

            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        orderForm.style.display = 'none';
                        successMessage.classList.add('active');
                        orderForm.reset();
                        selectedSize = "";
                    } else {
                        throw new Error();
                    }
                })
                .catch(() => {
                    alert('Error sending order. Try WhatsApp.');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // ============================================
    // New Order Button
    // ============================================
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function () {
            successMessage.classList.remove('active');
            orderForm.style.display = 'block';
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ============================================
    // Smooth Scroll
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Input Focus Effects
    // ============================================
    document.querySelectorAll('input, textarea').forEach(input => {

        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

    // ============================================
    // Product Animation
    // ============================================
    const productCards = document.querySelectorAll('.product-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition =
            `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        observer.observe(card);
    });

    console.log('MESS Brand website loaded successfully!');
});
