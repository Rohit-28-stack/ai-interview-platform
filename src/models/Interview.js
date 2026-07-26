import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    topic:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true
    },

    questions:[
        {
            question:{
                type:String,
                required:true
            },

            answer:{
                type:String,
                default:""
            },

            score:{
                type:Number,
                default:0
            },

            feedback:{
                type:String,
                default:""
            }
        }
    ],


    totalScore:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Started",
            "Completed"
        ],
        default:"Started"
    },
    report:{
    overallScore:{
        type:Number,
        default:0
    },

    strengths:{
        type:[String],
        default:[]
    },

    weaknesses:{
        type:[String],
        default:[]
    },

    suggestions:{
        type:[String],
        default:[]
    }
}

},
{
    timestamps:true
});


const Interview =
mongoose.models.Interview ||
mongoose.model(
    "Interview",
    interviewSchema
);


export default Interview;