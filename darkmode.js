// Apply the invert filter to the entire webpage
document.documentElement.style.filter = "invert(1)";

// Set the background color of the page to black permanently
document.body.style.backgroundColor = "black";
document.documentElement.style.backgroundColor = "black";

// Optional: To ensure that images are not inverted along with the rest of the page, you can revert their colors back to normal
const images = document.querySelectorAll('img');
images.forEach(image => {
    image.style.filter = 'invert(1)';
});

// Target and invert PDF content (if any)
const pdfElements = document.querySelectorAll('iframe, object, embed'); // Target PDF elements
pdfElements.forEach(pdf => {
    pdf.style.filter = "invert(1)";  // Invert the PDF content
    pdf.style.backgroundColor = "black";  // Set PDF background to black
});
