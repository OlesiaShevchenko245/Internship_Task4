import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    authorId: { type: Number, required: true, index: true },
    type: { type: String, required: true },
    title: { type: String, required: true, maxlength: 120 },
    message: { type: String, maxlength: 2000 },
    occurredAt: { type: Date, required: true, index: true },
    payload: { type: Schema.Types.Mixed },
  },
  { versionKey: false }
);

schema.index({ authorId: 1, occurredAt: -1 });

export const AuthorEventModel = model("author_events", schema);
