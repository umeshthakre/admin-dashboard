import Report from "../models/report.js";
import User from "../models/user.js";


class UserService {

  async getReports() {
    try {
      const reports = await Report.find().populate("user").sort({ createdAt: -1 });

      return { success: true, reports };

    } catch (error) {
      console.log('error', error);
      return { success: false, error };

    }
  }

  async generateReport(email, name) {

    try {

      const user = await User.findOne({ email: email });
      const report = new Report({ name, user });

      await report.save();

      return { report, success: true };


    } catch (error) {
      console.log('error', error)
      return { success: false, error };
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find().sort({ createdAt: -1 });

      return { success: true, users };

    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }

  async getUserDetails(id) {
    try {
      const user = await User.findById(id);
      return { success: true, user };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }

  async updateUser(id, data) {
    try {
      console.log('id', id, data);
      const user = await User.findByIdAndUpdate(id, { name: data.name, phone: data.phone }, { new: true });
      return { success: true, user };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }

  async getUserCount() {
    try {
      const count = await User.countDocuments({});
      console.log(`Total users: ${count}`);
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      throw error;
    }
  };

  async getWeeklyUserSignups() {
    const today = new Date();

    // Get the Monday of the current week
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // Sunday = end of week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    endOfWeek.setHours(0, 0, 0, 0);

    // Aggregate signups by day
    const result = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Map MongoDB $dayOfWeek (1=Sunday ... 7=Saturday) to readable format
    const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekCounts = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    let arr = [];
    result.forEach(({ _id, count }) => {
      const dayName = dayMap[_id - 1]; // _id is 1-7
      weekCounts[dayName] = count;
    });

    let days = Object.keys(weekCounts);

    for (let i = 0; i < days.length; i++) {

      let obj = {}
      obj[days[i]] = weekCounts[days[i]];
      arr.push(obj)
    }

    return arr;
  }

  async getReportStatsByUsers() {
    try {
      const withReports = await User.countDocuments({ reports: { $exists: true, $not: { $size: 0 } } });
      const withoutReports = await User.countDocuments({ $or: [{ reports: { $exists: false } }, { reports: { $size: 0 } }] });

      return {
        withReports,
        withoutReports,
      };
    } catch (error) {
      console.error('Error getting report generation stats:', error);
      throw error;
    }
  }

  async getReportCount() {
    try {
      const count = await Report.countDocuments({});
      console.log(`Total reports: ${count}`);
      return count;
    } catch (error) {
      console.error('Error counting reports:', error);
      throw error;
    }
  }

  async getWeeklyReportStats() {
    const today = new Date();

    // Get Monday of the current week
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // End of Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    endOfWeek.setHours(0, 0, 0, 0);

    const result = await Report.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' }, // 1 = Sunday, 2 = Monday, ...
          count: { $sum: 1 },
        },
      },
    ]);

    // Map to weekday names
    const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const reportCounts = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    result.forEach(({ _id, count }) => {
      const dayName = dayMap[_id - 1]; // MongoDB $dayOfWeek starts from 1 (Sunday)
      reportCounts[dayName] = count;
    });

    return reportCounts;
  };

  async getTopReportGenerators() {
    try {
      const topUsers = await User.aggregate([
        {
          $project: {
            name: 1,
            reportCount: { $size: { $ifNull: ['$reports', []] } },
          },
        },
        {
          $sort: { reportCount: -1 },
        },
        {
          $limit: 5,
        },
      ]);

      return topUsers;
    } catch (error) {
      console.error('Error fetching top report generators:', error);
      throw error;
    }
  };


  async getRecentReportsWithUsers() {
    try {
      let recentReports = await Report.find({})
        .sort({ createdAt: -1 })
        .limit(1)
        .populate('user', 'name email') // populate only selected fields
        .exec();

      // recentReports[0].name = recentReports[0].user.name;
      // recentReports[0].user = null

      return recentReports;
    } catch (error) {
      console.error('Error fetching recent reports with users:', error);
      throw error;
    }
  };


  async generateAndSaveRandomReport(user) {
    const names = ['Sales Report', 'User Analytics', 'Inventory Report', 'Revenue Summary', 'Traffic Analysis'];
    const statuses = ['Pending', 'Approved'];

    const randomName = names[Math.floor(Math.random() * names.length)];

    const report = new Report({
      name: randomName,
      status: statuses[0],
      user:user.mongoUser._id
    });

    const mUser = await User.findById(user.mongoUser._id);

    mUser.reports.push(report._id);
    await mUser.save();

    console.log('report',mUser)

    try {
      const savedReport = await report.save();
      console.log('Saved Report:', savedReport);
      return savedReport;
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  }

  async updateUserReport(reportId,userId){
    try {
      const user = await User.findById(userId);
      user.reports.push(reportId);
      await user.save();
      return {success:true,user};
    } catch (error) {
      console.log("error",error);
      return {success:false,error};
    }
  }


  async updateReportStatus(reportId){
    try {
      const report = await Report.findById(reportId);
      report.status = 'Approved';
      await report.save();
      return {success:true,report};
    } catch (error) {
      console.log("error",error);
      return {success:false,error};
    }
  }

}


export default new UserService();