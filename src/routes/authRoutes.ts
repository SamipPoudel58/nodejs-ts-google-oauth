import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

export default router;
