"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("@lodash"));

var Actions = _interopRequireWildcard(require("../actions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  drink: [],
  starter: [],
  meal: [],
  dessert: [],
  special: [],
  searchText: '',
  routeParams: {},
  contactDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

var contactsReducer = function contactsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case Actions.GET_CONTACTS:
      {
        return _objectSpread({}, state, {
          drink: action.payload.drink,
          starter: action.payload.starter,
          meal: action.payload.meal,
          dessert: action.payload.dessert,
          special: action.payload.special
        });
      }

    case Actions.SET_SEARCH_TEXT:
      {
        return _objectSpread({}, state, {
          searchText: action.searchText
        });
      }

    case Actions.OPEN_NEW_CONTACT_DIALOG:
      {
        return _objectSpread({}, state, {
          contactDialog: {
            type: 'new',
            props: {
              open: true
            },
            data: null
          }
        });
      }

    case Actions.CLOSE_NEW_CONTACT_DIALOG:
      {
        return _objectSpread({}, state, {
          contactDialog: {
            type: 'new',
            props: {
              open: false
            },
            data: null
          }
        });
      }

    case Actions.OPEN_EDIT_CONTACT_DIALOG:
      {
        return _objectSpread({}, state, {
          contactDialog: {
            type: 'edit',
            props: {
              open: true
            },
            data: action.data
          }
        });
      }

    case Actions.CLOSE_EDIT_CONTACT_DIALOG:
      {
        return _objectSpread({}, state, {
          contactDialog: {
            type: 'edit',
            props: {
              open: false
            },
            data: null
          }
        });
      }

    case Actions.UPDATE_CONTACT:
      {
        var entities = [];
        var target;

        switch (action.payload.type) {
          case 'drink':
            {
              target = state.drink;
              break;
            }

          case 'starter':
            {
              target = state.starter;
              break;
            }

          case 'meal':
            {
              target = state.meal;
              break;
            }

          case 'dessert':
            {
              target = state.dessert;
              break;
            }

          case 'special':
            {
              target = state.special;
              break;
            }
        }

        for (var i = 0; i < target.length; i++) {
          if (target[i]._id == action.payload.id) entities.push(_objectSpread({}, target[i], {
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image
          }));else entities.push(target[i]);
        }

        switch (action.payload.type) {
          case 'drink':
            {
              return _objectSpread({}, state, {
                drink: entities
              });
            }

          case 'starter':
            {
              return _objectSpread({}, state, {
                starter: entities
              });
            }

          case 'meal':
            {
              return _objectSpread({}, state, {
                meal: entities
              });
            }

          case 'dessert':
            {
              return _objectSpread({}, state, {
                dessert: entities
              });
            }

          case 'special':
            {
              return _objectSpread({}, state, {
                special: entities
              });
            }

          default:
            {
              return state;
            }
        }
      }

    case Actions.ADD_CONTACT:
      {
        switch (action.payload.type) {
          case 'drink':
            {
              return _objectSpread({}, state, {
                drink: [].concat(_toConsumableArray(state.drink), [action.payload])
              });
            }

          case 'starter':
            {
              return _objectSpread({}, state, {
                starter: [].concat(_toConsumableArray(state.starter), [action.payload])
              });
            }

          case 'meal':
            {
              return _objectSpread({}, state, {
                meal: [].concat(_toConsumableArray(state.meal), [action.payload])
              });
            }

          case 'dessert':
            {
              return _objectSpread({}, state, {
                dessert: [].concat(_toConsumableArray(state.dessert), [action.payload])
              });
            }

          case 'special':
            {
              return _objectSpread({}, state, {
                special: [].concat(_toConsumableArray(state.special), [action.payload])
              });
            }

          default:
            {
              return state;
            }
        }
      }

    case Actions.REMOVE_CONTACT:
      {
        var _entities = [];

        var _target;

        switch (action.payload.type) {
          case 'drink':
            {
              _target = state.drink;
              break;
            }

          case 'starter':
            {
              _target = state.starter;
              break;
            }

          case 'meal':
            {
              _target = state.meal;
              break;
            }

          case 'dessert':
            {
              _target = state.dessert;
              break;
            }

          case 'special':
            {
              _target = state.special;
              break;
            }
        }

        for (var _i = 0; _i < _target.length; _i++) {
          if (_target[_i]._id == action.payload.id) continue;else _entities.push(_target[_i]);
        }

        switch (action.payload.type) {
          case 'drink':
            {
              return _objectSpread({}, state, {
                drink: _entities
              });
            }

          case 'starter':
            {
              return _objectSpread({}, state, {
                starter: _entities
              });
            }

          case 'meal':
            {
              return _objectSpread({}, state, {
                meal: _entities
              });
            }

          case 'dessert':
            {
              return _objectSpread({}, state, {
                dessert: _entities
              });
            }

          case 'special':
            {
              return _objectSpread({}, state, {
                special: _entities
              });
            }

          default:
            {
              return state;
            }
        }
      }

    default:
      {
        return state;
      }
  }
};

var _default = contactsReducer;
exports["default"] = _default;