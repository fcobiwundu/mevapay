// js/loading.js

/**
 * Loads external HTML content into a specified element.
 *
 * @param {string} elementId - The ID of the element where the HTML will be loaded.
 * @param {string} url - The URL of the HTML file to load.
 */
function loadHTML(elementId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = data;
            } else {
                console.error(`Element with ID "${elementId}" not found.`);
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

/**
 * Initializes the loading overlay by loading the loading.html content.
 * Call this function after the DOM has fully loaded.
 */
function initializeLoadingOverlay() {
    loadHTML('loader-container', 'loading.html');
}

// Initialize the loading overlay when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeLoadingOverlay);

/**
 * Shows the loading indicator.
 */
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open');
    } else {
        console.error('Loading overlay not found.');
    }
}

/**
 * Hides the loading indicator.
 */
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        // Remove the class that prevents scrolling
        document.body.classList.remove('modal-open');
    } else {
        console.error('Loading overlay not found.');
    }
}
