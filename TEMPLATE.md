# Template pour Créer un Nouvel Outil

Ce document explique comment créer rapidement un nouvel outil en utilisant le template standardisé.

## Étapes de Création

### 1. Copier le Template de Base

Copiez le fichier template ci-dessous et renommez-le selon le nom de l'outil :

```bash
# Exemple pour un calculateur de taxes
cp TEMPLATE_TOOL.html tools/finance/tax-calculator.html
```

### 2. Personnaliser le Template

Modifiez les sections suivantes :

#### A. En-tête (Head)
- Changez le `<title>`
- Vérifiez les chemins CSS/JS relatifs

#### B. Breadcrumb
- Mettez à jour la catégorie
- Changez le nom de l'outil

#### C. Header
- Modifiez le titre H1
- Changez l'icône (cherchez sur Font Awesome)
- Personnalisez la description

#### D. Section Input
- Créez les champs de formulaire nécessaires
- Ajoutez labels et placeholders clairs
- Définissez les validations (min, max, required)

#### E. Section Output
- Définissez les résultats à afficher
- Créez les cards de résultats
- Ajoutez graphiques si nécessaire (Chart.js)

#### F. Section Help
- Expliquez comment utiliser l'outil (étapes)
- Indiquez les formules utilisées
- Ajoutez des conseils pratiques

#### G. JavaScript
- Implémentez la logique de calcul
- Utilisez les fonctions de `utils.js`
- Gérez les erreurs et validations

### 3. Liste de Vérification

Avant de considérer l'outil comme terminé :

- [ ] Le formulaire se soumet sans erreur
- [ ] Les calculs sont corrects
- [ ] Les résultats s'affichent correctement
- [ ] La validation des inputs fonctionne
- [ ] Le design est cohérent avec les autres outils
- [ ] Le breadcrumb fonctionne
- [ ] Les messages d'erreur sont clairs
- [ ] Responsive sur mobile
- [ ] Commentaires dans le code JavaScript
- [ ] Formules mathématiques documentées

### 4. Bonnes Pratiques

#### Validation
```javascript
// Toujours valider les inputs
const validation = validateNumber(value, min, max);
if (!validation.valid) {
    showNotification(validation.error, 'error');
    return;
}
```

#### Formatage
```javascript
// Utiliser les fonctions de formatage
document.getElementById('result').textContent = formatCurrency(amount);
document.getElementById('percent').textContent = formatPercentage(rate);
```

#### Gestion d'Erreurs
```javascript
// Gérer les cas limites
if (denominator === 0) {
    showNotification('Division par zéro impossible', 'error');
    return;
}
```

#### Accessibilité
- Utilisez des labels clairs
- Ajoutez des `aria-label` si nécessaire
- Assurez un bon contraste de couleurs
- Testez la navigation au clavier

## Template de Base

Voici le template HTML de base à copier :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[NOM DE L'OUTIL] - Business Tools</title>
    <link rel="stylesheet" href="../../assets/css/main.css">
    <link rel="stylesheet" href="../../assets/css/tools.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Décommenter si besoin de graphiques -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script> -->
</head>
<body>
    <nav class="breadcrumb">
        <a href="../../index.html"><i class="fas fa-home"></i> Accueil</a> >
        <a href="../../index.html#tools">[CATEGORIE]</a> >
        <span>[NOM OUTIL]</span>
    </nav>

    <main class="tool-container">
        <header class="tool-header">
            <h1><i class="fas fa-[ICONE]"></i> [NOM DE L'OUTIL]</h1>
            <p class="tool-description">
                [DESCRIPTION DÉTAILLÉE DE L'OUTIL]
            </p>
        </header>

        <section class="tool-input">
            <h2>Données d'entrée</h2>
            <form id="toolForm">
                <div class="input-grid">
                    <div class="form-group">
                        <label for="input1" class="form-label">
                            <i class="fas fa-[ICONE]"></i> [Label du champ]
                        </label>
                        <input
                            type="number"
                            id="input1"
                            class="form-input"
                            placeholder="Ex: 100"
                            min="0"
                            step="1"
                            value="100"
                            required>
                        <span class="form-help">Description du champ</span>
                    </div>

                    <!-- Ajoutez d'autres champs ici -->
                </div>

                <div class="action-buttons">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-calculator"></i> Calculer
                    </button>
                    <button type="button" class="btn btn-outline" id="resetBtn">
                        <i class="fas fa-redo"></i> Réinitialiser
                    </button>
                </div>
            </form>
        </section>

        <section class="tool-output" id="results" style="display: none;">
            <h2><i class="fas fa-chart-bar"></i> Résultats</h2>

            <div class="results-grid">
                <div class="result-item">
                    <div class="result-label">Résultat 1</div>
                    <div class="result-value highlight" id="result1">-</div>
                </div>

                <!-- Ajoutez d'autres résultats ici -->
            </div>
        </section>

        <section class="tool-help">
            <h3><i class="fas fa-question-circle"></i> Comment utiliser cet outil ?</h3>
            <ol>
                <li>Étape 1...</li>
                <li>Étape 2...</li>
                <li>Étape 3...</li>
            </ol>

            <h3><i class="fas fa-calculator"></i> Formule utilisée</h3>
            <code>
Formule mathématique ici
            </code>

            <h3><i class="fas fa-lightbulb"></i> Conseils</h3>
            <ul>
                <li>Conseil 1</li>
                <li>Conseil 2</li>
            </ul>
        </section>
    </main>

    <footer class="tool-footer">
        <a href="../../index.html">
            <i class="fas fa-arrow-left"></i> Retour aux outils
        </a>
    </footer>

    <script src="../../assets/js/utils.js"></script>
    <script src="../../assets/js/main.js"></script>
    <script>
        // Gestion de la soumission du formulaire
        document.getElementById('toolForm').addEventListener('submit', function(e) {
            e.preventDefault();
            calculate();
        });

        // Bouton reset
        document.getElementById('resetBtn').addEventListener('click', function() {
            document.getElementById('toolForm').reset();
            document.getElementById('results').style.display = 'none';
        });

        /**
         * Fonction de calcul principale
         */
        function calculate() {
            // 1. Récupérer les valeurs
            const input1 = parseFloat(document.getElementById('input1').value);

            // 2. Valider les valeurs
            const validation = validateNumber(input1, 0);
            if (!validation.valid) {
                showNotification(validation.error, 'error');
                return;
            }

            // 3. Effectuer les calculs
            const result = input1 * 2; // Exemple de calcul

            // 4. Afficher les résultats
            document.getElementById('result1').textContent = formatNumber(result);

            // 5. Afficher la section résultats
            document.getElementById('results').style.display = 'block';
            scrollToElement('#results', 100);

            // 6. Notification de succès
            showNotification('Calcul effectué !', 'success');
        }

        // Calcul automatique au chargement (optionnel)
        window.addEventListener('load', calculate);
    </script>
</body>
</html>
```

## Icônes Font Awesome Courantes

Voici quelques icônes utiles par catégorie :

### Finance
- `fa-euro-sign`, `fa-dollar-sign`, `fa-coins`, `fa-calculator`
- `fa-chart-line`, `fa-chart-bar`, `fa-percent`, `fa-piggy-bank`

### Facturation
- `fa-file-invoice`, `fa-file-invoice-dollar`, `fa-receipt`
- `fa-file-contract`, `fa-money-check-alt`

### Temps
- `fa-clock`, `fa-stopwatch`, `fa-calendar`, `fa-calendar-check`
- `fa-business-time`, `fa-hourglass-half`

### Marketing
- `fa-bullhorn`, `fa-ad`, `fa-chart-area`, `fa-share-alt`
- `fa-mouse-pointer`, `fa-eye`, `fa-heart`

### RH
- `fa-users`, `fa-user-tie`, `fa-hand-holding-usd`
- `fa-umbrella-beach`, `fa-file-signature`

### Inventaire
- `fa-warehouse`, `fa-boxes`, `fa-truck`, `fa-barcode`
- `fa-shopping-cart`, `fa-box`

### Analyse
- `fa-chart-pie`, `fa-tachometer-alt`, `fa-file-pdf`
- `fa-chart-line`, `fa-analytics`

## Exemples de Formules Courantes

### Pourcentage
```javascript
const percentage = (value / total) * 100;
```

### Marge
```javascript
const margin = ((sellingPrice - cost) / sellingPrice) * 100;
```

### ROI
```javascript
const roi = ((gain - cost) / cost) * 100;
```

### Moyenne
```javascript
const average = values.reduce((a, b) => a + b, 0) / values.length;
```

### Taux de croissance
```javascript
const growthRate = ((newValue - oldValue) / oldValue) * 100;
```

## Ressources Utiles

- Font Awesome Icons : https://fontawesome.com/icons
- Chart.js Documentation : https://www.chartjs.org/docs/
- MDN JavaScript : https://developer.mozilla.org/fr/docs/Web/JavaScript
- CSS Variables : Voir `assets/css/main.css`
- Fonctions Utils : Voir `assets/js/utils.js`

---

**Bon développement !** 🚀
