const chatbot = require("../chatbot/chatbot");
const mongoose = require('mongoose');
const Meal = mongoose.model('meal');
const Drink = mongoose.model('drink');
const Starter = mongoose.model('starter');
const Dessert = mongoose.model('dessert');
const Special = mongoose.model('special');
const Order = mongoose.model('order');

module.exports = app => {

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );

    let queryResult = responses[0].queryResult;
    let paramList = [];
    let type = '';
    let flag = false; // It is used to display order list in frontend. if true, display.

    switch(queryResult.action) {
      case 'order-complete': {
        flag = true;
        break;
      }
    }

    if(queryResult.outputContexts.length >= 2) {
      switch(queryResult.action) {
        case 'place-order-drink': {
          if(queryResult.outputContexts[2].name.includes('place_orders_-_drink')) {
            paramList = await Drink.find({});
            type = 'drink';
          }
          break;
        }
        case 'place-order-starter': {
          if(queryResult.outputContexts[2].name.includes('place_orders_-_starter')) {
            paramList = await Starter.find({});
            type = 'starter';
          }
          break;
        }
        case 'place-order-meal': {
          if(queryResult.outputContexts[2].name.includes('place_orders_-_meal')) {
            paramList = await Meal.find({});
            type = 'meal';
          }
          break;
        }
        case 'place-order-dessert': {
          if(queryResult.outputContexts[2].name.includes('place_orders_-_dessert')) {
            paramList = await Dessert.find({});
            type = 'dessert';
          }
          break;
        }
        case 'place-order-special': {
          if(queryResult.outputContexts[2].name.includes('place_orders_-_special')) {
            paramList = await Special.find({});
            type = 'special';
          }
          break;
        }
        default: {
          break;
        }
      }
    }
    
    res.send({
      queryResult, 
      items: paramList,
      type: type,
      showOrders: flag,
    });
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    let flag = false;
    if(req.body.event === "OrderComplete") {
      flag = true;
    }
    res.send({
      queryResult: responses[0].queryResult,
      showOrders: flag,
    });
  });

  app.post("/api/order_dish", async (req, res) => {
    let responses = await chatbot.textQuery(
      req.body.dish.name,
      req.body.userID,
      req.body.parameters
    );
  
    let queryResult = responses[0].queryResult;
    
    res.send(queryResult);
  });
};