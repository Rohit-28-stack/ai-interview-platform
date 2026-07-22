import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
   
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    });

    // Generate JWT
    const token = user.generateToken();

    // Cookie options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, options);

    // Remove password before sending response
    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
                token,
            },
            "User registered successfully"
        )
    );
});
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Compare password
    const isCorrect = await user.comparePassword(password);

    if (!isCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate token
    const token = user.generateToken();

    // Cookie options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, options);

    // Remove password
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
               
                token,
            },
            "Login successful"
        )
    );
});