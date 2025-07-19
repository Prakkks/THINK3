# Think3 Quiz App

A full-stack quiz application with a React frontend and Python backend. Users can answer timed questions fetched from the backend API with interactive feedback.

---

## Table of Contents

- [About](#about)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Database Setup](#database-setup)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## About

Think3 is an engaging quiz app designed to test your knowledge with timed questions. The frontend is built with React and TailwindCSS for a smooth user experience, while the backend is powered by Python (Flask/FastAPI/Django - specify yours) serving question data via a REST API.

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Framer Motion  
- **Backend:** Python (Flask/FastAPI/Django - specify)  
- **Database:** MongoDB Atlas  
- **Other:** Fetch API for client-server communication

---

## Setup & Installation

### Prerequisites

- Node.js  
- Python 3.x  
- Git  
- MongoDB Atlas account

### Backend Setup

1. Clone the repo and navigate to backend folder

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
