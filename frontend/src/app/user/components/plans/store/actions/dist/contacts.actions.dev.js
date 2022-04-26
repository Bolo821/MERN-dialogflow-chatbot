"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSearchText = setSearchText;
exports.openNewContactDialog = openNewContactDialog;
exports.closeNewContactDialog = closeNewContactDialog;
exports.openEditContactDialog = openEditContactDialog;
exports.closeEditContactDialog = closeEditContactDialog;
exports.openAcceptDialog = openAcceptDialog;
exports.closeAcceptDialog = closeAcceptDialog;
exports.resetOrderList = exports.removeContact = exports.updateContact = exports.addContact = exports.getContacts = exports.RESET_ORDER_LIST = exports.CLOSE_ACCEPT_DIALOG = exports.OPEN_ACCEPT_DIALOG = exports.REMOVE_CONTACTS = exports.REMOVE_CONTACT = exports.UPDATE_CONTACT = exports.ADD_CONTACT = exports.CLOSE_EDIT_CONTACT_DIALOG = exports.OPEN_EDIT_CONTACT_DIALOG = exports.CLOSE_NEW_CONTACT_DIALOG = exports.OPEN_NEW_CONTACT_DIALOG = exports.SET_SEARCH_TEXT = exports.GET_CONTACTS = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _ApiConfig = require("app/ApiConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GET_CONTACTS = '[ORDER APP] GET CONTACTS';
exports.GET_CONTACTS = GET_CONTACTS;
var SET_SEARCH_TEXT = '[ORDER APP] SET SEARCH TEXT';
exports.SET_SEARCH_TEXT = SET_SEARCH_TEXT;
var OPEN_NEW_CONTACT_DIALOG = '[ORDER APP] OPEN NEW CONTACT DIALOG';
exports.OPEN_NEW_CONTACT_DIALOG = OPEN_NEW_CONTACT_DIALOG;
var CLOSE_NEW_CONTACT_DIALOG = '[ORDER APP] CLOSE NEW CONTACT DIALOG';
exports.CLOSE_NEW_CONTACT_DIALOG = CLOSE_NEW_CONTACT_DIALOG;
var OPEN_EDIT_CONTACT_DIALOG = '[ORDER APP] OPEN EDIT CONTACT DIALOG';
exports.OPEN_EDIT_CONTACT_DIALOG = OPEN_EDIT_CONTACT_DIALOG;
var CLOSE_EDIT_CONTACT_DIALOG = '[ORDER APP] CLOSE EDIT CONTACT DIALOG';
exports.CLOSE_EDIT_CONTACT_DIALOG = CLOSE_EDIT_CONTACT_DIALOG;
var ADD_CONTACT = '[ORDER APP] ADD CONTACT';
exports.ADD_CONTACT = ADD_CONTACT;
var UPDATE_CONTACT = '[ORDER APP] UPDATE CONTACT';
exports.UPDATE_CONTACT = UPDATE_CONTACT;
var REMOVE_CONTACT = '[ORDER APP] REMOVE CONTACT';
exports.REMOVE_CONTACT = REMOVE_CONTACT;
var REMOVE_CONTACTS = '[ORDER APP] REMOVE CONTACTS';
exports.REMOVE_CONTACTS = REMOVE_CONTACTS;
var OPEN_ACCEPT_DIALOG = '[ORDER APP] OPEN ACCEPT DIALOG';
exports.OPEN_ACCEPT_DIALOG = OPEN_ACCEPT_DIALOG;
var CLOSE_ACCEPT_DIALOG = '[ORDER APP] CLOSE ACCEPT DIALOG';
exports.CLOSE_ACCEPT_DIALOG = CLOSE_ACCEPT_DIALOG;
var RESET_ORDER_LIST = '[ORDER APP] RESET ORDER LIST';
exports.RESET_ORDER_LIST = RESET_ORDER_LIST;

var getContacts = function getContacts(data) {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/orders/get_orders"), data).then(function (res) {
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.getContacts = getContacts;

function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

function openNewContactDialog() {
  return {
    type: OPEN_NEW_CONTACT_DIALOG
  };
}

function closeNewContactDialog() {
  return {
    type: CLOSE_NEW_CONTACT_DIALOG
  };
}

function openEditContactDialog(data) {
  return {
    type: OPEN_EDIT_CONTACT_DIALOG,
    payload: data
  };
}

function closeEditContactDialog() {
  return {
    type: CLOSE_EDIT_CONTACT_DIALOG
  };
}

function openAcceptDialog(data) {
  return {
    type: OPEN_ACCEPT_DIALOG,
    payload: data
  };
}

function closeAcceptDialog() {
  return {
    type: CLOSE_ACCEPT_DIALOG
  };
}

var addContact = function addContact(newContact) {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/orders/add_orders"), newContact).then(function (res) {
      dispatch({
        type: ADD_CONTACT,
        payload: _objectSpread({}, newContact, {
          id: res.data.id
        })
      });
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.addContact = addContact;

var updateContact = function updateContact(data) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('request data: ', data);

            _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/orders/update_order"), data).then(function _callee(res) {
              var table;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(getUsableTables());

                    case 2:
                      table = _context.sent;

                      if (res.data.success) {
                        dispatch({
                          type: UPDATE_CONTACT,
                          payload: {
                            data: data,
                            table: table
                          }
                        });
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log('error: ', err);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.updateContact = updateContact;

var removeContact = function removeContact(contactId) {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/orders/delete_order"), contactId).then(function (res) {
      dispatch({
        type: REMOVE_CONTACT,
        payload: contactId
      });
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.removeContact = removeContact;

var getUsableTables = function getUsableTables() {
  var res;
  return regeneratorRuntime.async(function getUsableTables$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/orders/get_active_tables")));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res.data.table);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var resetOrderList = function resetOrderList() {
  return {
    type: RESET_ORDER_LIST
  };
};

exports.resetOrderList = resetOrderList;