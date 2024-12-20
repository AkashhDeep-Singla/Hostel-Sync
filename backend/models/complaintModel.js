const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    issuetype: {
        type: String,
        enum: ['Room Maintenance', 'Cleanliness and Hygiene', 'Food and Dining', 'Safety and Security', 'Facilities and Amenities', 'Hostel wardenistration', 'Other'],
        required: true
    },
    issue: {
        type: String,
        trim: true,
        required: true
    },
    hostel: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Under Processing', 'Resolved'],
        default: "Pending"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation',
    },
    enrollmentId: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('complaint', complaintSchema);
