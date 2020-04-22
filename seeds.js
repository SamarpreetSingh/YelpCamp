const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var Data = [
  {name: 'Manali', image: 'https://images.unsplash.com/photo-1573146043078-9fe64b4caae9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
  {name: 'Kulu', image: 'https://images.unsplash.com/photo-1562413255-9d8f3188f197?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
  {name: 'Shimla', image: 'https://images.unsplash.com/photo-1573146056666-c62e0b45c94c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
]

function seedDB(){
  Campground.remove({}, function(err, campground){
    if(err)
    console.log(err);
    else{
      console.log("Campgrounds removed");
      Data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err)
          console.log(err);
          else {
            console.log("Added campground");
            Comment.create({
              text: "Dont go without warm clothes",
              author: "homer"
            }, function(err, comment){
              if(err)
              console.log(err);
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("comment created");
              }
            })
          }
        })
      })
    }
  })

}


module.exports = seedDB;
