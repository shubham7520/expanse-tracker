import Expanse from "../models/expanseModel.js";

const createExpanse = async (req, res, next) => {

    const { description, amount } = req.body

    if (!description || !amount) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Description & Amount"
        })
    }

    const expanse = await Expanse.create({
        description,
        amount,
        user: req.user.id
    });

    return res.status(202).json({
        success: false,
        message: "Expanse Successfully Added",
        expanse
    })
}

const getExpanse = async (req, res, next) => {
    const expanse = await Expanse.find({ user: req.user.id });

    res.status(200).json({
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

const updateExpanse = async (req, res, next) => {
    const expanse = await Expanse.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
        success: true,
        message: "Update Successfully",
        expanse
    })

}

export { createExpanse, getExpanse, deleteExpanse, updateExpanse }