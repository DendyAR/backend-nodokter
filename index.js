import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors"
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();
const app = express();

// (async()=> {
//     await db.sync()
// })()

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db,
}) 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({ credentials: true, origin:'http://localhost:3000' }))
app.use(express.json());

app.use(UserRoute);
app.use(ProductRoute);
app.use(ReviewRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log(`Server running at port ${process.env.APP_PORT}`))