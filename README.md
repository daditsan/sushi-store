# Sushi Store

An online sushi store built with React for content management system (CMS). Using Genki Sushi assets for demo and educational purposes.

## Table of Contents

- [Sushi Store](#sushi-store)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Prerequisites 2](#prerequisites-2)
    - [Setup Instructions](#setup-instructions)
  - [Screenshots](#screenshots)
    - [Homepage](#homepage)
    - [Homepage 2](#homepage-2)
    - [Product Detail Page](#product-detail-page)
    - [Login Page](#login-page)
    - [CMS Dashboard Page](#cms-dashboard-page)
    - [CMS Dashboard Page 2](#cms-dashboard-page-2)
    - [Add a Staff Page](#add-a-staff-page)
    - [Add a Product Page](#add-a-product-page)
  - [Contact Information](#contact-information)

## Introduction

This sushi store CMS website allows users to browse products, add a new product to the product list, edit existing product, and delete existing product (CRUD). The goal is to provide a seamless content management system experience.

## Features

- Content Management System (CMS) functionality.
- CRUD functionality.
- Admin and Staff Role Authorization functionality.
- Product browsing with search and filtering.
- User authentication and authorization.

## Tech Stack

- **Frontend:** React, Vite, Bootstrap, Axios, Firebase, Toastify
- **Backend:** Node.js, Express, Sequelize ORM, JWT, Bcryptjs, Multer, Cloudinary, Jest, Supertest, Supabase, Google Cloud Platform (GCP)
- **Database:** PostgreSQL, Supabase

## Installation

### Prerequisites

- Node.js
- Supabase
- Firebase
- GCP

### Prerequisites 2

Set up your .env file with the following variables:

```env
PORT=your_port
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Setup Instructions

```bash
git clone https://github.com/daditsan/sushi-store.git
cd sushi-store
npm install
npm run dev
cd ..
cd client
npm install
npm run dev
```

Access the website at <http://localhost:5173>

## Screenshots

### Homepage

![Homepage](Homepage.png)

### Homepage 2

![Homepage 2](Homepage_2.png)

### Product Detail Page

![Product Detail Page](Product_Detail_Page.png)

### Login Page

![Login Page](Login_Page.png)

### CMS Dashboard Page

![CMS Dashboard Page](CMS_Dashboard_Page.png)

### CMS Dashboard Page 2

![CMS Dashboard Page 2](CMS_Dashboard_Page_2.png)

### Add a Staff Page

![Add a Staff Page](Add_a_Staff_Page.png)

### Add a Product Page

![Add a Product Page](Add_a_Product_Page.png)

## Contact Information

For any questions or concerns, reach out to me at <dityaisanda@gmail.com>
Thank you.
