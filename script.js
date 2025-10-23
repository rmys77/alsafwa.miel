// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------
// 1. HEADER AND NAVIGATION SCRIPTS
// ------------------------------------------

// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a, .hero-buttons a, header .btn').forEach(link => {
    link.addEventListener('click', function(e){
        // Only prevent default for internal links
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ------------------------------------------
// 2. HERO SECTION ANIMATION (Directly on load)
// ------------------------------------------

gsap.from(".hero h1", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.3
});

gsap.from(".hero p", {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.6
});

gsap.from(".hero-buttons a", {
    x: 30,
    opacity: 0,
    stagger: 0.2, // Animate buttons one after the other
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.9
});


// ------------------------------------------
// 3. SCROLL-BASED ANIMATIONS (ScrollTrigger)
// ------------------------------------------

// Function to create a standard fade-in-up animation
const createScrollAnimation = (element, yValue = 50) => {
    gsap.from(element, {
        y: yValue,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // Start animation when the top of the element is 85% down the viewport
            toggleActions: "play none none none", // Play once
        }
    });
};

// Products Section: Heading and subtitle
createScrollAnimation(".products h2, .products .subtitle", 30);

// Products Section: Individual Cards (Staggered Animation)
gsap.from(".product-card", {
    y: 80,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "back.out(1.2)",
    stagger: 0.2, // This makes the cards appear sequentially
    scrollTrigger: {
        trigger: ".product-grid",
        start: "top 80%",
        toggleActions: "play none none none",
    }
});

// About Section
createScrollAnimation(".about-text h2, .about-text p", 40);
createScrollAnimation(".about-image img", 40);

// Contact Section
createScrollAnimation(".contact-text h2, .contact-text p", 40);
createScrollAnimation(".whatsapp-btn", 40);
createScrollAnimation(".contact-image img", 40);


// ------------------------------------------
// 4. PRODUCT FUNCTIONALITY
// ------------------------------------------

// WhatsApp Button Logic
const whatsappNumber = "212619943471";

document.querySelectorAll(".buy-btn").forEach(button => {
    // Attach product name to button on the fly based on the closest h3
    const card = button.closest('.product-card, .discount-card');
    const productName = card ? (card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'منتج العسل') : 'منتج العسل';
    button.setAttribute("data-product", productName);

    button.addEventListener("click", () => {
        const product = button.getAttribute("data-product");
        const message = encodeURIComponent(`مرحباً 👋 أود شراء "${product}". هل يمكنكم تزويدي بالمزيد من التفاصيل؟`);
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(url, "_blank");
    });
});

// Size/Price Dropdown Logic
document.querySelectorAll('.size-select').forEach(select => {
    // Function to update price display
    const updatePrice = (el) => {
        const priceText = el.value;
        const priceSpan = el.parentElement.querySelector('.price span, .new-price');
        if (priceSpan) {
            priceSpan.textContent = priceText;
        }
    };

    // Initial update
    updatePrice(select);

    // Update on change
    select.addEventListener('change', function() {
        updatePrice(this);
    });
});

// Wholesale Price Logic
document.addEventListener("DOMContentLoaded", () => {
    const honeyType = document.getElementById("type3");
    const honeySize = document.getElementById("size3");
    const honeyPrice = document.getElementById("price3");

    // Price table (Prices are PER LITER/KG for wholesale)
    const prices = {
        thyme: { 
            "1L": 450,
            "5-10L": 390,
            "10L+": 370
        },
        herbal: { 
            "1L": 600,
            "5-10L": 450,
            "10L+": 400
        }
    };

    function updateWholesalePrice() {
        if (!honeyType || !honeySize || !honeyPrice) return;
        const type = honeyType.value;
        const size = honeySize.value;
        const price = prices[type] ? prices[type][size] : '---';
        honeyPrice.textContent = price;
    }

    if (honeyType && honeySize) {
        honeyType.addEventListener("change", updateWholesalePrice);
        honeySize.addEventListener("change", updateWholesalePrice);
        updateWholesalePrice(); // Initial price display
    }
});