const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Application is running!');
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '****************', // Configure email address
    pass: '*********',  // Configure email password or app-specific password
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: '****************', // Configure sender address
    to,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error);
    }
    res.status(200).send('Email sent successfully: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Email API server is running at http://localhost:${port}`);
});
