/*
RAW QR STRING OBSERVED FROM IITK ID

02.241004,1,MEUCIQDgepPk5WJ0y+Y5356yb3wP2osjANW0GQlx5T47qNY+EAIgZAY3uAAIESHwxxudcQoZozD7HXeBDcecB5sAos0hFQM=.iitkidcard

Observed roll number: 241004
*/

function extractRollNumber(qrString) {
    const matches = qrString.match(/\d{6}/g);

    if (!matches) return null;

    return (
        matches.find(num => {
            const n = Number(num);
            return n >= 240001 && n <= 242000;
        }) || null
    );
}

function isRegistered(rollNumber) {
    const n = Number(rollNumber);

    return n >= 240001 &&
           n <= 242000;
}

module.exports = {
    extractRollNumber,
    isRegistered
};