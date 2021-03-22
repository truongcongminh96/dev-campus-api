const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Courses = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all course
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Courses.find({bootcamp: req.params.bootcampId});
    } else {
        query = Courses.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// @desc      Get all course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Courses.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404));
    }

    const course = await Courses.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    });
});