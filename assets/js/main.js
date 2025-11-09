/**
 * ===================================
 * BUSINESS TOOLS - MAIN.JS
 * JavaScript global pour l'application
 * ===================================
 */

// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Business Tools - Application chargée');
    initApp();
});

/**
 * Initialise l'application
 */
function initApp() {
    // Ajoute les event listeners globaux
    setupGlobalEventListeners();
}

/**
 * Configure les event listeners globaux
 */
function setupGlobalEventListeners() {
    // Gestion du menu mobile (si nécessaire)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Gestion des formulaires avec validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Gestion des boutons de copie
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyButton);
    });
}

/**
 * Toggle le menu mobile
 */
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

/**
 * Gère la soumission de formulaire avec validation
 */
function handleFormSubmit(e) {
    const form = e.target;
    const isValid = validateForm(form);

    if (!isValid) {
        e.preventDefault();
        showNotification('Veuillez corriger les erreurs du formulaire', 'error');
    }
}

/**
 * Valide un formulaire complet
 * @param {HTMLFormElement} form - Le formulaire à valider
 * @returns {boolean} True si valide
 */
function validateForm(form) {
    let isValid = true;

    // Efface les erreurs existantes
    clearFormErrors(form);

    // Valide tous les champs requis
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const validation = validateRequired(field.value);
        if (!validation.valid) {
            showFieldError(field, validation.error);
            isValid = false;
        }
    });

    // Valide les champs numériques
    const numberFields = form.querySelectorAll('input[type="number"]');
    numberFields.forEach(field => {
        if (field.value) {
            const min = parseFloat(field.getAttribute('min')) || 0;
            const max = parseFloat(field.getAttribute('max')) || Infinity;
            const validation = validateNumber(field.value, min, max);

            if (!validation.valid) {
                showFieldError(field, validation.error);
                isValid = false;
            }
        }
    });

    // Valide les champs email
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value) {
            const validation = validateEmail(field.value);
            if (!validation.valid) {
                showFieldError(field, validation.error);
                isValid = false;
            }
        }
    });

    return isValid;
}

/**
 * Gère le clic sur un bouton de copie
 */
async function handleCopyButton(e) {
    const button = e.currentTarget;
    const textToCopy = button.getAttribute('data-copy');

    if (!textToCopy) return;

    const success = await copyToClipboard(textToCopy);

    if (success) {
        button.classList.add('copied');
        showNotification('Copié dans le presse-papier !', 'success', 2000);

        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    } else {
        showNotification('Erreur lors de la copie', 'error');
    }
}

/**
 * Gère les onglets (tabs)
 * @param {string} tabGroupId - ID du groupe d'onglets
 * @param {string} tabId - ID de l'onglet à activer
 */
function switchTab(tabGroupId, tabId) {
    // Désactive tous les onglets du groupe
    const tabButtons = document.querySelectorAll(`[data-tab-group="${tabGroupId}"] .tab-btn`);
    const tabContents = document.querySelectorAll(`[data-tab-group="${tabGroupId}"] .tab-content`);

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Active l'onglet sélectionné
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

/**
 * Initialise les onglets
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabGroup = this.closest('[data-tab-group]').getAttribute('data-tab-group');
            switchTab(tabGroup, tabId);
        });
    });
}

// Initialise les onglets au chargement
document.addEventListener('DOMContentLoaded', initTabs);

/**
 * Affiche un loader
 * @param {HTMLElement} container - Le conteneur où afficher le loader
 */
function showLoader(container) {
    const loader = document.createElement('div');
    loader.className = 'spinner';
    loader.id = 'app-loader';

    if (container) {
        container.appendChild(loader);
    } else {
        document.body.appendChild(loader);
    }
}

/**
 * Cache le loader
 */
function hideLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.remove();
    }
}

/**
 * Formate les inputs numériques automatiquement
 */
function initNumberFormatting() {
    const currencyInputs = document.querySelectorAll('input[data-format="currency"]');

    currencyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            if (!isNaN(value)) {
                this.value = formatNumber(value, 2);
            }
        });
    });
}

// Initialise le formatage au chargement
document.addEventListener('DOMContentLoaded', initNumberFormatting);

/**
 * Gère l'impression de page
 */
function printPage() {
    window.print();
}

/**
 * Télécharge une page en PDF (nécessite jsPDF - à charger si besoin)
 * @param {string} filename - Nom du fichier
 */
function downloadPageAsPDF(filename = 'document.pdf') {
    // Cette fonction nécessite la bibliothèque jsPDF
    // Charger avec: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF n\'est pas chargé');
        showNotification('Fonctionnalité PDF non disponible', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtient le contenu à exporter
    const content = document.querySelector('.tool-container') || document.body;

    doc.html(content, {
        callback: function(doc) {
            doc.save(filename);
            showNotification('PDF téléchargé avec succès !', 'success');
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 800
    });
}

/**
 * Gère le mode sombre (dark mode)
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    showNotification(
        isDarkMode ? 'Mode sombre activé' : 'Mode clair activé',
        'success',
        2000
    );
}

/**
 * Charge le mode sombre depuis les préférences
 */
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Charge la préférence au chargement
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

/**
 * Anime un compteur de 0 à une valeur cible
 * @param {HTMLElement} element - L'élément à animer
 * @param {number} target - Valeur cible
 * @param {number} duration - Durée en ms
 */
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.textContent = Math.round(current);
    }, 16);
}

/**
 * Observe l'intersection pour animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe tous les éléments avec data-animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialise les animations au scroll
document.addEventListener('DOMContentLoaded', initScrollAnimations);

/**
 * Gestion des services workers pour le mode offline (PWA)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Décommenter pour activer le service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW enregistré:', registration))
        //     .catch(error => console.log('SW erreur:', error));
    });
}

/**
 * Export des fonctions utiles globalement
 */
window.BusinessTools = {
    showNotification,
    copyToClipboard,
    switchTab,
    showLoader,
    hideLoader,
    printPage,
    downloadPageAsPDF,
    toggleDarkMode,
    animateCounter,
    validateForm,
    formatCurrency,
    formatPercentage,
    formatNumber,
    exportToCSV,
    exportToJSON,
    saveToLocalStorage,
    loadFromLocalStorage
};
