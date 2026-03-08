// PM2 Ecosystem Config — VPS Production
// Usage: pm2 start ecosystem.config.js --env production
module.exports = {
    apps: [
        {
            name: "infygru",
            script: "node_modules/.bin/next",
            args: "start",
            cwd: "./",

            // Use cluster mode to utilise ALL CPU cores on your VPS
            exec_mode: "cluster",
            instances: "max", // or a fixed number like 2

            // Restart policy
            autorestart: true,
            watch: false,
            max_memory_restart: "512M", // Restart if it eats more than 512MB

            // Environment variables
            env: {
                NODE_ENV: "development",
                PORT: 3000,
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3000,
            },

            // Logging
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            error_file: "./logs/pm2-error.log",
            out_file: "./logs/pm2-out.log",
            merge_logs: true,

            // Graceful shutdown
            kill_timeout: 5000,
            listen_timeout: 10000,
        },
    ],
};
