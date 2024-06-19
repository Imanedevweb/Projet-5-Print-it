const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]
// Sélection des éléments HTML nécessaires pour le fonctionnement du carrousel.
const bannerImage = document.querySelector('.banner-img');
const bannerTagline = document.querySelector('#banner p');
const ArrowLeft = document.querySelector('.arrow_left');
const ArrowRight = document.querySelector('.arrow_right');
const Dots= document.querySelector('.dots');

// Déclaration de variable, compteur (image affichée)
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
//création des points dynamiques
function createDots(numberOfDots) {
	for (let i = 0; i < numberOfDots; i++) {
	  const dot = document.createElement('div');
	  dot.classList.add('dot');
	  Dots.appendChild(dot);
	}
  
	// Sélection premier point et ajoutez-y la classe "dot_selected" 
	const dots = document.querySelectorAll('.dot');
	dots[currentSlide].classList.add('dot_selected');
  }
  
  // Ajouter la fonction pour supprimer ou le points blanc 
  function updateCarousel() {
	const selectedDot = document.querySelector('.dot_selected');
	if (selectedDot) {
	  selectedDot.classList.remove('dot_selected');
	}
  
	//On récupère tous les éléments HTML des points (dots) du carrousel.
	const dots = document.querySelectorAll('.dot');
	dots[currentSlide].classList.add('dot_selected');
	showSlide(currentSlide);
  }
  
  // Fonction pour afficher le contenu du carrousselen fonction de l'index de diapositive actuel
  function showSlide(slideIndex) {
	if (slideIndex >= 0 && slideIndex < slides.length) {
	  bannerImage.src = './assets/images/slideshow/' + slides[slideIndex].image;
	  bannerTagline.innerHTML = slides[slideIndex].tagLine;
	}
  }
	
  // appel de la function des points pour les rendre dynamiques
  const numberOfSlides = slides.length;
  createDots(numberOfSlides);

// Fonction pour faire avancer le carrousel automatiquement
function autoAdvance() {
currentSlide = (currentSlide + 1) % slides.length;
updateCarousel();
}
 // Définir l'intervalle de temps pour le diaporama automatique (par exemple, toutes les 5 secondes)
 const intervalTime = 5000; // 5000 millisecondes (5 secondes)
 let slideshowInterval = setInterval(autoAdvance, intervalTime);

 // Mettre en pause le diaporama automatique lors du survol du carrousel
 bannerImage.addEventListener('mouseover', () => {
   clearInterval(slideshowInterval);
 });

 // Reprendre le diaporama automatique lorsque vous ne survolez pas le carrousel
 bannerImage.addEventListener('mouseout', () => {
   slideshowInterval = setInterval(autoAdvance, intervalTime);
 });


 // Affichage initial de la première diapositive
   showSlide(currentSlide);
 
   // Maintenant, ajouter des event listeners aux points
   const dots = document.querySelectorAll('.dot');
   dots.forEach((dot, index) => {
	 dot.addEventListener('click', () => {
	   // Afficher la diapositive sélectionnée lorsqu'un point est cliqué
	   currentSlide = index;
	   updateCarousel();
	 });
   });