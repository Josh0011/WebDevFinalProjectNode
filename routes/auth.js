const express = require("express");
const admin = require("../firebaseConfig");

const router = express.Router();

// Verify Firebase Token
router.post("/login", async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid; // User's unique ID
        res.status(200).json({ uid });
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ error: "Unauthorized" });
    }
});

module.exports = router;