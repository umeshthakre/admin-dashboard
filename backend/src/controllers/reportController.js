import User from "../models/user.js";
import userService from "../services/userService.js";

class ReportController {
    async getReports(req, res) {
        try {
            const reports = await userService.getReports();

            if (reports.success) {
                return res.status(200).send(reports)
            } else {
                return res.status(500).send({ error, msg: "Error while getting reports" })
            }



        } catch (error) {
            console.log('error', error);
            return res.status(500).send({ error, msg: "Error while getting reports" })
        }
    }

    async generateReport(req, res) {
        try {
            const email = req.body.email;
            const name = req.body.name;

            const reports = await userService.generateReport(email, name);

            if (reports.success) {
                return res.status(200).send(reports.report)
            } else {
                return res.status(500).send({ error: "Error while generating report" })
            }

        } catch (error) {
            console.log('error', error)
            return res.status(500).send({ error })
        }
    }

    async getAnalytics(req,res){
        try {
            const userCount = await userService.getUserCount();
            const userWeeklySignups = await userService.getWeeklyUserSignups();
            const userReportStats = await userService.getReportStatsByUsers();
            const reportCount = await userService.getReportCount();
            const weeklyReportCreation = await userService.getWeeklyReportStats();
            const topUsersByReport = await userService.getTopReportGenerators()
            const recentReport = await userService.getRecentReportsWithUsers();

            console.log(userCount,userWeeklySignups)

            return res.status(200).send({
                userCount,
                userWeeklySignups,
                userReportStats,
                reportCount,
                weeklyReportCreation,
                topUsersByReport,
                recentReport
            });

        } catch (error) {
            console.log("error",error);
            return res.status(500).send(error);
        }
    }

    async generateRandomReport(req,res){
        try {
            console.log('req user',req.user)
            const randomReport = await userService.generateAndSaveRandomReport(req.user);
             

            return res.status(200).send(randomReport);
        } catch (error) {
            console.log('error',error);
            return res.status(500).send({error})
        }
    }

    async updateStatus(req,res){
        try {
            const report = await userService.updateReportStatus(req.params.id);
            return res.status(200).send(report);
        } catch (error) {
            console.log('error',error);
            return res.status(500).send({error})
        }
    }


}

export default new ReportController;