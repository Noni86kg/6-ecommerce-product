const bottomImgs = document.querySelectorAll('.left-main-bottom-img img');
const bottomImgsModal = document.querySelectorAll('.left-main-bottom-img-modal img');
const mainImg = document.querySelector('.main-img-div');
const minusPlus = document.querySelectorAll('.amount-controller img')
const amountController = document.querySelector('.amount-controller span')
const mainImgModul = document.querySelector('.main-img-svg');
const prevBtn = document.querySelector('.prev-btn');
const prevBtnModal = document.querySelector('.prev-btn-modal');
const nextBtn = document.querySelector('.next-btn');
const nextBtnModal = document.querySelector('.next-btn-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close svg');
const cart = document.querySelector('.cart');
const cartNum = document.querySelector('.cart-num');
const button = document.querySelector('.btn');
const cartModal = document.querySelector('.cart-modal');
const emptyCart = document.querySelector('.empty-cart');
const fillCart = document.querySelector('.bottom-card-modal-buy');
const bill = document.querySelector('.bill span');
const deleteBtn = document.querySelector('.modal-buy-top-delete svg');
const mobNavBtn = document.querySelector('.nav-mob-img')
const mobNav = document.querySelector('.mob-nav')
const mobNavCloseBtn = document.querySelector('.img-close-mob-nav')
let dataId = 1;
let sum;

// Mob nav
mobNavBtn.addEventListener('click', () => {
    overlay.classList.remove("hidden");
    mobNav.classList.remove("hidden");
    document.documentElement.style.setProperty('--bodyPosition', 'fixed');
})
mobNavCloseBtn.addEventListener('click', () => {
    overlay.classList.add("hidden");
    mobNav.classList.add("hidden");
    document.documentElement.style.setProperty('--bodyPosition', 'static');
})
// delete
deleteBtn.addEventListener('click', () => {
    emptyCart.style.display = "block";
    fillCart.style.display = "none"; 
    cartNum.textContent = "0"
    cart.classList.remove('active')
})

// cart
cart.addEventListener('click', () => {
    if (cartNum.textContent === "0") {
        emptyCart.style.display = "block";
        fillCart.style.display = "none";  
    } else {
        emptyCart.style.display = "none";
        fillCart.style.display = "flex"; 
        sum = parseInt(cartNum.textContent) * 125;
        bill.textContent = `$ ${sum.toFixed(2)}`
    }
    cartModal.classList.toggle('active')
})
button.addEventListener('click', () => {
    if (amountController.textContent !== "0") {
    sum = parseInt(amountController.textContent) + parseInt(cartNum.textContent)
    cartNum.textContent = sum;
    cart.classList.add('active')
    amountController.textContent = "0";
    cartModal.classList.remove('active')
    }
})

//amount-controller
minusPlus.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        sum =  parseInt(amountController.textContent) 
        e.target.classList.contains("minus") ? (sum === 0 ? amountController.textContent = 0 : amountController.textContent = sum - 1 ): amountController.textContent = sum + 1 ;

    })
})

// close modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})
closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', function(e) {
    if(e.target === overlay) {
        closeModal();
    }
});

function closeModal() {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    document.documentElement.style.setProperty('--bodyPosition', 'static');
}
// Open modal
mainImg.addEventListener('click', () => {
    if (window.innerWidth > 767) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    document.documentElement.style.setProperty('--bodyPosition', 'fixed');
    }
})

//Img Controller
nextBtn.addEventListener('click', nextOper)
nextBtnModal.addEventListener('click', nextOper)
prevBtn.addEventListener('click', prevOper) 
prevBtnModal.addEventListener('click', prevOper) 

function nextOper() {
    dataId = parseInt(dataId);
    dataId === 4 ? dataId = 1 : dataId += 1;
    imgController()
}

function prevOper() {
    dataId = parseInt(dataId);
    dataId === 1 ? dataId = 4 : dataId -= 1;
    imgController()
}

bottomImgs.forEach((bottomImg) => {
    bottomImg.addEventListener('click', (e) => {
        dataId = e.target.getAttribute('data-id');
        imgController()
    })
})

function imgController() {
    bottomImgs.forEach((b) => {
        b.classList.remove('active')
    })
    bottomImgsModal[dataId-1].classList.add('active')
    bottomImgs[dataId-1].classList.add('active')
    mainImg.innerHTML = `<img src="images/image-product-${dataId}.jpg" alt="image-product">`
    mainImgModul.innerHTML = `<img src="images/image-product-${dataId}.jpg" alt="image-product">`
}