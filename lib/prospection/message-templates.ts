/**
 * Templates de messages pour prospection WhatsApp/Email
 * Génération de messages personnalisés
 */

import { Prospect, Category, CategoryId } from './types';
import { PROSPECTION_CATEGORIES, getSubcategoryBySlug } from './categories-data';

/**
 * Variables disponibles dans les templates
 */
interface TemplateVariables {
    nom: string;
    ville: string;
    note: string;
    avis: string;
    subcategory: string;
    url: string;
}

/**
 * Remplace les variables {{var}} dans un template
 */
function replaceVariables(template: string, vars: TemplateVariables): string {
    let result = template;

    for (const [key, value] of Object.entries(vars)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return result;
}

/**
 * Génère l'URL de diagnostic personnalisée
 */
export function generateDiagnosticUrl(
    metierSlug: string,
    nom: string,
    ville: string,
    note: number,
    avis: number
): string {
    const params = new URLSearchParams({
        nom: nom,
        ville: ville,
        note: note.toString(),
        avis: avis.toString()
    });

    return `https://indhack.com/diagnostic/${metierSlug}?${params.toString()}`;
}

/**
 * Nettoie un numéro de téléphone français pour WhatsApp
 * "06 12 34 56 78" → "33612345678"
 */
export function cleanPhoneForWhatsApp(phone: string): string {
    // Supprimer tous les caractères non numériques
    let cleaned = phone.replace(/\D/g, '');

    // Si commence par 0, remplacer par 33
    if (cleaned.startsWith('0')) {
        cleaned = '33' + cleaned.substring(1);
    }

    // Si ne commence pas par 33, ajouter
    if (!cleaned.startsWith('33')) {
        cleaned = '33' + cleaned;
    }

    return cleaned;
}

/**
 * Génère l'URL WhatsApp avec message pré-rempli
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
    const cleanPhone = cleanPhoneForWhatsApp(phone);
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Génère le message WhatsApp personnalisé
 */
export function generateWhatsAppMessage(
    prospect: Prospect,
    category: Category
): string {
    const template = category.messageTemplate.whatsapp;

    // Trouver le label de la sous-catégorie
    const subcategoryData = category.subcategories.find(s => s.slug === prospect.subcategory);
    const subcategoryLabel = subcategoryData?.label.toLowerCase() || prospect.subcategory;

    const vars: TemplateVariables = {
        nom: prospect.name,
        ville: prospect.ville,
        note: prospect.rating.toFixed(1),
        avis: prospect.reviewCount.toString(),
        subcategory: subcategoryLabel,
        url: prospect.diagnosticUrl
    };

    const parts = [
        replaceVariables(template.greeting, vars),
        replaceVariables(template.hook, vars),
        replaceVariables(template.value, vars),
        replaceVariables(template.cta, vars),
        template.signature
    ];

    return parts.join('\n\n');
}

/**
 * Génère le message Email personnalisé
 */
export function generateEmailMessage(
    prospect: Prospect,
    category: Category
): { subject: string; body: string } {
    const template = category.messageTemplate.email;

    const subcategoryData = category.subcategories.find(s => s.slug === prospect.subcategory);
    const subcategoryLabel = subcategoryData?.label.toLowerCase() || prospect.subcategory;

    const vars: TemplateVariables = {
        nom: prospect.name,
        ville: prospect.ville,
        note: prospect.rating.toFixed(1),
        avis: prospect.reviewCount.toString(),
        subcategory: subcategoryLabel,
        url: prospect.diagnosticUrl
    };

    const subject = replaceVariables(template.subject, vars);

    const bodyParts = [
        replaceVariables(template.greeting, vars),
        replaceVariables(template.hook, vars),
        replaceVariables(template.value, vars),
        replaceVariables(template.cta, vars),
        replaceVariables(template.signature, vars)
    ];

    return {
        subject,
        body: bodyParts.join('\n\n')
    };
}

/**
 * Génère tous les messages pour un prospect
 */
export function generateAllMessages(prospect: Prospect): {
    whatsappMessage: string;
    whatsappUrl: string | null;
    emailSubject: string;
    emailBody: string;
    diagnosticUrl: string;
} {
    const category = PROSPECTION_CATEGORIES.find(c => c.id === prospect.category);

    if (!category) {
        throw new Error(`Category not found: ${prospect.category}`);
    }

    const whatsappMessage = generateWhatsAppMessage(prospect, category);
    const { subject: emailSubject, body: emailBody } = generateEmailMessage(prospect, category);

    return {
        whatsappMessage,
        whatsappUrl: prospect.phone ? generateWhatsAppUrl(prospect.phone, whatsappMessage) : null,
        emailSubject,
        emailBody,
        diagnosticUrl: prospect.diagnosticUrl
    };
}

/**
 * Crée un prospect complet avec toutes les URLs générées
 */
export function enrichProspect(
    rawProspect: Omit<Prospect, 'diagnosticUrl' | 'whatsappUrl' | 'phoneClean'>
): Prospect {
    const category = PROSPECTION_CATEGORIES.find(c => c.id === rawProspect.category);
    const subcategory = category?.subcategories.find(s => s.slug === rawProspect.subcategory);

    const diagnosticUrl = generateDiagnosticUrl(
        subcategory?.metierSlug || rawProspect.subcategory,
        rawProspect.name,
        rawProspect.ville,
        rawProspect.rating,
        rawProspect.reviewCount
    );

    const phoneClean = rawProspect.phone ? cleanPhoneForWhatsApp(rawProspect.phone) : undefined;

    // Générer le message WhatsApp pour l'URL
    let whatsappUrl: string | undefined;
    if (rawProspect.phone && category) {
        const tempProspect = { ...rawProspect, diagnosticUrl } as Prospect;
        const whatsappMessage = generateWhatsAppMessage(tempProspect, category);
        whatsappUrl = generateWhatsAppUrl(rawProspect.phone, whatsappMessage);
    }

    return {
        ...rawProspect,
        diagnosticUrl,
        whatsappUrl,
        phoneClean
    } as Prospect;
}

/**
 * Export de la bibliothèque de messages
 */
export const MessageGenerator = {
    generateDiagnosticUrl,
    cleanPhoneForWhatsApp,
    generateWhatsAppUrl,
    generateWhatsAppMessage,
    generateEmailMessage,
    generateAllMessages,
    enrichProspect
};
