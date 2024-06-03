const router = require("express").Router();

const contactController = require("../controllers/contact");

router.post("/identify", contactController.identify);

module.exports = router;
