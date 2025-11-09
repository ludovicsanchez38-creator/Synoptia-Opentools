/**
 * ===================================
 * BUSINESS TOOLS - UTILS.JS
 * Fonctions utilitaires réutilisables
 * ===================================
 */

/* === VALIDATION === */

/**
 * Valide qu'une valeur est un nombre dans une plage donnée
 * @param {string|number} value - La valeur à valider
 * @param {number} min - Valeur minimale (par défaut 0)
 * @param {number} max - Valeur maximale (par défaut Infinity)
 * @returns {Object} {valid: boolean, value: number, error: string}
 */
function validateNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);

    if (isNaN(num)) {
        return {
            valid: false,
            value: null,
            error: 'Veuillez entrer un nombre valide'
        };
    }

    if (num < min) {
        return {
            valid: false,
            value: num,
            error: `La valeur doit être supérieure ou égale à ${min}`
        };
    }

    if (num > max) {
        return {
            valid: false,
            value: num,
            error: `La valeur doit être inférieure ou égale à ${max}`
        };
    }

    return {
        valid: true,
        value: num,
        error: null
    };
}

/**
 * Valide qu'une valeur est un entier positif
 * @param {string|number} value - La valeur à valider
 * @returns {Object} {valid: boolean, value: number, error: string}
 */
function validateInteger(value) {
    const validation = validateNumber(value, 0);

    if (!validation.valid) {
        return validation;
    }

    if (!Number.isInteger(validation.value)) {
        return {
            valid: false,
            value: validation.value,
            error: 'La valeur doit être un nombre entier'
        };
    }

    return validation;
}

/**
 * Valide qu'un champ de formulaire n'est pas vide
 * @param {string} value - La valeur à valider
 * @returns {Object} {valid: boolean, error: string}
 */
function validateRequired(value) {
    const trimmed = String(value).trim();

    if (trimmed === '') {
        return {
            valid: false,
            error: 'Ce champ est requis'
        };
    }

    return {
        valid: true,
        error: null
    };
}

/**
 * Valide un email
 * @param {string} email - L'email à valider
 * @returns {Object} {valid: boolean, error: string}
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        return {
            valid: false,
            error: 'Veuillez entrer une adresse email valide'
        };
    }

    return {
        valid: true,
        error: null
    };
}

/* === FORMATAGE === */

/**
 * Formate un nombre en devise
 * @param {number} amount - Le montant à formater
 * @param {string} currency - Le code devise (EUR, USD, etc.)
 * @param {string} locale - La locale (fr-FR, en-US, etc.)
 * @returns {string} Le montant formaté
 */
function formatCurrency(amount, currency = 'EUR', locale = 'fr-FR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Formate un nombre en pourcentage
 * @param {number} value - La valeur à formater
 * @param {number} decimals - Nombre de décimales (par défaut 2)
 * @returns {string} Le pourcentage formaté
 */
function formatPercentage(value, decimals = 2) {
    return (value).toFixed(decimals) + '%';
}

/**
 * Formate un nombre avec séparateurs de milliers
 * @param {number} value - Le nombre à formater
 * @param {number} decimals - Nombre de décimales (par défaut 2)
 * @param {string} locale - La locale (fr-FR, en-US, etc.)
 * @returns {string} Le nombre formaté
 */
function formatNumber(value, decimals = 2, locale = 'fr-FR') {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

/**
 * Formate une date
 * @param {Date|string} date - La date à formater
 * @param {string} locale - La locale (fr-FR, en-US, etc.)
 * @returns {string} La date formatée
 */
function formatDate(date, locale = 'fr-FR') {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(d);
}

/**
 * Formate une date courte
 * @param {Date|string} date - La date à formater
 * @param {string} locale - La locale (fr-FR, en-US, etc.)
 * @returns {string} La date formatée (JJ/MM/AAAA)
 */
function formatDateShort(date, locale = 'fr-FR') {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(d);
}

/* === CALCULS FINANCIERS === */

/**
 * Calcule un pourcentage
 * @param {number} value - La valeur
 * @param {number} total - Le total
 * @returns {number} Le pourcentage
 */
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

/**
 * Calcule le ROI (Return on Investment)
 * @param {number} gain - Le gain
 * @param {number} cost - Le coût
 * @returns {number} Le ROI en pourcentage
 */
function calculateROI(gain, cost) {
    if (cost === 0) return 0;
    return ((gain - cost) / cost) * 100;
}

/**
 * Calcule la marge bénéficiaire
 * @param {number} revenue - Le chiffre d'affaires
 * @param {number} cost - Les coûts
 * @returns {number} La marge en pourcentage
 */
function calculateProfitMargin(revenue, cost) {
    if (revenue === 0) return 0;
    return ((revenue - cost) / revenue) * 100;
}

/**
 * Calcule le prix TTC à partir du HT
 * @param {number} priceHT - Prix HT
 * @param {number} vatRate - Taux de TVA (ex: 20 pour 20%)
 * @returns {number} Prix TTC
 */
function calculatePriceTTC(priceHT, vatRate = 20) {
    return priceHT * (1 + vatRate / 100);
}

/**
 * Calcule le prix HT à partir du TTC
 * @param {number} priceTTC - Prix TTC
 * @param {number} vatRate - Taux de TVA (ex: 20 pour 20%)
 * @returns {number} Prix HT
 */
function calculatePriceHT(priceTTC, vatRate = 20) {
    return priceTTC / (1 + vatRate / 100);
}

/**
 * Calcule le montant de TVA
 * @param {number} priceHT - Prix HT
 * @param {number} vatRate - Taux de TVA (ex: 20 pour 20%)
 * @returns {number} Montant de TVA
 */
function calculateVAT(priceHT, vatRate = 20) {
    return priceHT * (vatRate / 100);
}

/* === LOCAL STORAGE === */

/**
 * Sauvegarde des données dans le localStorage
 * @param {string} key - La clé de stockage
 * @param {any} data - Les données à sauvegarder
 * @returns {boolean} Succès de l'opération
 */
function saveToLocalStorage(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        return false;
    }
}

/**
 * Charge des données depuis le localStorage
 * @param {string} key - La clé de stockage
 * @returns {any|null} Les données chargées ou null
 */
function loadFromLocalStorage(key) {
    try {
        const jsonData = localStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        return null;
    }
}

/**
 * Supprime des données du localStorage
 * @param {string} key - La clé de stockage
 * @returns {boolean} Succès de l'opération
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
    }
}

/**
 * Efface toutes les données du localStorage
 * @returns {boolean} Succès de l'opération
 */
function clearLocalStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'effacement:', error);
        return false;
    }
}

/* === NOTIFICATIONS === */

/**
 * Affiche une notification toast
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type (success, error, warning, info)
 * @param {number} duration - Durée en ms (par défaut 3000)
 */
function showNotification(message, type = 'success', duration = 3000) {
    // Supprime les notifications existantes
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Crée la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Supprime automatiquement après la durée spécifiée
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/* === COPIER DANS LE PRESSE-PAPIER === */

/**
 * Copie du texte dans le presse-papier
 * @param {string} text - Le texte à copier
 * @returns {Promise<boolean>} Succès de l'opération
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback pour les navigateurs plus anciens
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (error) {
                textArea.remove();
                return false;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la copie:', error);
        return false;
    }
}

/* === EXPORT CSV === */

/**
 * Exporte des données en CSV
 * @param {Array<Object>} data - Les données à exporter
 * @param {string} filename - Nom du fichier
 * @param {Array<string>} headers - En-têtes personnalisés (optionnel)
 */
function exportToCSV(data, filename = 'export.csv', headers = null) {
    if (!data || data.length === 0) {
        showNotification('Aucune donnée à exporter', 'warning');
        return;
    }

    // Génère les en-têtes
    const csvHeaders = headers || Object.keys(data[0]);

    // Génère les lignes
    const csvRows = data.map(row => {
        return csvHeaders.map(header => {
            const value = row[header];
            // Échappe les virgules et guillemets
            const escaped = String(value).replace(/"/g, '""');
            return `"${escaped}"`;
        }).join(',');
    });

    // Combine en-têtes et données
    const csvContent = [
        csvHeaders.join(','),
        ...csvRows
    ].join('\n');

    // Télécharge le fichier
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}

/* === EXPORT JSON === */

/**
 * Exporte des données en JSON
 * @param {any} data - Les données à exporter
 * @param {string} filename - Nom du fichier
 */
function exportToJSON(data, filename = 'export.json') {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
}

/* === TÉLÉCHARGEMENT DE FICHIER === */

/**
 * Télécharge un fichier
 * @param {string} content - Le contenu du fichier
 * @param {string} filename - Nom du fichier
 * @param {string} mimeType - Type MIME
 */
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    // Nettoie
    setTimeout(() => {
        URL.revokeObjectURL(url);
        link.remove();
    }, 100);
}

/* === DEBOUNCE === */

/**
 * Debounce une fonction (retarde l'exécution)
 * @param {Function} func - La fonction à debouncer
 * @param {number} delay - Délai en ms
 * @returns {Function} La fonction debouncée
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* === THROTTLE === */

/**
 * Throttle une fonction (limite la fréquence d'exécution)
 * @param {Function} func - La fonction à throttler
 * @param {number} limit - Limite en ms
 * @returns {Function} La fonction throttlée
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* === GÉNÉRATION D'ID === */

/**
 * Génère un ID unique
 * @returns {string} L'ID généré
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Génère un UUID v4
 * @returns {string} L'UUID généré
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/* === UTILITAIRES DIVERS === */

/**
 * Arrondit un nombre à N décimales
 * @param {number} value - La valeur à arrondir
 * @param {number} decimals - Nombre de décimales
 * @returns {number} La valeur arrondie
 */
function roundTo(value, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Clamp une valeur entre min et max
 * @param {number} value - La valeur
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 * @returns {number} La valeur clampée
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Vérifie si un élément est visible dans le viewport
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean} True si visible
 */
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Scroll vers un élément avec animation
 * @param {string|HTMLElement} target - Sélecteur CSS ou élément
 * @param {number} offset - Offset en pixels (par défaut 0)
 */
function scrollToElement(target, offset = 0) {
    const element = typeof target === 'string'
        ? document.querySelector(target)
        : target;

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Attend un certain temps (promesse)
 * @param {number} ms - Temps en millisecondes
 * @returns {Promise} Promesse qui se résout après le délai
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Mélange un tableau (Fisher-Yates shuffle)
 * @param {Array} array - Le tableau à mélanger
 * @returns {Array} Le tableau mélangé
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/* === AFFICHAGE DES ERREURS DE FORMULAIRE === */

/**
 * Affiche une erreur sur un champ de formulaire
 * @param {HTMLElement} input - L'élément input
 * @param {string} message - Le message d'erreur
 */
function showFieldError(input, message) {
    // Supprime les erreurs existantes
    clearFieldError(input);

    // Ajoute la classe d'erreur
    input.classList.add('error');

    // Crée le message d'erreur
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;

    // Insert après l'input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Efface l'erreur d'un champ de formulaire
 * @param {HTMLElement} input - L'élément input
 */
function clearFieldError(input) {
    input.classList.remove('error');
    const error = input.parentNode.querySelector('.form-error');
    if (error) {
        error.remove();
    }
}

/**
 * Efface toutes les erreurs d'un formulaire
 * @param {HTMLElement} form - L'élément form
 */
function clearFormErrors(form) {
    const inputs = form.querySelectorAll('.error');
    inputs.forEach(input => clearFieldError(input));
}
