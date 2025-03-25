# EazyShip Rwanda

EazyShip Rwanda is a modern and efficient platform designed for seamless shipment tracking, e-commerce integration, and secure user management. It offers real-time shipment tracking, estimated delivery calculations, transparent shipping and customs fee assessments, multiple payment options, automated notifications, and direct integration with leading e-commerce platforms.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure User Authentication with Two-Factor Authentication (2FA)**
- **Real-time Shipment Tracking** with instant updates
- **Estimated Delivery Time Calculation** based on optimized logistics data
- **Advanced Shipping and Customs Fee Calculator** for cost transparency
- **Comprehensive Order Management System** for seamless tracking and updates
- **Automated Email & SMS Notifications** for shipment and account updates
- **Direct Integration with E-commerce Platforms** (Kikuu, Alibaba, Amazon) for automated tracking

## Tech Stack

### Frontend

- **Next.js** – React-based framework for server-side rendering and static site generation
- **TypeScript** – Ensures type safety and maintainability
- **Tailwind CSS** – Provides a modern, responsive UI with utility-based styling
- **Redux Toolkit** – Manages state efficiently
- **React Query** – Optimized data fetching and state synchronization

### Backend

- **Node.js** – Scalable JavaScript runtime for backend development
- **Express.js** – Lightweight and flexible web framework
- **PostgreSQL** – Reliable relational database for structured data management
- **Redis** – High-performance caching system for faster response times
- **JWT Authentication** – Secure token-based authentication for user sessions

### DevOps & Security

- **Docker** – Ensures containerized, portable deployment across environments
- **AES-256 Encryption** – Industry-standard encryption for data protection
- **Role-Based Access Control (RBAC)** – Manages permissions and access levels
- **GDPR Compliance** – Ensures adherence to data privacy regulations

### Security Measures

- **Data Encryption (AES-256) for Secure Storage**
- **Rate Limiting & DDoS Protection** to prevent unauthorized access
- **Regular Security Audits and Penetration Testing** for vulnerability assessment
- **Secure Session Management** to safeguard user sessions

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (Latest LTS Version)
- **Docker** (for containerized deployment)
- **PostgreSQL** (Database setup)
- **Redis** (For caching and session management)

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/denismitali17/eazyship-rwanda.git
    cd eazyship-rwanda/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the backend directory using the provided `.env.example` template.
    - Update database, authentication, and API configurations.

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open a browser and visit `http://localhost:3000` to access the application.
2. Use the shipment tracking system to track packages in real time.
3. Utilize the fee calculator to estimate shipping and customs charges.
4. Manage orders through the secure dashboard.

## Environment Variables

Ensure you set up the following environment variables in the `.env` file before running the application:

- `DATABASE_URL` – PostgreSQL connection string
- `REDIS_URL` – Redis instance connection string
- `JWT_SECRET` – Secret key for JWT authentication
- `EMAIL_SERVICE` – Email provider configuration
- `EMAIL_USER` – Email service username
- `EMAIL_PASS` – Email service password
- `SMS_API_KEY` – API key for SMS notifications

## Contributing

We welcome contributions to enhance and expand EazyShip Rwanda. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature
    ```
3. Commit your changes:
    ```sh
    git commit -m "Add new feature: Your Feature Name"
    ```
4. Push your changes:
    ```sh
    git push origin feature/your-feature
    ```
5. Open a Pull Request for review.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

---

### **Contact & Support**
For support or inquiries, please contact our team via email at **d.mitali1@alustudent.com** or visit our website.

