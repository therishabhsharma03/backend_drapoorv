const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const { config } = require('dotenv');
config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()) ; 
const userEmail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASS; // Add this line

const transporter = nodemailer.createTransport({
    // Provide your email server details here (e.g., SMTP)
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'apicheck11@gmail.com',
      pass: 'xjex rlsk vjvj ybne'
    }
  });


  app.post('/sendmail', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
  
    // Compose the email message
    const mailOptions = {
      from: 'apicheck11@gmail.com',
      to: 'manyrishabh@gmail.com',
      subject: 'Patient Contacted through website',
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
      console.log("Email sent")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
  });

  // Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});