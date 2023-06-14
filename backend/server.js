
  import express from "express"
  import multer from "multer"
  import mysql from "mysql"
  import cors from "cors";
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';

 const app = express();
 const port = 5000; // Change this to the desired port number

 // MySQL connection setup
 const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'image_upload_app',
 });

 connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname); // Unique filename for each uploaded image
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  
  const { filename  } = req.file;
  const query = 'INSERT INTO images (filename) VALUES (?)';

  connection.query(query, [filename ], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Image uploaded successfully!', id: results.insertId });
  });
});

// API endpoint to retrieve image data
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT filename FROM images WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const imageData = results[0].filename;
      res.send({ imageData });
    } else {
      res.status(404).send({ message: 'Image not found' });
    }
  });
});
// Get the directory path of the current module file

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/api/image/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  res.sendFile(filePath, { root: __dirname });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});