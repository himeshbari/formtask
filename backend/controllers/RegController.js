
  

import Reg from '../models/RegModel.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const randomDate = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + randomDate + '.docx');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only .docx files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('resume');

export const getReg = async (req, res) => {
  try {
    const data = await Reg.find();
    res.status(200).json({
      data: data,
      message: 'Successfully fetched!',
      path: 'http://localhost:8080/uploads/',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addReg = (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const { name, gender, dob, hobbies, state, address } = req.body;

const regData = new Reg({
  name: name,
  gender: gender,
  resume: req.file ? req.file.filename : '',
  dob: Date.parse(dob), // Convert dob to a valid number
  hobbies: hobbies.split(','), // Split hobbies into an array
  state: state,
  address: address,
});

      const savedData = await regData.save();

      if (savedData) {
        res.status(201).json({
          data: savedData,
          message: 'Successfully data inserted!',
          path: 'http://localhost:8080/uploads/',
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


