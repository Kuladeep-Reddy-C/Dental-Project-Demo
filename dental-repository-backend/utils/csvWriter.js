const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const csvPath = path.join(__dirname, '../log.csv');

const fields = [
    'email',
    'shiftNumber',
    'requestedBy',
    'department',
    'maintenanceType',
    'complaintNature',
    'startTime',
    'finishTime',
    'totalMinutes',
    'createdAt',
];

const parser = new Parser({ fields });

const appendToCSV = (userObj) => {
    try {
        const csv = parser.parse([userObj]);
        const row = csv.split('\n')[1]; 
        if (!fs.existsSync(csvPath)) {
            fs.writeFileSync(csvPath, csv);
        } else {
            fs.appendFileSync(csvPath, `\n${row}`);
        }
    } catch (err) {
        console.error('CSV write failed:', err);
    }
};

module.exports = { appendToCSV };
