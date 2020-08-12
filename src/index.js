System.register(["react"], function (exports_1, context_1) {
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
    var react_1, ClickAwayListener;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            ClickAwayListener = function (_a) {
                var onClickAway = _a.onClickAway, _b = _a.mouseEvent, mouseEvent = _b === void 0 ? 'click' : _b, _c = _a.touchEvent, touchEvent = _c === void 0 ? 'touchend' : _c, children = _a.children, props = __rest(_a, ["onClickAway", "mouseEvent", "touchEvent", "children"]);
                var node = react_1.useRef(null);
                react_1.useEffect(function () {
                    var handleEvents = function (event) {
                        if (node.current && node.current.contains(event.target)) {
                            return;
                        }
                        onClickAway(event);
                    };
                    document.addEventListener(mouseEvent, handleEvents);
                    document.addEventListener(touchEvent, handleEvents);
                    return function () {
                        document.removeEventListener(mouseEvent, handleEvents);
                        document.removeEventListener(touchEvent, handleEvents);
                    };
                }, [mouseEvent, onClickAway, touchEvent]);
                return (react_1.default.createElement("div", __assign({ ref: node }, props), children));
            };
            exports_1("default", ClickAwayListener);
        }
    };
});
