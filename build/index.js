"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ClickAwayListener = function (props) {
    var children = props.children, onClickAway = props.onClickAway, childrenProps = __rest(props, ["children", "onClickAway"]);
    var node = react_1.useRef(null);
    react_1.useEffect(function () {
        var handleMouseDown = function (event) {
            if (node.current && node.current.contains(event.target)) {
                return;
            }
            onClickAway();
        };
        document.addEventListener('mousedown', handleMouseDown);
        return function () {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    });
    return (react_1.default.createElement("div", __assign({ ref: node }, childrenProps), children));
};
exports.default = ClickAwayListener;
