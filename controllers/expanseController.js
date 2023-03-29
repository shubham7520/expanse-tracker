import Expanse from "../models/expanseModel.js";

const createExpanse = async (req, res, next) => {

    if (!req.body.description || !req.body.amount) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Description & Amount"
        })
    }

    const expanse = await Expanse.create(req.body);

    return res.status(200).json({
        success: false,
        message: "Expanse Successfully Added",
        expanse
    })
}

const getExpanse = async (req, res, next) => {
    const expanse = await Expanse.find();

    res.status(202).json({
        success: true,
        expanse
    })
}

const deleteExpanse = async (req, res, next) => {
    await Expanse.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Expanse Deleted Successfully",

    })
}

export { createExpanse, getExpanse, deleteExpanse }