import User from "../models/userModel.js";

const Register = async (req, res, next) => {

    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "All input is required."
            })
        }

        const userExiest = await User.findOne({ email: req.body.email });

        if (userExiest) {
            return res.status(409).json({
                success: false,
                message: "User Already Exist. Please Login"
            })
        }

        const user = await User.create(req.body);

        const Token = await user.getJWTToken();

        res.status(201).json({
            success: true,
            user,
            Token,
            message: "User registerd Successfully",

        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error."
        });
    }

}

const Login = async (req, res, next) => {

    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Email & Password"
            })
        }

        const user = await User.findOne({ email: req.body.email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const isPasswordMatch = await user.comparePassword(req.body.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const Token = await user.getJWTToken();

        return res.status(200).json({
            success: true,
            Token,
            user
        })
    } catch (error) {
        console.log(error);
    }

}

export { Register, Login };