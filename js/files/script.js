// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


const languageAct = document.querySelector('.language-act');
if (languageAct) {
  languageAct.addEventListener("click", function (e) {
    languageAct.classList.toggle('color');
    e.stopPropagation(); // Зупиняє подальше поширення події, щоб не спрацьовував клік поза елементом
  });

  document.addEventListener("click", function (e) {
    if (!languageAct.contains(e.target)) {
      languageAct.classList.remove('color');
    }
  });
}


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

//========================================= form ===============================================================================================================
document.querySelector('selector' , function() {
	const form = document.querySelector('form');
	const button = document.querySelector('.item-contacts__button');
	const inputs = form.querySelectorAll('input, textarea');

	function checkValidity() {
		let isValid = true;
		inputs.forEach(function(input) {
			if (input.hasAttribute('data-required') && input.value.trim() === '') {
				isValid = false;
			}
		});
		return isValid;
	}

	function updateButtonState() {
		if (checkValidity()) {
			button.classList.add('valid');
			button.classList.remove('error');
		} else {
			button.classList.add('error');
			button.classList.remove('valid');
		}
	}

	inputs.forEach(function(input) {
		input.addEventListener('input', function() {
			updateButtonState();
		});
		input.addEventListener('focus', function() {
			button.classList.add('focus');
		});
		input.addEventListener('blur', function() {
			button.classList.remove('focus');
		});
	});

	form.addEventListener('submit', function(event) {
		if (!checkValidity()) {
			event.preventDefault();
			button.classList.add('error');
			button.classList.remove('valid');
		}
	});
});


//===================================================== arrow up===================================================================================================
function initScroll(
	scrollButton,
	pxToShow,
	fadeOutOnFooter,
	scrollActiveClass,
	isSmooth
) {
	const CLASS = scrollActiveClass ? scrollActiveClass : "show";
	const BUTTON = document.querySelector('[data-goto="' + scrollButton + '"]');
	const btnUp = BUTTON.querySelector('.btn-up-block');

	BUTTON.onclick = () => {
		 window.scrollTo({
				top: 0,
				left: 0,
				behavior: isSmooth ? "smooth" : "auto",
		 });
		 BUTTON.classList.remove('active');
	};

	window.onscroll = () => {
		 if (window.pageYOffset > pxToShow) {
				BUTTON.classList.add('active');
				btnUp.style.display = 'block';
		 } else {
				BUTTON.classList.remove('active');
				btnUp.style.display = 'none';
		 }
	};
}

initScroll("up", 0, false, false, true);
