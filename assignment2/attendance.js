const fs = require("fs");

const FILE = "attendance.json";

let store = {};

try {
    store = JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );
} catch {
    store = {};
}

function save() {
    fs.writeFileSync(
        FILE,
        JSON.stringify(store, null, 2)
    );
}

function markPresent(rollNumber) {

    if (store[rollNumber]) {
        return {
            success: false,
            reason: "already_marked",
            timestamp: store[rollNumber]
        };
    }

    store[rollNumber] =
        new Date().toISOString("en-IN");

    save();

    return {
        success: true
    };
}

function getStats() {

    const rollNumbers =
        Object.keys(store).sort();

    return {
        total: rollNumbers.length,
        rollNumbers
    };
}

module.exports = {
    markPresent,
    getStats
};