# API Configuration

## Environment Setup

To connect to your backend API, create a `.env.local` file in the root directory with:

```bash
REACT_APP_API_URL=http://localhost:5246/api
```

## API Endpoints

### Base URL
`http://localhost:5246/api`

### 1. Get All Users
- **GET** `/users`
- **Response**: Array of user objects
- **Example Response**:
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "createdAt": "2025-08-17T07:24:04.443304Z",
    "updatedAt": null
  }
]
```

### 2. Create New User
- **POST** `/users`
- **Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1987654321"
}
```
- **Response**: Created user object with generated ID
- **Example Response**:
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1987654321",
  "createdAt": "2025-08-17T08:30:00.000000Z",
  "updatedAt": null
}
```

## Testing

1. **Demo Mode**: The app starts in demo mode with sample data
2. **API Mode**: Switch to API mode to connect to your backend
3. **Form Validation**: All fields are validated before submission
4. **Error Handling**: Comprehensive error handling with user feedback
