const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        student_class: {
            type: String,
            required: true,
            trim: true,
        },

        roll_number: {
            type: String,
            required: true,
        },

        total_marks: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
