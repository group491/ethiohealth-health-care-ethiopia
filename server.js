const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// 🏥 Health centers email directory
const healthCenters = {
  tikur: "tikurhospital@gmail.com",
  stpaul: "stpaulhospital@gmail.com",
  alert: "alerthospital@gmail.com"
};

// 📧 Gmail configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD"
  }
});

app.post("/send-email", async (req, res) => {
  const { type, center, location, description } = req.body;

  const toEmail = healthCenters[center];
  if (!toEmail) {
    return res.send("❌ Invalid health center");
  }

  const mailOptions = {
    from: `"Emergency Alert System" <YOUR_GMAIL@gmail.com>`,
    to: toEmail,
    subject: "🚨 EMERGENCY ALERT",
    text:
`EMERGENCY TYPE: ${type}
LOCATION: ${location}

DETAILS:
${description}

Sent via Emergency Reporting System`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("✅ Emergency email sent successfully");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to send emergency email");
  }
});

app.listen(3000, () => {
  console.log("🚑 Emergency Email Server running on port 3000");
});
