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
    secretTour:{
        type: Boolean,
        default: false
    },
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
// tourSchema.pre('save',function(next){
//     console.log('This document will be saved!');
//     next();
// })

// tourSchema.post('save', function(doc,next){
//     console.log(doc)
//     next();
// })

//Query Middleware
//we used a regular expression find so this middleware will work for every find related query like find,findone,findanddelete,findandupdate etc.
tourSchema.pre(/^find/, function(next){
    this.find({ secretTour: {$ne : true}})
    this.start = Date.now()
    next();
})

tourSchema.post(/^find/, function(docs,next){
    console.log(`Query took ${Date.now() - this.start} milliseconds to run`)
   // console.log(docs)
    next()
})

//model of tourSchema
const Tour = mongoose.model('Tour', tourSchema)



module.exports = Tour;