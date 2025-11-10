#!/usr/bin/env python3
"""
Script pour corriger automatiquement les vulnérabilités XSS dans les outils
Remplace les insertions de données utilisateur non sécurisées par escapeHtml()
"""

import re
import os
import glob

def wrap_with_escape_html(match):
    """Wrap variable interpolations with escapeHtml()"""
    var = match.group(1)

    # Ne pas wrapper si c'est déjà wrappé
    if 'escapeHtml(' in var or 'sanitizeHTML(' in var:
        return match.group(0)

    # Ne pas wrapper les constantes, nombres, boolean
    if var.isdigit() or var in ['true', 'false', 'null']:
        return match.group(0)

    # Ne pas wrapper les appels de fonction de formatage (probablement safe)
    if var.startswith('format') or var.startswith('get') and var.endswith(')'):
        return match.group(0)

    # Wrapper avec escapeHtml
    return f'${{escapeHtml({var})}}'

def fix_xss_in_file(filepath):
    """Fix XSS vulnerabilities in a single HTML file"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.content()

    original = content

    # Pattern pour trouver les template literals avec interpolation
    # Cherche ${variable} dans les innerHTML ou autres contextes dangereux
    pattern = r'\$\{([^}]+)\}'

    # Remplacer dans les contextes dangereux uniquement
    # (innerHTML, outerHTML, insertAdjacentHTML, etc.)
    dangerous_contexts = [
        r'\.innerHTML\s*=\s*`([^`]+)`',
        r'\.outerHTML\s*=\s*`([^`]+)`',
    ]

    for context_pattern in dangerous_contexts:
        def replace_in_context(match):
            template = match.group(1)
            fixed_template = re.sub(pattern, wrap_with_escape_html, template)
            return match.group(0).replace(template, fixed_template)

        content = re.sub(context_pattern, replace_in_context, content, flags=re.DOTALL)

    # Ajouter commentaire de sécurité si modifié
    if content != original:
        content = content.replace(
            '\.innerHTML\s*=\s*`',
            '// SÉCURITÉ: Utilise escapeHtml() pour éviter les XSS\n            .innerHTML = `',
            1
        )

    # Écrire le fichier modifié
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    """Fix XSS in all tools"""

    tools_dir = '/home/user/Synoptia-Opentools/tools'
    files = glob.glob(f'{tools_dir}/**/*.html', recursive=True)

    print(f"🔍 Analyse de {len(files)} fichiers...")

    fixed = 0
    for filepath in files:
        if fix_xss_in_file(filepath):
            print(f"✅ Corrigé: {filepath}")
            fixed += 1

    print(f"\n✨ {fixed} fichiers corrigés sur {len(files)}")

if __name__ == '__main__':
    main()
