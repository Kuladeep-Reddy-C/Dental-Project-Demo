import User, { findOne } from '../models/user.model';
import { appendToCSV } from '../utils/csvWriter';

const signup = async (req, res) => {
    try {
        const {
            email, password, shiftNumber, requestedBy, department,
            maintenanceType, complaintNature, startTime, finishTime
        } = req.body;

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = finishTime.split(':').map(Number);

        let totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        if (totalMinutes < 0) totalMinutes += 1440; 

        const newUser = new User({
            email,
            password, 
            shiftNumber,
            requestedBy,
            department,
            maintenanceType,
            complaintNature,
            startTime,
            finishTime,
            totalMinutes,
        });

        await newUser.save();

        appendToCSV({
            email,
            shiftNumber,
            requestedBy,
            department,
            maintenanceType,
            complaintNature,
            startTime,
            finishTime,
            totalMinutes,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ message: 'User signed up and logged to CSV' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong during signup' });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong during signin' });
    }
};

export default { signup, signin };
