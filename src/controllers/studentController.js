const studentModel = require("../models/studentModel");

const path = require("path");
const csv = require("csvtojson");


// ADD STUDENT
const addStudent = async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, "../../uploads/file.csv");
    let csvData = [];

    csv()
      .fromFile(csvFilePath)
      .then(async (response) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          csvData.push({
            name: response[i].name,
            student_class: response[i].student_class,
            roll_number: response[i].roll_number,
            total_marks: response[i].total_marks
          });
        }

        await studentModel.insertMany(csvData);
        console.log(csvData);
        return res.status(200).send({ status: true, message: "Success", data: csvData });
      })
      .catch((error) => {
        console.error("Error while processing CSV:", error);
        return res.status(500).send({ status: false, message: "Error processing CSV" });
      });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ status: false, message: error.message });
  }
};



// GET STUDENTS
const getStudents = async (req, res) => {
    try {
        let { pageNumber, count } = req.params;
        if (!pageNumber || !count) {
            return res.status(400).send({ status: false, message: "Page number and count are required" });
        }

        pageNumber = parseInt(pageNumber);
        count = parseInt(count);

        let allStudents = await studentModel.find({}).countDocuments();

        let totalPages = Math.ceil(allStudents / count);

        if (pageNumber > totalPages) {
            return res.status(404).send({ status: false, message: "Page Not Found" });
        }

        let students = await studentModel
            .find()
            .skip((pageNumber - 1) * count)
            .limit(count);

        return res.status(200).send({
            status: true,
            message: "Success",
            data: students,
        });
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });
    }
};

// SEARCH STUDENTS BY FILTER
const searchStudent = async (req, res) => {
    try {
        let { query } = req.body;

        const filter = {
            $or: [{ name: { $regex: query, $options: "i" } }, 
            { student_class: { $regex: query, $options: "i" } }, 
            { roll_number: { $regex: query, $options: "i" } }],
        };

        const filteredData = await studentModel.find(filter);

        if (filteredData.length === 0) {
            return res.status(404).send({ status: false, message: "Data not found" });
        }

        return res.status(200).send({
            status: true,
            message: "Success",
            data: filteredData,
        });
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    addStudent,
    getStudents,
    searchStudent,
};
