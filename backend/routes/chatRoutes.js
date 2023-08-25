const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatsControllers")

const router = express.Router();

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats)

// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup)
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/addmember").put(protect, addToGroup);

module.exports = router;