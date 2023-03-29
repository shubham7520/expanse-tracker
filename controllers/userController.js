import User from "../models/userModel.js";

const Register = async (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: "Please fill the required feild."
        })
    }

    const userExiest = await User.findOne({ email: req.body.email });

    if (userExiest) {
        return res.status(400).json({
            success: false,
            message: "This email already exiest, Please use another email"
        })
    }

    const user = await User.create(req.body);

    const Token = await user.getJWTToken();

    res.status(200).json({
        success: true,
        user,
        Token,
        message: "User registerd Successfully",

    })
}

const Login = (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "api is working"
    })
}

export { Register, Login };