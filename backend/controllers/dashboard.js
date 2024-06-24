const { NotFoundError, BadRequestError } = require('../errors');
const Reading = require('../models/Reading');
const {StatusCodes} = require('http-status-codes')

const getReadings = async (req,res) => {
    const readings = await Reading.find({createdBy: req.user.userId}).sort('-createdAt')
    res.status(StatusCodes.OK).json({readings, count : readings.length});
}

const addReading = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const reading = await Reading.create(req.body)
    res.status(StatusCodes.CREATED).json({reading})
}

module.exports = {getReadings, addReading};