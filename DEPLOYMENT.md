# Production Deployment Instructions

This guide provides all the necessary steps for the **initial server setup** and deployment of the `taxcenter-dashboard` application.

> **Note:** These steps are for the first-time setup only. Once the CI/CD pipeline is active, future deployments will be handled automatically when new code is pushed to the `main` branch.

---

### ✅ Pre-Deployment Checklist

Before you begin, please ensure the following requirements are met on the server:

- **Node.js:** Version **v20.x** or later is installed.
- **PM2:** The PM2 process manager is installed globally (`npm install -g pm2`).
- **Environment Variables:** You have the correct production values for all required variables.

---

### ⚙️ Initial Server Setup

Follow these steps to deploy the application for the first time.

1.  **Clone the Repository:**
    Clone the project into the designated directory on the server.

    ```bash
    git clone [https://github.com/Task-Center-UG/taxcenter-dashboard.git](https://github.com/Task-Center-UG/taxcenter-dashboard.git) /var/www/dashboard-tax-center
    ```

2.  **Navigate to Project Directory:**

    ```bash
    cd /var/www/dashboard-tax-center
    ```

3.  **Install Dependencies:**
    This will install all the necessary packages from `package.json`.

    ```bash
    npm install
    ```

4.  **Create and Configure Environment File:**
    Copy the example file to create the production environment file, then add the secret values.

    ```bash
    cp .env.example .env.local
    nano .env.local
    ```

    Inside the editor, fill in the values for the following variables:

    - `NEXT_PUBLIC_BASE_URL`
    - `NEXT_PUBLIC_BASIC_URL`

5.  **Build the Application:**
    This command compiles and optimizes the Next.js application for production.

    ```bash
    npm run build
    ```

6.  **Start the Application with PM2:**
    This command starts the production server using PM2, which will keep it running and restart it automatically if it crashes.
    ```bash
    pm2 start npm --name "dashboard-tax-center" -- start
    ```

---

### 🚀 Post-Deployment Verification

After starting the application, verify that it is running correctly.

1.  **Check Process Status:**
    List all running applications managed by PM2. You should see `dashboard-tax-center` with an `online` status.

    ```bash
    pm2 list
    ```

2.  **Monitor Logs:**
    Check the application logs in real-time for any startup errors or other issues.
    ```bash
    pm2 logs dashboard-tax-center
    ```
    (Press `Ctrl+C` to exit the log stream).

---

### 🔄 Future Deployments

Once the initial setup is complete and the GitHub Actions CI/CD pipeline is configured, you will **not** need to repeat these steps. All future deployments will be triggered automatically by pushing a new commit to the `main` branch. The automated script will handle pulling the latest code, rebuilding the app, and reloading it with zero downtime.
