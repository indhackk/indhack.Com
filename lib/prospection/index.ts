/**
 * Prospection 06 - Module principal
 * Système de prospection pour entreprises sans site web
 */

// Types
export * from './types';

// Data
export {
    PROSPECTION_CATEGORIES,
    CITIES_06,
    getCategoryById,
    getSubcategoryBySlug,
    getAllSubcategories,
    getCityByName,
    getMainCities,
    getTotalPopulation06
} from './categories-data';

// Volume estimation
export {
    estimateVolumeForCity,
    estimateVolumesAllCities,
    getGoogleAutocomplete,
    getKeywordSuggestions,
    estimateKeywordVolume,
    calculateSEOPotential,
    generateSEOReport,
    VolumeEstimator
} from './volume-estimator';

// Message generation
export {
    generateDiagnosticUrl,
    cleanPhoneForWhatsApp,
    generateWhatsAppUrl,
    generateWhatsAppMessage,
    generateEmailMessage,
    generateAllMessages,
    enrichProspect,
    MessageGenerator
} from './message-templates';
