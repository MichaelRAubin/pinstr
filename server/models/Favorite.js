import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Favorite = new Schema(
    {
        pin: { type: Schema.Types.ObjectId, rel: "Pin", required: true },
        creatorEmail: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

Favorite.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default Favorite;