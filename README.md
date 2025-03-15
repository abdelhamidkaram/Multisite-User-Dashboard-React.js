# Multisite User Dashboard - React.js

## Overview

This project is a **custom React.js dashboard** designed for **WordPress Multisite** networks. It provides a seamless and user-friendly interface for managing e-commerce stores, specifically tailored for users with limited technical experience. The dashboard integrates with WordPress via REST API to allow store owners to efficiently manage their businesses.

🚀 **Inspired by Salla**: This dashboard serves as a **foundational version** of the well-known **Salla** platform, enabling users to create and manage online stores with ease.

🌍 **Arabic-Focused**: The project is specifically built for **Arabic-speaking users**, providing a localized experience that makes store management intuitive and accessible.

## Features

- **WordPress Multisite Integration**: Connects with a WordPress multisite backend to manage different stores.
- **Product & Order Management**: Enables users to create, edit, and manage products and orders easily.
- **Subscription-Based Access**: Restricts access and features based on the user's subscription plan.
- **Modern UI/UX**: Built with **React.js** and **TailwindCSS** for a smooth and responsive user experience.
- **State Management with Zustand**: Utilizes **Zustand** for lightweight and efficient state management.
- **Performance Optimized**: Efficient data fetching and state management to ensure a fast and reliable dashboard.
- **Secure Authentication**: Uses JWT-based authentication for user login and session handling.

## Authentication & Access

The dashboard is accessed using a **token-based authentication system**. Users must include their authentication token (`t`) in the URL to log in automatically:

```
https://localhost/?t=YOUR_JWT_TOKEN
```

This ensures a seamless login experience without the need for a separate login page.

## WordPress Plugin Integration

A dedicated **WordPress plugin** has been developed to handle the **backend setup** for this dashboard. The plugin automates API integration, authentication, and data management for multisite networks. However, **this plugin is not included in this repository**.

## Screenshots

Here are some screenshots of the dashboard interface:











## Tech Stack

- **Frontend**: React.js, TailwindCSS, Zustand (for state management)
- **Backend**: WordPress REST API (Multisite setup)
- **Authentication**: JWT-based authentication

## Installation & Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/abdelhamidkaram/Multisite-User-Dashboard-React.js
   cd Multisite-User-Dashboard-React.js
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**\
   Create a `.env` file in the root directory and add:

   ```env
  VITE_Main_Site_URL=https://your-wordpress-site.com
  VITE_Dash_Site_URL=https://dash.your-wordpress-site.com
   ```

4. **Run the Project:**

   ```sh
   npm start
   ```

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a pull request.

## Contact

If you’re interested in working with me or have any questions, feel free to reach out:

- **Portfolio**: [abdelhamid.dev](https://abdelhamid.dev/)
- **Email**: [contact@abdelhamid.dev](mailto\:contact@abdelhamid.dev)
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/abdelhamidkaram/)

---

🚀 **Let’s build something amazing together!**

