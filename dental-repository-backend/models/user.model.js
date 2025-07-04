import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: String,
    password: String,
    shiftNumber: String,
    requestedBy: String,
    department: String,
    maintenanceType: String,
    complaintNature: String,
    startTime: String,
    finishTime: String,
    totalMinutes: Number,
}, { timestamps: true });

export default model('User', userSchema);
