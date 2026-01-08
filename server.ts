import express from 'express';
import path from 'path';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
const PORT = 3333;


const app = express();

// 1. Setup LiveReload to watch your 'dist' folder
const liveReloadServer = livereload.createServer({
  delay: 100 // Wait for the compiler to finish writing the file
});
liveReloadServer.watch(path.join(__dirname, 'dist'));
liveReloadServer.watch(path.join(__dirname, 'public'));

// 2. Add the middleware to Express
app.use(connectLiveReload());

// 3. Signal a reload when the server starts/restarts
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});