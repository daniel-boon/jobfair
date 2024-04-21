const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

// Controller to get all bookings for each event of a specific company along with event and user details
exports.getAllDetailsByCompanyID = async (req, res) => {
  try {
    const { companyID } = req.params; // Assuming the companyID is passed as a URL parameter

    // Find all events associated with the companyID
    const events = await Event.find({ companyID });
    if (!events.length) {
      return res
        .status(404)
        .json({ success: false, message: "No events found for this company" });
    }

    // Fetch bookings, events, and user details
    const eventDetails = await Promise.all(
      events.map(async (event) => {
        const bookings = await Booking.find({ eventID: event._id });

        // Fetch user details for each booking
        const bookingDetails = await Promise.all(
          bookings.map(async (booking) => {
            const user = await User.findById(booking.userID);
            if (!user) {
              console.error("User not found for booking:", booking._id);
              return null;
            }

            return {
              bookingId: booking._id,
              user: {
                name: user.name,
                email: user.emailAddress,
                phone: user.telPhone,
                picture: user.picture
                  ? `data:image/png;base64,${user.picture.toString("base64")}`
                  : null,
              },
            };
          })
        );

        return {
          eventId: event._id,
          eventTitle: event.eventTitle,
          eventDescription: event.eventDescription,
          bookings: bookingDetails.filter((detail) => detail !== null), // Filter out any null results from failed user fetches
        };
      })
    );

    // Respond with the combined details of all events and their bookings
    res.status(200).json({ success: true, data: eventDetails });
  } catch (error) {
    console.error("Failed to retrieve details by company ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
