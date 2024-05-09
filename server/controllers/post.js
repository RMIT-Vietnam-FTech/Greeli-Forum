import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    const sortQuery = req.query.sort;
    let sortOptions = {};

    switch (sortQuery) {
        case 'newest':
            sortOptions = { createdAt: -1 };
            break;
        case 'oldest':
            sortOptions = { createdAt: 1 };
            break;
        case 'mostUpvoted':
            sortOptions = { upvote: -1 }; 
            break;
        default:
            sortOptions = { createdAt: -1 };  // Sort moi nhat theo default
            break;
    }

    try {
        const posts = await Post.find({ isApproved: true }).sort(sortOptions);  // Chi fetch post nao dc approve boi admin
        res.json(posts);
        console.log("post number: ", posts.length);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const { title, content, postImage, createdBy, parentThread, isApproved, upvote } = req.body;

    const newPost = new Post({
        title, 
        content, 
        postImage, 
        createdBy, 
        parentThread, 
        isApproved: isApproved || false,
        upvote: upvote || []            
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};