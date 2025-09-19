# Production Deployment Instructions

This guide outlines the steps to deploy the `taxcenter-dashboard` application to the production server.

### Server Requirements

- **Node.js:** v20.x or later
- **Process Manager:** PM2 (`npm install -g pm2`)

### Setup Steps

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/Task-Center-UG/taxcenter-dashboard.git](https://github.com/Task-Center-UG/taxcenter-dashboard.git) /var/www/dashboard-tax-center
    ```

2.  **Navigate to Project Directory:**

    ```bash
    cd /var/www/dashboard-tax-center
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Create Environment File:**
    Copy the example file and fill in the production values.

    ```bash
    cp .env.example .env.local
    nano .env.local
    ```

5.  **Build the Application:**

    ```bash
    npm run build
    ```

6.  **Start the Application with PM2:**
    This command will start the app and ensure it restarts automatically if it crashes.
    ```bash
    pm2 start npm --name "dashboard-tax-center" -- start
    ```
