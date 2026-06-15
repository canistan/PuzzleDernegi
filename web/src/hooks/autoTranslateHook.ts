import { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';
import { translateJSON } from '../utilities/translate';

// The locales we want to automatically translate to
const TARGET_LOCALES = ['en', 'de', 'fr', 'ru'];

// Helper to strip out system fields before translating
const stripDoc = (doc: any) => {
  if (!doc) return doc;
  const stripped = { ...doc };
  delete stripped.id;
  delete stripped._id;
  delete stripped.createdAt;
  delete stripped.updatedAt;
  delete stripped.globalType;
  return stripped;
};

// Async function to perform the translation and update
const translateAndUpdate = async (payload: any, doc: any, config: { type: 'global' | 'collection', slug: string, id?: string | number }) => {
  try {
    const dataToTranslate = stripDoc(doc);
    
    // We run the translation and updates sequentially to avoid MongoDB WriteConflicts on the same document
    for (const locale of TARGET_LOCALES) {
      try {
        console.log(`[Auto-Translate] Translating ${config.slug} to ${locale}...`);
        const translatedData = await translateJSON(dataToTranslate, locale);
        
        if (config.type === 'global') {
          await payload.updateGlobal({
            slug: config.slug,
            locale: locale,
            data: translatedData,
            context: { isTranslating: true }, // Prevent infinite loop
          });
        } else if (config.type === 'collection' && config.id) {
          await payload.update({
            collection: config.slug,
            id: config.id,
            locale: locale,
            data: translatedData,
            context: { isTranslating: true }, // Prevent infinite loop
          });
        }
        console.log(`[Auto-Translate] Successfully translated ${config.slug} to ${locale}.`);
      } catch (err) {
        console.error(`[Auto-Translate] Failed for ${locale}:`, err);
      }
    }
  } catch (err) {
    console.error(`[Auto-Translate] Critical error during translation of ${config.slug}:`, err);
  }
};

export const autoTranslateGlobalHook = (slug: string): GlobalAfterChangeHook => {
  return async ({ doc, req }) => {
    // Prevent infinite loops if this change was triggered by our own translation update
    if (req.context?.isTranslating) return doc;
    
    // Only trigger if the user was editing the default locale ('tr') or 'all'
    if (req.locale !== 'tr' && req.locale !== 'all') return doc;

    // Fire and forget (do not await, so we don't block the UI)
    translateAndUpdate(req.payload, doc, { type: 'global', slug });
    
    return doc;
  };
};

export const autoTranslateCollectionHook = (slug: string): CollectionAfterChangeHook => {
  return async ({ doc, req }) => {
    // Prevent infinite loops
    if (req.context?.isTranslating) return doc;
    
    // Only trigger if the user was editing the default locale ('tr') or 'all'
    if (req.locale !== 'tr' && req.locale !== 'all') return doc;

    // Fire and forget
    translateAndUpdate(req.payload, doc, { type: 'collection', slug, id: doc.id });
    
    return doc;
  };
};
