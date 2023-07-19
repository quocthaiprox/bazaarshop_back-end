const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const db = require("./src/configs/db");
const router = require("./src/routes");
const methodOverride = require("method-override");
const cors = require("cors");
const User = require("./src/app/models/User");

// const passport = require("passport");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const clientID = process.env.GOOGLE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
// const callbackURL = process.env.GOOGLE_CALLBACK_URL;

// const client = new GoogleStrategy(
//   {
//     clientID,
//     clientSecret,
//     callbackURL,
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const email = profile.emails[0].value;

//       // Check if the user with the email exists in the database
//       let user = await User.findOne({ email });

//       if (!user) {
//         // If the user doesn't exist, create a new user with the profile information
//         console.log(profile);

//         // user = new User({
//         //   name: profile.displayName,
//         //   email: email,
//         //   picture: profile.photos[0].value
//         // });
//         // await user.save();
//       }

//       // Return the user object
//       done(null, user);
//     } catch (error) {
//       console.log(error);
//       done(error);
//     }
//   }
// );

// // Set up Passport.js authentication
// passport.use(client);

// // Serialize and deserialize the user object
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     console.log(error);
//     done(error);
//   }
// });

db.connect();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//static files
app.use(express.static("public"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// dùng các midleware để parse body cho resquest gửi lên sever
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

router(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening at: http://localhost:" + port);
});
