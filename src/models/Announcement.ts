import mongoose from "mongoose";

const AnnouncementSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model(
    "Announcement",
    AnnouncementSchema
  );

export default Announcement;