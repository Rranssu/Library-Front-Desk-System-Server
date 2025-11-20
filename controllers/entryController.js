const entryModel = require("../models/entryModel");
const studentModel = require("../models/studentModel");

exports.logEntry = async (req, res) => {
  const { studentId } = req.body;

  try {
    
    const student = await studentModel.findStudent(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not registered" });
    }

    await entryModel.createEntry(studentId);

    return res.status(200).json({
      success: true,
      message: "Entry logged successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
