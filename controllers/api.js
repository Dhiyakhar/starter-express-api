const Post = require('../models/posts');
const fs = require('fs');

module.exports = class API {
    // fetch all posts
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async fetchPostByID(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async fetchPostByDate(req, res) {
        const created = req.params.created;
        var date = new Date(created);
        console.log()
        try {
            const post = await Post.find({
                created: {
                    $gte: date.toISOString(), 
                    $lt: new Date(date.setDate(date.getDate() + 1)).toISOString()
                }
            });
            console.log(post)
            res.status(200).json(post);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    static async createPost(req, res) {
        const post = req.body;
        // const imagename = req.file.filename;
        // post.image = imagename;
        try {
            await Post.create(post)
            res.status(201).json({ message: "Post created successfully!" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async updatePost(req, res) {
        const id = req.params.id;
        // let new_image = "";
        // if (req.file) {
        //     new_image = req.file.filename;
        //     try {
        //         fs.unlinkSync("./uploads/" + req.body.old_image);
        //     } catch (error) {
        //         console.log(error.message)
        //     }
        // } else {
        //     new_image = req.body.old_image;
        // }

        const newPost = req.body;
        // newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Post updated successfully!" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            // if (result.image != '') {
            //     try {
            //         fs.unlinkSync('./uploads/'+result.image);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
            res.status(200).json({ message: "Post delete successfully" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}