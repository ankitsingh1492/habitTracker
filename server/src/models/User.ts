// server/src/models/User.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  streaks: {
    habitId: mongoose.Types.ObjectId;
    currentStreak: number;
    longestStreak: number;
    lastCompletedDate?: Date;
  }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    streaks: [
      {
        habitId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Habit",
        },
        currentStreak: {
          type: Number,
          default: 0,
        },
        longestStreak: {
          type: Number,
          default: 0,
        },
        lastCompletedDate: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with our new salt
    const hash = await bcrypt.hash(this.password, salt);
    // Override the cleartext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    return next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
