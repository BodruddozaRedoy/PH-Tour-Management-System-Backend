# PH Tour Management System - Backend

A robust, scalable backend API for managing tour bookings, user authentication, and payment processing built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **User Management**: Registration, authentication, role-based access control
- **Tour Management**: Create, read, update, delete tours with image uploads
- **Booking System**: Tour booking with status management
- **Payment Integration**: SSL Commerz payment gateway
- **Email System**: Automated emails with EJS templates
- **File Upload**: Cloudinary integration for image storage
- **Authentication**: JWT tokens, Google OAuth, session management
- **Caching**: Redis integration for performance
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: RESTful API with proper HTTP status codes

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js, Google OAuth
- **File Upload**: Multer + Cloudinary
- **Payment**: SSL Commerz
- **Email**: Nodemailer + EJS
- **Caching**: Redis
- **Validation**: Zod
- **Linting**: ESLint
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── constants.ts      # Application constants
│   ├── errorHelpers/     # Custom error classes
│   ├── helpers/          # Error handling helpers
│   ├── interfaces/       # TypeScript interfaces
│   ├── middlewares/      # Express middlewares
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── booking/      # Booking management
│   │   ├── division/     # Geographic divisions
│   │   ├── otp/          # OTP verification
│   │   ├── payment/      # Payment processing
│   │   ├── stats/        # Statistics and analytics
│   │   ├── tour/         # Tour management
│   │   └── user/         # User management
│   ├── routes/           # Route definitions
│   └── utils/            # Utility functions
├── app.ts                # Express app configuration
└── server.ts             # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis
- Cloudinary account
- SSL Commerz account
- SMTP email service

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BodruddozaRedoy/PH-Tour-Management-System.git
   cd PH-Tour-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   DB_URL=mongodb://localhost:27017/tour-management
   NODE_ENV=development
   BCRYPT_SALT_ROUND=12
   JWT_ACCESS_SECRET=your_access_secret
   JWT_ACCESS_EXPIRES=15m
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRES=7d
   SUPER_ADMIN_EMAIL=admin@example.com
   SUPER_ADMIN_PASSWORD=admin123
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
   EXPRESS_SESSION_SECRET=your_session_secret
   FRONTEND_URL=http://localhost:3000
   
   # SSL Commerz
   SSL_STORE_ID=your_store_id
   SSL_STORE_PASS=your_store_pass
   SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
   SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
   SSL_SUCCESS_FRONTEND_URL=http://localhost:3000/payment/success
   SSL_FAIL_FRONTEND_URL=http://localhost:3000/payment/fail
   SSL_CANCEL_FRONTEND_URL=http://localhost:3000/payment/cancel
   SSL_SUCCESS_BACKEND_URL=http://localhost:5000/api/v1/payment/success
   SSL_FAIL_BACKEND_URL=http://localhost:5000/api/v1/payment/fail
   SSL_CANCEL_BACKEND_URL=http://localhost:5000/api/v1/payment/cancel
   SSL_IPN_URL=http://localhost:5000/api/v1/payment/ipn
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_pass
   SMTP_PORT=587
   SMTP_HOST=smtp.gmail.com
   SMTP_FROM=noreply@example.com
   
   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=
   REDIS_PASSWORD=
   ```

4. **Run the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/v1/user/me` - Get current user profile
- `PATCH /api/v1/user/:id` - Update user profile
- `GET /api/v1/user/all-users` - Get all users (Admin only)

### Tours
- `GET /api/v1/tour` - Get all tours
- `POST /api/v1/tour/create` - Create new tour (Admin only)
- `GET /api/v1/tour/:slug` - Get tour by slug
- `PATCH /api/v1/tour/:id` - Update tour (Admin only)
- `DELETE /api/v1/tour/:id` - Delete tour (Admin only)

### Bookings
- `POST /api/v1/booking` - Create new booking
- `GET /api/v1/booking/my-bookings` - Get user's bookings
- `GET /api/v1/booking/:id` - Get booking details
- `PATCH /api/v1/booking/:id/status` - Update booking status

### Payments
- `POST /api/v1/payment/init-payment/:bookingId` - Initialize payment
- `POST /api/v1/payment/success` - Payment success callback
- `POST /api/v1/payment/fail` - Payment failure callback
- `POST /api/v1/payment/cancel` - Payment cancellation callback
- `GET /api/v1/payment/invoice/:paymentId` - Download invoice

### Divisions
- `GET /api/v1/division` - Get all divisions
- `POST /api/v1/division/create` - Create division (Admin only)
- `GET /api/v1/division/:slug` - Get division by slug
- `PATCH /api/v1/division/:id` - Update division (Admin only)
- `DELETE /api/v1/division/:id` - Delete division (Admin only)

### Statistics
- `GET /api/v1/stats/booking` - Booking statistics (Admin only)
- `GET /api/v1/stats/payment` - Payment statistics (Admin only)
- `GET /api/v1/stats/user` - User statistics (Admin only)
- `GET /api/v1/stats/tour` - Tour statistics (Admin only)

## 🔐 Authentication & Authorization

The system uses JWT tokens for authentication with the following roles:
- **USER**: Basic user permissions
- **ADMIN**: Administrative permissions
- **SUPER_ADMIN**: Full system access

Protected routes require valid JWT tokens in the Authorization header:
```
Authorization: Bearer <access_token>
```

## 📝 Environment Variables

All required environment variables are validated at startup. Missing variables will cause the application to fail with clear error messages.

## 🚀 Deployment

### Vercel Deployment
The project includes `vercel.json` for easy deployment to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Manual Deployment
1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Use PM2 or similar process manager for production

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📊 Database Schema

### User
- Basic info (name, email, phone, address)
- Authentication (password, auth providers)
- Role-based access control
- Account status and verification

### Tour
- Tour details (title, description, location)
- Pricing and dates
- Images and amenities
- Division and tour type relationships

### Booking
- User and tour references
- Guest count and status
- Payment integration
- Timestamps and tracking

### Payment
- SSL Commerz integration
- Transaction tracking
- Invoice generation
- Status management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete tour management system
- User authentication and authorization
- Payment integration
- File upload capabilities
- Email system
- Comprehensive error handling
