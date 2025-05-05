# Login Management System

A modern, full-stack user management system built with **Next.js**, **TypeScript**, and **Microsoft SQL Server**. This application allows you to **create, view, update, delete, and search users** with support for different user statuses and dynamic styling.

## 🚀 Features

- ✅ Add, edit, and delete users

- 🔍 Search users by name or email

- 🎨 Status-based row coloring (Active, Test, Inactive)

- 🔄 Responsive UI with loading indicators

- ⚡ Backend powered by SQL Server stored procedures

- 🌐 Deployed on Vercel

## 🧱 Tech Stack

- **Frontend**: React (with Next.js App Router), Tailwind CSS, TypeScript

- **Backend**: API routes in Next.js calling SQL Server stored procedures

- **Database**: Microsoft SQL Server

- **Deployment**: Vercel

## 📂 Project Structure
src/

├── components/

│ ├── UserTable.tsx

│ ├── AddUser.tsx

│ ├── DeleteUser.tsx

│ ├── UserSearchInput.tsx

│ └── LoadingSpinner.tsx

├── lib/

│ └── db.ts # Executes stored procedures via mssql

├── pages/

│ └── api/

│ └── users/

│ ├── index.ts # GET all users

│ ├── create.ts # POST new or updated user

│ ├── delete.ts # DELETE a user

├── types/

│ └── index.ts # User interface

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/login-management-system.git
   cd login-management-system

   ```

 2.  Install dependencies


    ```
    npm install
    ```

3. Configure environment variables

Create a .env.local file:

    ```
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_SERVER=your_db_server_url
    DB_NAME=your_database_name
    ```
    
4. Run the development server


```npm run dev```

Visit http://localhost:3000 in your browser.

