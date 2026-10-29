import mongoose from "mongoose";
import { Lecture } from "./lecture.model.js";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course Title is required"],
      trim: true,
      maxLength: [100, "Title can't exceed upto 100 characters"],
      unique: true,
      lowercase: true,
    },

    subTitle: {
      type: String,
      trim: true,
      maxLength: [200, "Course subTitle can't exceed upto 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [1000, "Course description can't exceed upto 1000 characters"],
    },

    category: {
      type: String,
      required: [true, "Course Category is required"],
      trim: true,
    },

    level: {
      type: String,
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message: "Please select a valid course level",
      },
      default: "beginner",
    },

    price: {
      type: Number,
      required: [true, "Course Price is required"],
      min: [0, "Course Price must be a non-negative number"],
    },

    thumbnail: {
      type: String,
      required: [true, "Course thumbnail is required"],
    },

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Course instructor is required"],
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    totalLectures: {
      type: Number,
      default: 0,
    },

    // Rated by those who purchased the course
    rating: {
      type: [
        {
          type: Number,
          min: 0,
          max: 5,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


courseSchema.virtual("averageRating").get(function () {
  const ratings = this.rating ?? [];

  if (ratings.length === 0) {
    return null;
  }

  const ratingSum = ratings.reduce((sum, rating) => sum + rating, 0);

  return ratingSum / ratings.length;
  
});

courseSchema.pre("save", function () {
  if (this.lectures) {
    this.totalLectures = this.lectures.length;
  }
});

courseSchema.pre("save", async function () {
  let total = 0;
  let video;

  if (this.lectures) {
    for (const lecture of this.lectures) {
      video = await Lecture.findById(lecture);

      if (video) {
        total += video.duration;
      }
    }
  }

  this.totalDuration = total;
});

export const Course = mongoose.model("Course", courseSchema);
