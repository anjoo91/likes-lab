const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
  username: String,
  // One User has many likes, referencing because we have user model, so we can get the users information when we need it
  // 
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
	// One Post has many likes, we are using embedding, because the likes will always be tied to the post, so no reason
	// to make a likes model
    likes: [likesSchema]
  })
 

module.exports = mongoose.model('Post', postSchema);