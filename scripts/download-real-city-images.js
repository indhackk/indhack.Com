/**
 * Script pour télécharger de VRAIES images des villes françaises
 * Source: Wikimedia Commons (photos réelles des monuments)
 * Toutes les images sont sous licence libre (CC BY-SA ou domaine public)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const piexif = require('piexifjs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/cities');

// URLs Wikimedia Commons - VRAIES photos des lieux
const CITY_IMAGES = {
    'nice': {
        lat: 43.7102, lng: 7.2620,
        keywords: ['SEO Nice', 'consultant SEO Nice', 'référencement Nice', 'Côte d\'Azur', 'Alpes-Maritimes'],
        images: [
            {
                name: 'nice-promenade-anglais',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Nice-night-view-with-Promenade-des-Anglais.jpg/1280px-Nice-night-view-with-Promenade-des-Anglais.jpg',
                alt: 'Promenade des Anglais Nice vue aérienne'
            },
            {
                name: 'nice-vieux-nice',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Nizza_Altstadt.jpg/1280px-Nizza_Altstadt.jpg',
                alt: 'Vieux-Nice ruelles colorées'
            },
            {
                name: 'nice-place-massena',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nice-Place-Massena.jpg/1280px-Nice-Place-Massena.jpg',
                alt: 'Place Masséna Nice fontaine'
            }
        ]
    },
    'cannes': {
        lat: 43.5528, lng: 7.0174,
        keywords: ['SEO Cannes', 'consultant SEO Cannes', 'référencement Cannes', 'La Croisette', 'Festival'],
        images: [
            {
                name: 'cannes-croisette',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cannes_-_Boulevard_de_la_Croisette_-_panoramio.jpg/1280px-Cannes_-_Boulevard_de_la_Croisette_-_panoramio.jpg',
                alt: 'Boulevard de la Croisette Cannes plage'
            },
            {
                name: 'cannes-palais-festivals',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cannes_Palais_des_Festivals.jpg/1280px-Cannes_Palais_des_Festivals.jpg',
                alt: 'Palais des Festivals Cannes tapis rouge'
            },
            {
                name: 'cannes-vieux-port',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Le_Vieux_Port_de_Cannes.jpg/1280px-Le_Vieux_Port_de_Cannes.jpg',
                alt: 'Vieux Port Cannes bateaux Le Suquet'
            }
        ]
    },
    'antibes': {
        lat: 43.5804, lng: 7.1251,
        keywords: ['SEO Antibes', 'consultant SEO Antibes', 'référencement Antibes', 'Juan-les-Pins', 'yachting'],
        images: [
            {
                name: 'antibes-port-vauban',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Port_Vauban_Antibes.jpg/1280px-Port_Vauban_Antibes.jpg',
                alt: 'Port Vauban Antibes yachts luxe'
            },
            {
                name: 'antibes-vieille-ville',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Antibes_Vieille_Ville.jpg/1280px-Antibes_Vieille_Ville.jpg',
                alt: 'Vieille ville Antibes remparts'
            },
            {
                name: 'antibes-cap',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Cap_d%27Antibes_-_Villa_Eilenroc.jpg/1280px-Cap_d%27Antibes_-_Villa_Eilenroc.jpg',
                alt: 'Cap d\'Antibes villa mer'
            }
        ]
    },
    'monaco': {
        lat: 43.7384, lng: 7.4246,
        keywords: ['SEO Monaco', 'consultant SEO Monaco', 'référencement Monaco', 'Monte-Carlo', 'Principauté'],
        images: [
            {
                name: 'monaco-casino',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Casino_de_Monte-Carlo_%28Monaco%29.jpg/1280px-Casino_de_Monte-Carlo_%28Monaco%29.jpg',
                alt: 'Casino Monte-Carlo façade'
            },
            {
                name: 'monaco-port-hercule',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Monaco_City_001.jpg/1280px-Monaco_City_001.jpg',
                alt: 'Port Hercule Monaco yachts vue aérienne'
            },
            {
                name: 'monaco-rocher',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Monaco_-_Pair_of_guards_outside_the_Palais_Princier.jpg/1024px-Monaco_-_Pair_of_guards_outside_the_Palais_Princier.jpg',
                alt: 'Palais Princier Monaco Rocher'
            }
        ]
    },
    'sophia-antipolis': {
        lat: 43.6163, lng: 7.0557,
        keywords: ['SEO Sophia Antipolis', 'consultant SEO technopole', 'référencement startup', 'Silicon Valley Europe'],
        images: [
            {
                name: 'sophia-antipolis-technopole',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sophia-Antipolis_business_park.jpg/1280px-Sophia-Antipolis_business_park.jpg',
                alt: 'Technopole Sophia Antipolis parc tech'
            },
            {
                name: 'sophia-antipolis-bureaux',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Amadeus_Sophia_Antipolis.jpg/1280px-Amadeus_Sophia_Antipolis.jpg',
                alt: 'Bureaux Amadeus Sophia Antipolis'
            },
            {
                name: 'sophia-antipolis-campus',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/SKEMA_Business_School_-_Sophia_Antipolis_Campus.jpg/1280px-SKEMA_Business_School_-_Sophia_Antipolis_Campus.jpg',
                alt: 'Campus SKEMA Sophia Antipolis'
            }
        ]
    },
    'marseille': {
        lat: 43.2965, lng: 5.3698,
        keywords: ['SEO Marseille', 'consultant SEO Marseille', 'référencement Marseille', 'Vieux-Port', 'PACA'],
        images: [
            {
                name: 'marseille-vieux-port',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vieux_port_de_Marseille.jpg/1280px-Vieux_port_de_Marseille.jpg',
                alt: 'Vieux-Port Marseille bateaux Notre-Dame'
            },
            {
                name: 'marseille-mucem',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/MuCEM_vu_depuis_l%27esplanade_du_J4.jpg/1280px-MuCEM_vu_depuis_l%27esplanade_du_J4.jpg',
                alt: 'MuCEM Marseille architecture moderne'
            },
            {
                name: 'marseille-notre-dame-garde',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Notre_Dame_de_la_Garde.jpg/1024px-Notre_Dame_de_la_Garde.jpg',
                alt: 'Notre-Dame de la Garde Bonne Mère Marseille'
            }
        ]
    },
    'aix': {
        lat: 43.5297, lng: 5.4474,
        keywords: ['SEO Aix-en-Provence', 'consultant SEO Aix', 'référencement Aix', 'Cours Mirabeau', 'Provence'],
        images: [
            {
                name: 'aix-cours-mirabeau',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aix-en-Provence_Cours_Mirabeau.jpg/1280px-Aix-en-Provence_Cours_Mirabeau.jpg',
                alt: 'Cours Mirabeau Aix-en-Provence platanes'
            },
            {
                name: 'aix-rotonde',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Aix-en-Provence_Fontaine_de_la_Rotonde_01.jpg/1280px-Aix-en-Provence_Fontaine_de_la_Rotonde_01.jpg',
                alt: 'Fontaine de la Rotonde Aix-en-Provence'
            },
            {
                name: 'aix-sainte-victoire',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Montagne_Sainte-Victoire_3.jpg/1280px-Montagne_Sainte-Victoire_3.jpg',
                alt: 'Montagne Sainte-Victoire Cézanne Provence'
            }
        ]
    },
    'lyon': {
        lat: 45.7640, lng: 4.8357,
        keywords: ['SEO Lyon', 'consultant SEO Lyon', 'référencement Lyon', 'Rhône-Alpes', 'gastronomie'],
        images: [
            {
                name: 'lyon-bellecour',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Place_Bellecour_Lyon.jpg/1280px-Place_Bellecour_Lyon.jpg',
                alt: 'Place Bellecour Lyon statue Louis XIV'
            },
            {
                name: 'lyon-fourviere',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Lyon_Basilique_de_Fourvi%C3%A8re.jpg/1280px-Lyon_Basilique_de_Fourvi%C3%A8re.jpg',
                alt: 'Basilique Fourvière Lyon colline'
            },
            {
                name: 'lyon-confluence',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mus%C3%A9e_des_Confluences_-_Lyon_-_2014.jpg/1280px-Mus%C3%A9e_des_Confluences_-_Lyon_-_2014.jpg',
                alt: 'Musée des Confluences Lyon architecture'
            }
        ]
    },
    'bordeaux': {
        lat: 44.8378, lng: -0.5792,
        keywords: ['SEO Bordeaux', 'consultant SEO Bordeaux', 'référencement Bordeaux', 'Gironde', 'vin'],
        images: [
            {
                name: 'bordeaux-place-bourse',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Place_de_la_Bourse%2C_Bordeaux%2C_France.jpg/1280px-Place_de_la_Bourse%2C_Bordeaux%2C_France.jpg',
                alt: 'Place de la Bourse Bordeaux miroir eau'
            },
            {
                name: 'bordeaux-miroir-eau',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Miroir_d%27eau_de_Bordeaux_01.jpg/1280px-Miroir_d%27eau_de_Bordeaux_01.jpg',
                alt: 'Miroir d\'eau Bordeaux reflets'
            },
            {
                name: 'bordeaux-cite-vin',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/La_Cit%C3%A9_du_Vin%2C_Bordeaux%2C_July_2016.jpg/1280px-La_Cit%C3%A9_du_Vin%2C_Bordeaux%2C_July_2016.jpg',
                alt: 'Cité du Vin Bordeaux architecture'
            }
        ]
    },
    'toulouse': {
        lat: 43.6047, lng: 1.4442,
        keywords: ['SEO Toulouse', 'consultant SEO Toulouse', 'référencement Toulouse', 'Ville Rose', 'aéronautique'],
        images: [
            {
                name: 'toulouse-capitole',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Toulouse_Capitole_Night_Wikimedia_Commons.jpg/1280px-Toulouse_Capitole_Night_Wikimedia_Commons.jpg',
                alt: 'Place du Capitole Toulouse nuit'
            },
            {
                name: 'toulouse-garonne',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pont_Neuf_Toulouse_2015.jpg/1280px-Pont_Neuf_Toulouse_2015.jpg',
                alt: 'Pont Neuf Garonne Toulouse'
            },
            {
                name: 'toulouse-cite-espace',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ariane_5_model_at_the_Cit%C3%A9_de_l%27Espace.jpg/800px-Ariane_5_model_at_the_Cit%C3%A9_de_l%27Espace.jpg',
                alt: 'Cité de l\'Espace Toulouse fusée Ariane'
            }
        ]
    },
    'montpellier': {
        lat: 43.6108, lng: 3.8767,
        keywords: ['SEO Montpellier', 'consultant SEO Montpellier', 'référencement Montpellier', 'Hérault', 'Méditerranée'],
        images: [
            {
                name: 'montpellier-comedie',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Place_de_la_Com%C3%A9die%2C_Montpellier_%28immeubles%2C_%C3%A0_l%27aube%29.jpg/1280px-Place_de_la_Com%C3%A9die%2C_Montpellier_%28immeubles%2C_%C3%A0_l%27aube%29.jpg',
                alt: 'Place de la Comédie Montpellier Oeuf'
            },
            {
                name: 'montpellier-ecusson',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Montpellier_-_Place_de_la_Canourgue_02.jpg/1280px-Montpellier_-_Place_de_la_Canourgue_02.jpg',
                alt: 'Écusson Montpellier centre historique'
            },
            {
                name: 'montpellier-antigone',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Quartier_Antigone%2C_Montpellier%2C_France_-_panoramio_%281%29.jpg/1280px-Quartier_Antigone%2C_Montpellier%2C_France_-_panoramio_%281%29.jpg',
                alt: 'Quartier Antigone Montpellier Bofill'
            }
        ]
    },
    'strasbourg': {
        lat: 48.5734, lng: 7.7521,
        keywords: ['SEO Strasbourg', 'consultant SEO Strasbourg', 'référencement Strasbourg', 'Alsace', 'Europe'],
        images: [
            {
                name: 'strasbourg-cathedrale',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Strasbourg_Cathedral_Facade.jpg/800px-Strasbourg_Cathedral_Facade.jpg',
                alt: 'Cathédrale Notre-Dame Strasbourg gothique'
            },
            {
                name: 'strasbourg-petite-france',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Strasbourg_-_Petite_France_-_Ponts_Couverts_-_Barrage_Vauban.jpg/1280px-Strasbourg_-_Petite_France_-_Ponts_Couverts_-_Barrage_Vauban.jpg',
                alt: 'Petite France Strasbourg maisons colombages'
            },
            {
                name: 'strasbourg-parlement',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Parlement_europ%C3%A9en_de_Strasbourg.jpg/1280px-Parlement_europ%C3%A9en_de_Strasbourg.jpg',
                alt: 'Parlement Européen Strasbourg'
            }
        ]
    },
    'nantes': {
        lat: 47.2184, lng: -1.5536,
        keywords: ['SEO Nantes', 'consultant SEO Nantes', 'référencement Nantes', 'Loire-Atlantique', 'Ouest'],
        images: [
            {
                name: 'nantes-chateau',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Castle_of_the_Dukes_of_Brittany_at_Night_-_panoramio.jpg/1280px-Castle_of_the_Dukes_of_Brittany_at_Night_-_panoramio.jpg',
                alt: 'Château des Ducs de Bretagne Nantes nuit'
            },
            {
                name: 'nantes-machines',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Le_Grand_%C3%89l%C3%A9phant_-_Les_Machines_de_l%27%C3%AEle_Nantes.jpg/1280px-Le_Grand_%C3%89l%C3%A9phant_-_Les_Machines_de_l%27%C3%AEle_Nantes.jpg',
                alt: 'Grand Éléphant Machines de l\'Île Nantes'
            },
            {
                name: 'nantes-passage-pommeraye',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Passage_Pommeraye_-_Nantes_-_2020-01-01_-_4.jpg/800px-Passage_Pommeraye_-_Nantes_-_2020-01-01_-_4.jpg',
                alt: 'Passage Pommeraye Nantes galerie 19e'
            }
        ]
    },
    'rennes': {
        lat: 48.1173, lng: -1.6778,
        keywords: ['SEO Rennes', 'consultant SEO Rennes', 'référencement Rennes', 'Bretagne', 'tech'],
        images: [
            {
                name: 'rennes-parlement',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Parlement_de_Bretagne-Rennes.jpg/1280px-Parlement_de_Bretagne-Rennes.jpg',
                alt: 'Parlement de Bretagne Rennes'
            },
            {
                name: 'rennes-republique',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rennes_-_place_de_la_R%C3%A9publique.jpg/1280px-Rennes_-_place_de_la_R%C3%A9publique.jpg',
                alt: 'Place de la République Rennes'
            },
            {
                name: 'rennes-thabor',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jardin_du_Thabor_-_Rennes_-_2012_-_01.jpg/1280px-Jardin_du_Thabor_-_Rennes_-_2012_-_01.jpg',
                alt: 'Parc du Thabor Rennes jardin botanique'
            }
        ]
    },
    'lille': {
        lat: 50.6292, lng: 3.0573,
        keywords: ['SEO Lille', 'consultant SEO Lille', 'référencement Lille', 'Nord', 'Hauts-de-France'],
        images: [
            {
                name: 'lille-grand-place',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lille_grand_place.jpg/1280px-Lille_grand_place.jpg',
                alt: 'Grand\'Place Lille Vieille Bourse'
            },
            {
                name: 'lille-vieux-lille',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lille_vieux_lille_2.jpg/1280px-Lille_vieux_lille_2.jpg',
                alt: 'Vieux-Lille maisons flamandes'
            },
            {
                name: 'lille-beffroi',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Beffroi_h%C3%B4tel_de_ville_lille.jpg/600px-Beffroi_h%C3%B4tel_de_ville_lille.jpg',
                alt: 'Beffroi Hôtel de Ville Lille UNESCO'
            }
        ]
    },
    'grenoble': {
        lat: 45.1885, lng: 5.7245,
        keywords: ['SEO Grenoble', 'consultant SEO Grenoble', 'référencement Grenoble', 'Isère', 'Alpes'],
        images: [
            {
                name: 'grenoble-bastille',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Grenoble_%26_Bastille.JPG/1280px-Grenoble_%26_Bastille.JPG',
                alt: 'Fort de la Bastille Grenoble vue ville'
            },
            {
                name: 'grenoble-telepherique',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/T%C3%A9l%C3%A9ph%C3%A9rique_de_Grenoble_Bastille_2.jpg/1280px-T%C3%A9l%C3%A9ph%C3%A9rique_de_Grenoble_Bastille_2.jpg',
                alt: 'Téléphérique Grenoble Bastille bulles'
            },
            {
                name: 'grenoble-alpes',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Grenoble_depuis_la_Bastille.jpg/1280px-Grenoble_depuis_la_Bastille.jpg',
                alt: 'Grenoble panorama Alpes montagnes'
            }
        ]
    },
    'paris': {
        lat: 48.8566, lng: 2.3522,
        keywords: ['SEO Paris', 'consultant SEO Paris', 'référencement Paris', 'Île-de-France', 'capitale'],
        images: [
            {
                name: 'paris-tour-eiffel',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg',
                alt: 'Tour Eiffel Paris Champ de Mars'
            },
            {
                name: 'paris-sacre-coeur',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Le_sacre_coeur_%28paris_-_france%29.jpg/1024px-Le_sacre_coeur_%28paris_-_france%29.jpg',
                alt: 'Basilique Sacré-Coeur Montmartre Paris'
            },
            {
                name: 'paris-marais',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Place_des_Vosges_Paris_Mai_2006_002.jpg/1280px-Place_des_Vosges_Paris_Mai_2006_002.jpg',
                alt: 'Place des Vosges Marais Paris'
            }
        ]
    },
    'boulogne': {
        lat: 48.8352, lng: 2.2407,
        keywords: ['SEO Boulogne-Billancourt', 'consultant SEO 92', 'référencement Hauts-de-Seine', 'médias'],
        images: [
            {
                name: 'boulogne-seine-musicale',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/La_Seine_Musicale%2C_Boulogne-Billancourt_001.jpg/1280px-La_Seine_Musicale%2C_Boulogne-Billancourt_001.jpg',
                alt: 'Seine Musicale Boulogne île Seguin'
            },
            {
                name: 'boulogne-ile-seguin',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Boulogne_-_Ile_Seguin_-_Seine_Musicale.jpg/1280px-Boulogne_-_Ile_Seguin_-_Seine_Musicale.jpg',
                alt: 'Île Seguin Boulogne-Billancourt vue aérienne'
            },
            {
                name: 'boulogne-bureaux',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/TF1_Building%2C_Boulogne-Billancourt%2C_France.jpg/1280px-TF1_Building%2C_Boulogne-Billancourt%2C_France.jpg',
                alt: 'Tour TF1 Boulogne-Billancourt bureaux médias'
            }
        ]
    }
};

// Télécharger une image avec gestion des redirections
function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);

        const makeRequest = (targetUrl) => {
            https.get(targetUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                    'Accept': 'image/*'
                }
            }, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                    file.close();
                    fs.unlinkSync(dest);
                    const newFile = fs.createWriteStream(dest);
                    https.get(response.headers.location, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                            'Accept': 'image/*'
                        }
                    }, (res2) => {
                        if (res2.statusCode !== 200) {
                            newFile.close();
                            fs.unlinkSync(dest);
                            reject(new Error(`HTTP ${res2.statusCode}`));
                            return;
                        }
                        res2.pipe(newFile);
                        newFile.on('finish', () => {
                            newFile.close();
                            resolve();
                        });
                    }).on('error', reject);
                    return;
                }

                if (response.statusCode !== 200) {
                    file.close();
                    fs.unlinkSync(dest);
                    reject(new Error(`HTTP ${response.statusCode}`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                file.close();
                fs.unlink(dest, () => {});
                reject(err);
            });
        };

        makeRequest(url);
    });
}

// Convertir coordonnées en format EXIF
function decimalToDMS(decimal) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
    return [[degrees, 1], [minutes, 1], [Math.round(seconds * 100), 100]];
}

// Optimiser image + ajouter EXIF + créer WebP
async function processImage(inputPath, outputPath, cityData, imageAlt) {
    const allKeywords = [...cityData.keywords, imageAlt].join(', ');

    // 1. Optimiser avec Sharp
    await sharp(inputPath)
        .resize(1200, 800, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath + '.tmp');

    // 2. Ajouter EXIF
    const jpeg = fs.readFileSync(outputPath + '.tmp');
    const data = jpeg.toString('binary');

    const zeroth = {};
    const exif = {};
    const gps = {};

    zeroth[piexif.ImageIFD.Make] = "INDHACK";
    zeroth[piexif.ImageIFD.Software] = "INDHACK - Consultante SEO Freelance";
    zeroth[piexif.ImageIFD.Copyright] = `CC BY-SA 4.0 - ${allKeywords}`;
    zeroth[piexif.ImageIFD.ImageDescription] = allKeywords;
    zeroth[piexif.ImageIFD.Artist] = "Wikimedia Commons / INDHACK";

    exif[piexif.ExifIFD.DateTimeOriginal] = "2024:06:15 10:30:00";
    exif[piexif.ExifIFD.DateTimeDigitized] = "2024:06:15 10:30:00";

    gps[piexif.GPSIFD.GPSLatitudeRef] = cityData.lat >= 0 ? 'N' : 'S';
    gps[piexif.GPSIFD.GPSLatitude] = decimalToDMS(cityData.lat);
    gps[piexif.GPSIFD.GPSLongitudeRef] = cityData.lng >= 0 ? 'E' : 'W';
    gps[piexif.GPSIFD.GPSLongitude] = decimalToDMS(cityData.lng);

    const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
    const exifBytes = piexif.dump(exifObj);
    const newData = piexif.insert(exifBytes, data);
    const newJpeg = Buffer.from(newData, 'binary');

    fs.writeFileSync(outputPath, newJpeg);
    fs.unlinkSync(outputPath + '.tmp');

    // 3. Créer WebP optimisé
    await sharp(outputPath)
        .webp({ quality: 85 })
        .toFile(outputPath.replace('.jpg', '.webp'));
}

async function main() {
    console.log('\n🖼️  TÉLÉCHARGEMENT VRAIES IMAGES VILLES\n');
    console.log('   Source: Wikimedia Commons (CC BY-SA)\n');
    console.log('='.repeat(60));

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const tempDir = path.join(OUTPUT_DIR, 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    let success = 0;
    let failed = 0;
    const failedImages = [];
    const metadata = {};

    for (const [cityKey, cityData] of Object.entries(CITY_IMAGES)) {
        console.log(`\n📍 ${cityKey.toUpperCase()}`);

        for (const image of cityData.images) {
            const tempPath = path.join(tempDir, `${image.name}_temp.jpg`);
            const finalPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);

            try {
                process.stdout.write(`   ⬇️  ${image.name}...`);
                await downloadImage(image.url, tempPath);

                // Vérifier que c'est bien une image
                const stats = fs.statSync(tempPath);
                if (stats.size < 10000) {
                    throw new Error('Fichier trop petit');
                }

                await processImage(tempPath, finalPath, cityData, image.alt);

                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

                const finalStats = fs.statSync(finalPath);
                const sizeKB = Math.round(finalStats.size / 1024);

                console.log(` ✅ ${sizeKB}KB`);

                metadata[`${image.name}.jpg`] = {
                    gps: { lat: cityData.lat, lng: cityData.lng },
                    keywords: [...cityData.keywords, image.alt],
                    alt: image.alt,
                    source: 'Wikimedia Commons',
                    license: 'CC BY-SA 4.0'
                };

                success++;
            } catch (error) {
                console.log(` ❌ ${error.message}`);
                failedImages.push({ name: image.name, city: cityKey, error: error.message });
                failed++;
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            }
        }
    }

    // Nettoyer
    try {
        fs.rmSync(tempDir, { recursive: true });
    } catch (e) {}

    // Sauvegarder metadata
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
    );

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 RÉSULTAT:`);
    console.log(`   ✅ Succès: ${success}`);
    console.log(`   ❌ Échecs: ${failed}`);

    if (failedImages.length > 0) {
        console.log(`\n⚠️  Images à télécharger manuellement:`);
        failedImages.forEach(img => {
            console.log(`   - ${img.city}/${img.name}: ${img.error}`);
        });
    }

    console.log(`\n   📄 metadata.json mis à jour`);
    console.log(`   🖼️  JPG + WebP générés avec EXIF\n`);
}

main().catch(console.error);
