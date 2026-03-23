/* ============================================
   MESS Brand - FINAL FIXED JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    const WHATSAPP_NUMBER = '212673991904';

    let selectedSize = "";
    let selectedProduct = "";

    /* ============================================
       SIZE SELECTION (PER PRODUCT)
    ============================================ */

    document.querySelectorAll('.product-card').forEach(card => {

        const sizeButtons = card.querySelectorAll('.size-btn');

        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function () {

                // remove active only inside same product
                sizeButtons.forEach(b => b.classList.remove('active'));

                this.classList.add('active');

                selectedSize = this.dataset.size;
                selectedProduct =
                    card.querySelector('.order-btn').dataset.product;
            });
        });
    });

    /* ============================================
       ORDER BUTTON
    ============================================ */

    const productNameInput = document.getElementById('productName');
    const productSizeInput = document.getElementById('productSize');
    const orderSection = document.getElementById('order');

    document.querySelectorAll('.order-btn').forEach(button => {

        button.addEventListener('click', function () {

            if (!selectedSize) {
                alert("Choose size first");
                return;
            }

            const productName = this.dataset.product;

            productNameInput.value = productName;
            productSizeInput.value = selectedSize;

            orderSection.scrollIntoView({
                behavior: 'smooth'
            });
        });

    });

    /* ============================================
       WHATSAPP BUTTON
    ============================================ */

    document.querySelectorAll('.whatsapp-btn').forEach(button => {

        button.addEventListener('click', function (e) {
            e.preventDefault();

            if (!selectedSize) {
                alert("Choose size first");
                return;
            }

            const productName =
                this.closest('.product-card')
                    .querySelector('.order-btn')
                    .dataset.product;

            const message =
                `Hello, I want to order ${productName} - Size: ${selectedSize}`;

            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            window.open(url, '_blank');
        });

    });

    /* ============================================
       ORDER FORM
    ============================================ */

    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    const newOrderBtn = document.getElementById('newOrderBtn');

    if (successMessage) {
        successMessage.classList.remove('active');
    }

    if (orderForm) {

        orderForm.addEventListener('submit', function (e) {

            e.preventDefault();

            // simulate sending
            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {

                orderForm.style.display = "none";
                successMessage.classList.add('active');

                orderForm.reset();
                selectedSize = "";
                selectedProduct = "";

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

            }, 900);
        });
    }

    /* ============================================
       NEW ORDER BUTTON
    ============================================ */

    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function () {

            successMessage.classList.remove('active');
            orderForm.style.display = 'block';

            document
                .getElementById('order')
                .scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ============================================
       NAVBAR SHADOW
    ============================================ */

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {

            if (window.scrollY > 50) {
                navbar.style.boxShadow =
                    '0 2px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* ============================================
       PRODUCT ANIMATION
    ============================================ */

    const cards = document.querySelectorAll('.product-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition =
            `opacity 0.6s ease ${index * 0.1}s,
             transform 0.6s ease ${index * 0.1}s`;

        observer.observe(card);
    });

    console.log("✅ MESS Brand loaded successfully");

});
