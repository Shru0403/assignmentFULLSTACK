const express = require("express");
const multer = require("multer");
const os = require("os");
const fs = require("fs");

const decodeQR = require("./qr");

const {
    extractRollNumber,
    isRegistered
} = require("./parser");

const {
    markPresent,
    getStats
} = require("./attendance");

const app = express();

const upload = multer({
    dest: os.tmpdir()
});

app.use(
    express.static("public")
);

app.post(
    "/scan",
    upload.single("card"),
    async (req, res) => {

        try {

            const qrText =
                await decodeQR(
                    req.file.path
                );

            const roll =
                extractRollNumber(
                    qrText
                );

            if (!roll) {
                return res.send(
                    "No roll number found"
                );
            }

            if (!isRegistered(roll)) {
                return res.send(
                    "Roll number not registered"
                );
            }

            const result =
                markPresent(roll);

            if (!result.success) {

                return res.send(
                    `Already marked at ${result.timestamp}`
                );
            }

            res.send(
                `Attendance marked for ${roll}`
            );

        } catch (err) {

            res.send(
                err.message
            );
        }
    }
);

app.get("/report", (req, res) => {

    const stats = getStats();

    res.send(`
        <h2>Attendance Report</h2>

        <p>Total Present:
        ${stats.total}</p>

        <pre>
${stats.rollNumbers.join("\n")}
        </pre>
    `);
});

app.get("/export", (req, res) => {

    const data = JSON.parse(
        fs.readFileSync(
            "attendance.json",
            "utf8"
        )
    );

    const rows = [
        ["RollNumber", "Timestamp"]
    ];

    for (const roll in data) {
        rows.push([
            roll,
            data[roll]
        ]);
    }

    const csv =
        rows.map(
            r => r.join(",")
        ).join("\n");

    fs.writeFileSync(
        "attendance.csv",
        csv
    );

    res.download(
        "attendance.csv"
    );
});

app.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});