
# User Management App

A user-friendly interface for managing user logins, details, and access levels. Built with Next.js and React, this app demonstrates robust UI/UX, clean code structure, and best practices for full-stack development. All data operations are performed via SQL stored procedures in an Azure SQL database.

## Features

- Display a list of all current users
- Filter users by name, email, and access level
- Add new users with validation
- Edit existing user details and access level
- Delete users with confirmation prompts
- Responsive, accessible, and modern UI
- All data operations performed via SQL stored procedures

## Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [React](https://react.dev/)
- [mssql](https://www.npmjs.com/package/mssql) (SQL Server client)
- Azure SQL Database

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Access to an Azure SQL Database with the required stored procedures

### Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/your-username/user-management-app.git
    cd user-management-app
    ```

2. **Install dependencies:**

    ```
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**

    Create a `.env.local` file in the root directory with your database credentials:

    ```
    DB_SERVER=your-db-server.database.windows.net
    DB_DATABASE=your-database-name
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    ```

    > **Note:** Never commit `.env.local` or sensitive credentials to your repository.

4. **Run the development server:**

    ```
    npm run dev
    # or
    yarn dev
    ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```

/
├── components/        \# React components (UserTable, UserForm, etc.)
├── pages/             \# Next.js pages and API routes
│   ├── api/           \# API endpoints (calls stored procedures)
│   └── index.js       \# Main UI
├── utils/             \# Database and validation helpers
├── public/            \# Static assets
├── .env.local         \# Environment variables (not committed)
├── README.md
└── package.json

```

## Usage

- **View Users:** The homepage displays all users in a table.
- **Filter:** Use the search and filter controls above the table to refine the list.
- **Add/Edit:** Click “Add User” or the edit icon to open a modal form. All fields are validated.
- **Delete:** Click the delete icon and confirm in the dialog.

## API & Database

All data operations are performed via SQL stored procedures, called from the `/api/users` endpoints using the `mssql` Node.js client.

## Validation & Confirmation

- All forms include field validation (required fields, email format, etc.).
- Deletion requires user confirmation.

## Accessibility & Responsiveness

- The UI is fully responsive and accessible, following best practices for color contrast, keyboard navigation, and ARIA labels.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


---

**Questions?**  
Open an issue or contact [your.email@example.com].







