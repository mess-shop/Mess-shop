/* ============================================
   MESS Brand - JavaScript
   ============================================
   
   IMPORTANT: WhatsApp Number Format
   - The number 0673991904 should include country code
   - Example: If you're in Morocco (+212), use: 212673991904
   - Update the phoneNumber variable below with your full international number
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Configuration
    // ============================================
    // TODO: Update this with your full international phone number (with country code, no + or 00)
    const WHATSAPP_NUMBER = '212673991904'; // Example: '212673991904' for Morocco
    
    // ============================================
    // Order Button Functionality
    // ============================================
    const orderButtons = document.querySelectorAll('.order-btn');
    const productNameInput = document.getElementById('productName');
    const orderSection = document.getElementById('order');

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            
            // Auto-fill the product name in the form
            if (productNameInput) {
                productNameInput.value = productName;
            }
            
            // Smooth scroll to order form
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ============================================
    // WhatsApp Button - Update URL with Product Name
    // ============================================
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
    e.preventDefault(); // 

    const productName = this.getAttribute('data-product');
    const message = `Hello, I want to order ${productName}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank'); // 
});
    });

    // ============================================
    // Order Form Handling
    // ============================================
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    const newOrderBtn = document.getElementById('newOrderBtn');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            const formAction = orderForm.getAttribute('action');
            
            // Check if using mailto (opens email client)
            if (formAction.startsWith('mailto:')) {
                // Let the form submit normally (opens email client)
                // Show success message after a short delay
                setTimeout(() => {
                    orderForm.style.display = 'none';
                    successMessage.classList.add('active');
                    orderForm.reset();
                }, 500);
                return; // Don't prevent default - let mailto work
            }
            
            // Check if Formspree is not configured yet
            if (formAction.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert('Please configure your form first. See instructions in the HTML file.');
                return;
            }
            
            // Formspree handling
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(orderForm);
            
            // Show loading state
            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send form data to Formspree
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    orderForm.style.display = 'none';
                    successMessage.classList.add('active');
                    
                    // Reset form
                    orderForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your order. Please try again or contact us via WhatsApp.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ============================================
    // New Order Button (Reset Form)
    // ============================================
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function() {
            successMessage.classList.remove('active');
            orderForm.style.display = 'block';
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove shadow based on scroll position
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ============================================
    // Product Card Animation on Scroll
    // ============================================
    const productCards = document.querySelectorAll('.product-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    console.log('MESS Brand website loaded successfully!');
});

/* ============================================
   INSTRUCTIONS FOR ADDING NEW PRODUCTS:
   
   1. Copy an existing product block in HTML
   2. Update the following:
      - Image URL (placeholder or your image)
      - alt text for the image
      - Product name
      - Price
      - data-product attribute (in both button and WhatsApp link)
   
   The JavaScript will automatically handle:
   - Auto-filling the product name when clicking "Order Now"
   - Updating WhatsApp links with the product name
   - Scroll animations for new products
   ============================================ */
let selectedSize = "";

// عندما يضغط المستخدم مقاس
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", function () {

    // إزالة التحديد القديم
    document.querySelectorAll(".size-btn")
      .forEach(b => b.classList.remove("active"));

    // تحديد الجديد
    this.classList.add("active");

    selectedSize = this.dataset.size;
  });
});


// عند الضغط Order Now
document.querySelectorAll(".order-btn").forEach(button => {
  button.addEventListener("click", function () {

    if (!selectedSize) {
      alert("Choose size first");
      return;
    }

    const product = this.dataset.product;

    document.getElementById("productName").value = product;
    document.getElementById("productSize").value = selectedSize;

    document.getElementById("order")
      .scrollIntoView({ behavior: "smooth" });
  });
});
