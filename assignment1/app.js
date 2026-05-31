const fs = require("fs");

class Student {

    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    get average() {

        let sum = 0;

        for (let score of this.scores) {
            sum += score;
        }

        return sum / this.scores.length;
    }

    get letterGrade() {

        if (this.average >= 90) {
            return "A";
        }
        else if (this.average >= 80) {
            return "B";
        }
        else if (this.average >= 70) {
            return "C";
        }
        else if (this.average >= 60) {
            return "D";
        }

        return "F";
    }

    summary() {

        let highest = this.scores[0];
        let lowest = this.scores[0];

        for (let score of this.scores) {

            if (score > highest) {
                highest = score;
            }

            if (score < lowest) {
                lowest = score;
            }
        }

        return {
            highest,
            lowest
        };
    }
}

function getRemark(grade) {

    switch (grade) {

        case "A":
            return "Excellent";

        case "B":
            return "Good";

        case "C":
            return "Average";

        case "D":
            return "Needs Improvement";

        default:
            return "Poor";
    }
}

function printReport(student) {

    const { highest, lowest } = student.summary();

    const status =
        student.average >= 60
            ? "PASS"
            : "FAIL";

    const remark =
        getRemark(student.letterGrade);

    console.log(`
==============================
        REPORT CARD
==============================

Name      : ${student.name}
Scores    : ${student.scores.join(", ")}

Average   : ${student.average.toFixed(1)}
Grade     : ${student.letterGrade}

Highest   : ${highest}
Lowest    : ${lowest}

Status    : ${status}
Remark    : ${remark}

==============================
`);

    const [score1, score2, ...remaining] =
        student.scores;

    console.log("Score Breakdown");
    console.log("----------------");

    console.log(`Score 1 : ${score1}`);
    console.log(`Score 2 : ${score2}`);

    for (let i = 0; i < remaining.length; i++) {
        console.log(
            `Score ${i + 3} : ${remaining[i]}`
        );
    }

    console.log();
}

if (process.argv.length > 2) {

    const name = process.argv[2];

    const scores = process.argv
        .slice(3)
        .map(Number);

    if (scores.length < 3) {

        console.log(
            "Error: Please provide at least 3 exam scores."
        );

        process.exit(1);
    }

    if (scores.some(isNaN)) {

        console.log(
            "Error: All scores must be numbers."
        );

        process.exit(1);
    }

    const student =
        new Student(name, scores);

    printReport(student);

} else {

    const data =
        fs.readFileSync(
            "students.json",
            "utf8"
        );

    const studentsData =
        JSON.parse(data);

    const students = [];

    for (const studentData of studentsData) {

        students.push(
            new Student(
                studentData.name,
                studentData.scores
            )
        );
    }

    let topStudent = students[0];

    for (const student of students) {

        printReport(student);

        if (
            student.average >
            topStudent.average
        ) {
            topStudent = student;
        }
    }

    console.log(`
=================================
         TOP PERFORMER
=================================

Name      : ${topStudent.name}
Average   : ${topStudent.average.toFixed(1)}
Grade     : ${topStudent.letterGrade}

=================================
`);
}