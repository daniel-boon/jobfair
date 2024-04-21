const Booking = require("../models/Booking");
const Event = require("../models/Event");
const Company = require("../models/Company");
const User = require("../models/User"); // If needed for additional user validation or details

// Controller to get booking details along with associated event and company details
exports.getBookingDetailsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params; // Assuming the userID is passed as a URL parameter

    // Check if user exists (optional, depending on your requirements)
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find all bookings for the given userID
    const bookings = await Booking.find({ userID: userId });

    // Loop through the bookings to get event and company details
    const bookingDetails = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const event = await Event.findById(booking.eventID);
          if (!event) throw new Error("Event not found");

          const company = await Company.findById(event.companyID);
          if (!company) throw new Error("Company not found");

          return {
            booking: booking,
            event: {
              title: event.eventTitle,
              description: event.eventDescription,
              jobs: event.jobs,
              slots: event.slot,
            },
            company: {
              id: company._id, // Assuming MongoDB default _id field
              name: company.companyName,
              phone: company.companyPhone,
              description: company.companyDescription,
              picture: company.picture
                ? `data:image/png;base64,${company.picture.toString("base64")}`
                : null,
            },
          };
        } catch (error) {
          console.error(
            "Error fetching details for booking:",
            booking._id,
            error
          );
          return null; // Or handle it some other way that suits your application
        }
      })
    );

    // Respond with the combined details
    res.status(200).json({ success: true, data: bookingDetails });
  } catch (error) {
    console.error("Failed to retrieve booking details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
