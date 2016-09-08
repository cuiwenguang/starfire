'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {type: String, default: '', trim: true},
    body: {type: String, default: '', trim: true},
    user: {type: Schema.ObjectId, ref: 'User'},
    comments: [{
        body: {type: String, default: ''},
        user: {type: Schema.ObjectId, ref: 'User'},
        vote: {type:Number, default: 0},
        createAt:{type: Date, default: Date.now}
    }],
    tags:{type: []},
    image:[],
    vote: {type:Number, default: 0},
    createAt: {type:Date, default: Date.now}
});

ArticleSchema.path('title').required(true, '标题不能为空');
ArticleSchema.path('body').required(true, '内容不能为空');

ArticleSchema.methods = {
    uploadAndSave: function(images){
        const err = this.validateSync();
        if(err) throw new Error(err.toString());
        // 此处加上传图片代码
        return this.save();
    },
    addComment: function(user, comment){
        this.comments.push({
            body: comment.body,
            user: user._id
        });

        return this.save();
    },
    removeComment: function(commentId){
        const index = this.comments
            .map(comment=>comment.id)
            .indexOf(commentId);
        if(~index) this.comments.splice(index, 1);
        else throw new Error('comment not found');
        
        return this.save();
    }
}

ArticleSchema.statics ={
    load: function(id){
        return this.findOne({_id:id})
            .populate('user', 'name, email, username, avatar')
            .populate('comments.user')
            .exec();
    },
    list: function(options){
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 20;
        return this.find(criteria)
            .populate('user', 'name, username, avatar')
            .sort({createAt: -1})
            .limit(limit)
            .skip(limit*page)
            .exec(); 
    }
}

mongoose.model('Article', ArticleSchema);