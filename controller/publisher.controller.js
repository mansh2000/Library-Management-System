const User = require('../model/publisher.model');
const fs = require('fs');
const csvModel= require('../model/publisherCsv.model');
const environment = require('../config/environment')
const csv=require('csv-parser');
const path = require('path');

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
const addPublisher = async (req, res) => {
    const { publisherName, bookName, ISBN, writerName, companyName, bio, price, category } = req.body;
    if (!publisherName || !bookName || !ISBN || !companyName || !price || !category) {
        return res.status(400).json({ message: "please fill above details" });
    }
    releasedAt = Date.now();
    const createuser = await User.create({
        publisherName,
        bookName,
        writerName,
        companyName,
        releasedAt,
        ISBN,
        bio,
        price,
        category
    });
    res.json(createuser);
};


const addCsv = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, './publisher.csv'); 
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        console.log("row data is", row);
        const { Country, Name, Books, OfficialLanguage } = row; 
        const createuser = await csvModel.create({ 
          Country,
          Name,
          Books,
          OfficialLanguage,
        });
        console.log("User created:", createuser);
      })
      .on('end', () => {
        console.log('CSV file processed successfully');
        res.json({ message: 'CSV file processed successfully' });
      })
      .on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { addPublisher ,addCsv};