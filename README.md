# Smart Hospital Frontend App

## Project Overview
The Smart Hospital Frontend App is a responsive and interactive hospital management application built using React and Tailwind CSS. This application simulates a comprehensive hospital system with distinct views for Patients and Doctors, allowing users to switch roles seamlessly.

## Features
### Role-Based Views
- **Patient View**: Access to health records, appointment booking, doctor chat, and health tracking.
- **Doctor View**: Manage appointments, generate prescriptions, and view patient feedback.

### Core Components
- **Health Card**: Displays patient details and medical history.
- **Appointment Calendar**: Allows booking and viewing of appointments.
- **Chat Interface**: Simulates communication between patients and doctors.
- **Health Tracking Dashboard**: Visualizes health data with interactive charts.
- **Document Viewer**: Displays medical reports and scans.

## Technologies Used
- **React**: For building user interfaces.
- **Tailwind CSS**: For styling and responsive design.
- **React Router DOM**: For client-side routing.
- **Recharts/Chart.js**: For data visualization.
- **Framer Motion**: For animations and transitions.

## Project Structure
```
smart-hospital-frontend
├── src
│   ├── components         # Reusable UI components
│   ├── pages              # Top-level components for each route
│   ├── data               # Mock data files
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point of the application
│   ├── routes.jsx         # Route definitions
│   └── index.css          # Global styles
├── public
│   └── index.html         # Main HTML file
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd smart-hospital-frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.