const slides = [
	{
		"image": "slide1.jpg",
		"tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image": "slide2.jpg",
		"tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image": "slide3.jpg",
		"tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image": "slide4.png",
		"tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

//Sélection des élements html nécessaires pour le carousel
const bannerImage = document.querySelector('.banner-img');
const bannerTagline = document.querySelector('#banner p');
const ArrowLeft = document.querySelector('.arrow_left');
const ArrowRight = document.querySelector('.arrow_right');
const DOTS = document.querySelector('.dots');

// Déclaration de variable - valeur initiale de 0 (diapositive actuellement affichée).
let currentSlide = 0;

// Ajout des EventListeners pour les fleches
ArrowLeft.addEventListener('click', () => {
	console.log('Left arrow clicked!');
	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	updateCarousel();
});

ArrowRight.addEventListener('click', () => {
	console.log('Right arrow clicked!');
	currentSlide = (currentSlide + 1) % slides.length;
	updateCarousel();
});

// Fonction pour générer les points dynamiquement
function createDots(numberOfDots) {
	for (let index = 0; index < numberOfDots; index++) {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		DOTS.appendChild(dot);
	}

	// Sélection du premier point et ajout de la classe "dot_selected"
	const dots = document.querySelectorAll('.dot');
	dots[currentSlide].classList.add('dot_selected');
}

// Changement du points sélectionnés
function updateCarousel() {
	const selectedDot = document.querySelector('.dot_selected');
	if (selectedDot) {
		selectedDot.classList.remove('dot_selected');
	}

	//On récupère tous les éléments des points (dots) du carrousel.
	const dots = document.querySelectorAll('.dot');
	dots[currentSlide].classList.add('dot_selected');
	showSlide(currentSlide);
}

// Fonction pour afficher le contenu de la diapositive en fonction de l'index de diapositive actuel
function showSlide(slideIndex) {
	if (slideIndex >= 0 && slideIndex < slides.length) {
		bannerImage.src = './assets/images/slideshow/' + slides[slideIndex].image;
		bannerTagline.innerHTML = slides[slideIndex].tagLine;
	}
}

// appel de la fonction du nombre de Slide pour génerer automatiquement les points
const numberOfSlides = slides.length;
createDots(numberOfSlides);

// Ajout des Eventlisteners aux points
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		// Afficher la diapositive sélectionnée lorsqu'un point est cliqué
		currentSlide = index;
		updateCarousel();
	});
});

// **************Faire avancer le carrousel automatiquement*******/
function autoAdvance() {
	currentSlide = (currentSlide + 1) % slides.length;
	updateCarousel();
}

// Définir l'intervalle de temps pour le diaporama automatique toutes les trois minutes
const intervalTime = 3000; // 3000 millisecondes (3 secondes)
let slideshowInterval = setInterval(autoAdvance, intervalTime);

// Mettre en pause le diaporama automatique lors du survol du carrousel
bannerImage.addEventListener('mouseover', function () {
	clearInterval(slideshowInterval);
});

// Reprendre le diaporama automatique lorsque vous ne survolez pas le carrousel
bannerImage.addEventListener('mouseout', function () {
	slideshowInterval = setInterval(autoAdvance, intervalTime);
});

// afficher la diapo initiale
showSlide(currentSlide);
