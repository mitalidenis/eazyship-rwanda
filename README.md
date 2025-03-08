# EazyShip Rwanda

A modern and secure shipment tracking and e-commerce integration platform.

## Features

- User Authentication with 2FA
- Real-time Shipment Tracking
- Estimated Delivery Time Calculation
- Shipping and Customs Fee Calculator
- Multiple Payment Methods Support
- Order Management System
- Automated Notifications (Email & SMS)
- E-commerce Platform Integration (Kikuu, Alibaba, Amazon)

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query

### Backend
- Node.js
- Express.js
- PostgreSQL
- Redis (for caching)
- JWT Authentication

### DevOps & Security
- Docker
- AES-256 Encryption
- Role-based Access Control
- GDPR Compliance

## Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-org/eazyship-rwanda.git
cd eazyship-rwanda
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
```bash
cp .env.example .env
```

5. Start Development Servers
```bash
# Frontend (in frontend directory)
npm run dev

# Backend (in backend directory)
npm run dev
```

## API Documentation
API documentation is available at `/api/docs` when running the development server.

## Security
- All sensitive data is encrypted using AES-256
- Implements rate limiting and DDOS protection
- Regular security audits and penetration testing
- Secure session management

## License
[MIT License](LICENSE)
