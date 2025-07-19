const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//const DATA_PATH = path.join(__dirname, '..', '..', 'ImoNestApp', 'data', 'parentChildData.json');
const DATA_PATH = path.resolve(__dirname, '../../ImoNestApp/data/parentChildData.json');

exports.registerUser = async (req, res) => {
  const { parentName, childName, age, email, password } = req.body;
  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    const newUser = await User.create({
      parentName: parentName,
      childName,
      age,
      email,
      password: hashedPassword,
    });

    // Sync to local JSON file
    const timestamp = Date.now();
    const parentId = `parent_${timestamp}`;
    const childId = `child_${timestamp}`;
    
    let jsonData = { parents: {}, children: {} };
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH);
      jsonData = JSON.parse(raw);
      console.log("Find it")
    }
    else{
      console.log("No file");
    }

    jsonData.parents[parentId] = {
      name: parentName,
      email,
      children: [childId],
    };

    jsonData.children[childId] = {
      name: childName,
      age: age,
      moodHistory: [],
      audioLogs: [],
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(jsonData, null, 2));

    res.status(201).json({
      message: 'User created',
      userId: newUser._id,
      parentId,
      childId,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      userId: user._id,
      cName: user.childName,
      pName: user.parentName,
      age: user.age,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
