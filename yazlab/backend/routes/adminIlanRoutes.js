const express = require("express")
const router = express.Router()
const {
  getAllAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
} = require("../controllers/announcementController")

router.get("/", getAllAnnouncements)
router.post("/", createAnnouncement)
router.delete("/:id", deleteAnnouncement)
router.get("/:id", getAnnouncementById)
router.put("/:id", updateAnnouncement)

module.exports = router
