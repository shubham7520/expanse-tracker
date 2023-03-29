import mongoose from "mongoose";

const expanseSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
});

const expanse = mongoose.model('expanse', expanseSchema);

export default expanse;