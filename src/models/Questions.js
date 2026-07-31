import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true

        },
        description: {
            type: String,
            required: true

        },
        category: {
            type: String,
            required: true

        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true

        },

        type: {
            type: String,
            enum: ["MCQ", "Coding"],
            required: true

        },
        companies: {
            type: [String],
            default: []


        },
        tags: {
            type: [String],


        },
        hints: {
            type: [String],
            default: []


        },
        explanation: {
            type: String,


        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"


        },
        isPremium: {
            type: Boolean,
            default: false
        }, isActive: {
            type: Boolean,
            default: true
        }, expectedAnswer: {
            type: String,
            default: ""
        },
        timeLimit: {
            type: Number,
            default: 30
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }

)


const Question = mongoose.model("Question", questionSchema);

export default Question;