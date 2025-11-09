# Guide de Contribution

Merci de votre intérêt pour contribuer à **100 Business Tools** ! 🎉

Nous accueillons toutes les contributions : corrections de bugs, nouveaux outils, améliorations de design, traductions, documentation, etc.

## Comment Contribuer

### 1. Fork et Clone

```bash
# Forkez le projet sur GitHub puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/100-business-tools.git
cd 100-business-tools

# Ajoutez le repository original comme remote
git remote add upstream https://github.com/ORIGINAL-USERNAME/100-business-tools.git
```

### 2. Créez une Branche

```bash
# Créez une branche pour votre contribution
git checkout -b feature/nom-de-la-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/nom-du-bug
```

### 3. Développez

- Suivez les standards de code du projet
- Testez vos modifications sur différents navigateurs
- Assurez-vous que le code fonctionne en mode responsive
- Ajoutez des commentaires clairs en français

### 4. Committez

```bash
# Ajoutez vos fichiers modifiés
git add .

# Committez avec un message clair
git commit -m "Ajout: Nouveau calculateur de taxes"
```

**Format des messages de commit :**
- `Ajout:` pour une nouvelle fonctionnalité
- `Fix:` pour une correction de bug
- `Amélioration:` pour une amélioration existante
- `Doc:` pour la documentation
- `Style:` pour des changements de style/design

### 5. Push et Pull Request

```bash
# Pushez vers votre fork
git push origin feature/nom-de-la-fonctionnalite
```

Puis créez une **Pull Request** sur GitHub avec :
- Un titre clair
- Une description détaillée des changements
- Des captures d'écran si pertinent
- La liste des tests effectués

## Standards de Code

### HTML
- Utilisez une indentation de 4 espaces
- Utilisez des balises sémantiques (`<section>`, `<article>`, etc.)
- Ajoutez des attributs `aria-` pour l'accessibilité
- Commentez les sections importantes

```html
<!-- Bon exemple -->
<section class="tool-input">
    <h2>Données d'entrée</h2>
    <form id="myForm">
        <!-- Formulaire ici -->
    </form>
</section>
```

### CSS
- Utilisez les variables CSS définies dans `main.css`
- Respectez la convention BEM si possible
- Groupez les propriétés logiquement
- Commentez les sections complexes

```css
/* Bon exemple */
.tool-card {
    background-color: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
}
```

### JavaScript
- Utilisez ES6+ (const/let, arrow functions, etc.)
- Ajoutez des commentaires JSDoc pour les fonctions
- Nommez clairement les variables et fonctions
- Validez toujours les inputs utilisateur
- Utilisez les fonctions de `utils.js` quand possible

```javascript
/**
 * Calcule la TVA sur un montant HT
 * @param {number} amountHT - Montant hors taxes
 * @param {number} vatRate - Taux de TVA en pourcentage
 * @returns {number} Montant de TVA
 */
function calculateVAT(amountHT, vatRate) {
    return amountHT * (vatRate / 100);
}
```

## Créer un Nouvel Outil

Pour créer un nouvel outil, consultez le fichier [TEMPLATE.md](TEMPLATE.md) qui contient :
- Un template HTML complet
- Les étapes de création
- Les bonnes pratiques
- Des exemples de code

**Checklist pour un nouvel outil :**
- [ ] Utilisez le template standardisé
- [ ] Ajoutez des validations d'inputs
- [ ] Implémentez la logique de calcul
- [ ] Affichez les résultats clairement
- [ ] Ajoutez une section "Comment utiliser"
- [ ] Documentez les formules utilisées
- [ ] Testez sur mobile et desktop
- [ ] Vérifiez l'accessibilité
- [ ] Ajoutez des messages d'erreur clairs
- [ ] Mettez à jour `index.html` si nécessaire

## Tests

Avant de soumettre une Pull Request, testez :

1. **Fonctionnalité**
   - Les calculs sont corrects
   - Les validations fonctionnent
   - Pas d'erreurs dans la console

2. **Responsive**
   - Mobile (320px - 480px)
   - Tablette (768px - 1024px)
   - Desktop (1280px+)

3. **Navigateurs**
   - Chrome/Edge (dernière version)
   - Firefox (dernière version)
   - Safari (si possible)

4. **Accessibilité**
   - Navigation au clavier
   - Lecteurs d'écran (si possible)
   - Bon contraste de couleurs

## Types de Contributions Recherchées

### 🐛 Corrections de Bugs
Identifiez et corrigez des bugs existants

### ✨ Nouveaux Outils
Développez les 90 outils restants (voir la liste dans README)

### 🎨 Améliorations de Design
Proposez des améliorations visuelles

### 📝 Documentation
Améliorez la documentation, ajoutez des exemples

### 🌍 Traductions
Traduisez l'interface en d'autres langues

### ⚡ Optimisations
Améliorez les performances, réduisez la taille des fichiers

### ♿ Accessibilité
Améliorez l'accessibilité pour tous les utilisateurs

## Code de Conduite

### Nos Engagements
- Respecter tous les contributeurs
- Accueillir les nouveaux venus
- Être constructif dans les critiques
- Accepter les feedbacks avec ouverture

### Comportements Inacceptables
- Langage ou images inappropriés
- Harcèlement sous quelque forme
- Attaques personnelles
- Publication d'informations privées

## Questions ?

Si vous avez des questions :
- Ouvrez une [Issue](https://github.com/USERNAME/100-business-tools/issues)
- Consultez les [Discussions](https://github.com/USERNAME/100-business-tools/discussions)
- Contactez les mainteneurs

## Reconnaissance

Tous les contributeurs seront ajoutés dans la section "Contributors" du README.

Merci pour votre contribution ! 🙏

---

**Happy Coding!** 🚀
