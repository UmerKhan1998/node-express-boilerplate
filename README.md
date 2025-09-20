# Express MongoDB Boilerplate

A production-ready boilerplate for Node.js applications using Express.js and MongoDB.

## Features

- **Express.js** - Fast, unopinionated web framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** - Secure user authentication
- **Input Validation** - Request validation using express-validator
- **Security** - Helmet for security headers, CORS enabled
- **Logging** - Morgan for HTTP request logging
- **Error Handling** - Centralized error handling
- **Environment Configuration** - dotenv for environment variables
- **User Management** - Complete CRUD operations for users
- **Password Hashing** - bcryptjs for secure password storage

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd express-mongodb-boilerplate
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`
Edit `.env` with your configuration.

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Health Check
- `GET /health` - Health check endpoint

## Project Structure

\`\`\`
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── adminAuth.js         # Admin authorization middleware
├── models/
│   └── User.js              # User model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── users.js             # User management routes
├── .env.example             # Environment variables example
├── package.json             # Dependencies and scripts
├── server.js                # Main application file
└── README.md                # Project documentation
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/boilerplate` |
| `JWT_SECRET` | JWT signing secret | Required |
| `CORS_ORIGINS` | Allowed CORS origins | Optional |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Helmet for security headers
- Input validation and sanitization
- CORS configuration
- Error handling without exposing stack traces in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
