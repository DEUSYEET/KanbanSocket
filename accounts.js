let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://root:GRHSNOuDazb37S4j@guia0.evfpg.mongodb.net/guides?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .catch((error) => console.log("error"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
var mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error:"));

mdb.once("open", function (callback) {
  console.log(mdb.name);
});

var User = new mongoose.Schema({
  username: String,
  password: String,
  color:String
});

mongoose.model("KanbanUser", User);

let KanbanUser = mongoose.model("KanbanUser");

exports.createAccount = (req, res) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    color: req.body.color,
  };
  KanbanUser.findOneAndUpdate(
    { username: newUser.username },
    newUser,
    { new: true, upsert: true },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
};

exports.getAccount = (req, res) => {
  KanbanUser.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

exports.login = (req, res) => {
  let loginUser = {
    username: req.body.username,
    password: req.body.password,
  };
  KanbanUser.findOne({ username: loginUser.username }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.password === loginUser.password) {
        // res.json({
        //   login: true,
        //   username: result.username,
        //   color: result.color,
        // });
        res.redirect("/?username="+result.username+"&color="+result.color.replace("#","")+"&login=true");
      } else{
        res.json({
            login: false,
          });
      }
    }
  });
};
