# Task Management Backend

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE task_management;
```

### 3. Check Database Connection
```bash
npm run check-db
```

### 4. Start the Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

## Environment Variables

The `.env` file should contain:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
```

## Default Admin Account

After first startup, you can login with:
- **Email**: admin@taskmanager.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (authenticated)

### Tasks
- `GET /api/tasks` - Get tasks (filtered by user role)
- `POST /api/tasks` - Create new task (authenticated)
- `PUT /api/tasks/:id` - Update task (authenticated)
- `DELETE /api/tasks/:id` - Delete task (authenticated)

### Admin Only
- `GET /api/users` - Get all users
- `DELETE /api/users/:id` - Deactivate user

## Troubleshooting

### Connection Refused Error
1. Make sure PostgreSQL is running
2. Check database credentials in `.env`
3. Ensure database exists: `CREATE DATABASE task_management;`
4. Run: `npm run check-db` to test connection

### Dependencies Issues
```bash
npm run install-deps
```

### Database Issues
```bash
npm run check-db
```