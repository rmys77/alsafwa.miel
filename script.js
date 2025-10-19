// ضع هنا رقم واتساب الخاص بك مع رمز الدولة بدون + 
const whatsappNumber = "212619943471";

document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const message = encodeURIComponent(`مرحباً 👋 أود شراء "${product}". هل يمكنكم تزويدي بالمزيد من التفاصيل؟`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  });
});

document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', function() {
      const price = this.value;
      this.parentElement.querySelector('.price span').textContent = price;
    });
  });
  const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const honeyType = document.getElementById("type3");
  const honeySize = document.getElementById("size3");
  const honeyPrice = document.getElementById("price3");

  // جدول الأسعار لكل نوع وحجم
  const prices = {
    thyme: { // عسل السحتر
      "1L": 450,
      "5-10L": 390,
      "10L+": 370
    },
    herbal: { // عسل الأعشاب
      "1L":  600,
      "5-10L": 450,
      "10L+": 400
    }
  };

  function updatePrice() {
    const type = honeyType.value;
    const size = honeySize.value;
    const price = prices[type][size];
    honeyPrice.textContent = price;
  }

  // تحديث السعر عند التغيير
  honeyType.addEventListener("change", updatePrice);
  honeySize.addEventListener("change", updatePrice);

  // عرض السعر الافتراضي عند تحميل الصفحة
  updatePrice();
});


