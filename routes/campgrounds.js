const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index');
const Campground = require('../models/campground');

router.get('/', function(req,res){
  Campground.find({}, function(err, campgrounds){
    if(err)
    console.log("error");
    else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  })
})
router.get('/new', middleware.isLoggedIn, function(req,res){
  res.render("campgrounds/new");
})
router.post('/', middleware.isLoggedIn, function(req,res){
  Campground.create(req.body.campground, function(err, campground ){
    if(err)
    console.log("Error");
    else {
      campground.author.id = req.user._id;
      campground.author.username = req.user.username;
      campground.save();
      console.log("New Campground created");
      console.log(campground);
    }
  })
  res.redirect('/campgrounds');
})
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
    if(err)
    console.log("ERROR");
    else {
      res.render("campgrounds/show",{campground: foundcamp});
    }
  })
})
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
   res.render('campgrounds/edit', {campground: campground});
})
});
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
      if(err){
        console.log(err);
        res.redirect('/campgrounds');
      }
      else{
        res.redirect('/campgrounds/' + req.params.id);
      }
    })
})
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndDelete(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds');
    } else{
      res.redirect('/campgrounds');
    }
  })
})

module.exports = router;
