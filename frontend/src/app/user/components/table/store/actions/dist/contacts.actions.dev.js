"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSearchText = setSearchText;
exports.openNewContactDialog = openNewContactDialog;
exports.closeNewContactDialog = closeNewContactDialog;
exports.openEditContactDialog = openEditContactDialog;
exports.closeEditContactDialog = closeEditContactDialog;
exports.removeContact = exports.updateContact = exports.addContact = exports.getContacts = exports.REMOVE_CONTACTS = exports.REMOVE_CONTACT = exports.UPDATE_CONTACT = exports.ADD_CONTACT = exports.CLOSE_EDIT_CONTACT_DIALOG = exports.OPEN_EDIT_CONTACT_DIALOG = exports.CLOSE_NEW_CONTACT_DIALOG = exports.OPEN_NEW_CONTACT_DIALOG = exports.SET_SEARCH_TEXT = exports.GET_CONTACTS = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _ApiConfig = require("app/ApiConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GET_CONTACTS = '[ROBOTS APP] GET ROBOTS';
exports.GET_CONTACTS = GET_CONTACTS;
var SET_SEARCH_TEXT = '[ROBOTS APP] SET SEARCH TEXT';
exports.SET_SEARCH_TEXT = SET_SEARCH_TEXT;
var OPEN_NEW_CONTACT_DIALOG = '[ROBOTS APP] OPEN NEW ROBOTS DIALOG';
exports.OPEN_NEW_CONTACT_DIALOG = OPEN_NEW_CONTACT_DIALOG;
var CLOSE_NEW_CONTACT_DIALOG = '[ROBOTS APP] CLOSE NEW ROBOTS DIALOG';
exports.CLOSE_NEW_CONTACT_DIALOG = CLOSE_NEW_CONTACT_DIALOG;
var OPEN_EDIT_CONTACT_DIALOG = '[ROBOTS APP] OPEN EDIT ROBOTS DIALOG';
exports.OPEN_EDIT_CONTACT_DIALOG = OPEN_EDIT_CONTACT_DIALOG;
var CLOSE_EDIT_CONTACT_DIALOG = '[ROBOTS APP] CLOSE EDIT ROBOTS DIALOG';
exports.CLOSE_EDIT_CONTACT_DIALOG = CLOSE_EDIT_CONTACT_DIALOG;
var ADD_CONTACT = '[ROBOTS APP] ADD ROBOTS';
exports.ADD_CONTACT = ADD_CONTACT;
var UPDATE_CONTACT = '[ROBOTS APP] UPDATE ROBOTS';
exports.UPDATE_CONTACT = UPDATE_CONTACT;
var REMOVE_CONTACT = '[ROBOTS APP] REMOVE ROBOT';
exports.REMOVE_CONTACT = REMOVE_CONTACT;
var REMOVE_CONTACTS = '[ROBOTS APP] REMOVE ROBOTS';
exports.REMOVE_CONTACTS = REMOVE_CONTACTS;

var getContacts = function getContacts() {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/table/get_tables")).then(function (res) {
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
    data: data
  };
}

function closeEditContactDialog() {
  return {
    type: CLOSE_EDIT_CONTACT_DIALOG
  };
}

var addContact = function addContact(newContact) {
  return function (dispatch) {
    console.log('unknown request: ', newContact);

    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/table/add_table"), newContact).then(function (res) {
      if (res.data.success) {
        dispatch({
          type: ADD_CONTACT,
          payload: _objectSpread({}, newContact, {
            _id: res.data._id
          })
        });
      } else {
        alert(res.data.msg);
      }
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.addContact = addContact;

var updateContact = function updateContact(contact) {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/table/update_table"), contact).then(function (res) {
      dispatch({
        type: UPDATE_CONTACT,
        payload: contact
      });
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.updateContact = updateContact;

var removeContact = function removeContact(data) {
  return function (dispatch) {
    _axios["default"].post("".concat(_ApiConfig.SERVER_URL, "/api/table/delete_table"), data).then(function (res) {
      dispatch({
        type: REMOVE_CONTACT,
        payload: data
      });
    })["catch"](function (err) {
      console.log('error: ', err);
    });
  };
};

exports.removeContact = removeContact;