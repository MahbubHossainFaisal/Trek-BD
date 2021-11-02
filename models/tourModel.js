const mongoose = require('mongoose')
const slugify = require('slugify')
// tour schema
const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'A tour must have a name'],
        unique: true,
        trim: true
    },
    slug: String,
    duration:{
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'A tour must have a difficulty']
    },

    ratingsAverage:{
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type:Number,
        required: [true,'A tour must have price']
    },
    priceDiscount: Number,
    summary:{
        type: String,
        required: [true,'A tour must have a summary'],
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    imageCover:{
        type: String,
        required: [true,'A tour must have a cover image']
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]

})

//Document middleware . runs before save() and create
tourSchema.pre('save',function(next){
    this.slug = slugify(this.name, { lower: true }) //just convert the name property values to lower case
    next();
})
tourSchema.pre('save',function(next){
    console.log('This document will be saved!');
    next();
})

tourSchema.post('save', function(doc,next){
    console.log(doc)
    next();
})
//model of tourSchema
const Tour = mongoose.model('Tour', tourSchema)



module.exports = Tour;