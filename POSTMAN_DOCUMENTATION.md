# PH Tour Management System - Postman Documentation

## 📚 API Overview

Base URL: `http://localhost:5000/api/v1`

## 🔐 Authentication

### Headers Required
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Token Management
- **Access Token**: Valid for 15 minutes
- **Refresh Token**: Valid for 7 days
- **Cookie-based**: Tokens are automatically set in cookies

---

## 👤 Authentication Endpoints

### 1. User Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User Logged In Successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "USER"
    }
  }
}
```

### 2. Refresh Access Token
```
POST /auth/refresh-token
```
**Cookies Required:** `refreshToken`
**Response:** New access token

### 3. User Logout
```
POST /auth/logout
```
**Cookies Required:** `accessToken`, `refreshToken`

### 4. Google OAuth Login
```
GET /auth/google?redirect=/dashboard
```
**Query Parameters:**
- `redirect`: Frontend route to redirect after login

### 5. Change Password
```
POST /auth/change-password
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

### 6. Forgot Password
```
POST /auth/forgot-password
```
**Body:**
```json
{
  "email": "user@example.com"
}
```

### 7. Reset Password
```
POST /auth/reset-password
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "newPassword": "newpassword123"
}
```

---

## 👥 User Management

### 1. User Registration
```
POST /user/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

### 2. Get Current User Profile
```
GET /user/me
```
**Headers:** `Authorization: Bearer <token>`

### 3. Update User Profile
```
PATCH /user/:id
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "John Smith",
  "phone": "+1987654321",
  "address": "456 Oak Ave, City, Country"
}
```

### 4. Get All Users (Admin Only)
```
GET /user/all-users
```
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `searchTerm`: Search in name/email
- `sort`: Sort field (default: -createdAt)

### 5. Get Single User (Admin Only)
```
GET /user/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 🏖️ Tour Management

### 1. Get All Tours
```
GET /tour
```
**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `searchTerm`: Search in title/description
- `sort`: Sort field
- `division`: Filter by division ID
- `tourType`: Filter by tour type ID
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter

### 2. Create Tour (Admin Only)
```
POST /tour/create
```
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`
**Body:**
```
title: "Beautiful Beach Tour"
description: "Experience the most beautiful beaches"
location: "Maldives"
costFrom: 1500
startDate: 2024-06-01
endDate: 2024-06-07
departureLocation: "Dhaka"
arrivalLocation: "Male"
maxGuest: 20
minAge: 18
division: "64f8a1b2c3d4e5f6a7b8c9d0"
tourType: "64f8a1b2c3d4e5f6a7b8c9d1"
included: ["Hotel", "Meals", "Transport"]
excluded: ["Airfare", "Visa"]
amenities: ["WiFi", "Pool", "Spa"]
tourPlan: ["Day 1: Arrival", "Day 2: Beach Visit"]
files: [image1.jpg, image2.jpg]
```

### 3. Get Tour by Slug
```
GET /tour/:slug
```

### 4. Update Tour (Admin Only)
```
PATCH /tour/:id
```
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`
**Body:** Same as create tour

### 5. Delete Tour (Admin Only)
```
DELETE /tour/:id
```
**Headers:** `Authorization: Bearer <token>`

### 6. Get All Tour Types
```
GET /tour/tour-types
```

### 7. Create Tour Type (Admin Only)
```
POST /tour/create-tour-type
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Adventure Tour"
}
```

### 8. Update Tour Type (Admin Only)
```
PATCH /tour/tour-types/:id
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Extreme Adventure Tour"
}
```

### 9. Delete Tour Type (Admin Only)
```
DELETE /tour/tour-types/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 📅 Booking Management

### 1. Create Booking
```
POST /booking
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "tour": "64f8a1b2c3d4e5f6a7b8c9d0",
  "guestCount": 2
}
```

### 2. Get User's Bookings
```
GET /booking/my-bookings
```
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status

### 3. Get All Bookings (Admin Only)
```
GET /booking
```
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status
- `user`: Filter by user ID
- `tour`: Filter by tour ID

### 4. Get Single Booking
```
GET /booking/:bookingId
```
**Headers:** `Authorization: Bearer <token>`

### 5. Update Booking Status
```
PATCH /booking/:bookingId/status
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Status Options:**
- `PENDING`
- `CONFIRMED`
- `COMPLETED`
- `CANCELLED`

---

## 💳 Payment Processing

### 1. Initialize Payment
```
POST /payment/init-payment/:bookingId
```
**Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "customerAddress": "123 Main St, City, Country"
}
```

### 2. Payment Success Callback
```
POST /payment/success
```
**Body:** SSL Commerz success response

### 3. Payment Failure Callback
```
POST /payment/fail
```
**Body:** SSL Commerz failure response

### 4. Payment Cancellation Callback
```
POST /payment/cancel
```
**Body:** SSL Commerz cancellation response

### 5. Validate Payment
```
POST /payment/validate-payment
```
**Body:**
```json
{
  "tran_id": "SSL123456789",
  "val_id": "240115123456789"
}
```

### 6. Download Invoice
```
GET /payment/invoice/:paymentId
```
**Headers:** `Authorization: Bearer <token>`

---

## 🗺️ Division Management

### 1. Get All Divisions
```
GET /division
```

### 2. Create Division (Admin Only)
```
POST /division/create
```
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`
**Body:**
```
name: "Dhaka Division"
description: "Capital city division"
file: division-image.jpg
```

### 3. Get Division by Slug
```
GET /division/:slug
```

### 4. Update Division (Admin Only)
```
PATCH /division/:id
```
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`

### 5. Delete Division (Admin Only)
```
DELETE /division/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 📊 Statistics & Analytics

### 1. Booking Statistics (Admin Only)
```
GET /stats/booking
```
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

### 2. Payment Statistics (Admin Only)
```
GET /stats/payment
```
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date

### 3. User Statistics (Admin Only)
```
GET /stats/user
```
**Headers:** `Authorization: Bearer <token>`

### 4. Tour Statistics (Admin Only)
```
GET /stats/tour
```
**Headers:** `Authorization: Bearer <token>`

---

## 🔐 OTP Verification

### 1. Send OTP
```
POST /otp/send
```
**Body:**
```json
{
  "email": "user@example.com"
}
```

### 2. Verify OTP
```
POST /otp/verify
```
**Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

---

## 📝 Common Response Formats

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Field validation error"
    }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPage": 10
  }
}
```

---

## 🚀 Postman Collection Setup

### 1. Environment Variables
Create a Postman environment with these variables:
```
base_url: http://localhost:5000/api/v1
access_token: (leave empty, will be set after login)
refresh_token: (leave empty, will be set after login)
user_id: (leave empty, will be set after login)
tour_id: (leave empty, will be set after login)
booking_id: (leave empty, will be set after login)
```

### 2. Pre-request Scripts
For protected routes, add this pre-request script:
```javascript
if (pm.environment.get("access_token")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("access_token")
    });
}
```

### 3. Test Scripts
After login, add this test script to automatically set tokens:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.accessToken) {
        pm.environment.set("access_token", response.data.accessToken);
        pm.environment.set("refresh_token", response.data.refreshToken);
        if (response.data.user) {
            pm.environment.set("user_id", response.data.user.id);
        }
    }
}
```

---

## 🔍 Testing Scenarios

### 1. User Registration & Authentication
1. Register new user
2. Login with credentials
3. Verify token is received
4. Test protected endpoint

### 2. Tour Management
1. Create tour type
2. Create division
3. Create tour with images
4. Retrieve tours with filters
5. Update tour details

### 3. Booking Flow
1. Create booking
2. Initialize payment
3. Simulate payment success
4. Verify booking status
5. Download invoice

### 4. Admin Operations
1. Login as admin
2. View all users
3. View statistics
4. Manage tour types and divisions

---

## ⚠️ Important Notes

1. **File Uploads**: Use `multipart/form-data` for endpoints with file uploads
2. **Authentication**: Most endpoints require valid JWT tokens
3. **Role-based Access**: Some endpoints are restricted to specific user roles
4. **Error Handling**: All endpoints return consistent error formats
5. **Validation**: Request bodies are validated using Zod schemas
6. **File Cleanup**: Failed requests automatically clean up uploaded files
7. **Rate Limiting**: Implemented for security
8. **CORS**: Configured for frontend integration

---

## 🆘 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check if token is valid and not expired
2. **403 Forbidden**: Verify user has required role permissions
3. **400 Bad Request**: Check request body validation
4. **500 Internal Server Error**: Check server logs and database connection

### Debug Steps:
1. Verify environment variables are set
2. Check token expiration
3. Validate request body format
4. Ensure proper headers are set
5. Check database connectivity
