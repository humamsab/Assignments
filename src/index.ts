import express from "express";
import { random } from "./utils.js";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import cors from "cors";
import bcrypt from "bcrypt";
import { z } from "zod";

const app = express();
app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
}));

// ------------------ SCHEMAS -------------------
const signupSchema = z.object({
  username: z.string().min(1, "username required"), 
  password: z.string().min(1, "password required")  
});

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
});

const contentSchema = z.object({
    title: z.string().min(2),
    type: z.enum(["youtube", "twitter", "instagram", "pdf", "gdocs", "link"]),
    link: z.string().url()
});




app.post("/api/v1/signup", async (req, res) => {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { username, password } = parseResult.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ username, password: hashedPassword });

        res.json({ message: " User signed up successfully" });
    } catch (e) {
        res.status(409).json({ message: " User already exists" });
    }
});


app.post("/api/v1/signin", async (req, res) => {
    const parseResult = signinSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { username, password } = parseResult.data;

    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
        return res.status(403).json({ message: " Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(403).json({ message: " Incorrect credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);

    res.json({ token });
});

// Current user info
app.get("/api/v1/me", userMiddleware, async (req, res) => {
  try {
    // If TS complains about req.userId, use (req as any).userId or add a type
    const user = await UserModel.findById((req as any).userId)
      .select("username")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const parseResult = contentSchema.safeParse(req.body);
    if (!parseResult.success) {
       return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { title, type, link } = parseResult.data;

    await ContentModel.create({
        title,
        type,
        link,
        userId: req.userId,
        tags: []
    });

    res.json({ message: " Content added" });
});


app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");

    res.json({ content });
});


app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    if (!contentId) {
        return res.status(400).json({ message: "Content ID required" });
    }

    await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });

    res.json({ message: " Content deleted" });
});


app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            return res.json({ hash: existingLink.hash });
        }

        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });

        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: " Removed sharable link" });
    }
});


app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });
    if (!link) {
        return res.status(404).json({ message: " Invalid share link" });
    }

    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findById(link.userId);

    if (!user) {
        return res.status(404).json({ message: " User not found" });
    }

    res.json({ username: user.username, content });
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
