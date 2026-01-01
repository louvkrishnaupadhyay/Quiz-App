import User from "../models/user.js";
const resisterUser = async (req, res) => {
    let resp;
    try {
        const user = new User(req.body);
        const result = await user.save();
        if (!result) {
            resp = { status: 'error', message: "result not found", data: {} };
            res.send(resp);
        }
        else {
            resp = { status: 'success', message: "Registration Done!", data: { userId: result._id } };
            res.send(resp);
        }
    }
    catch (error) {
        // console.log(error)
        resp = { status: 'error', message: "something went wrong", data: {} };
        res.status(500).send(resp);
    }
};
const getUser = async (req, res) => {
    // console.log("query:", req.query);
    console.log("params:", req.params.userId);
    let resp;
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId, { name: 1, email: 1 });
        if (!user) {
            resp = { status: 'error', message: "No user found", data: {} };
            res.send(resp);
        }
        else {
            resp = { status: 'success', message: "User found", data: { user: user } };
            res.send(resp);
        }
    }
    catch (error) {
        resp = { status: 'error', message: "something went wrong", data: {} };
        res.status(500).send(resp);
    }
};
// const updateUser = async (req: Request, res: Response) => {
//     let resp:returnResponse;
//     try {
//         const userId = req.body._id;
//         const user = await User.findById(userId);
//         user.name = req.body.name;
//         await user?.save();
//         resp = {status: "success", message: "Updat done", data:{}};
//         res.send(resp);
//     } catch (error) {
//         resp = {status: 'error', message: "something went wrong", data:{}}
//         res.status(500).send(resp);
//     }
// }
const updateUser = async (req, res) => {
    let resp;
    try {
        const userId = req.body._id;
        const user = await User.findById(userId);
        if (!user) {
            resp = { status: "error", message: "User not found", data: {} };
            return res.status(404).send(resp);
        }
        user.name = req.body.name;
        await user.save();
        resp = { status: "success", message: "Updat done", data: {} };
        res.send(resp);
    }
    catch (error) {
        resp = { status: 'error', message: "something went wrong", data: {} };
        res.status(500).send(resp);
    }
};
export { resisterUser, getUser, updateUser };
//# sourceMappingURL=user.js.map