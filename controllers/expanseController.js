import Expanse from "../models/expanseModel.js";

const createExpanse = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error."
        });
    }
}

const getExpanse = async (req, res, next) => {
    try {
        const expanse = await Expanse.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            expanse
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error."
        });
    }

}

const deleteExpanse = async (req, res, next) => {
    try {

        await Expanse.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Expanse Deleted Successfully",

        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error."
        });
    }
}

const updateExpanse = async (req, res, next) => {
    try {
        const expanse = await Expanse.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Update Successfully",
            expanse
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error."
        });
    }
}

export { createExpanse, getExpanse, deleteExpanse, updateExpanse }