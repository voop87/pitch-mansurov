(function(){
	const slider = document.querySelector('.slider')
	const slides = slider.querySelectorAll('.slider__image');
	const sliderLine = slider.querySelector('.slider__items');
	const nextBtn = slider.querySelector('.slider__btn--next');
	const prevBtn = slider.querySelector('.slider__btn--prev');
	const currentSlide = slider.querySelector('.slider__current-slide');
	const totalSlides = slider.querySelector('.slider__total-slides');

	let count = 0;
	let width;

	if (slides.length < 10) {
		totalSlides.textContent = '0' + slides.length;
	} else {
		totalSlides.textContent = slides.length;
	}


	const initSlider = function () {
		width = slider.offsetWidth;
		sliderLine.style.width = width * slides.length + 'px';

		slides.forEach(function (slide) {
			slide.style.width = width + 'px';
		});
		rollSlider(count);
	};

	window.addEventListener('resize', initSlider);

	initSlider();

	function rollSlider (count) {
		sliderLine.style.transform = 'translate(-' + count * width + 'px)';
		slides.forEach(function(slide) {
			slide.style.opacity = '0';
		});
		slides[count].style.opacity = 1;
		if (count < 9) {
			currentSlide.textContent = '0' + (count + 1);
		} else {
			currentSlide.textContent = count + 1;
		}
	};

	nextBtn.addEventListener('click', function(){
		count++;
		if (count > slides.length - 1) {
			count = 0;
		}
		rollSlider(count);
	});
	prevBtn.addEventListener('click', function(){
		count--;
		if (count < 0) {
			count = slides.length - 1;
		}
		rollSlider(count);
	});
})();