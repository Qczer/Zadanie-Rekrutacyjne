# Projekt Web API z automatycznym wdrożeniem w Azure

## Spis treści

- [Opis projektu](#opis-projektu)  
- [Automatyzacja wdrożenia (CI/CD)](#automatyzacja-wdrożenia-cicd)  
- [Wdrożenie w Azure](#wdrożenie-w-azure)  
- [Jak korzystać z API](#jak-korzystać-z-api)  
- [Wykorzystane usługi Azure](#wykorzystane-usługi-azure)  

---

## Opis projektu

Frontend używa React połączony z Web API napisany w C#, który używa SQLite. Aplikacja jest hostowana w chmurze Azure z automatycznym procesem CI/CD.

---

## Automatyzacja wdrożenia (CI/CD)

- Workflow GitHub Actions uruchamia się po każdym pushu na branchu `main`.
- Wykonuje się budowanie aplikacji i automatyczne wdrożenie do Azure App Service.
- Użyte zostały 2 workflowy: jeden do budowania frontendu, a drugi do budowania bazy danych, znajdują się w `.github/workflows/`.
- Profil publikacji Azure jest przechowywany jako sekret GitHub o nazwie `AZURE_WEBAPP_PUBLISH_PROFILE`.

---

## Wdrożenie w Azure

- Aplikacja jest dostępna pod adresem:  
  `https://mango-mushroom-039bbbc03.2.azurestaticapps.net/`
- API jest dostępne pod adresem:
  `https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/api`

---

## Jak korzystać z API

- Wysyłaj żądania HTTPS do endpointów API.
- Przykład:  
  `GET https://zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/api/products`
- API zwraca dane w formacie JSON.

---

## Wykorzystane usługi Azure

- **Static Web App** – hostowanie strony internetowej.
- **Azure App Service** – hostowanie bazy danych.