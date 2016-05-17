"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.cleanest = cleanest;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function cleanest(structure) {
  if (structure.__proto__ == Array.prototype) {
    var _ret = function () {
      var structureObj = {};

      if (!structure.length) {
        return {
          v: {}
        };
      } else {
        structure.map(function (entry) {
          if (entry.__proto__ == Object.prototype) {
            structureObj = Object.assign({}, structureObj, _defineProperty({}, entry._id, cleanest(entry)));
          } else {
            structureObj = Object.assign({}, structureObj, _defineProperty({}, entry, entry));
          }
        });
      }

      return {
        v: structureObj
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else if (structure.__proto__ == Object.prototype) {
    var _ret2 = function () {
      var structureObj = {};

      Object.keys(structure).map(function (key) {
        if (structure[key].__proto__ == Array.prototype) {
          structureObj = Object.assign({}, structure, structureObj, _defineProperty({}, key, cleanest(structure[key])));
        }
      });
      return {
        v: structureObj
      };
    }();

    if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
  }
}
