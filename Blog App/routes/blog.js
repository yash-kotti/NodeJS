const { Router } = require("express");
const router = Router();

router.get("/add-new", (req, res) => {
  res.render("add-blog", {
    user: req.user,
  });
});
router.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
