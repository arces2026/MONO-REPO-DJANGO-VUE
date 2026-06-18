# 🚀 Progetto Integrato: Vue + Django

Questa è la documentazione principale per il progetto che combina un frontend **Vue.js** e un backend **Django REST Framework**, orchestrati tramite **Docker**.

## 📋 Indice

* [Struttura del Progetto](https://www.google.com/search?q=%23-struttura-del-progetto)
* [Installazione e Avvio](https://www.google.com/search?q=%23-installazione-e-avvio)
* [Comandi Docker Utili](https://www.google.com/search?q=%23-comandi-docker-utili)
* [Debug e Troubleshooting](https://www.google.com/search?q=%23-debug-e-troubleshooting)

---

## 📁 Struttura del Progetto

```text
VUE-DJANGO-FOLDER/
├── django-backend/      # Backend Django (API)
├── vue-frontend/        # Frontend Vue.js (Vite)
├── docker-compose.yml   # Orchestrazione dei container
└── .env                 # Variabili d'ambiente (DB, ecc.)

```

---

## 🐳 Installazione e Avvio

### 1. Configurazione

Assicurati di avere un file `.env` nella cartella radice (come descritto nel setup del backend).

### 2. Avvio (Modalità Background)

Per avviare l'intero stack (Backend + Frontend + DB):

```bash
docker-compose up -d --build

```

* **Backend**: http://localhost:8000
* **Frontend**: http://localhost:8080 (o la porta definita nel compose)

---

## 🛠️ Comandi Docker Utili

| Azione | Comando |
| --- | --- |
| **Avvia tutto** | `docker-compose up -d` |
| **Ricostruisci tutto** | `docker-compose up -d --build` |
| **Ferma tutto** | `docker-compose down` |
| **Riavvia un servizio** | `docker-compose restart [backend |
| **Log in tempo reale** | `docker-compose logs -f [servizio]` |

---

## 🔍 Debug e Troubleshooting

### Controllare i log in caso di errore

Se l'app non risponde, usa questi comandi per leggere i log in tempo reale:

* **Per il Backend**: `docker-compose logs -f backend`
* **Per il Frontend**: `docker-compose logs -f frontend`

### Entrare nei container (Shell)

Se hai bisogno di eseguire comandi all'interno dei container per debuggare:

* **Backend**: `docker-compose exec backend bash`
* **Frontend**: `docker-compose exec frontend sh`

### Errori Comuni

* **Porta occupata**: Se `8000` o `8080` sono occupate, controlla i processi attivi sul tuo PC (`netstat -ano | findstr :8000`).
* **Database non connesso**: Verifica che il container `mariadb` sia attivo (`docker-compose ps`) e che le variabili nel `.env` corrispondano a quelle in `settings.py`.
* **CORS**: Se il frontend non comunica col backend, verifica in `django-backend/bookshelf/settings.py` che `CORS_ALLOWED_ORIGINS` includa l'URL del frontend.

---

**Suggerimento**: Ricorda di mantenere il file `README.md` nel `django-backend/` come documentazione specifica per le API e i test di backend, mentre questo file (`/README.md`) deve servire come "entry point" per l'intero progetto.
