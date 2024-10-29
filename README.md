# Shoppie

Shoppie is an ecommerce software that can be used to track the proces of products online and then send alerts to user when a certain price limit has been reached. Shoppie is built using React and TypeScript for the front end and Node.js, Express and JavaScript for the backend. MySQL has been used for database management and axios and puppeteer libraries have been leveraged for API formation and web scraping, respectively.

The development of Shoppie serves two purposes:

1) To serve as a key project where I can develop and showcase my full stack software capabilities to prospective employers. 
2) To attempt and find potential market fit for this product and find some commerical value.

As such, Shoppie is not primarily an open source project to be shared and collaborated on and instructions on installing and hosting the project aren't provided. 

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Contact](#contact)

## About the Project

Shoppie is a straight forward, easy to use web application that allows users to copy in the link of an item they want to track, set a price where they want to be alerted, and then save the product. 

## Features

### Front End

The front end of Shoppie is built with **React** and **TypeScript**, providing a responsive and interactive user interface. The **Axios** library facilitates HTTP requests, enabling seamless API communication with the back end. Although the front end currently lacks visual styling, core functionality has been prioritized, focusing on retrieving, displaying, and updating product data from the back end.

### Back End

The back end of Shoppie is developed using **Node.js**, **Express**, and **JavaScript**, with a **MySQL** relational database for data management. The back end provides essential API routes that facilitate CRUD operations on the product and user data.

**Key Back-End Features:**
- **User Account Management**: Users can create accounts, log in with encrypted passwords, and authenticate their credentials. Upon successful login, a token-based session is created, which securely manages their session, enabling personalized interactions throughout the application.
- **Product Tracking and User Relationship**: A `product` table stores all products that users are tracking. This table is linked to each user via a foreign key, ensuring that each user's saved products are private to their account.
- **Real-Time Price Scraping and Alerts**: Back-end controllers regularly scrape URLs stored in the `product` table to check for price updates. When a price falls below a user-defined limit, the system sends alerts to the user, helping them monitor price drops on products of interest.

Through this setup, any front-end interaction with the user or product data triggers corresponding RESTful API calls. These calls interact with the database to keep user and product details accurate and up-to-date, ensuring a cohesive experience across the application.

## Contact
Please feel free to contact me at jaydhorvat@gmail.com or visit [my portfolio website](https://jay-horvat.github.io/) for more information on my background, education and experience and for other means of contact: 

