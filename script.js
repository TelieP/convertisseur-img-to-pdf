// Sélectionner les éléments du DOM
const fileInput = document.getElementById('fileInput');
const generatePDFButton = document.getElementById('generatePDF');

// Variable pour stocker les images
let images = [];

// Fonction pour gérer le changement des fichiers sélectionnés
fileInput.addEventListener('change', (e) => {
  const files = e.target.files;
  images = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Vérifier si c'est une image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        images.push(event.target.result);
        // Activer le bouton si des images sont présentes
        generatePDFButton.disabled = images.length === 0;
      };
      
      reader.readAsDataURL(file);
    }
  }
});

// Fonction pour générer le PDF
generatePDFButton.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  images.forEach((image, index) => {
    if (index > 0) {
      doc.addPage();
    }
    
    doc.addImage(image, 'JPEG', 10, 10, 180, 160);
  });

  // Sauvegarder le PDF généré
  doc.save('parfait_application_web.pdf');
});
