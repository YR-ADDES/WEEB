# WEEB — Projet RNCP (Django REST + React + JWT + ML)

WEEB est une application web Fullstack réalisée pour l’obtention d’un **Titre RNCP**.  
Le projet démontre : **API REST**, **authentification JWT**, **rôles & permissions**, **CRUD Articles**, **formulaire Contact** et **Machine Learning** (analyse de satisfaction) avec une **documentation reproductible**.

---

## Sommaire

- [1. Stack & objectifs](#1-stack--objectifs)
- [2. Structure du dépôt](#2-structure-du-dépôt)
- [3. Prérequis](#3-prérequis)
- [4. Installation & lancement en local](#4-installation--lancement-en-local)
  - [4.1 Backend](#41-backend)
  - [4.2 Frontend](#42-frontend)
- [5. Frontend — pages & routes](#5-frontend--pages--routes)
- [6. Backend — architecture & modules](#6-backend--architecture--modules)
- [7. API REST — endpoints & exemples](#7-api-rest--endpoints--exemples)
- [8. Authentification JWT — fonctionnement complet](#8-authentification-jwt--fonctionnement-complet)
- [9. Rôles & permissions](#9-rôles--permissions)
- [10. Machine Learning — analyse satisfaction](#10-machine-learning--analyse-satisfaction)
- [11. Déploiement (production)](#11-déploiement-production)
  - [11.1 Variables d’environnement](#111-variables-denvironnement)
  - [11.2 Backend — Gunicorn + Nginx + Systemd](#112-backend--gunicorn--nginx--systemd)
  - [11.3 Frontend — build + hébergement statique](#113-frontend--build--hébergement-statique)
  - [11.4 CORS / Sécurité](#114-cors--sécurité)
- [12. Tests & vérifications](#12-tests--vérifications)
- [13. Gitflow & conventions](#13-gitflow--conventions)
- [14. Troubleshooting](#14-troubleshooting)
- [15. Auteur](#15-auteur)

---

# 1. Stack & objectifs

## Objectifs fonctionnels

- **Authentification JWT (de A à Z)**
- **Rôles** : Non authentifié / Membre / Administrateur
- **Blog** :
  - lecture des articles en public
  - création / modification / suppression pour les membres autorisés
- **Contact** :
  - enregistrement des messages
  - analyse ML de satisfaction (0/1)
- **Documentation** et reproduction complète (RNCP)

## Stack imposée

- **Backend** : Python, Django, Django REST Framework, PostgreSQL, JWT
- **Frontend** : React, Axios, Tailwind, gestion du token JWT
- **ML** : pipeline NLP (dataset Allociné), vectorisation TF‑IDF, modèle supervisé

---

# 2. Structure du dépôt

À la racine, uniquement :

- `weeb_backend/`
- `weeb_frontend/`
- `README.md`
- `.gitignore`

---

# 3. Prérequis

## Outils

- Python **3.x**
- Node.js **18+** (recommandé)
- PostgreSQL **16+** (Homebrew possible sur macOS)
- Git

## Vérifications rapides

```bash
# ## VERSION PYTHON ##
python3 --version

# ## VERSION NODE / NPM ##
node -v
npm -v

# ## VERSION POSTGRES ##
psql --version
```

---

# 4. Installation & lancement en local

## 4.1 Backend

### 4.1.1 Aller dans le backend + venv

```bash
# ## SE POSITIONNER SUR LE BACKEND ##
cd weeb_backend

# ## CREATION VENV ##
python3 -m venv venv

# ## ACTIVATION VENV ##
source venv/bin/activate
```

### 4.1.2 Installer les dépendances

```bash
# ## INSTALL DEPENDANCES ##
pip install -r requirements.txt
```

### 4.1.3 PostgreSQL — création DB + user (exemple)

> Adapte le nom de base / user si besoin, mais **PostgreSQL uniquement**.

```bash
# ## CREATION BASE ##
createdb weeb_db

# ## (OPTION) CREATION USER POSTGRES ##
createuser weeb_user
```

### 4.1.4 Variables d’environnement (local)

Créer un fichier `.env` dans `weeb_backend/` si ton projet l’utilise.

Exemple :

```bash
# ## EXEMPLE ENV LOCAL ##
DEBUG=True
SECRET_KEY=change_me
DB_NAME=weeb_db
DB_USER=postgres
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=5432
```

### 4.1.5 Migrations + runserver

```bash
# ## MIGRATIONS ##
python manage.py makemigrations
python manage.py migrate

# ## LANCER SERVEUR ##
python manage.py runserver
```

Backend local : `http://127.0.0.1:8000/`

### 4.1.6 Créer un admin (dashboard Django)

```bash
# ## CREER SUPERUSER ##
python manage.py createsuperuser
```

Admin : `http://127.0.0.1:8000/admin/`

---

## 4.2 Frontend

### 4.2.1 Installation

```bash
# ## SE POSITIONNER SUR LE FRONTEND ##
cd ../weeb_frontend

# ## INSTALL DEPENDANCES ##
npm install
```

### 4.2.2 Lancer en dev

```bash
# ## LANCER DEV ##
npm run dev
```

Frontend local : `http://localhost:5173/`

### 4.2.3 Build production

```bash
# ## BUILD PRODUCTION ##
npm run build

# ## PREVIEW (OPTIONNEL) ##
npm run preview
```

---

# 5. Frontend — pages & routes

## Pages (FR)

- **Accueil** : présentation, CTA
- **Blog** : liste des articles (GET API)
- **Article** : page détail (GET 1 article)
- **Contact** : formulaire (POST API contact + analyse ML)
- **Login** : connexion JWT
- **Signup** : inscription
- **About** : page autorisée (exception autorisée)
- (autres pages) : `Joinnow`, etc. selon le front

## Exemples de routes

- `/` : Accueil
- `/blog` : Blog
- `/article/:id` : Article
- `/contact` : Contact
- `/login` : Connexion
- `/signup` : Inscription
- `/about` : About

## Routes protégées

- Ajout / modification / suppression article => accessible uniquement si JWT valide + rôle autorisé

---

# 6. Backend — architecture & modules

Structure typique (résumé) :

- `config/` : settings, urls, wsgi/asgi
- `api/` :
  - `models.py` : Utilisateur, Article, Contact
  - `serializers.py`
  - `views.py`
  - `urls.py`
  - `permissions.py` (si présent)
  
- `machine_learning/` :
  - `entrainement_modele.py`
  - `pipeline.py` (si présent)
  - `modele.joblib` / `vectoriseur.joblib` (selon implémentation)

---

# 7. API REST — endpoints & exemples

> Les URL ci-dessous sont celles attendues RNCP. Si tes routes exactes diffèrent, garde ce README et ajuste la section selon tes chemins réels.

## 7.1 Auth

### POST `/api/signup/`

Inscription membre (création d’un compte).

```bash
# ## INSCRIPTION ##
curl -X POST http://127.0.0.1:8000/api/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "prenom": "Imen",
    "nom": "Yasmine",
    "email": "imen@test.com",
    "password": "MotDePasseFort123!"
  }'
```

### POST `/api/login/`

Connexion et récupération des tokens JWT.

```bash
# ## LOGIN ##
curl -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "imen@test.com",
    "password": "MotDePasseFort123!"
  }'
```

Réponse attendue (exemple) :
- `access`
- `refresh`
- (optionnel) infos utilisateur

---

## 7.2 Articles

### GET `/api/articles/`

Liste des articles (public).

```bash
# ## GET ARTICLES ##
curl -i http://127.0.0.1:8000/api/articles/
```

### POST `/api/articles/`

Créer un article (protégé).

```bash
# ## POST ARTICLE (JWT) ##
curl -X POST http://127.0.0.1:8000/api/articles/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_ACCESS" \
  -d '{
    "titre": "Mon titre",
    "contenu": "Contenu long..."
  }'
```

### PUT `/api/articles/{id}/`

Modifier un article (protégé).

```bash
# ## UPDATE ARTICLE (JWT) ##
curl -X PUT http://127.0.0.1:8000/api/articles/1/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_ACCESS" \
  -d '{
    "titre": "Titre mis à jour",
    "contenu": "Contenu mis à jour..."
  }'
```

### DELETE `/api/articles/{id}/`

Supprimer un article (protégé).

```bash
# ## DELETE ARTICLE (JWT) ##
curl -X DELETE http://127.0.0.1:8000/api/articles/1/ \
  -H "Authorization: Bearer VOTRE_TOKEN_ACCESS"
```

---

## 7.3 Contact

### POST `/api/contact/`

Enregistrer un message + lancer l’analyse ML (selon implémentation).

```bash
# ## POST CONTACT ##
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Client",
    "email": "client@test.com",
    "sujet": "Demande",
    "message": "J’adore votre application, super expérience !"
  }'
```

---

## 7.4 Analyse satisfaction

### POST `/api/analyse/`

Retour attendu :
- `resultat` : 1 (satisfait) / 0 (non satisfait)
- (optionnel) score

```bash
# ## POST ANALYSE ##
curl -X POST http://127.0.0.1:8000/api/analyse/ \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Super service, merci !"
  }'
```

---

# 8. Authentification JWT — fonctionnement complet

## 8.1 Cycle complet

1) Frontend envoie `email + password` à `/api/login/`  
2) Backend vérifie l’utilisateur (credentials)  
3) Backend génère : `access_token` + `refresh_token`  
4) Frontend stocke le token (ex : `localStorage`)  
5) Frontend ajoute le header `Authorization` sur les routes protégées  
6) Backend autorise/refuse selon JWT + permissions  

Header :

```txt
Authorization: Bearer <access_token>
```

## 8.2 Gestion côté React

- Stockage : `localStorage.setItem("token", access)`
- Lecture : `localStorage.getItem("token")`
- Axios : ajout automatique du header (interceptor)

Exemples (concept) :
- interceptor request : injecter le token
- interceptor response : gérer 401, logout, refresh (si implémenté)

---

# 9. Rôles & permissions

## 9.1 Utilisateur non authentifié

Accès :
- Accueil
- Blog
- Détail article
- Contact
- Login / Signup

## 9.2 Membre

- Doit être validé par admin (`is_active = true`)
- Peut :
  - accéder aux pages protégées
  - créer / modifier / supprimer des articles (selon règles)
  - utiliser les endpoints protégés avec JWT

## 9.3 Administrateur

- Accès au **dashboard Django**
- Valide les comptes
- Gère utilisateurs / articles

---

# 10. Machine Learning — analyse satisfaction

## 10.1 Objectif

Analyser le message (contact) et retourner :
- `1` : utilisateur satisfait
- `0` : utilisateur non satisfait

## 10.2 Dataset

- Dataset : **Allociné (avis en français)**  
- Objectif : classification binaire (positif/négatif)

## 10.3 Prétraitement NLP

Étapes typiques :
- Mise en minuscules
- Suppression ponctuation / caractères spéciaux
- Nettoyage espaces
- Tokenisation
- Stopwords FR (NLTK)
- (optionnel) lemmatisation/stemming

## 10.4 Vectorisation

- **TF‑IDF** (recommandé)
- Pourquoi :
  - robuste, performant sur textes courts
  - compatible modèles linéaires
  - rapide et reproductible

## 10.5 Modèle

- **Régression logistique** (ou modèle linéaire équivalent)
- Pourquoi :
  - très bon baseline NLP
  - interprétable
  - rapide à entraîner
  - métriques solides sur classification binaire

## 10.6 Entraînement

Depuis `weeb_backend/` (venv activé) :

```bash
# ## ENTRAINEMENT MODELE ##
python -m machine_learning.entrainement_modele
```

Résultats attendus (exemple) :
- accuracy ~ 0.87
- f1-score ~ 0.87

## 10.7 Sauvegarde & reproductibilité

- Modèle sauvegardé avec **joblib**
- Fichiers typiques :
  - `modele.joblib`
  - `vectoriseur.joblib`

Recommandation RNCP :
- versionner le script d’entraînement
- documenter le dataset utilisé et la préparation
- garder le modèle généré dans un dossier dédié (ex : `machine_learning/modeles/`)

---

# 11. Déploiement (production)

> Le déploiement exact dépend de ton hébergeur. Ci‑dessous : méthode classique **VPS + Nginx + Gunicorn**.

## 11.1 Variables d’environnement

Exemples :
- `DEBUG=False`
- `SECRET_KEY=...`
- `ALLOWED_HOSTS=...`
- `DB_NAME=...`
- `DB_USER=...`
- `DB_PASSWORD=...`
- `DB_HOST=...`
- `DB_PORT=5432`
- (optionnel) `CORS_ALLOWED_ORIGINS=...`

---

## 11.2 Backend — Gunicorn + Nginx + Systemd

### 11.2.1 Installer dépendances serveur (exemple Ubuntu)

```bash
# ## UPDATE ##
sudo apt update

# ## INSTALL POSTGRES + NGINX ##
sudo apt install -y nginx postgresql postgresql-contrib python3-venv
```

### 11.2.2 Créer venv + installer

```bash
# ## BACKEND ##
cd weeb_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

### 11.2.3 Migrations

```bash
# ## MIGRATIONS PROD ##
python manage.py migrate
```

### 11.2.4 Lancer gunicorn (test)

```bash
# ## TEST GUNICORN ##
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### 11.2.5 Service systemd (exemple)

Créer `/etc/systemd/system/weeb_backend.service` (exemple) :
- user linux
- working directory backend
- gunicorn bind local

```ini
[Unit]
Description=WEEB Backend Gunicorn
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/WEEB/weeb_backend
Environment="PATH=/home/ubuntu/WEEB/weeb_backend/venv/bin"
ExecStart=/home/ubuntu/WEEB/weeb_backend/venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000

[Install]
WantedBy=multi-user.target
```

Activer :

```bash
# ## SYSTEMD ##
sudo systemctl daemon-reload
sudo systemctl enable weeb_backend
sudo systemctl start weeb_backend
sudo systemctl status weeb_backend
```

### 11.2.6 Nginx reverse proxy (exemple)

Créer `/etc/nginx/sites-available/weeb_backend` :

```nginx
server {
    listen 80;
    server_name VOTRE_DOMAINE;

    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8000/admin/;
    }
}
```

Activer :

```bash
# ## NGINX ENABLE ##
sudo ln -s /etc/nginx/sites-available/weeb_backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 11.3 Frontend — build + hébergement statique

### 11.3.1 Build local

```bash
# ## BUILD ##
cd weeb_frontend
npm run build
```

Le build se trouve dans `weeb_frontend/dist/`.

### 11.3.2 Copier vers le serveur (exemple scp)

```bash
# ## UPLOAD DIST ##
scp -r dist/* ubuntu@VOTRE_IP:/var/www/weeb_frontend/
```

### 11.3.3 Nginx pour servir le front (exemple)

```nginx
server {
    listen 80;
    server_name VOTRE_DOMAINE;

    root /var/www/weeb_frontend;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

---

## 11.4 CORS / Sécurité

- Activer CORS sur Django (ex : `django-cors-headers`)
- Autoriser uniquement :
  - domaine front prod
  - localhost dev

Exemple (concept) :
- `CORS_ALLOWED_ORIGINS = ["https://votre-domaine.fr", "http://localhost:5173"]`

Sécurité recommandée :
- `DEBUG=False`
- `ALLOWED_HOSTS` strict
- HTTPS (Let’s Encrypt)
- headers sécurité Nginx

---

# 12. Tests & vérifications

## 12.1 Test API rapide

```bash
# ## TEST LISTE ARTICLES ##
curl -i http://127.0.0.1:8000/api/articles/
```

## 12.2 Test login + appel protégé

```bash
# ## LOGIN ##
curl -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"imen@test.com","password":"MotDePasseFort123!"}'
```

Récupérer `access` et tester un endpoint protégé :

```bash
# ## POST ARTICLE PROTEGE ##
curl -X POST http://127.0.0.1:8000/api/articles/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_ACCESS" \
  -d '{"titre":"Test","contenu":"Contenu"}'
```

---

# 13. Gitflow & conventions

## 13.1 Gitflow

- issue → nouvelle branche → commits → PR → merge → suppression branche

## 13.2 Format unique de commit

```txt
"[FONC]: DESCRIPTION DU COMMIT"
```

Exemples :
- `[BACK]: AJOUT ENDPOINT ARTICLES`
- `[AUTH]: MISE EN PLACE JWT`
- `[ML]: AJOUT PIPELINE TFIDF`
- `[DOC]: README FINAL RNCP`

---

# 14. Troubleshooting

## 14.1 Erreur 401 (JWT)

Vérifier :
- token bien présent
- header correct : `Authorization: Bearer ...`
- token non expiré
- permissions DRF

## 14.2 CORS

Vérifier :
- origine front autorisée
- middleware `corsheaders` installé + placé en haut des middlewares
- en prod : HTTPS et domaines exacts

## 14.3 PostgreSQL connexion

Vérifier :
- DB créée
- identifiants OK
- service postgres actif

macOS (brew) :
```bash
# ## START POSTGRES ##
brew services start postgresql@16

# ## STATUS ##
brew services list
```

---

# 15. Auteur

Projet réalisé par : Yasmine ADDES

**Ingénieure FullStack**  
Titre RNCP — Développeur Concepteur d’Applications
