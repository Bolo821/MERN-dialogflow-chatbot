"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("structjson");
const mongoose = require("mongoose");

const Drink = mongoose.model('drink');
const Starter = mongoose.model('starter');
const Meal = mongoose.model('meal');
const Dessert = mongoose.model('dessert');
const Special = mongoose.model('special');
const Order = mongoose.model('order');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
//const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient({ projectID, credentials });

const Registration = mongoose.model("registration");


module.exports = {
  initChatbot: async function() {
    let self = module.exports;
    await self.initDrinkEntity();
    await self.initStarterEntity();
    await self.initMealEntity();
    await self.initDessertEntity();
    await self.initSpecialEntity();
    console.log('chatbot init finished.');
  },

  initDrinkEntity: async function() {
    let self = module.exports;
    let drinks = await Drink.find({});
    let eneityDrink = drinks.map(drink => {
      return {
        value: drink.name,
        synonyms: [
          drink.name,
        ]
      }
    });
    await self.createSessionEntityType(projectID, sessionID, eneityDrink, "Drink", 'ENTITY_OVERRIDE_MODE_OVERRIDE')
  },
  initStarterEntity: async function() {
    let self = module.exports;
    let starters = await Starter.find({});
    let eneityStarter = starters.map(starter => {
      return {
        value: starter.name,
        synonyms: [
          starter.name,
        ]
      }
    });
    await self.createSessionEntityType(projectID, sessionID, eneityStarter, "Starter", 'ENTITY_OVERRIDE_MODE_OVERRIDE')
  },
  initMealEntity: async function() {
    let self = module.exports;
    let meals = await Meal.find({});
    let eneityMeal = meals.map(meal => {
      return {
        value: meal.name,
        synonyms: [
          meal.name,
        ]
      }
    });
    await self.createSessionEntityType(projectID, sessionID, eneityMeal, "Meal", 'ENTITY_OVERRIDE_MODE_OVERRIDE')
  },
  initDessertEntity: async function() {
    let self = module.exports;
    let desserts = await Dessert.find({});
    let eneityDessert = desserts.map(dessert => {
      return {
        value: dessert.name,
        synonyms: [
          dessert.name,
        ]
      }
    });
    await self.createSessionEntityType(projectID, sessionID, eneityDessert, "Dessert", 'ENTITY_OVERRIDE_MODE_OVERRIDE')
  },
  initSpecialEntity: async function() {
    let self = module.exports;
    let specials = await Special.find({});
    let eneitySpical = specials.map(special => {
      return {
        value: special.name,
        synonyms: [
          special.name,
        ]
      }
    });
    await self.createSessionEntityType(projectID, sessionID, eneitySpical, "Special", 'ENTITY_OVERRIDE_MODE_OVERRIDE')
  },

  createSessionEntityType: async function(
    projectId,
    sessionId,
    entityValues,
    entityTypeDisplayName,
    entityOverrideMode
  ) {

    let dialogflow = require('@google-cloud/dialogflow');
    const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient({ projectID, credentials });
  
    const sessionPath = sessionEntityTypesClient.projectAgentSessionPath(
      projectId,
      sessionId
    );
    const sessionEntityTypePath = sessionEntityTypesClient.projectAgentSessionEntityTypePath(
      projectId,
      sessionId,
      entityTypeDisplayName
    );
  
    const sessionEntityTypeRequest = {
      parent: sessionPath,
      sessionEntityType: {
        name: sessionEntityTypePath,
        entityOverrideMode: entityOverrideMode,
        entities: entityValues,
      },
    };
  
    const [response] = await sessionEntityTypesClient.createSessionEntityType(
      sessionEntityTypeRequest
    );
  },

  createIntent: async function() {
    let dialogflow = require('@google-cloud/dialogflow');
    const intentsClient = new dialogflow.IntentsClient({ projectID, credentials });

    // The path to identify the agent that owns the created intent.
    const agentPath = intentsClient.agentPath(projectID);

    const trainingPhrases = [];
    const trainingPhrasesParts = ['first', 'second', 'third'];
    const messageTexts = ['You have chosen $Toppings.'];


    trainingPhrasesParts.forEach(trainingPhrasesPart => {
      const part = {
        text: trainingPhrasesPart,
      };

      // Here we create a new training phrase for each provided part.
      const trainingPhrase = {
        type: 'EXAMPLE',
        parts: [part],
      };

      trainingPhrases.push(trainingPhrase);
    });

    const messageText = {
      text: messageTexts,
    };

    const message = {
      text: messageText,
    };

    const intent = {
      displayName: 'test',
      trainingPhrases: trainingPhrases,
      messages: [message],
    };

    const createIntentRequest = {
      parent: agentPath,
      intent: intent,
    };

    // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log('intent created: ', response);
  },

  textQuery: async function(text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID);
    let self = module.exports;
    
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode
        },
        queryParams: {
          payload: {
            data: parameters
          }
        }
      }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);

    return responses;
  },

  eventQuery: async function(event, userID, parameters = {}) {
    let self = module.exports;
    let sessionPath = sessionClient.sessionPath(projectID, sessionID);
    // The event query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: languageCode
        }
      }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    
    switch (queryResult.action) {
      case "place-order":
        if (queryResult.allRequiredParamsPresent) {
          //self.saveRegistration(queryResult.parameters.fields);
          //self.saveOrder(queryResult.parameters.fields);
        }
        break;
    }
    return responses;
  },

  saveRegistration: async function(fields) {
    const registration = new Registration({
      name: fields.name.stringValue,
      email: fields.email.stringValue,
      phone: fields.phone.stringValue,
      address: fields.address.stringValue,
      registerDate: Date.now()
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  },

  saveOrder: async function(fields) {
    const order = new Order({
      toppings: fields.Toppings.listValue.values,
      options: fields.Options.listValue.values,
      orderDate: Date.now(),
    });
    try {
      //let res = await order.save();
    } catch (err) {
      console.log('error occured: ', err);
    }
  }
};
