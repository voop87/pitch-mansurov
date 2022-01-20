const quantityRemoveBtn = document.getElementById('quantity-remove');
const quantityAddBtn = document.getElementById('quantity-add');
const quantityInput = document.querySelector('.form__quantity-input');
const priceDollars = document.getElementById('dollar');
const priceCents = document.getElementById('cent');

getDollars = (num) => Math.floor(num);
getCents = (num) => (num % 1).toFixed(2).toString().substring(2);

updateTotal = () => {
	const quantityInput = document.querySelector('.form__quantity-input');
	let price = document.getElementById('price').dataset.price;
	let totalCost = quantityInput.value * price;
	priceDollars.textContent = getDollars(totalCost);
	priceCents.textContent = getCents(totalCost);
};

updateTotal();

quantityRemoveBtn.addEventListener('click', () => {
	const quantityInput = document.querySelector('.form__quantity-input');
	quantityInput.value -= 1;
	if (quantityInput.value < 0) {
		quantityInput.value = 0;
	}
	updateTotal();
});

quantityAddBtn.addEventListener('click', () => {
	const quantityInput = document.querySelector('.form__quantity-input');
	quantityInput.value ++;
	if (quantityInput.value > 10) {
		quantityInput.value = 10;
	}
	updateTotal();
});



const serviceBtns = document.querySelectorAll('.form__service-btn');
serviceBtns.forEach(el => {
	el.addEventListener('click', () => {
		el.classList.toggle('form__service-btn--closed');
	});
});
