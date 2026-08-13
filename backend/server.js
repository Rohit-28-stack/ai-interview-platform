
import app from "./src/app.js";
import connectDB from "./src/config/db.js";



const PORT = process.env.PORT || 5000;
console.log("API KEY:", process.env.GEMINI_API_KEY);
console.log("Length:", process.env.GEMINI_API_KEY?.length);
connectDB()

.then(() => {
    app.listen(PORT, () => {
        console.log(process.env.GROQ_API_KEY);
        console.log(`server is running on ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
});