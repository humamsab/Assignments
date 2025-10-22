import mongoose,{model, Schema} from 'mongoose';

mongoose.connect("mongodb+srv://admin:mYS4WnPJAXPhRr5Z@cluster0.pfkjbno.mongodb.net/brainly");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const ContentSchema = new Schema({
    title: String,
    type: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    userId: [{type: mongoose.Types.ObjectId, ref: 'Users'}]
})

const LinkSchema = new Schema({
    hash: String,
    userId: [{type: mongoose.Types.ObjectId, ref:'Users'}]
})

export const UserModel = model("Users", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);