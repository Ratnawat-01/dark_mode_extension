document.getElementById("toggleDarkMode").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleDarkMode,
  });
});

function toggleDarkMode() {
  const existingCover = document.querySelector("div[style*='mix-blend-mode: difference']");
  if (existingCover) {
    existingCover.remove();
    document.body.style.backgroundColor = "black";  // Set page background back to black
    document.documentElement.style.backgroundColor = "black";  // Set page background back to black
  } else {
    // Create the color inversion overlay
    const cover = document.createElement("div");
    cover.setAttribute("style", `
      position: fixed;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: white;
      mix-blend-mode: difference;  // Invert the colors
      z-index: 9999;
    `);
    document.body.appendChild(cover);
    
    // Set the page's background color to black (permanently)
    document.body.style.backgroundColor = "black";
    document.documentElement.style.backgroundColor = "black";
    
    // Target and invert PDF content (if any)
    const pdfElements = document.querySelectorAll('iframe, object, embed'); // Target PDF elements
    pdfElements.forEach(pdf => {
      pdf.style.filter = "invert(1)";  // Invert the PDF content
      pdf.style.backgroundColor = "black";  // Set PDF background to black
    });
  }
}
