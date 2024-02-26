const express = require("express");
const app = express();
const {dbConnect} = require("./config/dbConnect")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require("passport")  
const User = require("./models/User")  
const authRoutes = require("./routes/auth")
const songRoutes = require("./routes/song")
const playlistRoutes = require("./routes/playlist");
const cors = require("cors")
const likedRoutes = require("./routes/likedSong")

const Port = 8000;
dbConnect();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET 
};

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({ id: jwt_payload.sub });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.use("/auth",authRoutes)
app.use("/song",songRoutes)
app.use("/playlist",playlistRoutes)
app.use("/like",likedRoutes)



app.get("/", (req,res)=>{
    res.json("This is a home Page")
})

app.listen(Port,()=>{
    console.log(`app is listening on port no ${Port}`);
})