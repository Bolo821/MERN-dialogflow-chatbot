

const chatbot = require("../chatbot/chatbot");
const mongoose = require('mongoose');

const Order = mongoose.model('order');
const Drink = mongoose.model('drink');
const Starter = mongoose.model('starter');
const Meal = mongoose.model('meal');
const Dessert = mongoose.model('dessert');
const Special = mongoose.model('special');
const User = mongoose.model('user');
const Table = mongoose.model('table');

module.exports = app => {

  app.post("/api/orders/add", async (req, res) => {

    const order = {
      user: req.body.user,
      drink: req.body.drink,
      starter: req.body.starter,
      meal: req.body.meal,
      dessert: req.body.dessert,
      special: req.body.special,
      status: 'pending',
      qrcode: '',
      orderDate: req.body.date,
      deleted: false,
      qrcode: req.body.table,
    }

    norder = new Order(order);
    norder.save().then(async rlt => {
      let responses = await chatbot.textQuery(
        'yes',
        req.body.user,
        []
      );
    
      let queryResult = responses[0].queryResult;
      res.send({
        queryResult: queryResult
      });
    }).catch(e => {
      res.json({
        success: false,
        msg: 'error in saving to database',
      })
    })
  });

  app.post("/api/orders/cancel_in_chat", async (req, res) => {

    let responses = await chatbot.textQuery(
      'no',
      req.body.userID,
      []
    );

    let queryResult = responses[0].queryResult;
      res.send({
        queryResult: queryResult
      });
  });

  app.post('/api/orders/get_active_tables', async (req, res) => {
    const tables = await Table.find({used: false});
    res.json({
      table: tables,
    })
  })

  app.post('/api/orders/get_orders', async (req, res) => {
    if(req.body.id < 0) {
      const order = await Order.find({deleted: false});
      let orders = await getOrders(order);
      let tables = await Table.find({used: false});
      res.json({
        success: true,
        items: orders,
        table: tables,
      });
    } else {
      const order = await Order.find({user: req.body.id});
      let orders = await getOrders(order);
      res.json({
        success: true,
        items: orders,
        table: []
      });
    }
  });

  const getOrders = async (order) => {
    return Promise.all(
      order.map(async (ele, i) => {
        let drink = await Promise.all(ele.drink.map(async (drink_ele) => {
          let dish = await Drink.findOne({ _id: drink_ele });
          if(!dish) return [];
          return dish;
        }));
        let starter = await Promise.all(ele.starter.map(async (starter_ele) => {
          let dish = await Starter.findOne({ _id: starter_ele });
          if(!dish) return [];
          return dish;
        }));
        let meal = await Promise.all(ele.meal.map(async (meal_ele) => {
          let dish = await Meal.findOne({ _id: meal_ele });
          if(!dish) return [];
          return dish;
        }));
        let dessert = await Promise.all(ele.dessert.map(async (dessert_ele) => {
          let dish = await Dessert.findOne({ _id: dessert_ele });
          if(!dish) return [];
          return dish;
        }));
        let special = await Promise.all(ele.special.map(async (special_ele) => {
          let dish = await Special.findOne({ _id: special_ele });
          if(!dish) return [];
          return dish;
        }));
        let user = await User.findOne({_id: ele.user});
        let one = {
          no: i + 1,
          id: ele._id,
          user: user,
          drink: drink,
          starter: starter,
          meal: meal,
          dessert: dessert,
          special: special,
          status: ele.status,
          qrcode: ele.qrcode,
          date: ele.orderDate,
          deleted: ele.deleted,
        };
        return one;
      })
    )
  }
  
  app.post('/api/orders/update_order', async (req, res) => {
    Order.find({_id: req.body.id}).then(async order => {
      if (!order.length) {
        res.json({
          success: false,
          msg: 'not found such order',
        })
      } else {
        let status = req.body.status;

        // await Table.findOneAndUpdate(
        //   {qrcode: req.body.qrcode},
        //   {used: !req.body.deleted},
        //   {upsert: true},
        // );
        // if(req.body.prevQrcode != undefined && req.body.prevQrcode != '' && req.body.prevQrcode != req.body.qrcode) {
        //   await Table.findOneAndUpdate(
        //     {qrcode: req.body.prevQrcode},
        //     {used: false},
        //     {upsert: true},
        //   );
        // }
        
        Order.findOneAndUpdate(
          {_id: req.body.id},
          {status: status, deleted: req.body.deleted,},
          {upsert: true},
          (async err => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
              });
            }
          })
        )
      }
    });
  });
  
  app.post('/api/orders/delete_order', async (req, res) => {
    Order.deleteOne({_id: req.body.id}, (err) => {
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

  /************** ORDER HISTORY  **********************/

  app.post('/api/orders/get_orders_history', async (req, res) => {
    if(req.body.id < 0) {
      const order = await Order.find({deleted: true});
      let orders = await getOrders(order);
      res.json({
        success: true,
        items: orders,
      });
    } else {
      const order = await Order.find({user: req.body.id});
      let orders = await getOrders(order);
      res.json({
        success: true,
        items: orders,
      });
    }
  });
};
