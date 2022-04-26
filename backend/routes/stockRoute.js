
const chatbot = require("../chatbot/chatbot");
const mongoose = require('mongoose');
const multer = require('multer');
const server_path = require('../config/keys').server_path;

const Order = mongoose.model('order');
const Drink = mongoose.model('drink');
const Starter = mongoose.model('starter');
const Meal = mongoose.model('meal');
const Dessert = mongoose.model('dessert');
const User = mongoose.model('user');
const Special = mongoose.model('special');

module.exports = app => {

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
      fileSize: 10000000 // max file size 1MB = 1000000 bytes
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

  app.post("/api/stock/getItems", async (req, res) => {
    drinks = await Drink.find({});
    starters = await Starter.find({});
    meals = await Meal.find({});
    desserts = await Dessert.find({});
    specials = await Special.find({});

    res.send({
      drink: drinks,
      starter: starters,
      meal: meals,
      dessert: desserts,
      special: specials,
    })
  });

 
  app.post('/api/stock/add_item', upload.single('image'), (req, res) => {
    const type = req.body.type;
    const { path } = req.file;
    let image = server_path + path;

    switch(type) {
      case 'drink': {
        data = {
          type: req.body.type,
          name: req.body.name,
          price: req.body.price,
          image: image,
        }
        save_data = new Drink(data);
        save_data.save().then(rlt => {
          if(rlt) {
            res.json({
              success: true,
              item: {
                id: rlt._id,
                name: rlt.name,
                price: rlt.price,
                image: rlt.image,
                type: 'drink'
              }
            })
          } else {
            res.json({
              success: false,
              msg: 'create failed',
            })
          }
        })
        break;
      }
      case 'starter': {
        data = {
          type: req.body.type,
          name: req.body.name,
          price: req.body.price,
          image: image,
        }
        save_data = new Starter(data);
        save_data.save().then(rlt => {
          if(rlt) {
            res.json({
              success: true,
              item: {
                id: rlt._id,
                name: rlt.name,
                price: rlt.price,
                image: rlt.image,
                type: 'starter'
              }
            })
          } else {
            res.json({
              success: false,
              msg: 'create failed',
            })
          }
        })
        break;
      }
      case 'meal': {
        data = {
          type: req.body.type,
          name: req.body.name,
          price: req.body.price,
          image: image,
        }
        save_data = new Meal(data);
        save_data.save().then(rlt => {
          if(rlt) {
            res.json({
              success: true,
              item: {
                id: rlt._id,
                name: rlt.name,
                price: rlt.price,
                image: rlt.image,
                type: 'meal'
              }
            })
          } else {
            res.json({
              success: false,
              msg: 'create failed',
            })
          }
        })
        break;
      }
      case 'dessert': {
        data = {
          type: req.body.type,
          name: req.body.name,
          price: req.body.price,
          image: image,
        }
        save_data = new Dessert(data);
        save_data.save().then(rlt => {
          if(rlt) {
            res.json({
              success: true,
              item: {
                id: rlt._id,
                name: rlt.name,
                price: rlt.price,
                image: rlt.image,
                type: 'dessert'
              }
            })
          } else {
            res.json({
              success: false,
              msg: 'create failed',
            })
          }
        })
        break;
      }
      case 'special': {
        data = {
          type: req.body.type,
          name: req.body.name,
          price: req.body.price,
          image: image,
        }
        save_data = new Special(data);
        save_data.save().then(rlt => {
          if(rlt) {
            res.json({
              success: true,
              item: {
                id: rlt._id,
                name: rlt.name,
                price: rlt.price,
                image: rlt.image,
                type: 'special'
              }
            })
          } else {
            res.json({
              success: false,
              msg: 'create failed',
            })
          }
        })
        break;
      }
    }
  });

  app.post('/api/stock/update_item', upload.single('image'), async (req, res) => {
    const type = req.body.type;
    const id = req.body.id;
    const { path } = req.file;
    let image = server_path + path;

    switch(type) {
      case 'drink': {
        await Drink.findOneAndUpdate(
          {_id: id},
          {name: req.body.name, price: req.body.price, image: image},
          {upsert: true},
          ((err, rlt) => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
                item: {
                  id: rlt._id,
                  name: req.body.name,
                  price: req.body.price,
                  image: image,
                  type: 'drink',
                }
              });
            }
          })
        );
        break;
      }
      case 'starter': {
        Starter.findOneAndUpdate(
          {_id: id},
          {name: req.body.name, price: req.body.price, image: image},
          {upsert: true},
          ((err, rlt) => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
                item: {
                  id: rlt._id,
                  name: req.body.name,
                  price: req.body.price,
                  image: image,
                  type: 'starter',
                }
              });
            }
          })
        );
        break;
      }
      case 'meal': {
        Meal.findOneAndUpdate(
          {_id: id},
          {name: req.body.name, price: req.body.price, image: image,},
          {upsert: true},
          ((err, rlt) => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
                item: {
                  id: rlt._id,
                  name: req.body.name,
                  price: req.body.price,
                  image: image,
                  type: 'meal',
                }
              });
            }
          })
        );
        break;
      }
      case 'dessert': {
        Dessert.findOneAndUpdate(
          {_id: id},
          {name: req.body.name, price: req.body.price, image: image,},
          {upsert: true},
          ((err, rlt) => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
                item: {
                  id: rlt._id,
                  name: req.body.name,
                  price: req.body.price,
                  image: image,
                  type: 'dessert'
                }
              });
            }
          })
        );
        break;
      }
      case 'special': {
        Special.findOneAndUpdate(
          {_id: id},
          {name: req.body.name, price: req.body.price, image: image, },
          {upsert: true},
          ((err, rlt) => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
                item: {
                  id: rlt._id,
                  name: req.body.name,
                  price: req.body.price,
                  image: image,
                  type: 'special',
                }
              });
            }
          })
        );
        break;
      }
    }
  });
  
  app.post('/api/stock/delete_item', async (req, res) => {
    switch(req.body.type) {
      case 'drink': {
        Drink.deleteOne({_id: req.body.id}, (err) => {
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
        break;
      }
      case 'starter': {
        Starter.deleteOne({_id: req.body.id}, (err) => {
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
        break;
      }
      case 'meal': {
        Meal.deleteOne({_id: req.body.id}, (err) => {
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
        break;
      }
      case 'dessert': {
        Dessert.deleteOne({_id: req.body.id}, (err) => {
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
        break;
      }
      case 'special': {
        Special.deleteOne({_id: req.body.id}, (err) => {
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
        break;
      }
    }
    
  });
};
