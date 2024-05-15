import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		console.log(username, email, password);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashPassword,
		});
		const savedUser = await newUser.save();
		res.status(201).json({
			_id: savedUser._id,
			role: savedUser.role,
			message: "success",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ error: "Password incorrect" });
		// auto define admin
		await User.findOneAndUpdate({ email: "ftech.admin@gmail.com" }, { role: "admin"});
		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);
		delete user.password; 
		res.status(200).json({
			token: token,
			id: user._id,
			message: "successfully login",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const lock = async (req,res) => {
	try {
		const userId = req.params.userId ;
		const user = await User.findByIdAndUpdate(userId, { isLocked: true });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		res.status(200).json({ message: "Locked successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export const unlock = async (req,res) => {
	try {
		const userId = req.params.userId ;
		const user = await User.findByIdAndUpdate(userId, { isLocked: false });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		res.status(200).json({ message: "Unlocked successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
 export const getUser = async (req, res) => {
   const id = req.params.id;
   try {
     const user = await User.findById(id);
     if (user) {
       const { password, ...otherDetails } = user._doc;
       res.status(200).json(otherDetails);
     } else {
       res.status(404).json("No such user");
     }
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 export const getProfile = async (req, res) => {
	try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: error.message });
  }
};
