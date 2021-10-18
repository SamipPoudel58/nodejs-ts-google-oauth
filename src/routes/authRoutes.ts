import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

export default router;
