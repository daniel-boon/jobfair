const Booking = require("../models/Booking");
const Event = require("../models/Event");
const Company = require("../models/Company");
const User = require("../models/User"); // If needed for additional user validation or details

// Controller to get booking details along with associated event and company details, showing only the relevant job and slot
exports.getBookingDetailsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params; // Assuming the userID is passed as a URL parameter

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find all bookings for the given userID
    const bookings = await Booking.find({ userID: userId }).lean();
    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found for this user" });
    }

    // Loop through the bookings to get event and company details
    const bookingDetails = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const event = await Event.findById(booking.eventID).lean();
          if (!event) throw new Error("Event not found");

          const company = await Company.findById(event.companyID).lean();
          if (!company) throw new Error("Company not found");

          // Find the specific slot associated with the booking
          const slot = event.slot.find(s => s._id.toString() === booking.slotID.toString());
          if (!slot) throw new Error("Slot not found");

          return {
            booking: booking,
            event: {
              title: event.eventTitle,
              description: event.eventDescription,
              job: booking.jobPosition, // Only the job position associated with the booking
              slot: slot, // Only the slot associated with the booking
            },
            company: {
              id: company._id,
              name: company.companyName,
              phone: company.companyPhone,
              description: company.companyDescription,
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

    // Respond with the combined details, filtering out any null responses
    res.status(200).json({ success: true, data: bookingDetails.filter(detail => detail !== null) });
  } catch (error) {
    console.error("Failed to retrieve booking details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Controller to get booking details for an admin, along with associated event and company details
exports.getBookingDetailsForAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params; // Assuming the userID of the admin is passed as a URL parameter

    // Check if the user exists and is an admin
    const adminUser = await User.findById(userId);
    if (!adminUser) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    if (adminUser.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Find all bookings
    const bookings = await Booking.find();

    // Loop through the bookings to get event and company details
    const bookingDetails = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const event = await Event.findById(booking.eventID);
          if (!event) throw new Error("Event not found");

          const company = await Company.findById(event.companyID);
          if (!company) throw new Error("Company not found");

          // Verify the company by phone numbers
          if (company.companyPhone !== adminUser.telPhone) {
            throw new Error("Admin phone does not match the company phone for this booking");
          }

          // Find the specific slot and job associated with the booking
          const slot = event.slot.find(s => s._id.toString() === booking.slotID.toString());
          if (!slot) throw new Error("Slot not found");

          return {
            booking: booking,
            event: {
              title: event.eventTitle,
              description: event.eventDescription,
              job: booking.jobPosition, // Only the job position associated with the booking
              slot: slot, // Only the slot associated with the booking
            },
            company: {
              id: company._id,
              name: company.companyName,
              phone: company.companyPhone,
              description: company.companyDescription,
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
    res.status(200).json({ success: true, data: bookingDetails.filter(detail => detail !== null) });
  } catch (error) {
    console.error("Failed to retrieve booking details for admin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};