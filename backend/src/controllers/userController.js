import userService from "../services/userService.js";

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            console.log(users)
            if (users.success) {
                return res.status(200).send(users);
            } else {
                return res.status(500).send({ error: "error while getting users please try again" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).send({ error: "error while getting users please try again" })
        }
    }

    async getUserDetails(req, res) {
        try {
            const user = await userService.getUserDetails(req.params.id);
            console.log(user)
            if (user.success) {
                return res.status(200).send(user);
            } else {
                return res.status(500).send({ error: "error while getting user details please try again" });
            }
        } catch (error) {
            console.log("error", error);
            return res.status(500).send({ error: "error while getting user details please try again" })
        }
    }

    async updateUser(req, res) {
        try {
            console.log('req body', req.body)
            const user = await userService.updateUser(req.params.id, req.body);
            console.log(user)
            if (user.success) {
                return res.status(200).send(user);
            } else {
                return res.status(500).send({ error: "error while updating user details please try again" });
            }
        } catch (error) {
            console.log("error", error);
            return res.status(500).send({ error: "error while updating user details please try again" })
        }
    }

    async generateRandomReport(req, res) {
        try {
            const report = await userService.generateAndSaveRandomReport();
            console.log(report)
            if (report.success) {
                return res.status(200).send(report);
            } else {
                return res.status(500).send({ error: "error while generating report please try again" });
            }
        } catch (error) {
            console.log("error", error);
            return res.status(500).send({ error: "error while generating report please try again" })
        }
    }
}

export default new UserController;