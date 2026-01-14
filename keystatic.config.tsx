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
                    label: 'Contenu de l\'article',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/posts',
                        publicPath: '/images/posts/',
                    },
                    componentBlocks: {
                        cta: {
                            label: 'Appel à l\'action (CTA)',
                            schema: {
                                title: fields.text({ label: 'Titre' }),
                                description: fields.text({ label: 'Description', multiline: true }),
                                buttonText: fields.text({ label: 'Texte du bouton' }),
                                buttonLink: fields.text({ label: 'Lien du bouton' }),
                            },
                            // On utilise une fonction simple qui retourne du JSX valide
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
                    },
                }),
            },
        }),
    },
});
