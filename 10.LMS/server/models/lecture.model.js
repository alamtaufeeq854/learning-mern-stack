import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lecture Title is required"],
      trim: true,
      maxLength: [100, "Lecture can't exceed upto 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [500, "Lecture description can't exceed upto 500 characters"],
    },

    videoUrl: {
      type: String,
      required: [true, "Video Url is required"],
    },

    duration: {
      type: Number,
      default: 0,
    },

    publicId: {
      type: String,
      required: [true, "Public ID is required for video management"],
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      required: [true, "Lecture Order is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

lectureSchema.pre("save", function () {
  if (this.duration) {
    // OPtional
    this.duration = Math.round(this.duration * 100) / 100;
  }
});

export const Lecture = mongoose.model("Lecture", lectureSchema);
