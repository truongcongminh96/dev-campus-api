const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Courses = require('../models/Course');

// @desc      Get all course
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Courses.find({bootcamp: req.params.bootcampId});
    } else {
        query = Courses.find();
    }

    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});
