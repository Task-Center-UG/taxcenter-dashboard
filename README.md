# Dashboard Tax Center ✨

A modern, high-performance dashboard application for a tax center, built with Next.js 15, Material-UI, and Tailwind CSS.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)

---

## About The Project

**Dashboard Tax Center** is a web application designed to provide a comprehensive and intuitive interface for managing tax-related data. It leverages a modern tech stack to ensure a fast, responsive, and type-safe user experience, from data fetching to form handling.

This project serves as a robust foundation for building enterprise-level dashboard applications.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Tech Stack

Here are the major technologies and libraries used in this project:

- **Framework:** [Next.js](https://nextjs.org/) v15
- **UI Library:** [Material-UI (MUI)](https://mui.com/) v7
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching & State Management:** [TanStack Query](https://tanstack.com/query/latest) v5
- **Form Management:** [React Hook Form](https://react-hook-form.com/) v7
- **Schema Validation:** [Zod](https://zod.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Linting:** [ESLint](https://eslint.org/)

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Task-Center-UG/taxcenter-dashboard.git
    cd taxcenter-dashboard
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env.local
    ```

    Now, open `.env.local` and fill in the required environment variables (e.g., API base URL, authentication keys).

4.  **Run the development server:**
    The project uses Turbopack for fast development.
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## 📜 Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Runs the app in development mode with Turbopack.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code using ESLint.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE.txt` for more information.
