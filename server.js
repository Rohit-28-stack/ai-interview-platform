import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
});