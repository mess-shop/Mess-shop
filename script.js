/**
 * MESS - Make Every Style Statement
 * Luxury Fashion E-commerce
 */

const products = [
    {
        id: 1,
        name: "MESS Signature Hoodie",
        price: "$129",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "MESS Urban Cargo Pants",
        price: "$159",
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "MESS Neon Pink Tee",
        price: "$59",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        name: "MESS Oversized Sweatshirt",
        price: "$119",
        image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 5,
        name: "MESS Premium Leather Jacket",
        price: "$399",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "MESS Denim Bomber Jacket",
        price: "$189",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 7,
        name: "MESS Trench Coat Black",
        price: "$279",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 8,
        name: "MESS Designer Sunglasses",
        price: "$199",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 9,
        name: "MESS Luxury Watch",
        price: "$449",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 10,
        name: "MESS Leather Backpack",
        price: "$249",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 11,
        name: "MESS Crossbody Bag",
        price: "$179",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 12,
        name: "MESS High-Top Sneakers",
        price: "$229",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
        sizes: ["40", "41", "42", "43", "44", "45"]
    },
    {
        id: 13,
        name: "MESS Running Shoes",
        price: "$199",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop",
        sizes: ["40", "41", "42", "43", "44", "45", "46"]
    },
    {
        id: 14,
        name: "MESS Chelsea Boots",
        price: "$289",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop",
        sizes: ["40", "41", "42", "43", "44", "45"]
    },
    {
        id: 15,
        name: "MESS Limited Edition Hoodie",
        price: "$299",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 16,
        name: "MESS Designer Cap",
        price: "$79",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop",
        sizes: ["One Size"]
    },
    {
        id: 17,
        name: "MESS Premium Belt",
        price: "$129",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 18,
        name: "MESS Street Gloves",
        price: "$89",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
        sizes: ["S", "M", "L", "XL"]
    }
];

let selectedProduct = null;
let selectedSize = null;

// ============================================
// EMAILJS CONFIGURATION - NEW CREDENTIALS
// ============================================
(function() {
    emailjs.init("w6sb4QPFn1Zk-nkWV");
})();

const productsGrid = document.getElementById('productsGrid');
const orderForm = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');
const selectedProductDiv = document.getElementById('selectedProduct');
const submitBtn = document.getElementById('submitBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');

function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    observeProducts();
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const sizeButtonsHTML = product.sizes.map(size => `
        <button class="size-btn" data-size="${size}" onclick="selectSize(this, ${product.id})">${size}</button>
    `).join('');
    
    card.innerHTML = `
        <div style="overflow: hidden; border-radius: 20px 20px 0 0;">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x800/1a1a1a/FF2D8F?text=MESS'">
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

function selectSize(btn, productId) {
    const sizeButtons = document.querySelectorAll(`#sizes-${productId} .size-btn`);
    sizeButtons.forEach(button => button.classList.remove('selected'));
    
    btn.classList.add('selected');
    
    const orderBtn = document.getElementById(`order-btn-${productId}`);
    orderBtn.disabled = false;
    
    selectedProduct = products.find(p => p.id === productId);
    selectedSize = btn.dataset.size;
}

function initiateOrder(productId) {
    const product = products.find(p => p.id === productId);
    const selectedBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    
    if (!selectedBtn) {
        alert('Please select a size first');
        return;
    }
    
    selectedProduct = product;
    selectedSize = selectedBtn.dataset.size;
    
    updateSelectedProductDisplay();
    
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    
    const formWrapper = document.querySelector('.order-form-wrapper');
    formWrapper.style.animation = 'pulse 1s';
    setTimeout(() => {
        formWrapper.style.animation = '';
    }, 1000);
}

function updateSelectedProductDisplay() {
    if (!selectedProduct || !selectedSize) {
        selectedProductDiv.innerHTML = '<span class="no-selection">Please select a MESS product from above</span>';
        return;
    }
    
    selectedProductDiv.innerHTML = `
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}" onerror="this.src='https://via.placeholder.com/60x60/1a1a1a/FF2D8F?text=M'">
        <div class="selected-product-info">
            <h4>${selectedProduct.name}</h4>
            <p>${selectedProduct.price} - Size: ${selectedSize}</p>
        </div>
    `;
}

function openWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    const selectedBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    
    let message;
    let sizeText;
    
    if (selectedBtn) {
        sizeText = selectedBtn.dataset.size;
        message = `Hello MESS, I want to order ${product.name} - Size: ${sizeText} (${product.price})`;
    } else {
        message = `Hello MESS, I'm interested in ${product.name} (${product.price}). Please let me know available sizes.`;
    }
    
    const whatsappUrl = `https://wa.me/212673991904?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// FORM HANDLING - MATCHING YOUR TEMPLATE
// ============================================

orderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!selectedProduct || !selectedSize) {
        alert('Please select a MESS product and size first');
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Get form values
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim() || 'No additional notes';
    
    // Template variables matching your EmailJS template exactly
    const templateParams = {
        productName: selectedProduct.name,    // Matches {{productName}}
        size: selectedSize,                    // Matches {{size}}
        fullName: customerName,                // Matches {{fullName}}
        phone: customerPhone,                  // Matches {{phone}}
        address: customerAddress,              // Matches {{address}}
        notes: orderNotes                      // Matches {{notes}}
    };
    
    console.log('Sending order:', templateParams);
    
    setLoadingState(true);
    
    try {
        const response = await emailjs.send(
            'service_gjhejzj',      // NEW Service ID
            'template_8gop29j',     // NEW Template ID
            templateParams,
            'w6sb4QPFn1Zk-nkWV'     // NEW Public Key
        );
        
        console.log('SUCCESS!', response);
        
        showSuccessMessage();
        orderForm.reset();
        resetProductSelection();
        
    } catch (error) {
        console.error('FAILED...', error);
        alert('Failed to send order. Error: ' + JSON.stringify(error));
    } finally {
        setLoadingState(false);
    }
});

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

function showSuccessMessage() {
    orderForm.style.display = 'none';
    successMessage.classList.add('show');
}

newOrderBtn.addEventListener('click', function() {
    successMessage.classList.remove('show');
    orderForm.style.display = 'flex';
    orderForm.reset();
    resetProductSelection();
});

function resetProductSelection() {
    selectedProduct = null;
    selectedSize = null;
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.disabled = true;
    });
    
    updateSelectedProductDisplay();
}

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

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
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

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    console.log('MESS - Make Every Style Statement');
    console.log(`Loaded ${products.length} MESS products`);
});
