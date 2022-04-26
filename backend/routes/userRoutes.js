
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const multer = require('multer');
const server_path = require('../config/keys').server_path;


const chatbot = require("../chatbot/chatbot");
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = app => {

  app.post("/api/users/register", async (req, res) => {

    User.find({ email: req.body.email }).then(user => {
      if (user.length) {
        res.json({
          success: false,
          msg: 'already exist',
        })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = {
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          permission: 'user'
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            let user_model = new User(newUser);
            user_model.save().then(nuser => {
              const nuserr = nuser;
              res.json({
                success: true,
              })
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


  app.post("/api/users/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    User.find({ email: email }).then(user => {
      if (!user.length) {
        res.json({
          success: false,
          msg: 'email not found',
        })
      }
      let userr = user[0];

      bcrypt.compare(password, userr.password).then(isMatch => {
        if (isMatch) {
          const payload = { 
            id: userr._id, 
            email: userr.email, 
            name: userr.name, 
            avatar: userr.avatar, 
            permission: userr.permission, 
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          res.json({
            success: false,
            msg: 'password incorrect',
          })
        }
      });
    });
  });


  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });
  
  app.post('/api/users/update_profile', upload.single('avatar'), (req, res) => {
    
    User.find({ email: req.body.email }).then(user => {
      if (!user.length) {
        res.json({
          success: false,
          msg: 'there is no such user',
        })
      } else {
        const { name } = req.body;
        const { path } = req.file;
        let avatar_path = server_path + path;
  
        let userr = user[0];
        const payload = { 
          id: userr._id, 
          email: userr.email, 
          name: name, 
          avatar: avatar_path, 
          permission: userr.permission, 
        };
        User.findOneAndUpdate(
          {_id: req.body.id}, 
          {name: name, avatar: avatar_path},
          {upsert: true},
          (err, user) => {
            if(err) {
              res.json({
                success: false,
                msg: err,
              })
            } else {
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    data: {
                      name: name,
                      avatar: avatar_path,
                    }
                  });
                }
              );
            }
          }
        );
      }
    });
  });


  app.post('/api/users/change_password', (req, res) => {

    User.find({ _id: req.body.id }).then(user => {
      // Check for user
      if (!user.length) {
        res.json({
          success: false,
          msg: 'user not found',
        });
      }
      let userr = user[0];
      bcrypt.compare(req.body.current_password, userr.password).then(isMatch => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.new_password, salt, (err, hash) => {
              if (err) throw err;
              User.findOneAndUpdate(
                {_id: req.body.id},
                {password: hash},
                (err, doc) => {
                  if(err) {
                    res.json({
                      success: false,
                      msg: 'failed'
                    })
                  } else {
                    res.json({
                      success: true,
                    });
                  }
                }
              );
            });
          });
        } else {
          res.json({
            success: false,
          });
        }
      });
    });
  });

  app.post('/api/users/get_users', (req, res)=>{

    User.find({}).then(user => {
      let res1 = [];
      for(let i=0; i<user.length; i++) {
        let one = {
          no: i + 1,
          id: user[i]._id,
          name: user[i].name,
          permission: user[i].permission,
          email: user[i].email,
          avatar: user[i].avatar,
        }
        res1.push(one);
      }
      res.json({
        success: true,
        data: res1
      });
    });
  });
  
  app.post('/api/users/update_user', (req, res) => {
    User.find({_id: req.body.id}).then(user => {
      if (!user.length) {
        res.json({
          success: false,
          msg: 'There is no such user.'
        })
      } else {
        let name = req.body.name;
        let permission = req.body.permission;
        
        User.findOneAndUpdate(
          {_id: req.body.id},
          {name: name, permission: permission}, 
          {upsert: true},
          (err, result) => {
            if(err) {
              res.json({
                success: false,
                msg: err,
              })
            } else {
              res.json({
                success: true,
              });
            }
        });
      }
    });
  });
  
  app.post('/api/users/delete_user', async (req, res) => {
    User.deleteOne({_id: req.body.id}, (err) => {
      if(err) {
        res.json({
          success: false,
        });
      } else {
        res.json({
          success: true,
        })
      }
    });
    
  });
  
  app.post('/api/users/add_user', (req, res) => {
    User.find({email: req.body.email}).then(user => {
      if (user.length) {
        res.json({
          success: false,
          msg: 'already existing user',
        })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: '1234567890',
          permission: req.body.permission,
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            suser = new User(newUser);
            suser.save().then(rlt => {
              if(rlt) {
                res.json({
                  success: true,
                  avatar: avatar,
                  id: rlt._id,
                });
              } else {
                res.json({
                  success: false,
                });
              }
            })
          });
        });
      }
    });
  });
};
