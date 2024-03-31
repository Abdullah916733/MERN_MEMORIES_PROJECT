import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;
    // if (!mongoose.Types.ObjectId.isValid(_id))
    //   return res.status(404).send("No post with that Id");
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostMessage.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });
    const post = await PostMessage.findById({ _id: id });
    const index = post.likes.findIndex(
      (idFind) => idFind === String(req.userId)
    );
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((idFind) => idFind !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
