import { config, fields, collection } from '@keystatic/core';
import React from 'react';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Articles de Blog',
            slugField: 'title',
            path: 'content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Titre' } }),
                description: fields.text({ label: 'Description SEO (Meta)', multiline: true }),
                date: fields.date({ label: 'Date de publication', validation: { isRequired: true } }),
                image: fields.image({
                    label: 'Image de couverture',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                category: fields.select({
                    label: 'Catégorie',
                    options: [
                        { label: 'SEO Technique', value: 'SEO Technique' },
                        { label: 'Contenu', value: 'Contenu' },
                        { label: 'SEO Local', value: 'SEO Local' },
                        { label: 'Business', value: 'Business' },
                    ],
                    defaultValue: 'SEO Technique',
                }),
                keywords: fields.array(
                    fields.text({ label: 'Mot-clé' }),
                    { label: 'Mots-clés (Tags)', itemLabel: props => props.value }
                ),
                author: fields.text({ label: 'Auteur', defaultValue: 'Indiana Aflalo' }),
                content: fields.document({
                    label: 'RÉDACTION DE L\'ARTICLE (TEXTE)',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/posts',
                        publicPath: '/images/posts/',
                    },
                    componentBlocks: {
                        // Bloc CTA (existant)
                        cta: {
                            label: 'Appel à l\'action (CTA)',
                            schema: {
                                title: fields.text({ label: 'Titre' }),
                                description: fields.text({ label: 'Description', multiline: true }),
                                buttonText: fields.text({ label: 'Texte du bouton' }),
                                buttonLink: fields.text({ label: 'Lien du bouton' }),
                            },
                            preview: (props) => {
                                return (
                                    <div style={{ padding: '20px', background: '#111', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>{props.fields.title.value}</h3>
                                        <p style={{ color: '#ccc' }}>{props.fields.description.value}</p>
                                        <button style={{ background: '#7C9082', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                                            {props.fields.buttonText.value}
                                        </button>
                                    </div>
                                );
                            },
                        },
                        // Bloc FAQ 
                        faq: {
                            label: 'FAQ (Question/Réponse)',
                            schema: {
                                question: fields.text({ label: 'Question' }),
                                answer: fields.text({ label: 'Réponse', multiline: true }),
                            },
                            preview: (props) => {
                                return (
                                    <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #7C9082' }}>
                                        <p style={{ fontWeight: 'bold', margin: '0 0 8px 0', color: '#111' }}>
                                            ❓ {props.fields.question.value || 'Votre question...'}
                                        </p>
                                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                                            {props.fields.answer.value || 'Votre réponse...'}
                                        </p>
                                    </div>
                                );
                            },
                        },
                        // Bloc Hero Section
                        hero: {
                            label: 'Hero Section',
                            schema: {
                                title: fields.text({ label: 'Titre principal' }),
                                subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
                                buttonText: fields.text({ label: 'Texte du bouton (optionnel)' }),
                                buttonLink: fields.text({ label: 'Lien du bouton (optionnel)' }),
                            },
                            preview: (props) => {
                                return (
                                    <div style={{ padding: '40px 20px', background: 'linear-gradient(135deg, #111 0%, #333 100%)', borderRadius: '12px', textAlign: 'center' }}>
                                        <h2 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '24px' }}>
                                            {props.fields.title.value || 'Titre Hero'}
                                        </h2>
                                        <p style={{ color: '#aaa', margin: '0 0 16px 0', fontSize: '14px' }}>
                                            {props.fields.subtitle.value || 'Sous-titre de la section...'}
                                        </p>
                                        {props.fields.buttonText.value && (
                                            <button style={{ background: '#7C9082', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>
                                                {props.fields.buttonText.value}
                                            </button>
                                        )}
                                    </div>
                                );
                            },
                        },
                        // Bloc Highlight (mise en avant)
                        highlight: {
                            label: 'Mise en avant (Highlight)',
                            schema: {
                                text: fields.text({ label: 'Texte à mettre en avant', multiline: true }),
                                type: fields.select({
                                    label: 'Type',
                                    options: [
                                        { label: 'Info (bleu)', value: 'info' },
                                        { label: 'Astuce (vert)', value: 'tip' },
                                        { label: 'Attention (orange)', value: 'warning' },
                                    ],
                                    defaultValue: 'tip',
                                }),
                            },
                            preview: (props) => {
                                const colors: Record<string, { bg: string; border: string }> = {
                                    info: { bg: '#e3f2fd', border: '#2196f3' },
                                    tip: { bg: '#e8f5e9', border: '#7C9082' },
                                    warning: { bg: '#fff3e0', border: '#ff9800' },
                                };
                                const style = colors[props.fields.type.value] || colors.tip;
                                return (
                                    <div style={{ padding: '16px', background: style.bg, borderRadius: '8px', borderLeft: `4px solid ${style.border}` }}>
                                        <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                                            {props.fields.text.value || 'Votre texte mis en avant...'}
                                        </p>
                                    </div>
                                );
                            },
                        },
                    },
                }),
            },
        }),
    },
});

