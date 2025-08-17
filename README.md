# User Management System - Updated

A modern React.js frontend application for managing users with a clean, responsive design.

## Features

- **Add New Users**: Form to create users with first name, last name, email, and phone number
- **View All Users**: Display users in a clean, card-based layout
- **Form Validation**: Client-side validation with error messages
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Users list updates automatically after adding new users
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during API operations

## Tech Stack

- **React 18** with TypeScript
- **Axios** for HTTP requests
- **CSS3** with modern features (Grid, Flexbox, CSS Variables)
- **Responsive Design** with mobile-first approach

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UserForm.tsx    # Form for adding new users
│   ├── UserList.tsx    # List display component
│   ├── Notification.tsx # Toast notifications
│   └── *.css          # Component-specific styles
├── services/           # API service layer
│   └── userService.ts # User-related API calls
├── types/              # TypeScript type definitions
│   └── User.ts        # User interface and API types
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Docker Deployment

For containerized deployment, see [DOCKER-README.md](DOCKER-README.md) for detailed instructions.

**Quick Docker Start:**
```bash
# Development mode with hot reloading
docker-compose -f docker-compose.dev.yml up --build

# Production mode
docker-compose up --build
```

### Environment Variables

Create a `.env` file in the root directory to configure your API endpoint:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

If no environment variable is set, the app defaults to `http://localhost:3001/api`.

## API Endpoints

The application expects the following API endpoints:

### Create User
- **POST** `/api/users`
- **Body**: `{ firstName, lastName, email, phone }`
- **Response**: `{ success: boolean, data?: User, error?: string }`

### Get All Users
- **GET** `/api/users`
- **Response**: `{ success: boolean, data?: User[], error?: string }`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Features in Detail

### User Form
- Input validation for all fields
- Real-time error clearing
- Loading state during submission
- Form reset after successful submission

### User List
- Card-based layout with user avatars
- Loading, error, and empty states
- Refresh functionality
- Responsive grid layout

### Notifications
- Toast-style notifications
- Auto-dismiss after 5 seconds
- Success, error, and info types
- Smooth slide-in animations

## Styling

The application uses:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Smooth transitions and animations
- Mobile-first responsive design
- Modern shadow and border-radius effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
