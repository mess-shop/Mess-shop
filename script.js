/**
 * NOIR LUXE - Luxury Fashion E-commerce
 * Complete JavaScript Functionality
 */

// ============================================
// PRODUCT CONFIGURATION
// ============================================
// 📝 EDIT THIS ARRAY TO ADD/MODIFY PRODUCTS
// Simply add new objects to this array following the same structure
// Remove any products you don't want - they won't appear on the site

const products = [
    {
        id: 1,
        name: "Midnight Leather Jacket",
        price: "$299",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Neon Pink Statement Tee",
        price: "$89",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Urban Denim Collection",
        price: "$149",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        name: "Luxury Chronograph Watch",
        price: "$449",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 5,
        name: "Designer Sunglasses",
        price: "$199",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 6,
        name: "Premium Sneakers",
        price: "$249",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
        sizes: ["40", "41", "42", "43", "44", "45"]
    }
];

// Store selected product data
let selectedProduct = null;
let selectedSize = null;

// ============================================
// EMAILJS CONFIGURATION
// ============================================
// Initialize EmailJS with your public key
(function() {
    emailjs.init("Z7kuWQhsKGjCHrx4e");
})();

// ============================================
// DOM ELEMENTS
// ============================================
const productsGrid = document.getElementById('productsGrid');
const orderForm = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');
const selectedProductDiv = document.getElementById('selectedProduct');
const submitBtn = document.getElementById('submitBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');

// ============================================
// PRODUCT RENDERING
// ============================================

/**
 * Render all products from the products array
 * This function dynamically generates HTML for each product
 */
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    // Trigger scroll animations after rendering
    observeProducts();
}

/**
 * Create a product card element
 * @param {Object} product - Product data
 * @param {Number} index - Index for staggered animation
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Generate size buttons HTML
    const sizeButtonsHTML = product.sizes.map(size => `
        <button class="size-btn" data-size="${size}" onclick="selectSize(this, ${product.id})">${size}</button>
    `).join('');
    
    card.innerHTML = `
        <div style="overflow: hidden; border-radius: 20px 20px 0 0;">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            
            <div class="size-selector">
                <span class="size-label">Select Size:</span>
                <div class="size-buttons" id="sizes-${product.id}">
                    ${sizeButtonsHTML}
                </div>
            </div>
            
            <div class="product-actions">
                <button class="btn-primary" onclick="initiateOrder(${product.id})" id="order-btn-${product.id}" disabled>
                    <span>Order Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
                <a href="#" class="btn-secondary" onclick="openWhatsApp(${product.id}); return false;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </a>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Handle size selection
 * @param {HTMLElement} btn - Clicked size button
 * @param {Number} productId - Product ID
 */
function selectSize(btn, productId) {
    // Remove selected class from all buttons in this product
    const sizeButtons = document.querySelectorAll(`#sizes-${productId} .size-btn`);
    sizeButtons.forEach(button => button.classList.remove('selected'));
    
    // Add selected class to clicked button
    btn.classList.add('selected');
    
    // Enable order button
    const orderBtn = document.getElementById(`order-btn-${productId}`);
    orderBtn.disabled = false;
    
    // Store selection
    selectedProduct = products.find(p => p.id === productId);
    selectedSize = btn.dataset.size;
}

/**
 * Initiate order process - scroll to form and populate data
 * @param {Number} productId - Product ID
 */
function initiateOrder(productId) {
    const product = products.find(p => p.id === productId);
    const selectedBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    
    if (!selectedBtn) {
        alert('Please select a size first');
        return;
    }
    
    selectedProduct = product;
    selectedSize = selectedBtn.dataset.size;
    
    // Update form display
    updateSelectedProductDisplay();
    
    // Scroll to order form
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight the form temporarily
    const formWrapper = document.querySelector('.order-form-wrapper');
    formWrapper.style.animation = 'pulse 1s';
    setTimeout(() => {
        formWrapper.style.animation = '';
    }, 1000);
}

/**
 * Update the selected product display in the order form
 */
function updateSelectedProductDisplay() {
    if (!selectedProduct || !selectedSize) {
        selectedProductDiv.innerHTML = '<span class="no-selection">Please select a product from above</span>';
        return;
    }
    
    selectedProductDiv.innerHTML = `
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
        <div class="selected-product-info">
            <h4>${selectedProduct.name}</h4>
            <p>${selectedProduct.price} - Size: ${selectedSize}</p>
        </div>
    `;
}

/**
 * Open WhatsApp with pre-filled message
 * @param {Number} productId - Product ID
 */
function openWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    const selectedBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    
    let message;
    let sizeText;
    
    if (selectedBtn) {
        sizeText = selectedBtn.dataset.size;
        message = `Hello, I want to order ${product.name} - Size: ${sizeText} (${product.price})`;
    } else {
        message = `Hello, I'm interested in ${product.name} (${product.price}). Please let me know available sizes.`;
    }
    
    const whatsappUrl = `https://wa.me/212673991904?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle form submission with EmailJS
 */
orderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate product selection
    if (!selectedProduct || !selectedSize) {
        alert('Please select a product and size first');
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Get form data
    const formData = {
        product_name: selectedProduct.name,
        product_price: selectedProduct.price,
        size: selectedSize,
        customer_name: document.getElementById('customerName').value,
        customer_phone: document.getElementById('customerPhone').value,
        customer_address: document.getElementById('customerAddress').value,
        order_notes: document.getElementById('orderNotes').value || 'No additional notes',
        to_email: 'mess95374@gmail.com'
    };
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_2ikbrx5',
            'template_bukv4de',
            formData,
            'Z7kuWQhsKGjCHrx4e'
        );
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        orderForm.reset();
        resetProductSelection();
        
    } catch (error) {
        console.error('Email sending failed:', error);
        alert('Failed to send order. Please try again or contact us via WhatsApp.');
    } finally {
        setLoadingState(false);
    }
});

/**
 * Set loading state on submit button
 * @param {Boolean} isLoading - Loading state
 */
function setLoadingState(isLoading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}

/**
 * Show success message and hide form
 */
function showSuccessMessage() {
    orderForm.style.display = 'none';
    successMessage.classList.add('show');
}

/**
 * Reset for new order
 */
newOrderBtn.addEventListener('click', function() {
    successMessage.classList.remove('show');
    orderForm.style.display = 'flex';
    orderForm.reset();
    resetProductSelection();
});

/**
 * Reset product selection
 */
function resetProductSelection() {
    selectedProduct = null;
    selectedSize = null;
    
    // Reset all size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Disable all order buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.disabled = true;
    });
    
    updateSelectedProductDisplay();
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Intersection Observer for product cards
 */
function observeProducts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Navbar scroll effect
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// MOBILE MENU
// ============================================

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// ============================================
// INITIALIZATION
// ============================================

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    console.log('NOIR LUXE initialized successfully');
    console.log(`Loaded ${products.length} products`);
});
