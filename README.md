# Zadanie Rekrutacyjne

## Linki

- 🔗 **Frontend:** [https://mango-mushroom-039bbbc03.2.azurestaticapps.net](https://mango-mushroom-039bbbc03.2.azurestaticapps.net)
- 🔗 **API - Swagger:** [https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/swagger](https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/swagger)

## Spis treści

- [Opis projektu](#opis-projektu)  
- [Automatyzacja wdrożenia (CI/CD)](#automatyzacja-wdrożenia-cicd)  
- [Wdrożenie w Azure](#wdrożenie-w-azure)  
- [Jak korzystać z API](#jak-korzystać-z-api)  
- [Wykorzystane usługi Azure](#wykorzystane-usługi-azure)  

---

## Opis projektu

Frontend stworzony w React komunikuje się z Web API napisanym w C#, które korzysta z bazy danych SQLite. Całość jest hostowana w chmurze Azure i korzysta z automatycznego procesu CI/CD.

---

## Automatyzacja wdrożenia (CI/CD)

- Workflow GitHub Actions uruchamia się automatycznie po każdym pushu na gałąź `main`.
- Proces obejmuje budowanie aplikacji oraz automatyczne wdrożenie do Azure App Service.
- W repozytorium znajdują się dwa workflowy: jeden do budowy frontendu, drugi do backendu (bazy danych). Znajdziesz je w folderze `.github/workflows/`.
- Profil publikacji Azure jest przechowywany jako sekret GitHub o nazwie `AZURE_WEBAPP_PUBLISH_PROFILE`.

---

## Wdrożenie w Azure

- Strona frontendowa jest dostępna pod adresem:  
  `https://mango-mushroom-039bbbc03.2.azurestaticapps.net/`
- API działa pod adresem:  
  `https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/api`

---

## Jak korzystać z API

- Wysyłaj zapytania HTTPS do endpointów API.
- Przykład zapytania:  
  `GET https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/api/products`
- Odpowiedzi są zwracane w formacie JSON.

---

## Wykorzystane usługi Azure

- **Azure Static Web Apps** – hosting frontendu.
- **Azure App Service** – hosting backendu (Web API i bazy danych).