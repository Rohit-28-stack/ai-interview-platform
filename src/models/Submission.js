import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    language: {
      type: String,
      enum: ["Java", "JavaScript", "Python", "C++", "C"],
      required: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    verdict: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Compilation Error",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      default: "Wrong Answer",
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    executionTime: {
      type: Number,
      default: 0,
    },

    memory: {
      type: Number,
      default: 0,
    },

    output: {
      type: String,
      default: "",
    },

    error: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);

export default Submission;