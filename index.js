import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import uploads from "./controller/uploads";
import { connectDB } from "./db";
import { schema } from "./graphql/typeDefs";
import User from "./models/User";

const CLIENT_URI =
  process.env.NODE_ENV === "production"
    ? "https://kdjlflflflflflflf.com"
    : "http://localhost:3000";

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

// app.use(cors());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.use("/api/uploads", uploads);

app.use("/uploads", express.static("uploads"));

app.get("/verify/:token", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { token: req.params.token },
      { token: "", isActive: true },
      { new: true }
    );
    if (user) res.redirect(`${CLIENT_URI}`);
    else res.status(404).json("No record found");
  } catch (error) {
    res.status(404).json(error);
  }
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const { authorization } = req.headers;

    return {
      res,
      req,
      token: authorization,
    };
  },
  introspection: true,
  playground: true,
});
apolloServer.applyMiddleware({
  app,
  path: "/api/graphql",

  bodyParserConfig: {
    limit: "100mb",
  },
});

const start = async () => {
  await connectDB();

  app.listen(port, (err) => {
    if (err) process.exit(1);
    console.log(`server started on ${port}`);
  });
};
start();
