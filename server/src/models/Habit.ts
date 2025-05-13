import mongoose from "mongoose";

export enum HabitFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  CUSTOM = "custom",
}

export enum HabitType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
}

export interface IHabit extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  type: HabitType;
  icon?: string;
  color?: string;
  goalTarget?: number;
  customDays?: number[];
  completions: {
    date: Date;
    count: number;
  }[];
  isArchived: boolean;
  reminderTime?: Date;
}

const HabitSchema = new mongoose.Schema<IHabit>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    frequency: {
      type: String,
      enum: Object.values(HabitFrequency),
      default: HabitFrequency.DAILY,
    },
    type: {
      type: String,
      enum: Object.values(HabitType),
      default: HabitType.POSITIVE,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: "#3182CE", // Chakra UI blue.500
    },
    goalTarget: {
      type: Number,
      min: 1,
    },
    customDays: [
      {
        type: Number,
        min: 0,
        max: 6,
      },
    ],
    completions: [
      {
        date: {
          type: Date,
          required: true,
        },
        count: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
    reminderTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model<IHabit>("Habit", HabitSchema);

export default Habit;
