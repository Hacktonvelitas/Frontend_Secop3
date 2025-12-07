<p align="center">
  <img src="assets/logo.png" alt="Licita API Logo" width="200"/>
</p>

#  Licita API - Backend SECOP III

![Python](https://img.shields.io/badge/python-3.12+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)

Bienvenido al backend de **Licita API**, una plataforma avanzada de inteligencia artificial diseñada para revolucionar la forma en que las empresas encuentran y aplican a licitaciones públicas (SECOP).

Este sistema utiliza tecnologías de vanguardia como **RAG (Retrieval-Augmented Generation)**, **Vector Search** y **LLMs (Large Language Models)** para realizar emparejamientos inteligentes entre el perfil de una empresa y las oportunidades de negocio disponibles. Técnicas de ML no supervisados tal como k-means con una distancia coseno.

---

##  Tabla de Contenidos
1. [Stack Tecnológico](#-stack-tecnológico)
2. [Arquitectura y Características](#-arquitectura-y-características-clave)
3. [Instalación y Despliegue](#-instalación-y-despliegue)
4. [Documentación de Endpoints](#-documentación-de-endpoints)
5. [Estructura del Proyecto](#-estructura-del-proyecto)

---

##  Stack Tecnológico

Este proyecto ha sido construido con un stack robusto y moderno, pensado para escalabilidad, rendimiento y facilidad de despliegue:

### Core & Backend
* **Lenguaje**: Python 3.12+
* **Framework Web**: [FastAPI](https://fastapi.tiangolo.com/) (Alto rendimiento, asíncrono, validación automática).
* **ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Manejo eficiente de base de datos).
* **Validación de Datos**: [Pydantic v2](https://docs.pydantic.dev/).

### Base de Datos & Almacenamiento
* **Base de Datos Relacional**: PostgreSQL 16.
* **Vector Database**: **pgvector** (Extensión de Postgres para almacenamiento y búsqueda de embeddings vectoriales).
* **Object Storage**: **MinIO** (Compatible con S3) para almacenamiento de documentos (PDFs, Anexos).

### Inteligencia Artificial (AI)
* **Embeddings**: Google Gemini (`text-embedding-004`) para vectorización de perfiles y licitaciones.
* **LLM**: Google Gemini Pro para análisis semántico, extracción de entidades y razonamiento avanzado.
* **Orquestación**: LangChain (para flujos de RAG y procesamiento de documentos).

### Infraestructura & DevOps
* **Contenerización**: Docker & Docker Compose.
* **Servidor Web**: Uvicorn (ASGI).
* **Seguridad**: JWT (JSON Web Tokens) para autenticación, Hashing de contraseñas con Bcrypt.

---

##  Arquitectura y Características Clave

El sistema no es un simple CRUD; es un motor de recomendación inteligente.

1. **Ingesta y Vectorización Automática**:
   * Al registrar una empresa, el sistema genera automáticamente **embeddings** (vectores matemáticos) de su Razón Social y códigos CIIU.
   * Esto permite que la empresa sea "buscable" semánticamente desde el primer momento.

2. **Motor de Matching (RAG)**:
   * **Match Inicial**: Búsqueda vectorial (similitud de coseno) para encontrar licitaciones semánticamente similares al perfil de la empresa.
   * **Match Aumentado (AI)**: Un segundo paso donde un LLM evalúa los candidatos para filtrar falsos positivos y dar una explicación del porqué del match.

3. **Análisis de Mercado**:
   * Endpoints dedicados para analizar precios históricos y competencia en licitaciones similares.

---

##  Instalación y Despliegue

### Prerrequisitos
* Docker y Docker Compose instalados.
* Git.

### Pasos para ejecutar

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repo>
   cd Backend_Secop3

   <img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/1ca67d78-3da5-448f-88af-8033e53ff466" />
