import express from "express";
import http from "http";
import path from "path";

// Initialization
const app = express();

// Configuration for templating engine
app.set("view engine", "ejs");
app.set("views", "public");

// Configuration for static files
app.use("/assets", express.static(path.join(__dirname, "frontend")));

// Add Controllers
app.get("/*", (req, res) => {
    res.render("index");
});

// Add start method
export const start = (port: number): Promise<void> => {
    const server = http.createServer(app);

    return new Promise<void>((resolve, reject) => {
        server.listen(port, resolve);
    });
};