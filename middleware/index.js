const Campground = require('../models/campground');
const Comment = require('../models/comment');
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated())
  {  Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
        req.flash('error', 'error')
        res.redirect('/campgrounds');
      }  else{
        if(campground.author.id.equals(req.user._id))
        {
          next();
        }
        else{
          req.flash('error', "You don't have permission to do that")
          res.redirect('back');
        }
      }
    })
  }
  else{
    req.flash('error', "You need to be logged in")
    res.redirect('back');
      }
}
middlewareObj.checkCommentOwnership =   function(req, res, next){
    if(req.isAuthenticated())
    {
      Comment.findById(req.params.comment_id, function(err, comment){
       if(comment.author.id.equals(req.user._id))
       {next();}
       else {
         req.flash('error', "You don't have permission to do that")
         res.redirect('back');
       }
      })
    }
    else {
      req.flash('error', "You need to be logged in")
      res.redirect('back');
    }
  }
  middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    else{
    req.flash("error", "Please Login first");
    res.redirect('/login');
  }}


module.exports = middlewareObj;
