"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageForgotPasswordDataApi = getPageForgotPasswordDataApi;

var _constants = require("@constants/constants");

var _getAccountQueryStr = require("@lib/query/getAccountQueryStr");

var _getArticlesListQueryStr = require("@lib/query/getArticlesListQueryStr");

var _getSiteOptionsQueryStr = require("@lib/query/getSiteOptionsQueryStr");

var _api = require("../api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPageForgotPasswordDataApi() {
  var locale,
      slug,
      defaultParams,
      pageInfoParams,
      _args = arguments;
  return regeneratorRuntime.async(function getPageForgotPasswordDataApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          locale = _args.length > 0 && _args[0] !== undefined ? _args[0] : _constants.LANGUAGES.vi;
          slug = _constants.PAGES.QUEN_MAT_KHAU[locale];
          defaultParams = {
            post_type: process.env.NEWS_POST_TYPE,
            tax: process.env.NEWS_TAX,
            term_slug: '',
            slug: '',
            locale: locale,
            prefix: 'articlesList'
          };
          pageInfoParams = _objectSpread({}, defaultParams, {
            post_type: process.env.PAGES_POST_TYPE,
            slug: slug,
            prefix: 'pageInfo'
          });
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _api.fetchAPI)("query contactPageData {\n        ".concat((0, _getSiteOptionsQueryStr.getSiteOptionsQueryStr)(locale), "\n        ").concat((0, _getArticlesListQueryStr.getArticlesListQueryStr)(pageInfoParams), "\n        ").concat((0, _getAccountQueryStr.getAccountQueryStr)(locale), "\n      }")));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}