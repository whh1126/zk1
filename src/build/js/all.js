! function(t, i) { "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.BScroll = i() }(this, function() { "use strict";

    function g() { return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date }

    function a(t) { for (var i = arguments.length, e = Array(1 < i ? i - 1 : 0), s = 1; s < i; s++) e[s - 1] = arguments[s]; for (var o = 0; o < e.length; o++) { var n = e[o]; for (var r in n) t[r] = n[r] } return t }

    function h(t) { return null == t }

    function t(t) { return !1 !== k && ("standard" === k ? "transitionEnd" === t ? "transitionend" : t : k + t.charAt(0).toUpperCase() + t.substr(1)) }

    function e(t, i, e, s) { t.addEventListener(i, e, { passive: !1, capture: !!s }) }

    function l(t, i, e, s) { t.removeEventListener(i, e, { passive: !1, capture: !!s }) }

    function c(t) { for (var i = 0, e = 0; t;) i -= t.offsetLeft, e -= t.offsetTop, t = t.offsetParent; return { left: i, top: e } }

    function v(t) { if (t instanceof window.SVGElement) { var i = t.getBoundingClientRect(); return { top: i.top, left: i.left, width: i.width, height: i.height } } return { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight } }

    function d(t, i) { for (var e in i)
            if (i[e].test(t[e])) return !0;
        return !1 }

    function n(t, i) { t.removeChild(i) }

    function f(t, i, e, s, o, n) { var r = t - i,
            h = Math.abs(r) / e,
            a = n.deceleration,
            l = n.itemHeight,
            c = n.swipeBounceTime,
            p = n.wheel,
            u = n.swipeTime,
            d = p ? 4 : 15,
            g = t + h / a * (r < 0 ? -1 : 1); return p && l && (g = Math.round(g / l) * l), g < s ? (g = o ? Math.max(s - o / 4, s - o / d * h) : s, u = c) : 0 < g && (g = o ? Math.min(o / 4, o / d * h) : 0, u = c), { destination: Math.round(g), duration: u } }

    function i() {}

    function s(t) { console.error("[BScroll warn]: " + t) }

    function p(t) { var i = document.createElement("div"),
            e = document.createElement("div"); return i.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", e.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", e.className = "bscroll-indicator", i.className = "horizontal" === t ? (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", e.style.height = "100%", "bscroll-horizontal-scrollbar") : (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", e.style.width = "100%", "bscroll-vertical-scrollbar"), i.style.cssText += ";overflow:hidden", i.appendChild(e), i }

    function u(t, i) { this.wrapper = i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.direction = i.direction, i.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, i.interactive && this._addDOMEvents() }

    function o(t, i) { this.wrapper = "string" == typeof t ? document.querySelector(t) : t, this.wrapper || s("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || s("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(t, i) } var r, m, y, w, x, T, b, _, S, P = function(t, i) { if (Array.isArray(t)) return t; if (Symbol.iterator in Object(t)) return function(t, i) { var e = [],
                    s = !0,
                    o = !1,
                    n = void 0; try { for (var r, h = t[Symbol.iterator](); !(s = (r = h.next()).done) && (e.push(r.value), !i || e.length !== i); s = !0); } catch (t) { o = !0, n = t } finally { try {!s && h.return && h.return() } finally { if (o) throw n } } return e }(t, i); throw new TypeError("Invalid attempt to destructure non-iterable instance") },
        M = "undefined" != typeof window,
        X = M && navigator.userAgent.toLowerCase(),
        Y = X && /wechatdevtools/.test(X),
        D = X && 0 < X.indexOf("android"),
        E = M && document.createElement("div").style,
        k = function() { if (!M) return !1; var t = { webkit: "webkitTransform", Moz: "MozTransform", O: "OTransform", ms: "msTransform", standard: "transform" }; for (var i in t)
                if (void 0 !== E[t[i]]) return i;
            return !1 }(),
        W = t("transform"),
        H = M && t("perspective") in E,
        O = M && ("ontouchstart" in window || Y),
        L = !1 !== W,
        z = M && t("transition") in E,
        C = { transform: W, transitionTimingFunction: t("transitionTimingFunction"), transitionDuration: t("transitionDuration"), transitionProperty: t("transitionProperty"), transitionDelay: t("transitionDelay"), transformOrigin: t("transformOrigin"), transitionEnd: t("transitionEnd") },
        A = { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2 },
        I = { startX: 0, startY: 0, scrollX: !1, scrollY: !0, freeScroll: !1, directionLockThreshold: 5, eventPassthrough: "", click: !1, tap: !1, bounce: !0, bounceTime: 800, momentum: !0, momentumLimitTime: 300, momentumLimitDistance: 15, swipeTime: 2500, swipeBounceTime: 500, deceleration: .001, flickLimitTime: 200, flickLimitDistance: 100, resizePolling: 60, probeType: 0, preventDefault: !0, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: !0, useTransition: !0, useTransform: !0, bindToWrapper: !1, disableMouse: O, disableTouch: !O, observeDOM: !0, autoBlur: !0, wheel: !1, snap: !1, scrollbar: !1, pullDownRefresh: !1, pullUpLoad: !1, mouseWheel: !1, stopPropagation: !1 },
        F = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(t) { return 1 + --t * t * t * t * t } }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(t) { return t * (2 - t) } }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t) { return 1 - --t * t * t * t } } },
        R = M ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t) { return window.setTimeout(t, (t.interval || 100 / 60) / 2) } : i,
        U = M ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(t) { window.clearTimeout(t) } : i; return u.prototype.handleEvent = function(t) { switch (t.type) {
            case "touchstart":
            case "mousedown":
                this._start(t); break;
            case "touchmove":
            case "mousemove":
                this._move(t); break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this._end(t) } }, u.prototype.refresh = function() { this.transitionTime(), this._calculate(), this.updatePosition() }, u.prototype.fade = function(t, i) { var e = this; if (!i || this.visible) { var s = t ? 250 : 500;
            t = t ? "1" : "0", this.wrapperStyle[C.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() { e.wrapperStyle.opacity = t, e.visible = +t }, 0) } }, u.prototype.updatePosition = function() { if ("vertical" === this.direction) { var t = Math.round(this.sizeRatioY * this.scroller.y); if (t < 0) { this.transitionTime(500); var i = Math.max(this.indicatorHeight + 3 * t, 8);
                this.indicatorStyle.height = i + "px", t = 0 } else if (t > this.maxPosY) { this.transitionTime(500); var e = Math.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8);
                this.indicatorStyle.height = e + "px", t = this.maxPosY + this.indicatorHeight - e } else this.indicatorStyle.height = this.indicatorHeight + "px";
            this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[C.transform] = "translateY(" + t + "px)" + this.scroller.translateZ : this.indicatorStyle.top = t + "px" } else { var s = Math.round(this.sizeRatioX * this.scroller.x); if (s < 0) { this.transitionTime(500); var o = Math.max(this.indicatorWidth + 3 * s, 8);
                this.indicatorStyle.width = o + "px", s = 0 } else if (s > this.maxPosX) { this.transitionTime(500); var n = Math.max(this.indicatorWidth - 3 * (s - this.maxPosX), 8);
                this.indicatorStyle.width = n + "px", s = this.maxPosX + this.indicatorWidth - n } else this.indicatorStyle.width = this.indicatorWidth + "px";
            this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[C.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px" } }, u.prototype.transitionTime = function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.indicatorStyle[C.transitionDuration] = t + "ms" }, u.prototype.transitionTimingFunction = function(t) { this.indicatorStyle[C.transitionTimingFunction] = t }, u.prototype.destroy = function() { this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper) }, u.prototype._start = function(t) { var i = t.touches ? t.touches[0] : t;
        t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = g(), this._handleMoveEvents(e), this.scroller.trigger("beforeScrollStart") }, u.prototype._move = function(t) { var i = t.touches ? t.touches[0] : t;
        t.preventDefault(), t.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0; var e = i.pageX - this.lastPointX;
        this.lastPointX = i.pageX; var s = i.pageY - this.lastPointY;
        this.lastPointY = i.pageY; var o = this.x + e,
            n = this.y + s;
        this._pos(o, n) }, u.prototype._end = function(t) { if (this.initiated) { this.initiated = !1, t.preventDefault(), t.stopPropagation(), this._handleMoveEvents(l); var i = this.scroller.options.snap; if (i) { var e = i.speed,
                    s = i.easing,
                    o = void 0 === s ? F.bounce : s,
                    n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                    r = e || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - n.x), 1e3), Math.min(Math.abs(this.scroller.y - n.y), 1e3)), 300);
                this.scroller.x === n.x && this.scroller.y === n.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, r, o)) }
            this.moved && this.scroller.trigger("scrollEnd", { x: this.scroller.x, y: this.scroller.y }) } }, u.prototype._pos = function(t, i) { t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = Math.round(t / this.sizeRatioX), i = Math.round(i / this.sizeRatioY), this.scroller.scrollTo(t, i), this.scroller.trigger("scroll", { x: this.scroller.x, y: this.scroller.y }) }, u.prototype._calculate = function() { if ("vertical" === this.direction) { var t = this.wrapper.clientHeight;
            this.indicatorHeight = Math.max(Math.round(t * t / (this.scroller.scrollerHeight || t || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = t - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY } else { var i = this.wrapper.clientWidth;
            this.indicatorWidth = Math.max(Math.round(i * i / (this.scroller.scrollerWidth || i || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = i - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX } }, u.prototype._addDOMEvents = function() { var t = e;
        this._handleDOMEvents(t) }, u.prototype._removeDOMEvents = function() { var t = l;
        this._handleDOMEvents(t), this._handleMoveEvents(t) }, u.prototype._handleMoveEvents = function(t) { this.scroller.options.disableTouch || t(window, "touchmove", this), this.scroller.options.disableMouse || t(window, "mousemove", this) }, u.prototype._handleDOMEvents = function(t) { this.scroller.options.disableTouch || (t(this.indicator, "touchstart", this), t(window, "touchend", this)), this.scroller.options.disableMouse || (t(this.indicator, "mousedown", this), t(window, "mouseup", this)) }, (S = o).prototype._init = function(t, i) { this._handleOptions(i), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable() }, S.prototype._handleOptions = function(t) { this.options = a({}, I, t), this.translateZ = this.options.HWCompositing && H ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && z, this.options.useTransform = this.options.useTransform && L, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap") }, S.prototype._addDOMEvents = function() { var t = e;
        this._handleDOMEvents(t) }, S.prototype._removeDOMEvents = function() { var t = l;
        this._handleDOMEvents(t) }, S.prototype._handleDOMEvents = function(t) { var i = this.options.bindToWrapper ? this.wrapper : window;
        t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this, !0), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(i, "mousemove", this), t(i, "mousecancel", this), t(i, "mouseup", this)), O && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(i, "touchmove", this), t(i, "touchcancel", this), t(i, "touchend", this)), t(this.scroller, C.transitionEnd, this) }, S.prototype._initExtFeatures = function() { this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel() }, S.prototype._watchTransition = function() { if ("function" == typeof Object.defineProperty) { var o = this,
                n = !1;
            Object.defineProperty(this, "isInTransition", { get: function() { return n }, set: function(t) { n = t; for (var i = o.scroller.children.length ? o.scroller.children : [o.scroller], e = n && !o.pulling ? "none" : "auto", s = 0; s < i.length; s++) i[s].style.pointerEvents = e } }) } }, S.prototype._handleAutoBlur = function() { this.on("beforeScrollStart", function() { var t = document.activeElement;!t || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || t.blur() }) }, S.prototype._initDOMObserver = function() { var n = this; if ("undefined" != typeof MutationObserver) { var r = void 0,
                t = new MutationObserver(function(t) { if (!n._shouldNotRefresh()) { for (var i = !1, e = !1, s = 0; s < t.length; s++) { var o = t[s]; if ("attributes" !== o.type) { i = !0; break } if (o.target !== n.scroller) { e = !0; break } }
                        i ? n.refresh() : e && (clearTimeout(r), r = setTimeout(function() { n._shouldNotRefresh() || n.refresh() }, 60)) } });
            t.observe(this.scroller, { attributes: !0, childList: !0, subtree: !0 }), this.on("destroy", function() { t.disconnect() }) } else this._checkDOMUpdate() }, S.prototype._shouldNotRefresh = function() { var t = 0 < this.x || this.x < this.maxScrollX || 0 < this.y || this.y < this.maxScrollY; return this.isInTransition || this.stopFromTransition || t }, S.prototype._checkDOMUpdate = function() {
        function e() { var t = this;
            setTimeout(function() {
                (function() { if (!this.destroyed) { var t = (s = v(this.scroller)).width,
                            i = s.height;
                        o === t && n === i || this.refresh(), o = t, n = i, e.call(this) } }).call(t) }, 1e3) } var s = v(this.scroller),
            o = s.width,
            n = s.height;
        e.call(this) }, S.prototype.handleEvent = function(t) { switch (t.type) {
            case "touchstart":
            case "mousedown":
                this._start(t); break;
            case "touchmove":
            case "mousemove":
                this._move(t); break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this._end(t); break;
            case "orientationchange":
            case "resize":
                this._resize(); break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(t); break;
            case "click":
                this.enabled && !t._constructed && (d(t.target, this.options.preventDefaultException) || (t.preventDefault(), t.stopPropagation())); break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._onMouseWheel(t) } }, S.prototype.refresh = function() { var t = v(this.wrapper);
        this.wrapperWidth = t.width, this.wrapperHeight = t.height; var i = v(this.scroller);
        this.scrollerWidth = i.width, this.scrollerHeight = i.height; var e = this.options.wheel;
        this.maxScrollY = e ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, void 0 === this.selectedIndex && (this.selectedIndex = e.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.wrapperHeight - this.scrollerHeight), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = c(this.wrapper), this.trigger("refresh"), this.resetPosition() }, S.prototype.enable = function() { this.enabled = !0 }, S.prototype.disable = function() { this.enabled = !1 }, (_ = o).prototype._start = function(t) { var i = A[t.type]; if ((1 === i || 0 === t.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== i)) { this.initiated = i, this.options.preventDefault && !d(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = g(), this.options.wheel && (this.target = t.target), this.stop(); var e = t.touches ? t.touches[0] : t;
            this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this.trigger("beforeScrollStart") } }, _.prototype._move = function(t) { if (this.enabled && !this.destroyed && A[t.type] === this.initiated) { this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(); var i = t.touches ? t.touches[0] : t,
                e = i.pageX - this.pointX,
                s = i.pageY - this.pointY;
            this.pointX = i.pageX, this.pointY = i.pageY, this.distX += e, this.distY += s; var o = Math.abs(this.distX),
                n = Math.abs(this.distY),
                r = g(); if (!(r - this.endTime > this.options.momentumLimitTime && n < this.options.momentumLimitDistance && o < this.options.momentumLimitDistance)) { if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) { if ("vertical" === this.options.eventPassthrough) t.preventDefault();
                    else if ("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
                    s = 0 } else if ("v" === this.directionLocked) { if ("horizontal" === this.options.eventPassthrough) t.preventDefault();
                    else if ("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
                    e = 0 }
                e = this.hasHorizontalScroll ? e : 0, s = this.hasVerticalScroll ? s : 0, this.movingDirectionX = 0 < e ? -1 : e < 0 ? 1 : 0, this.movingDirectionY = 0 < s ? -1 : s < 0 ? 1 : 0; var h = this.x + e,
                    a = this.y + s;
                (0 < h || h < this.maxScrollX) && (h = this.options.bounce ? this.x + e / 3 : 0 < h ? 0 : this.maxScrollX), (0 < a || a < this.maxScrollY) && (a = this.options.bounce ? this.y + s / 3 : 0 < a ? 0 : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(h, a), r - this.startTime > this.options.momentumLimitTime && (this.startTime = r, this.startX = this.x, this.startY = this.y, 1 === this.options.probeType && this.trigger("scroll", { x: this.x, y: this.y })), 1 < this.options.probeType && this.trigger("scroll", { x: this.x, y: this.y }); var l = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
                    c = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    p = this.pointX - l,
                    u = this.pointY - c;
                (p > document.documentElement.clientWidth - this.options.momentumLimitDistance || p < this.options.momentumLimitDistance || u < this.options.momentumLimitDistance || u > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(t) } } }, _.prototype._end = function(t) { if (this.enabled && !this.destroyed && A[t.type] === this.initiated) { this.initiated = !1, this.options.preventDefault && !d(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.trigger("touchEnd", { x: this.x, y: this.y }), this.isInTransition = !1; var i = Math.round(this.x),
                e = Math.round(this.y),
                s = i - this.absStartX,
                o = e - this.absStartY; if (this.directionX = 0 < s ? -1 : s < 0 ? 1 : 0, this.directionY = 0 < o ? -1 : o < 0 ? 1 : 0, !this.options.pullDownRefresh || !this._checkPullDown())
                if (this._checkClick(t)) this.trigger("scrollCancel");
                else if (!this.resetPosition(this.options.bounceTime, F.bounce)) { this.scrollTo(i, e), this.endTime = g(); var n = this.endTime - this.startTime,
                    r = Math.abs(i - this.startX),
                    h = Math.abs(e - this.startY); if (this._events.flick && n < this.options.flickLimitTime && r < this.options.flickLimitDistance && h < this.options.flickLimitDistance) this.trigger("flick");
                else { var a = 0; if (this.options.momentum && n < this.options.momentumLimitTime && (h > this.options.momentumLimitDistance || r > this.options.momentumLimitDistance)) { var l = this.hasHorizontalScroll ? f(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options) : { destination: i, duration: 0 },
                            c = this.hasVerticalScroll ? f(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options) : { destination: e, duration: 0 };
                        i = l.destination, e = c.destination, a = Math.max(l.duration, c.duration), this.isInTransition = !0 } else this.options.wheel && (e = Math.round(e / this.itemHeight) * this.itemHeight, a = this.options.wheel.adjustTime || 400); var p = F.swipe; if (this.options.snap) { var u = this._nearestSnap(i, e);
                        this.currentPage = u, a = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(i - u.x), 1e3), Math.min(Math.abs(e - u.y), 1e3)), 300), i = u.x, e = u.y, this.directionX = 0, this.directionY = 0, p = this.options.snap.easing || F.bounce } if (i !== this.x || e !== this.y) return (0 < i || i < this.maxScrollX || 0 < e || e < this.maxScrollY) && (p = F.swipeBounce), void this.scrollTo(i, e, a, p);
                    this.options.wheel && (this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight))), this.trigger("scrollEnd", { x: this.x, y: this.y }) } } } }, _.prototype._checkClick = function(t) { var i, e, s, o = this.stopFromTransition && !this.pulling; if (this.stopFromTransition = !1, this.moved) return !1; if (this.options.wheel) { if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) { var n = Math.abs(Math.round(this.y / this.itemHeight)),
                    r = Math.round((this.pointY + c(this.target).top - this.itemHeight / 2) / this.itemHeight);
                this.target = this.items[n + r] } return this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, F.swipe), !0 } return !o && (this.options.tap && (i = t, e = this.options.tap, (s = document.createEvent("Event")).initEvent(e, !0, !0), s.pageX = i.pageX, s.pageY = i.pageY, i.target.dispatchEvent(s)), this.options.click && !d(t.target, this.options.preventDefaultException) && function(t) {
            function i() {
                (o = document.createEvent("Event")).initEvent(n, r, h), a(o, s) } var e = void 0; "mouseup" === t.type || "mousecancel" === t.type ? e = t : "touchend" !== t.type && "touchcancel" !== t.type || (e = t.changedTouches[0]); var s = {};
            e && (s.screenX = e.screenX || 0, s.screenY = e.screenY || 0, s.clientX = e.clientX || 0, s.clientY = e.clientY || 0); var o = void 0,
                n = "click",
                r = !0,
                h = !0; if ("undefined" != typeof MouseEvent) try { o = new MouseEvent(n, a({ bubbles: r, cancelable: h }, s)) } catch (t) { i() } else i();
            o.forwardedTouchEvent = !0, o._constructed = !0, t.target.dispatchEvent(o) }(t), !0) }, _.prototype._resize = function() { var t = this;
        this.enabled && (D && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() { t.refresh() }, this.options.resizePolling)) }, _.prototype._startProbe = function() { U(this.probeTimer), this.probeTimer = R(function t() { var i = e.getComputedPosition();
            e.trigger("scroll", i), e.isInTransition ? e.probeTimer = R(t) : e.trigger("scrollEnd", i) }); var e = this }, _.prototype._transitionProperty = function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "transform";
        this.scrollerStyle[C.transitionProperty] = t }, _.prototype._transitionTime = function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0; if (this.scrollerStyle[C.transitionDuration] = t + "ms", this.options.wheel)
            for (var i = 0; i < this.items.length; i++) this.items[i].style[C.transitionDuration] = t + "ms"; if (this.indicators)
            for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTime(t) }, _.prototype._transitionTimingFunction = function(t) { if (this.scrollerStyle[C.transitionTimingFunction] = t, this.options.wheel)
            for (var i = 0; i < this.items.length; i++) this.items[i].style[C.transitionTimingFunction] = t; if (this.indicators)
            for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTimingFunction(t) }, _.prototype._transitionEnd = function(t) { t.target === this.scroller && this.isInTransition && (this._transitionTime(), this.pulling || this.resetPosition(this.options.bounceTime, F.bounce) || (this.isInTransition = !1, 3 !== this.options.probeType && this.trigger("scrollEnd", { x: this.x, y: this.y }))) }, _.prototype._translate = function(t, i) { if (function(t, i) { if (!t) throw new Error("[BScroll] " + i) }(!h(t) && !h(i), "Oops! translate x or y is null or undefined. please check your code."), this.options.useTransform ? this.scrollerStyle[C.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = Math.round(t), i = Math.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.options.wheel)
            for (var e = this.options.wheel.rotate, s = void 0 === e ? 25 : e, o = 0; o < this.items.length; o++) { var n = s * (i / this.itemHeight + o);
                this.items[o].style[C.transform] = "rotateX(" + n + "deg)" }
        if (this.x = t, this.y = i, this.indicators)
            for (var r = 0; r < this.indicators.length; r++) this.indicators[r].updatePosition() }, _.prototype._animate = function(n, r, h, a) { var l = this,
            c = this.x,
            p = this.y,
            u = g(),
            d = u + h;
        this.isAnimating = !0, U(this.animateTimer),
            function t() { var i = g(); if (d <= i) return l.isAnimating = !1, l._translate(n, r), void(l.pulling || l.resetPosition(l.options.bounceTime) || l.trigger("scrollEnd", { x: l.x, y: l.y })); var e = a(i = (i - u) / h),
                    s = (n - c) * e + c,
                    o = (r - p) * e + p;
                l._translate(s, o), l.isAnimating && (l.animateTimer = R(t)), 3 === l.options.probeType && l.trigger("scroll", { x: l.x, y: l.y }) }() }, _.prototype.scrollBy = function(t, i) { var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : F.bounce;
        t = this.x + t, i = this.y + i, this.scrollTo(t, i, e, s) }, _.prototype.scrollTo = function(t, i) { var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : F.bounce;
        this.isInTransition = this.options.useTransition && 0 < e && (t !== this.x || i !== this.y), !e || this.options.useTransition ? (this._transitionProperty(), this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i), e && 3 === this.options.probeType && this._startProbe(), this.options.wheel && (0 < i ? this.selectedIndex = 0 : i < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = Math.round(Math.abs(i / this.itemHeight)))) : this._animate(t, i, e, s.fn) }, _.prototype.scrollToElement = function(t, i, e, s, o) { if (t && (t = t.nodeType ? t : this.scroller.querySelector(t), !this.options.wheel || t.className === this.options.wheel.wheelItemClass)) { var n = c(t);
            n.left -= this.wrapperOffset.left, n.top -= this.wrapperOffset.top, !0 === e && (e = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === s && (s = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), n.left -= e || 0, n.top -= s || 0, n.left = 0 < n.left ? 0 : n.left < this.maxScrollX ? this.maxScrollX : n.left, n.top = 0 < n.top ? 0 : n.top < this.maxScrollY ? this.maxScrollY : n.top, this.options.wheel && (n.top = Math.round(n.top / this.itemHeight) * this.itemHeight), this.scrollTo(n.left, n.top, i, o) } }, _.prototype.resetPosition = function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : F.bounce,
            e = this.x,
            s = Math.round(e);!this.hasHorizontalScroll || 0 < s ? e = 0 : s < this.maxScrollX && (e = this.maxScrollX); var o = this.y,
            n = Math.round(o); return !this.hasVerticalScroll || 0 < n ? o = 0 : n < this.maxScrollY && (o = this.maxScrollY), (e !== this.x || o !== this.y) && (this.scrollTo(e, o, t, i), !0) }, _.prototype.getComputedPosition = function() { var t = window.getComputedStyle(this.scroller, null),
            i = void 0,
            e = void 0; return e = this.options.useTransform ? (i = +((t = t[C.transform].split(")")[0].split(", "))[12] || t[4]), +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), +t.top.replace(/[^-\d.]/g, "")), { x: i, y: e } }, _.prototype.stop = function() { if (this.options.useTransition && this.isInTransition) { this.isInTransition = !1; var t = this.getComputedPosition();
            this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[Math.round(-t.y / this.itemHeight)] : this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0 } else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0) }, _.prototype.destroy = function() { this.destroyed = !0, this.trigger("destroy"), this._removeDOMEvents(), this._events = {} }, (b = o).prototype.on = function(t, i) { var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
        this._events[t] || (this._events[t] = []), this._events[t].push([i, e]) }, b.prototype.once = function(t, i) {
        function e() { this.off(t, e), i.apply(s, arguments) } var s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
        e.fn = i, this.on(t, e) }, b.prototype.off = function(t, i) { var e = this._events[t]; if (e)
            for (var s = e.length; s--;)(e[s][0] === i || e[s][0] && e[s][0].fn === i) && (e[s][0] = void 0) }, b.prototype.trigger = function(t) { var i = this._events[t]; if (i)
            for (var e = i.length, s = [].concat(function(t) { if (Array.isArray(t)) { for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i]; return e } return Array.from(t) }(i)), o = 0; o < e; o++) { var n = s[o],
                    r = P(n, 2),
                    h = r[0],
                    a = r[1];
                h && h.apply(a, [].slice.call(arguments, 1)) } }, (T = o).prototype._initSnap = function() { var g = this;
        this.currentPage = {}; var t, i, e, s, f = this.options.snap; if (f.loop) { var o = this.scroller.children;
            1 < o.length ? (t = o[o.length - 1].cloneNode(!0), (i = this.scroller).firstChild ? (e = t, (s = i.firstChild).parentNode.insertBefore(e, s)) : i.appendChild(t), this.scroller.appendChild(o[1].cloneNode(!0))) : f.loop = !1 } var m = f.el; "string" == typeof m && (m = this.scroller.querySelectorAll(m)), this.on("refresh", function() { if (g.pages = [], g.wrapperWidth && g.wrapperHeight && g.scrollerWidth && g.scrollerHeight) { var t = f.stepX || g.wrapperWidth,
                    i = f.stepY || g.wrapperHeight,
                    e = 0,
                    s = void 0,
                    o = void 0,
                    n = void 0,
                    r = 0,
                    h = void 0,
                    a = 0,
                    l = void 0,
                    c = void 0; if (m)
                    for (h = m.length, l = -1; r < h; r++) c = v(m[r]), (0 === r || c.left <= v(m[r - 1]).left) && (a = 0, l++), g.pages[a] || (g.pages[a] = []), e = Math.max(-c.left, g.maxScrollX), s = Math.max(-c.top, g.maxScrollY), o = e - Math.round(c.width / 2), n = s - Math.round(c.height / 2), g.pages[a][l] = { x: e, y: s, width: c.width, height: c.height, cx: o, cy: n }, e > g.maxScrollX && a++;
                else
                    for (o = Math.round(t / 2), n = Math.round(i / 2); e > -g.scrollerWidth;) { for (g.pages[r] = [], s = h = 0; s > -g.scrollerHeight;) g.pages[r][h] = { x: Math.max(e, g.maxScrollX), y: Math.max(s, g.maxScrollY), width: t, height: i, cx: e - o, cy: s - n }, s -= i, h++;
                        e -= t, r++ }
                g._checkSnapLoop(); var p = f._loopX ? 1 : 0,
                    u = f._loopY ? 1 : 0;
                g._goToPage(g.currentPage.pageX || p, g.currentPage.pageY || u, 0); var d = f.threshold;
                g.snapThresholdY = d % 1 == 0 ? g.snapThresholdX = d : (g.snapThresholdX = Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].width * d), Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].height * d)) } }), this.on("scrollEnd", function() { f.loop && (f._loopX ? (0 === g.currentPage.pageX && g._goToPage(g.pages.length - 2, g.currentPage.pageY, 0), g.currentPage.pageX === g.pages.length - 1 && g._goToPage(1, g.currentPage.pageY, 0)) : (0 === g.currentPage.pageY && g._goToPage(g.currentPage.pageX, g.pages[0].length - 2, 0), g.currentPage.pageY === g.pages[0].length - 1 && g._goToPage(g.currentPage.pageX, 1, 0))) }), !1 !== f.listenFlick && this.on("flick", function() { var t = f.speed || Math.max(Math.max(Math.min(Math.abs(g.x - g.startX), 1e3), Math.min(Math.abs(g.y - g.startY), 1e3)), 300);
            g._goToPage(g.currentPage.pageX + g.directionX, g.currentPage.pageY + g.directionY, t) }), this.on("destroy", function() { if (f.loop) { var t = g.scroller.children;
                2 < t.length && (n(g.scroller, t[t.length - 1]), n(g.scroller, t[0])) } }) }, T.prototype._checkSnapLoop = function() { var t = this.options.snap;
        t.loop && this.pages && (1 < this.pages.length && (t._loopX = !0), this.pages[0] && 1 < this.pages[0].length && (t._loopY = !0), t._loopX && t._loopY && s("Loop does not support two direction at the same time.")) }, T.prototype._nearestSnap = function(t, i) { if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 }; var e = 0; if (Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(i - this.absStartY) <= this.snapThresholdY) return this.currentPage;
        0 < t ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), 0 < i ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); for (var s = this.pages.length; e < s; e++)
            if (t >= this.pages[e][0].cx) { t = this.pages[e][0].x; break }
        s = this.pages[e].length; for (var o = 0; o < s; o++)
            if (i >= this.pages[0][o].cy) { i = this.pages[0][o].y; break }
        return e === this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), o === this.currentPage.pageY && ((o += this.directionY) < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), i = this.pages[0][o].y), { x: t, y: i, pageX: e, pageY: o } }, T.prototype._goToPage = function(t) { var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
            e = arguments[2],
            s = arguments[3],
            o = this.options.snap; if (o && this.pages && (s = s || o.easing || F.bounce, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), this.pages[t])) { i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0); var n = this.pages[t][i].x,
                r = this.pages[t][i].y;
            e = void 0 === e ? o.speed || Math.max(Math.max(Math.min(Math.abs(n - this.x), 1e3), Math.min(Math.abs(r - this.y), 1e3)), 300) : e, this.currentPage = { x: n, y: r, pageX: t, pageY: i }, this.scrollTo(n, r, e, s) } }, T.prototype.goToPage = function(t, i, e, s) { var o = this.options.snap; if (o) { if (o.loop) { var n = void 0;
                o._loopX ? (t >= (n = this.pages.length - 2) ? t = n - 1 : t < 0 && (t = 0), t += 1) : (i >= (n = this.pages[0].length - 2) ? i = n - 1 : i < 0 && (i = 0), i += 1) }
            this._goToPage(t, i, e, s) } }, T.prototype.next = function(t, i) { if (this.options.snap) { var e = this.currentPage.pageX,
                s = this.currentPage.pageY;++e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this._goToPage(e, s, t, i) } }, T.prototype.prev = function(t, i) { if (this.options.snap) { var e = this.currentPage.pageX,
                s = this.currentPage.pageY;--e < 0 && this.hasVerticalScroll && (e = 0, s--), this._goToPage(e, s, t, i) } }, T.prototype.getCurrentPage = function() { var t = this.options.snap; return t ? t.loop ? t._loopX ? a({}, this.currentPage, { pageX: this.currentPage.pageX - 1 }) : a({}, this.currentPage, { pageY: this.currentPage.pageY - 1 }) : this.currentPage : null }, (x = o).prototype.wheelTo = function() { var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.options.wheel && (this.y = -t * this.itemHeight, this.scrollTo(0, this.y)) }, x.prototype.getSelectedIndex = function() { return this.options.wheel && this.selectedIndex }, x.prototype._initWheel = function() { var t = this.options.wheel;
        t.wheelWrapperClass || (t.wheelWrapperClass = "wheel-scroll"), t.wheelItemClass || (t.wheelItemClass = "wheel-item"), void 0 === t.selectedIndex && (t.selectedIndex = 0, s("wheel option selectedIndex is required!")) }, (w = o).prototype._initScrollbar = function() { var i = this,
            t = this.options.scrollbar,
            e = t.fade,
            s = void 0 === e || e,
            o = t.interactive,
            n = void 0 !== o && o;
        this.indicators = []; var r = void 0;
        this.options.scrollX && (r = { el: p("horizontal"), direction: "horizontal", fade: s, interactive: n }, this._insertScrollBar(r.el), this.indicators.push(new u(this, r))), this.options.scrollY && (r = { el: p("vertical"), direction: "vertical", fade: s, interactive: n }, this._insertScrollBar(r.el), this.indicators.push(new u(this, r))), this.on("refresh", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].refresh() }), s && (this.on("scrollEnd", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade() }), this.on("scrollCancel", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade() }), this.on("scrollStart", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0) }), this.on("beforeScrollStart", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0, !0) })), this.on("destroy", function() { i._removeScrollBars() }) }, w.prototype._insertScrollBar = function(t) { this.wrapper.appendChild(t) }, w.prototype._removeScrollBars = function() { for (var t = 0; t < this.indicators.length; t++) this.indicators[t].destroy() }, (y = o).prototype._initPullDown = function() { this.options.probeType = 3 }, y.prototype._checkPullDown = function() { var t = this.options.pullDownRefresh,
            i = t.threshold,
            e = void 0 === i ? 90 : i,
            s = t.stop,
            o = void 0 === s ? 40 : s; return !(-1 !== this.directionY || this.y < e) && (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, o, this.options.bounceTime, F.bounce), this.pulling) }, y.prototype.finishPullDown = function() { this.pulling = !1, this.resetPosition(this.options.bounceTime, F.bounce) }, y.prototype.openPullDown = function() { var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullDownRefresh = t, this._initPullDown() }, y.prototype.closePullDown = function() { this.options.pullDownRefresh = !1 }, (m = o).prototype._initPullUp = function() { this.options.probeType = 3, this.pullupWatching = !1, this._watchPullUp() }, m.prototype._watchPullUp = function() { this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd)) }, m.prototype._checkToEnd = function(t) { var i = this,
            e = this.options.pullUpLoad.threshold,
            s = void 0 === e ? 0 : e;
        1 === this.movingDirectionY && t.y <= this.maxScrollY + s && (this.once("scrollEnd", function() { i.pullupWatching = !1 }), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd)) }, m.prototype.finishPullUp = function() { var t = this;
        this.pullupWatching ? this.once("scrollEnd", function() { t._watchPullUp() }) : this._watchPullUp() }, m.prototype.openPullUp = function() { var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullUpLoad = t, this._initPullUp() }, m.prototype.closePullUp = function() { this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd)) }, (r = o).prototype._initMouseWheel = function() { var t = this;
        this._handleMouseWheelEvent(e), this.on("destroy", function() { clearTimeout(t.mouseWheelTimer), t._handleMouseWheelEvent(l) }), this.firstWheelOpreation = !0 }, r.prototype._handleMouseWheelEvent = function(t) { t(this.wrapper, "wheel", this), t(this.wrapper, "mousewheel", this), t(this.wrapper, "DOMMouseScroll", this) }, r.prototype._onMouseWheel = function(t) { var i = this; if (this.enabled) { t.preventDefault(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1, clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() { i.options.snap || i.trigger("scrollEnd", { x: i.x, y: i.y }), i.firstWheelOpreation = !0 }, 400); var e = this.options.mouseWheel,
                s = e.speed,
                o = void 0 === s ? 20 : s,
                n = e.invert,
                r = void 0 !== n && n,
                h = void 0,
                a = void 0; switch (!0) {
                case "deltaX" in t:
                    a = 1 === t.deltaMode ? (h = -t.deltaX * o, -t.deltaY * o) : (h = -t.deltaX, -t.deltaY); break;
                case "wheelDeltaX" in t:
                    h = t.wheelDeltaX / 120 * o, a = t.wheelDeltaY / 120 * o; break;
                case "wheelDelta" in t:
                    h = a = t.wheelDelta / 120 * o; break;
                case "detail" in t:
                    h = a = -t.detail / 3 * o; break;
                default:
                    return } var l = r ? -1 : 1;
            h *= l, a *= l, this.hasVerticalScroll || (h = a, a = 0); var c = void 0,
                p = void 0; if (this.options.snap) return c = this.currentPage.pageX, p = this.currentPage.pageY, 0 < h ? c-- : h < 0 && c++, 0 < a ? p-- : a < 0 && p++, void this._goToPage(c, p);
            c = this.x + Math.round(this.hasHorizontalScroll ? h : 0), p = this.y + Math.round(this.hasVerticalScroll ? a : 0), this.directionX = 0 < h ? -1 : h < 0 ? 1 : 0, this.directionY = 0 < a ? -1 : a < 0 ? 1 : 0, 0 < c ? c = 0 : c < this.maxScrollX && (c = this.maxScrollX), 0 < p ? p = 0 : p < this.maxScrollY && (p = this.maxScrollY), this.scrollTo(c, p), this.trigger("scroll", { x: this.x, y: this.y }) } }, o.Version = "1.9.1", o });
! function(n, e) { var t, i = n.document,
        a = i.documentElement,
        r = i.querySelector('meta[name="viewport"]'),
        o = i.querySelector('meta[name="flexible"]'),
        l = 0,
        s = 0,
        d = e.flexible || (e.flexible = {}); if (o) { var m = o.getAttribute("content"); if (m) { var p = m.match(/initial\-dpr=([\d\.]+)/),
                f = m.match(/maximum\-dpr=([\d\.]+)/);
            p && (l = parseFloat(p[1]), s = parseFloat((1 / l).toFixed(2))), f && (l = parseFloat(f[1]), s = parseFloat((1 / l).toFixed(2))) } } if (!l && !s) { n.navigator.appVersion.match(/android/gi), n.navigator.appVersion.match(/iphone/gi); var c = n.devicePixelRatio;
        s = 1 / (l = 3 <= c && (!l || 3 <= l) ? 3 : 2 <= c && (!l || 2 <= l) ? 2 : 1) } if (a.setAttribute("data-dpr", l), (r = i.createElement("meta")).setAttribute("name", "viewport"), r.setAttribute("content", "width=device-width, initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no"), a.firstElementChild) a.firstElementChild.appendChild(r);
    else { var u = i.createElement("div");
        u.appendChild(r), i.write(u.innerHTML) }

    function h() { var e = a.getBoundingClientRect().width;
        540 < e / l && (e = 540 * l); var t = e / 10;
        a.style.fontSize = t + "px", d.rem = n.rem = t; var i = parseFloat(a.style.fontSize),
            r = parseFloat(window.getComputedStyle(a).getPropertyValue("font-size"));
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", i, r), i !== r && (a.style.fontSize = i * (i / r) + "px", console.log("flexible.refreshRem.fixed: fontSize  => ", a.style.fontSize)) }
    n.addEventListener("resize", function() { clearTimeout(t), t = setTimeout(h, 300) }, !1), n.addEventListener("pageshow", function(e) { e.persisted && (clearTimeout(t), t = setTimeout(h, 300)) }, !1), "complete" === i.readyState ? i.body.style.fontSize = 12 * l + "px" : i.addEventListener("DOMContentLoaded", function(e) { i.body.style.fontSize = 12 * l + "px" }, !1), h(), d.dpr = n.dpr = l, d.refreshRem = h, d.rem2px = function(e) { var t = parseFloat(e) * this.rem; return "string" == typeof e && e.match(/rem$/) && (t += "px"), t }, d.px2rem = function(e) { var t = parseFloat(e) / this.rem; return "string" == typeof e && e.match(/px$/) && (t += "rem"), t } }(window, window.lib || (window.lib = {}));
! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t() }(this, function() { "use strict"; var f = "undefined" == typeof document ? { body: {}, addEventListener: function() {}, removeEventListener: function() {}, activeElement: { blur: function() {}, nodeName: "" }, querySelector: function() { return null }, querySelectorAll: function() { return [] }, getElementById: function() { return null }, createEvent: function() { return { initEvent: function() {} } }, createElement: function() { return { children: [], childNodes: [], style: {}, setAttribute: function() {}, getElementsByTagName: function() { return [] } } }, location: { hash: "" } } : document,
        Y = "undefined" == typeof window ? { document: f, navigator: { userAgent: "" }, location: {}, history: {}, CustomEvent: function() { return this }, addEventListener: function() {}, removeEventListener: function() {}, getComputedStyle: function() { return { getPropertyValue: function() { return "" } } }, Image: function() {}, Date: function() {}, screen: {}, setTimeout: function() {}, clearTimeout: function() {} } : window,
        l = function(e) { for (var t = 0; t < e.length; t += 1) this[t] = e[t]; return this.length = e.length, this };

    function L(e, t) { var a = [],
            i = 0; if (e && !t && e instanceof l) return e; if (e)
            if ("string" == typeof e) { var s, r, n = e.trim(); if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) { var o = "div"; for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i]) } else
                    for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i]) } else if (e.nodeType || e === Y || e === f) a.push(e);
        else if (0 < e.length && e[0].nodeType)
            for (i = 0; i < e.length; i += 1) a.push(e[i]); return new l(a) }

    function r(e) { for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]); return t }
    L.fn = l.prototype, L.Class = l, L.Dom7 = l; var t = { addClass: function(e) { if (void 0 === e) return this; for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]); return this }, removeClass: function(e) { for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]); return this }, hasClass: function(e) { return !!this[0] && this[0].classList.contains(e) }, toggleClass: function(e) { for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]); return this }, attr: function(e, t) { var a = arguments; if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0; for (var i = 0; i < this.length; i += 1)
                if (2 === a.length) this[i].setAttribute(e, t);
                else
                    for (var s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
            return this }, removeAttr: function(e) { for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e); return this }, data: function(e, t) { var a; if (void 0 !== t) { for (var i = 0; i < this.length; i += 1)(a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t; return this } if (a = this[0]) return a.dom7ElementDataStorage && e in a.dom7ElementDataStorage ? a.dom7ElementDataStorage[e] : a.getAttribute("data-" + e) || void 0 }, transform: function(e) { for (var t = 0; t < this.length; t += 1) { var a = this[t].style;
                a.webkitTransform = e, a.transform = e } return this }, transition: function(e) { "string" != typeof e && (e += "ms"); for (var t = 0; t < this.length; t += 1) { var a = this[t].style;
                a.webkitTransitionDuration = e, a.transitionDuration = e } return this }, on: function() { for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a]; var i = t[0],
                r = t[1],
                n = t[2],
                s = t[3];

            function o(e) { var t = e.target; if (t) { var a = e.target.dom7EventData || []; if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a);
                    else
                        for (var i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a) } }

            function l(e) { var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t) } "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1); for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) { var u = this[c]; if (r)
                    for (d = 0; d < p.length; d += 1) { var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({ listener: n, proxyListener: o }), u.addEventListener(h, o, s) } else
                        for (d = 0; d < p.length; d += 1) { var v = p[d];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({ listener: n, proxyListener: l }), u.addEventListener(v, l, s) } } return this }, off: function() { for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a]; var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3]; "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1); for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) { var c = this[p],
                        u = void 0; if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) { var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) } }
            return this }, trigger: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
                for (var r = a[s], n = 0; n < this.length; n += 1) { var o = this[n],
                        l = void 0; try { l = new Y.CustomEvent(r, { detail: i, bubbles: !0, cancelable: !0 }) } catch (e) {
                        (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i }
                    o.dom7EventData = e.filter(function(e, t) { return 0 < t }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData }
            return this }, transitionEnd: function(t) { var a, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function r(e) { if (e.target === this)
                    for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r) } if (t)
                for (a = 0; a < i.length; a += 1) s.on(i[a], r); return this }, outerWidth: function(e) { if (0 < this.length) { if (e) { var t = this.styles(); return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left")) } return this[0].offsetWidth } return null }, outerHeight: function(e) { if (0 < this.length) { if (e) { var t = this.styles(); return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom")) } return this[0].offsetHeight } return null }, offset: function() { if (0 < this.length) { var e = this[0],
                    t = e.getBoundingClientRect(),
                    a = f.body,
                    i = e.clientTop || a.clientTop || 0,
                    s = e.clientLeft || a.clientLeft || 0,
                    r = e === Y ? Y.scrollY : e.scrollTop,
                    n = e === Y ? Y.scrollX : e.scrollLeft; return { top: t.top + r - i, left: t.left + n - s } } return null }, css: function(e, t) { var a; if (1 === arguments.length) { if ("string" != typeof e) { for (a = 0; a < this.length; a += 1)
                        for (var i in e) this[a].style[i] = e[i]; return this } if (this[0]) return Y.getComputedStyle(this[0], null).getPropertyValue(e) } if (2 !== arguments.length || "string" != typeof e) return this; for (a = 0; a < this.length; a += 1) this[a].style[e] = t; return this }, each: function(e) { if (!e) return this; for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this }, html: function(e) { if (void 0 === e) return this[0] ? this[0].innerHTML : void 0; for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e; return this }, text: function(e) { if (void 0 === e) return this[0] ? this[0].textContent.trim() : null; for (var t = 0; t < this.length; t += 1) this[t].textContent = e; return this }, is: function(e) { var t, a, i = this[0]; if (!i || void 0 === e) return !1; if ("string" == typeof e) { if (i.matches) return i.matches(e); if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e); if (i.msMatchesSelector) return i.msMatchesSelector(e); for (t = L(e), a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1 } if (e === f) return i === f; if (e === Y) return i === Y; if (e.nodeType || e instanceof l) { for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1 } return !1 }, index: function() { var e, t = this[0]; if (t) { for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1); return e } }, eq: function(e) { if (void 0 === e) return this; var t, a = this.length; return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]]) }, append: function() { for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a]; for (var i = 0; i < t.length; i += 1) { e = t[i]; for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) { var r = f.createElement("div"); for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild) } else if (e instanceof l)
                    for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
                else this[s].appendChild(e) } return this }, prepend: function(e) { var t, a, i = this; for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) { var s = f.createElement("div"); for (s.innerHTML = e, a = s.childNodes.length - 1; 0 <= a; a -= 1) i[t].insertBefore(s.childNodes[a], i[t].childNodes[0]) } else if (e instanceof l)
                for (a = 0; a < e.length; a += 1) i[t].insertBefore(e[a], i[t].childNodes[0]);
            else i[t].insertBefore(e, i[t].childNodes[0]); return this }, next: function(e) { return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([]) }, nextAll: function(e) { var t = [],
                a = this[0]; if (!a) return new l([]); for (; a.nextElementSibling;) { var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i } return new l(t) }, prev: function(e) { if (0 < this.length) { var t = this[0]; return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([]) } return new l([]) }, prevAll: function(e) { var t = [],
                a = this[0]; if (!a) return new l([]); for (; a.previousElementSibling;) { var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i } return new l(t) }, parent: function(e) { for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode)); return L(r(t)) }, parents: function(e) { for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode; return L(r(t)) }, closest: function(e) { var t = this; return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t) }, find: function(e) { for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]); return new l(t) }, children: function(e) { for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]); return new l(r(t)) }, remove: function() { for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]); return this }, add: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; var a, i; for (a = 0; a < e.length; a += 1) { var s = L(e[a]); for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1 } return this }, styles: function() { return this[0] ? Y.getComputedStyle(this[0], null) : {} } };
    Object.keys(t).forEach(function(e) { L.fn[e] = t[e] }); var e, a, i, V = { deleteProps: function(e) { var t = e;
                Object.keys(t).forEach(function(e) { try { t[e] = null } catch (e) {} try { delete t[e] } catch (e) {} }) }, nextTick: function(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) }, now: function() { return Date.now() }, getTranslate: function(e, t) { var a, i, s;
                void 0 === t && (t = "x"); var r = Y.getComputedStyle(e, null); return Y.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) { return e.replace(",", ".") }).join(", ")), s = new Y.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = Y.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = Y.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0 }, parseUrlQuery: function(e) { var t, a, i, s, r = {},
                    n = e || Y.location.href; if ("string" == typeof n && n.length)
                    for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function(e) { return "" !== e })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || ""; return r }, isObject: function(e) { return "object" == typeof e && null !== e && e.constructor && e.constructor === Object }, extend: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; for (var a = Object(e[0]), i = 1; i < e.length; i += 1) { var s = e[i]; if (null != s)
                        for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) { var l = r[n],
                                d = Object.getOwnPropertyDescriptor(s, l);
                            void 0 !== d && d.enumerable && (V.isObject(a[l]) && V.isObject(s[l]) ? V.extend(a[l], s[l]) : !V.isObject(a[l]) && V.isObject(s[l]) ? (a[l] = {}, V.extend(a[l], s[l])) : a[l] = s[l]) } } return a } },
        R = (i = f.createElement("div"), { touch: Y.Modernizr && !0 === Y.Modernizr.touch || !!("ontouchstart" in Y || Y.DocumentTouch && f instanceof Y.DocumentTouch), pointerEvents: !(!Y.navigator.pointerEnabled && !Y.PointerEvent), prefixedPointerEvents: !!Y.navigator.msPointerEnabled, transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a), transforms3d: Y.Modernizr && !0 === Y.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e), flexbox: function() { for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                    if (t[a] in e) return !0;
                return !1 }(), observer: "MutationObserver" in Y || "WebkitMutationObserver" in Y, passiveListener: function() { var e = !1; try { var t = Object.defineProperty({}, "passive", { get: function() { e = !0 } });
                    Y.addEventListener("testPassiveListener", null, t) } catch (e) {} return e }(), gestures: "ongesturestart" in Y }),
        s = function(e) { void 0 === e && (e = {}); var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) { t.on(e, t.params.on[e]) }) },
        n = { components: { configurable: !0 } };
    s.prototype.on = function(e, t, a) { var i = this; if ("function" != typeof t) return i; var s = a ? "unshift" : "push"; return e.split(" ").forEach(function(e) { i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t) }), i }, s.prototype.once = function(i, s, e) { var r = this; return "function" != typeof s ? r : r.on(i, function e() { for (var t = [], a = arguments.length; a--;) t[a] = arguments[a];
            s.apply(r, t), r.off(i, e) }, e) }, s.prototype.off = function(e, i) { var s = this; return s.eventsListeners && e.split(" ").forEach(function(a) { void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function(e, t) { e === i && s.eventsListeners[a].splice(t, 1) }) }), s }, s.prototype.emit = function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; var a, i, s, r = this; return r.eventsListeners && (s = "string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), r) : (a = e[0].events, i = e[0].data, e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function(e) { if (r.eventsListeners && r.eventsListeners[e]) { var t = [];
                r.eventsListeners[e].forEach(function(e) { t.push(e) }), t.forEach(function(e) { e.apply(s, i) }) } })), r }, s.prototype.useModulesParams = function(a) { var i = this;
        i.modules && Object.keys(i.modules).forEach(function(e) { var t = i.modules[e];
            t.params && V.extend(a, t.params) }) }, s.prototype.useModules = function(i) { void 0 === i && (i = {}); var s = this;
        s.modules && Object.keys(s.modules).forEach(function(e) { var a = s.modules[e],
                t = i[e] || {};
            a.instance && Object.keys(a.instance).forEach(function(e) { var t = a.instance[e];
                s[e] = "function" == typeof t ? t.bind(s) : t }), a.on && s.on && Object.keys(a.on).forEach(function(e) { s.on(e, a.on[e]) }), a.create && a.create.bind(s)(t) }) }, n.components.set = function(e) { this.use && this.use(e) }, s.installModule = function(t) { for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1]; var i = this;
        i.prototype.modules || (i.prototype.modules = {}); var s = t.name || Object.keys(i.prototype.modules).length + "_" + V.now(); return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function(e) { i.prototype[e] = t.proto[e] }), t.static && Object.keys(t.static).forEach(function(e) { i[e] = t.static[e] }), t.install && t.install.apply(i, e), i }, s.use = function(e) { for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1]; var i = this; return Array.isArray(e) ? (e.forEach(function(e) { return i.installModule(e) }), i) : i.installModule.apply(i, [e].concat(t)) }, Object.defineProperties(s, n); var o = { updateSize: function() { var e, t, a = this,
                    i = a.$el;
                e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), V.extend(a, { width: e, height: t, size: a.isHorizontal() ? e : t })) }, updateSlides: function() { var e = this,
                    t = e.params,
                    a = e.$wrapperEl,
                    i = e.size,
                    s = e.rtlTranslate,
                    r = e.wrongRTL,
                    n = e.virtual && t.virtual.enabled,
                    o = n ? e.virtual.slides.length : e.slides.length,
                    l = a.children("." + e.params.slideClass),
                    d = n ? e.virtual.slides.length : l.length,
                    p = [],
                    c = [],
                    u = [],
                    h = t.slidesOffsetBefore; "function" == typeof h && (h = t.slidesOffsetBefore.call(e)); var v = t.slidesOffsetAfter; "function" == typeof v && (v = t.slidesOffsetAfter.call(e)); var f = e.snapGrid.length,
                    m = e.snapGrid.length,
                    g = t.spaceBetween,
                    b = -h,
                    w = 0,
                    y = 0; if (void 0 !== i) { var x, T; "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({ marginLeft: "", marginTop: "" }) : l.css({ marginRight: "", marginBottom: "" }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn))); for (var E, S = t.slidesPerColumn, C = x / S, M = C - (t.slidesPerColumn * C - d), k = 0; k < d; k += 1) { T = 0; var z = l.eq(k); if (1 < t.slidesPerColumn) { var P = void 0,
                                $ = void 0,
                                L = void 0; "column" === t.slidesPerColumnFill ? (L = k - ($ = Math.floor(k / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), P = $ + L * x / S, z.css({ "-webkit-box-ordinal-group": P, "-moz-box-ordinal-group": P, "-ms-flex-order": P, "-webkit-order": P, order: P })) : $ = k - (L = Math.floor(k / C)) * C, z.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L) } if ("none" !== z.css("display")) { if ("auto" === t.slidesPerView) { var I = Y.getComputedStyle(z[0], null),
                                    D = z[0].style.transform,
                                    O = z[0].style.webkitTransform;
                                D && (z[0].style.transform = "none"), O && (z[0].style.webkitTransform = "none"), T = t.roundLengths ? e.isHorizontal() ? z.outerWidth(!0) : z.outerHeight(!0) : e.isHorizontal() ? z[0].getBoundingClientRect().width + parseFloat(I.getPropertyValue("margin-left")) + parseFloat(I.getPropertyValue("margin-right")) : z[0].getBoundingClientRect().height + parseFloat(I.getPropertyValue("margin-top")) + parseFloat(I.getPropertyValue("margin-bottom")), D && (z[0].style.transform = D), O && (z[0].style.webkitTransform = O), t.roundLengths && (T = Math.floor(T)) } else T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[k] && (e.isHorizontal() ? l[k].style.width = T + "px" : l[k].style.height = T + "px");
                            l[k] && (l[k].swiperSlideSize = T), u.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== k && (b = b - i / 2 - g), 0 === k && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1 } } if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({ width: e.virtualSize + t.spaceBetween + "px" }), R.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({ width: e.virtualSize + t.spaceBetween + "px" }) : a.css({ height: e.virtualSize + t.spaceBetween + "px" })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({ width: e.virtualSize + t.spaceBetween + "px" }) : a.css({ height: e.virtualSize + t.spaceBetween + "px" }), t.centeredSlides)) { E = []; for (var A = 0; A < p.length; A += 1) { var H = p[A];
                            t.roundLengths && (H = Math.floor(H)), p[A] < e.virtualSize + p[0] && E.push(H) }
                        p = E } if (!t.centeredSlides) { E = []; for (var B = 0; B < p.length; B += 1) { var G = p[B];
                            t.roundLengths && (G = Math.floor(G)), p[B] <= e.virtualSize - i && E.push(G) }
                        p = E, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i) } if (0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({ marginLeft: g + "px" }) : l.css({ marginRight: g + "px" }) : l.css({ marginBottom: g + "px" })), t.centerInsufficientSlides) { var N = 0; if (u.forEach(function(e) { N += e + (t.spaceBetween ? t.spaceBetween : 0) }), (N -= t.spaceBetween) < i) { var X = (i - N) / 2;
                            p.forEach(function(e, t) { p[t] = e - X }), c.forEach(function(e, t) { c[t] = e + X }) } }
                    V.extend(e, { slides: l, snapGrid: p, slidesGrid: c, slidesSizesGrid: u }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset() } }, updateAutoHeight: function(e) { var t, a = this,
                    i = [],
                    s = 0; if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
                    for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) { var r = a.activeIndex + t; if (r > a.slides.length) break;
                        i.push(a.slides.eq(r)[0]) } else i.push(a.slides.eq(a.activeIndex)[0]); for (t = 0; t < i.length; t += 1)
                    if (void 0 !== i[t]) { var n = i[t].offsetHeight;
                        s = s < n ? n : s }
                s && a.$wrapperEl.css("height", s + "px") }, updateSlidesOffset: function() { for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop }, updateSlidesProgress: function(e) { void 0 === e && (e = this && this.translate || 0); var t = this,
                    a = t.params,
                    i = t.slides,
                    s = t.rtlTranslate; if (0 !== i.length) { void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset(); var r = -e;
                    s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = []; for (var n = 0; n < i.length; n += 1) { var o = i[n],
                            l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween); if (a.watchSlidesVisibility) { var d = -(r - o.swiperSlideOffset),
                                p = d + t.slidesSizesGrid[n];
                            (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass)) }
                        o.progress = s ? -l : l }
                    t.visibleSlides = L(t.visibleSlides) } }, updateProgress: function(e) { void 0 === e && (e = this && this.translate || 0); var t = this,
                    a = t.params,
                    i = t.maxTranslate() - t.minTranslate(),
                    s = t.progress,
                    r = t.isBeginning,
                    n = t.isEnd,
                    o = r,
                    l = n;
                n = 0 === i ? r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, 1 <= s), V.extend(t, { progress: s, isBeginning: r, isEnd: n }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s) }, updateSlidesClasses: function() { var e, t = this,
                    a = t.slides,
                    i = t.params,
                    s = t.$wrapperEl,
                    r = t.activeIndex,
                    n = t.realIndex,
                    o = t.virtual && i.virtual.enabled;
                a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass)); var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass); var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)) }, updateActiveIndex: function(e) { var t, a = this,
                    i = a.rtlTranslate ? a.translate : -a.translate,
                    s = a.slidesGrid,
                    r = a.snapGrid,
                    n = a.params,
                    o = a.activeIndex,
                    l = a.realIndex,
                    d = a.snapIndex,
                    p = e; if (void 0 === p) { for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                    n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0) } if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) { var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                    V.extend(a, { snapIndex: t, realIndex: u, previousIndex: o, activeIndex: p }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), a.emit("slideChange") } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange")) }, updateClickedSlide: function(e) { var t = this,
                    a = t.params,
                    i = L(e.target).closest("." + a.slideClass)[0],
                    s = !1; if (i)
                    for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0); if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide() } },
        d = { getTranslate: function(e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); var t = this.params,
                    a = this.rtlTranslate,
                    i = this.translate,
                    s = this.$wrapperEl; if (t.virtualTranslate) return a ? -i : i; var r = V.getTranslate(s[0], e); return a && (r = -r), r || 0 }, setTranslate: function(e, t) { var a = this,
                    i = a.rtlTranslate,
                    s = a.params,
                    r = a.$wrapperEl,
                    n = a.progress,
                    o = 0,
                    l = 0;
                a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (R.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l; var d = a.maxTranslate() - a.minTranslate();
                (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t) }, minTranslate: function() { return -this.snapGrid[0] }, maxTranslate: function() { return -this.snapGrid[this.snapGrid.length - 1] } },
        p = { slideTo: function(e, t, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0); var s = this,
                    r = e;
                r < 0 && (r = 0); var n = s.params,
                    o = s.snapGrid,
                    l = s.slidesGrid,
                    d = s.previousIndex,
                    p = s.activeIndex,
                    c = s.rtlTranslate; if (s.animating && n.preventInteractionOnTransition) return !1; var u = Math.floor(r / n.slidesPerGroup);
                u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart"); var h, v = -o[u]; if (s.updateProgress(v), n.normalizeSlideIndex)
                    for (var f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f); if (s.initialized && r !== p) { if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1; if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1 } return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && R.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) { s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h)) }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0) }, slideToLoop: function(e, t, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0); var s = e; return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i) }, slideNext: function(e, t, a) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var i = this,
                    s = i.params,
                    r = i.animating; return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a) }, slidePrev: function(e, t, a) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var i = this,
                    s = i.params,
                    r = i.animating,
                    n = i.snapGrid,
                    o = i.slidesGrid,
                    l = i.rtlTranslate; if (s.loop) { if (r) return !1;
                    i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft }

                function d(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) } var p, c = d(l ? i.translate : -i.translate),
                    u = n.map(function(e) { return d(e) }),
                    h = (o.map(function(e) { return d(e) }), n[u.indexOf(c)], n[u.indexOf(c) - 1]); return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a) }, slideReset: function(e, t, a) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a) }, slideToClosest: function(e, t, a) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var i = this,
                    s = i.activeIndex,
                    r = Math.floor(s / i.params.slidesPerGroup); if (r < i.snapGrid.length - 1) { var n = i.rtlTranslate ? i.translate : -i.translate,
                        o = i.snapGrid[r];
                    (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup) } return i.slideTo(s, e, t, a) }, slideToClickedSlide: function() { var e, t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
                    r = t.clickedIndex; if (a.loop) { if (t.animating) return;
                    e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), V.nextTick(function() { t.slideTo(r) })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), V.nextTick(function() { t.slideTo(r) })) : t.slideTo(r) } else t.slideTo(r) } },
        c = { loopCreate: function() { var i = this,
                    e = i.params,
                    t = i.$wrapperEl;
                t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove(); var s = t.children("." + e.slideClass); if (e.loopFillGroupWithBlank) { var a = e.slidesPerGroup - s.length % e.slidesPerGroup; if (a !== e.slidesPerGroup) { for (var r = 0; r < a; r += 1) { var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                            t.append(n) }
                        s = t.children("." + e.slideClass) } } "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length); var o = [],
                    l = [];
                s.each(function(e, t) { var a = L(t);
                    e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e) }); for (var d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass)); for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass)) }, loopFix: function() { var e, t = this,
                    a = t.params,
                    i = t.activeIndex,
                    s = t.slides,
                    r = t.loopedSlides,
                    n = t.allowSlidePrev,
                    o = t.allowSlideNext,
                    l = t.snapGrid,
                    d = t.rtlTranslate;
                t.allowSlidePrev = !0, t.allowSlideNext = !0; var p = -l[i] - t.getTranslate();
                i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)), t.allowSlidePrev = n, t.allowSlideNext = o }, loopDestroy: function() { var e = this.$wrapperEl,
                    t = this.params,
                    a = this.slides;
                e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), a.removeAttr("data-swiper-slide-index") } },
        u = { setGrabCursor: function(e) { if (!(R.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) { var t = this.el;
                    t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab" } }, unsetGrabCursor: function() { R.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "") } },
        h = { appendSlide: function(e) { var t = this,
                    a = t.$wrapperEl,
                    i = t.params; if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
                else a.append(e);
                i.loop && t.loopCreate(), i.observer && R.observer || t.update() }, prependSlide: function(e) { var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && t.loopDestroy(); var r = s + 1; if ("object" == typeof e && "length" in e) { for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                    r = s + e.length } else i.prepend(e);
                a.loop && t.loopCreate(), a.observer && R.observer || t.update(), t.slideTo(r, 0, !1) }, addSlide: function(e, t) { var a = this,
                    i = a.$wrapperEl,
                    s = a.params,
                    r = a.activeIndex;
                s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass)); var n = a.slides.length; if (e <= 0) a.prependSlide(t);
                else if (n <= e) a.appendSlide(t);
                else { for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) { var p = a.slides.eq(d);
                        p.remove(), l.unshift(p) } if ("object" == typeof t && "length" in t) { for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                        o = e < r ? r + t.length : r } else i.append(t); for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                    s.loop && a.loopCreate(), s.observer && R.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1) } }, removeSlide: function(e) { var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass)); var r, n = s; if ("object" == typeof e && "length" in e) { for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                    n = Math.max(n, 0) } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
                a.loop && t.loopCreate(), a.observer && R.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1) }, removeAllSlides: function() { for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e) } },
        v = function() { var e = Y.navigator.userAgent,
                t = { ios: !1, android: !1, androidChrome: !1, desktop: !1, windows: !1, iphone: !1, ipod: !1, ipad: !1, cordova: Y.cordova || Y.phonegap, phonegap: Y.cordova || Y.phonegap },
                a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                s = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/); if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) { var o = t.osVersion.split("."),
                    l = f.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui") } return t.pixelRatio = Y.devicePixelRatio || 1, t }();

    function m() { var e = this,
            t = e.params,
            a = e.el; if (!a || 0 !== a.offsetWidth) { t.breakpoints && e.setBreakpoint(); var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid; if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) { var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight() } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow() } } var g, b = { attachEvents: function() { var e = this,
                    t = e.params,
                    a = e.touchEvents,
                    i = e.el,
                    s = e.wrapperEl;
                e.onTouchStart = function(e) { var t = this,
                        a = t.touchEventsData,
                        i = t.params,
                        s = t.touches; if (!t.animating || !i.preventInteractionOnTransition) { var r = e; if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved))
                            if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;
                            else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) { s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY; var n = s.currentX,
                                o = s.currentY,
                                l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                                d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold; if (!l || !(n <= d || n >= Y.screen.width - d)) { if (V.extend(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), s.startX = n, s.startY = o, a.touchStartTime = V.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) { var p = !0;
                                    L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur(), p && t.allowTouchMove && i.touchStartPreventDefault && r.preventDefault() }
                                t.emit("touchStart", r) } } } }.bind(e), e.onTouchMove = function(e) { var t = this,
                        a = t.touchEventsData,
                        i = t.params,
                        s = t.touches,
                        r = t.rtlTranslate,
                        n = e; if (n.originalEvent && (n = n.originalEvent), a.isTouched) { if (!a.isTouchEvent || "mousemove" !== n.type) { var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                                l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY; if (n.preventedByNestedSwiper) return s.startX = o, void(s.startY = l); if (!t.allowTouchMove) return t.allowClick = !1, void(a.isTouched && (V.extend(s, { startX: o, startY: l, currentX: o, currentY: l }), a.touchStartTime = V.now())); if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                                if (t.isVertical()) { if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1) } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return; if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void(t.allowClick = !1); if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) { s.currentX = o, s.currentY = l; var d, p = s.currentX - s.startX,
                                    c = s.currentY - s.startY; if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                                    if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                                    else if (a.startMoving) { t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0; var u = t.isHorizontal() ? p : c;
                                    s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate; var h = !0,
                                        v = i.resistanceRatio; if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) { if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate); if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY) }
                                    i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({ position: s[t.isHorizontal() ? "startX" : "startY"], time: a.touchStartTime }), a.velocities.push({ position: s[t.isHorizontal() ? "currentX" : "currentY"], time: V.now() })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate)) } } } } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n) }.bind(e), e.onTouchEnd = function(e) { var t = this,
                        a = t.touchEventsData,
                        i = t.params,
                        s = t.touches,
                        r = t.rtlTranslate,
                        n = t.$wrapperEl,
                        o = t.slidesGrid,
                        l = t.snapGrid,
                        d = e; if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
                    i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1); var p, c = V.now(),
                        u = c - a.touchStartTime; if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = V.nextTick(function() { t && !t.destroyed && t.emit("click", d) }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = V.now(), V.nextTick(function() { t.destroyed || (t.allowClick = !0) }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1); if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) { if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex); if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1)); if (i.freeModeMomentum) { if (1 < a.velocities.length) { var h = a.velocities.pop(),
                                    v = a.velocities.pop(),
                                    f = h.position - v.position,
                                    m = h.time - v.time;
                                t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < V.now() - h.time) && (t.velocity = 0) } else t.velocity = 0;
                            t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0; var g = 1e3 * i.freeModeMomentumRatio,
                                b = t.velocity * g,
                                w = t.translate + b;
                            r && (w = -w); var y, x, T = !1,
                                E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio; if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), y = t.maxTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);
                            else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), y = t.minTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);
                            else if (i.freeModeSticky) { for (var S, C = 0; C < l.length; C += 1)
                                    if (l[C] > -w) { S = C; break }
                                w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1]) } if (x && t.once("transitionEnd", function() { t.loopFix() }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                            else if (i.freeModeSticky) return void t.slideToClosest();
                            i.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function() { t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() })) })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses() } else if (i.freeModeSticky) return void t.slideToClosest();
                        (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()) } else { for (var M = 0, k = t.slidesSizesGrid[0], z = 0; z < o.length; z += i.slidesPerGroup) void 0 !== o[z + i.slidesPerGroup] ? p >= o[z] && p < o[z + i.slidesPerGroup] && (k = o[(M = z) + i.slidesPerGroup] - o[z]) : p >= o[z] && (M = z, k = o[o.length - 1] - o[o.length - 2]); var P = (p - o[M]) / k; if (u > i.longSwipesMs) { if (!i.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (P >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (P > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)) } else { if (!i.shortSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M) } } }.bind(e), e.onClick = function(e) { this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation())) }.bind(e); var r = "container" === t.touchEventsTarget ? i : s,
                    n = !!t.nested; if (R.touch || !R.pointerEvents && !R.prefixedPointerEvents) { if (R.touch) { var o = !("touchstart" !== a.start || !R.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                        r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, R.passiveListener ? { passive: !1, capture: n } : n), r.addEventListener(a.end, e.onTouchEnd, o) }(t.simulateTouch && !v.ios && !v.android || t.simulateTouch && !R.touch && v.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1)) } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(v.ios || v.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", m, !0) }, detachEvents: function() { var e = this,
                    t = e.params,
                    a = e.touchEvents,
                    i = e.el,
                    s = e.wrapperEl,
                    r = "container" === t.touchEventsTarget ? i : s,
                    n = !!t.nested; if (R.touch || !R.pointerEvents && !R.prefixedPointerEvents) { if (R.touch) { var o = !("onTouchStart" !== a.start || !R.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                        r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o) }(t.simulateTouch && !v.ios && !v.android || t.simulateTouch && !R.touch && v.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1)) } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(v.ios || v.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", m) } },
        w = { setBreakpoint: function() { var e = this,
                    t = e.activeIndex,
                    a = e.initialized,
                    i = e.loopedSlides;
                void 0 === i && (i = 0); var s = e.params,
                    r = s.breakpoints; if (r && (!r || 0 !== Object.keys(r).length)) { var n = e.getBreakpoint(r); if (n && e.currentBreakpoint !== n) { var o = n in r ? r[n] : e.originalParams,
                            l = s.loop && o.slidesPerView !== s.slidesPerView;
                        V.extend(e.params, o), V.extend(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), e.currentBreakpoint = n, l && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", o) } } }, getBreakpoint: function(e) { if (e) { var t = !1,
                        a = [];
                    Object.keys(e).forEach(function(e) { a.push(e) }), a.sort(function(e, t) { return parseInt(e, 10) - parseInt(t, 10) }); for (var i = 0; i < a.length; i += 1) { var s = a[i];
                        this.params.breakpointsInverse ? s <= Y.innerWidth && (t = s) : s >= Y.innerWidth && !t && (t = s) } return t || "max" } } },
        I = { isIE: !!Y.navigator.userAgent.match(/Trident/g) || !!Y.navigator.userAgent.match(/MSIE/g), isEdge: !!Y.navigator.userAgent.match(/Edge/g), isSafari: (g = Y.navigator.userAgent.toLowerCase(), 0 <= g.indexOf("safari") && g.indexOf("chrome") < 0 && g.indexOf("android") < 0), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(Y.navigator.userAgent) },
        y = { init: !0, direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, preventInteractionOnTransition: !1, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsInverse: !1, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !1, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !0, touchStartPreventDefault: !0, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopFillGroupWithBlank: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0 },
        x = { update: o, translate: d, transition: { setTransition: function(e, t) { this.$wrapperEl.transition(e), this.emit("setTransition", e, t) }, transitionStart: function(e, t) { void 0 === e && (e = !0); var a = this,
                        i = a.activeIndex,
                        s = a.params,
                        r = a.previousIndex;
                    s.autoHeight && a.updateAutoHeight(); var n = t; if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) { if ("reset" === n) return void a.emit("slideResetTransitionStart");
                        a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart") } }, transitionEnd: function(e, t) { void 0 === e && (e = !0); var a = this,
                        i = a.activeIndex,
                        s = a.previousIndex;
                    a.animating = !1, a.setTransition(0); var r = t; if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) { if ("reset" === r) return void a.emit("slideResetTransitionEnd");
                        a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd") } } }, slide: p, loop: c, grabCursor: u, manipulation: h, events: b, breakpoints: w, checkOverflow: { checkOverflow: function() { var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update()) } }, classes: { addClasses: function() { var t = this.classNames,
                        a = this.params,
                        e = this.rtl,
                        i = this.$el,
                        s = [];
                    s.push(a.direction), a.freeMode && s.push("free-mode"), R.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), v.android && s.push("android"), v.ios && s.push("ios"), (I.isIE || I.isEdge) && (R.pointerEvents || R.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function(e) { t.push(a.containerModifierClass + e) }), i.addClass(t.join(" ")) }, removeClasses: function() { var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" ")) } }, images: { loadImage: function(e, t, a, i, s, r) { var n;

                    function o() { r && r() }
                    e.complete && s ? o() : t ? ((n = new Y.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o() }, preloadImages: function() { var e = this;

                    function t() { null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady"))) }
                    e.imagesToLoad = e.$el.find("img"); for (var a = 0; a < e.imagesToLoad.length; a += 1) { var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t) } } } },
        T = {},
        E = function(u) {
            function h() { for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
                (s = 1 === a.length && a[0].constructor && a[0].constructor === Object ? a[0] : (t = (e = a)[0], e[1])) || (s = {}), s = V.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(x).forEach(function(t) { Object.keys(x[t]).forEach(function(e) { h.prototype[e] || (h.prototype[e] = x[t][e]) }) }); var r = this;
                void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function(e) { var t = r.modules[e]; if (t.params) { var a = Object.keys(t.params)[0],
                            i = t.params[a]; if ("object" != typeof i || null === i) return; if (!(a in s && "enabled" in i)) return;!0 === s[a] && (s[a] = { enabled: !0 }), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = { enabled: !1 }) } }); var n = V.extend({}, y);
                r.useModulesParams(n), r.params = V.extend({}, n, T, s), r.originalParams = V.extend({}, r.params), r.passedParams = V.extend({}, s); var o = (r.$ = L)(r.params.el); if (t = o[0]) { if (1 < o.length) { var l = []; return o.each(function(e, t) { var a = V.extend({}, s, { el: t });
                            l.push(new h(a)) }), l }
                    t.swiper = r, o.data("swiper", r); var d, p, c = o.children("." + r.params.wrapperClass); return V.extend(r, { $el: o, el: t, $wrapperEl: c, wrapperEl: c[0], classNames: [], slides: L(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: function() { return "horizontal" === r.params.direction }, isVertical: function() { return "vertical" === r.params.direction }, rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"), rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")), wrongRTL: "-webkit-box" === c.css("display"), activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, allowSlideNext: r.params.allowSlideNext, allowSlidePrev: r.params.allowSlidePrev, touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], R.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : R.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = { start: d[0], move: d[1], end: d[2] }, r.touchEventsDesktop = { start: p[0], move: p[1], end: p[2] }, R.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, formElements: "input, select, option, textarea, button, video", lastClickTime: V.now(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: !0, allowTouchMove: r.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), r.useModules(), r.params.init && r.init(), r } }
            u && (h.__proto__ = u); var e = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } }; return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() { var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1; if (t.centeredSlides) { for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0)); for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0)) } else
                    for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1); return n }, h.prototype.update = function() { var a = this; if (a && !a.destroyed) { var e = a.snapGrid,
                        t = a.params;
                    t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update") }

                function i() { var e = a.rtlTranslate ? -1 * a.translate : a.translate,
                        t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                    a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses() } }, h.prototype.init = function() { var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init")) }, h.prototype.destroy = function(e, t) { void 0 === e && (e = !0), void 0 === t && (t = !0); var a = this,
                    i = a.params,
                    s = a.$el,
                    r = a.$wrapperEl,
                    n = a.slides; return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function(e) { a.off(e) }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), V.deleteProps(a)), a.destroyed = !0), null }, h.extendDefaults = function(e) { V.extend(T, e) }, e.extendedDefaults.get = function() { return T }, e.defaults.get = function() { return y }, e.Class.get = function() { return u }, e.$.get = function() { return L }, Object.defineProperties(h, e), h }(s),
        S = { name: "device", proto: { device: v }, static: { device: v } },
        C = { name: "support", proto: { support: R }, static: { support: R } },
        M = { name: "browser", proto: { browser: I }, static: { browser: I } },
        k = { name: "resize", create: function() { var e = this;
                V.extend(e, { resize: { resizeHandler: function() { e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize")) }, orientationChangeHandler: function() { e && !e.destroyed && e.initialized && e.emit("orientationchange") } } }) }, on: { init: function() { Y.addEventListener("resize", this.resize.resizeHandler), Y.addEventListener("orientationchange", this.resize.orientationChangeHandler) }, destroy: function() { Y.removeEventListener("resize", this.resize.resizeHandler), Y.removeEventListener("orientationchange", this.resize.orientationChangeHandler) } } },
        z = { func: Y.MutationObserver || Y.WebkitMutationObserver, attach: function(e, t) { void 0 === t && (t = {}); var a = this,
                    i = new z.func(function(e) { if (1 !== e.length) { var t = function() { a.emit("observerUpdate", e[0]) };
                            Y.requestAnimationFrame ? Y.requestAnimationFrame(t) : Y.setTimeout(t, 0) } else a.emit("observerUpdate", e[0]) });
                i.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), a.observer.observers.push(i) }, init: function() { var e = this; if (R.observer && e.params.observer) { if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], { childList: !1 }), e.observer.attach(e.$wrapperEl[0], { attributes: !1 }) } }, destroy: function() { this.observer.observers.forEach(function(e) { e.disconnect() }), this.observer.observers = [] } },
        P = { name: "observer", params: { observer: !1, observeParents: !1 }, create: function() { V.extend(this, { observer: { init: z.init.bind(this), attach: z.attach.bind(this), destroy: z.destroy.bind(this), observers: [] } }) }, on: { init: function() { this.observer.init() }, destroy: function() { this.observer.destroy() } } },
        $ = { update: function(e) { var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.params.virtual,
                    o = n.addSlidesBefore,
                    l = n.addSlidesAfter,
                    d = t.virtual,
                    p = d.from,
                    c = d.to,
                    u = d.slides,
                    h = d.slidesGrid,
                    v = d.renderSlide,
                    f = d.offset;
                t.updateActiveIndex(); var m, g, b, w = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", b = r ? (g = Math.floor(i / 2) + s + o, Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, s + l); var y = Math.max((w || 0) - b, 0),
                    x = Math.min((w || 0) + g, u.length - 1),
                    T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

                function E() { t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load() } if (V.extend(t.virtual, { from: y, to: x, offset: T, slidesGrid: t.slidesGrid }), p === y && c === x && !e) return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"), void t.updateProgress(); if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, { offset: T, from: y, to: x, slides: function() { for (var e = [], t = y; t <= x; t += 1) e.push(u[t]); return e }() }), void E(); var S = [],
                    C = []; if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var M = p; M <= c; M += 1)(M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove(); for (var k = 0; k < u.length; k += 1) y <= k && k <= x && (void 0 === c || e ? C.push(k) : (c < k && C.push(k), k < p && S.push(k)));
                C.forEach(function(e) { t.$wrapperEl.append(v(u[e], e)) }), S.sort(function(e, t) { return e < t }).forEach(function(e) { t.$wrapperEl.prepend(v(u[e], e)) }), t.$wrapperEl.children(".swiper-slide").css(m, T + "px"), E() }, renderSlide: function(e, t) { var a = this,
                    i = a.params.virtual; if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t]; var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>"); return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s }, appendSlide: function(e) { this.virtual.slides.push(e), this.virtual.update(!0) }, prependSlide: function(e) { var t = this; if (t.virtual.slides.unshift(e), t.params.virtual.cache) { var a = t.virtual.cache,
                        i = {};
                    Object.keys(a).forEach(function(e) { i[e + 1] = a[e] }), t.virtual.cache = i }
                t.virtual.update(!0), t.slideNext(0) } },
        D = { name: "virtual", params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, addSlidesBefore: 0, addSlidesAfter: 0 } }, create: function() { var e = this;
                V.extend(e, { virtual: { update: $.update.bind(e), appendSlide: $.appendSlide.bind(e), prependSlide: $.prependSlide.bind(e), renderSlide: $.renderSlide.bind(e), slides: e.params.virtual.slides, cache: {} } }) }, on: { beforeInit: function() { var e = this; if (e.params.virtual.enabled) { e.classNames.push(e.params.containerModifierClass + "virtual"); var t = { watchSlidesProgress: !0 };
                        V.extend(e.params, t), V.extend(e.originalParams, t), e.virtual.update() } }, setTranslate: function() { this.params.virtual.enabled && this.virtual.update() } } },
        O = { handle: function(e) { var t = this,
                    a = t.rtlTranslate,
                    i = e;
                i.originalEvent && (i = i.originalEvent); var s = i.keyCode || i.charCode; if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1; if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1; if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) { if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) { var r = !1; if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return; var n = Y.innerWidth,
                            o = Y.innerHeight,
                            l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft); for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], p = 0; p < d.length; p += 1) { var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0) } if (!r) return }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s) } }, enable: function() { this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0) }, disable: function() { this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1) } },
        A = { name: "keyboard", params: { keyboard: { enabled: !1, onlyInViewport: !0 } }, create: function() { V.extend(this, { keyboard: { enabled: !1, enable: O.enable.bind(this), disable: O.disable.bind(this), handle: O.handle.bind(this) } }) }, on: { init: function() { this.params.keyboard.enabled && this.keyboard.enable() }, destroy: function() { this.keyboard.enabled && this.keyboard.disable() } } },
        H = { lastScrollTime: V.now(), event: -1 < Y.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() { var e = "onwheel",
                    t = e in f; if (!t) { var a = f.createElement("div");
                    a.setAttribute(e, "return;"), t = "function" == typeof a[e] } return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t }() ? "wheel" : "mousewheel", normalize: function(e) { var t = 0,
                    a = 0,
                    i = 0,
                    s = 0; return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), { spinX: t, spinY: a, pixelX: i, pixelY: s } }, handleMouseEnter: function() { this.mouseEntered = !0 }, handleMouseLeave: function() { this.mouseEntered = !1 }, handle: function(e) { var t = e,
                    a = this,
                    i = a.params.mousewheel; if (!a.mouseEntered && !i.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent); var s = 0,
                    r = a.rtlTranslate ? -1 : 1,
                    n = H.normalize(t); if (i.forceToAxis)
                    if (a.isHorizontal()) { if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
                        s = n.pixelX * r } else { if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
                        s = n.pixelY }
                else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY; if (0 === s) return !0; if (i.invert && (s = -s), a.params.freeMode) { a.params.loop && a.loopFix(); var o = a.getTranslate() + s * i.sensitivity,
                        l = a.isBeginning,
                        d = a.isEnd; if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = V.nextTick(function() { a.slideToClosest() }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0 } else { if (60 < V.now() - a.mousewheel.lastScrollTime)
                        if (s < 0)
                            if (a.isEnd && !a.params.loop || a.animating) { if (i.releaseOnEdges) return !0 } else a.slideNext(), a.emit("scroll", t);
                    else if (a.isBeginning && !a.params.loop || a.animating) { if (i.releaseOnEdges) return !0 } else a.slidePrev(), a.emit("scroll", t);
                    a.mousewheel.lastScrollTime = (new Y.Date).getTime() } return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1 }, enable: function() { var e = this; if (!H.event) return !1; if (e.mousewheel.enabled) return !1; var t = e.$el; return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(H.event, e.mousewheel.handle), e.mousewheel.enabled = !0 }, disable: function() { var e = this; if (!H.event) return !1; if (!e.mousewheel.enabled) return !1; var t = e.$el; return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(H.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1) } },
        B = { update: function() { var e = this,
                    t = e.params.navigation; if (!e.params.loop) { var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)) } }, init: function() { var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", function(e) { e.preventDefault(), a.isEnd && !a.params.loop || a.slideNext() }), t && 0 < t.length && t.on("click", function(e) { e.preventDefault(), a.isBeginning && !a.params.loop || a.slidePrev() }), V.extend(a.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] })) }, destroy: function() { var e = this.navigation,
                    t = e.$nextEl,
                    a = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), a && a.length && (a.off("click"), a.removeClass(this.params.navigation.disabledClass)) } },
        G = { update: function() { var e = this,
                    t = e.rtl,
                    s = e.params.pagination; if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length; if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) { var o, l, d, p = e.pagination.bullets; if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function(e, t) { var a = L(t),
                                i = a.index();
                            i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")) });
                        else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) { for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
                            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next") } if (s.dynamicBullets) { var v = Math.min(p.length, s.dynamicMainBullets + 4),
                                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px") } } if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) { var g;
                        g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical"; var b = (r + 1) / n,
                            w = 1,
                            y = 1; "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed) } "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass) } }, render: function() { var e = this,
                    t = e.params.pagination; if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = ""; if ("bullets" === t.type) { for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find("." + t.bulletClass) } "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0]) } }, init: function() { var a = this,
                    e = a.params.pagination; if (e.el) { var t = L(e.el);
                    0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) { e.preventDefault(); var t = L(this).index() * a.params.slidesPerGroup;
                        a.params.loop && (t += a.loopedSlides), a.slideTo(t) }), V.extend(a.pagination, { $el: t, el: t[0] })) } }, destroy: function() { var e = this,
                    t = e.params.pagination; if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass) } } },
        N = { setTranslate: function() { var e = this; if (e.params.scrollbar.el && e.scrollbar.el) { var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (R.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (R.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() { o[0].style.opacity = 0, o.transition(400) }, 1e3)) } }, setTransition: function(e) { this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e) }, updateSize: function() { var e = this; if (e.params.scrollbar.el && e.scrollbar.el) { var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = ""; var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbarHide && (i[0].style.opacity = 0), V.extend(t, { trackSize: r, divider: n, moveDivider: o, dragSize: s }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass) } }, setDragPosition: function(e) { var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    o = i.trackSize;
                t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t); var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses() }, onDragStart: function(e) { var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e) }, onDragMove: function(e) { var t = this.scrollbar,
                    a = this.$wrapperEl,
                    i = t.$el,
                    s = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e)) }, onDragEnd: function(e) { var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = V.nextTick(function() { i.css("opacity", 0), i.transition(400) }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest()) }, enableDraggable: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!R.passiveListener || !s.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!R.passiveListener || !s.passiveListeners) && { passive: !0, capture: !1 };
                    R.touch || !R.pointerEvents && !R.prefixedPointerEvents ? (R.touch && (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !v.ios && !v.android || s.simulateTouch && !R.touch && v.ios) && (r.addEventListener("mousedown", e.scrollbar.onDragStart, n), f.addEventListener("mousemove", e.scrollbar.onDragMove, n), f.addEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o)) } }, disableDraggable: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!R.passiveListener || !s.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!R.passiveListener || !s.passiveListeners) && { passive: !0, capture: !1 };
                    R.touch || !R.pointerEvents && !R.prefixedPointerEvents ? (R.touch && (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !v.ios && !v.android || s.simulateTouch && !R.touch && v.ios) && (r.removeEventListener("mousedown", e.scrollbar.onDragStart, n), f.removeEventListener("mousemove", e.scrollbar.onDragMove, n), f.removeEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o)) } }, init: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = L(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el)); var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), V.extend(t, { $el: s, el: s[0], $dragEl: r, dragEl: r[0] }), i.draggable && t.enableDraggable() } }, destroy: function() { this.scrollbar.disableDraggable() } },
        X = { setTransform: function(e, t) { var a = this.rtl,
                    i = L(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    o = i.attr("data-swiper-parallax-y"),
                    l = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity"); if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) { var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p } if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else { var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")") } }, setTranslate: function() { var i = this,
                    e = i.$el,
                    t = i.slides,
                    s = i.progress,
                    r = i.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { i.parallax.setTransform(t, s) }), t.each(function(e, t) { var a = t.progress;
                    1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { i.parallax.setTransform(t, a) }) }) }, setTransition: function(s) { void 0 === s && (s = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { var a = L(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                    0 === s && (i = 0), a.transition(i) }) } },
        F = { getDistanceBetweenTouches: function(e) { if (e.targetTouches.length < 2) return 1; var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY; return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2)) }, onGestureStart: function(e) { var t = this,
                    a = t.params.zoom,
                    i = t.zoom,
                    s = i.gesture; if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !R.gestures) { if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, s.scaleStart = F.getDistanceBetweenTouches(e) }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0 }, onGestureChange: function(e) { var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture; if (!R.gestures) { if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    a.fakeGestureMoved = !0, i.scaleMove = F.getDistanceBetweenTouches(e) }
                i.$imageEl && 0 !== i.$imageEl.length && (R.gestures ? this.zoom.scale = e.scale * a.currentScale : a.scale = i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")")) }, onGestureEnd: function(e) { var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture; if (!R.gestures) { if (!a.fakeGestureTouched || !a.fakeGestureMoved) return; if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !v.android) return;
                    a.fakeGestureTouched = !1, a.fakeGestureMoved = !1 }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0)) }, onTouchStart: function(e) { var t = this.zoom,
                    a = t.gesture,
                    i = t.image;
                a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (v.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)) }, onTouchMove: function(e) { var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity; if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) { s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = V.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = V.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY)); var n = s.width * a.scale,
                        o = s.height * a.scale; if (!(n < i.slideWidth && o < i.slideHeight)) { if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) { if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1); if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1) }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)") } } }, onTouchEnd: function() { var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity; if (t.$imageEl && 0 !== t.$imageEl.length) { if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1; var s = 300,
                        r = 300,
                        n = i.x * s,
                        o = a.currentX + n,
                        l = i.y * r,
                        d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y)); var p = Math.max(s, r);
                    a.currentX = o, a.currentY = d; var c = a.width * e.scale,
                        u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)") } }, onTransitionEnd: function() { var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1) }, toggle: function(e) { var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e) }, in: function(e) { var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this,
                    b = g.zoom,
                    w = g.params.zoom,
                    y = b.gesture,
                    x = b.image;
                y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + w.zoomedSlideClass), a = void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")")) }, out: function() { var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0) }, enable: function() { var e = this,
                    t = e.zoom; if (!t.enabled) { t.enabled = !0; var a = !("touchstart" !== e.touchEvents.start || !R.passiveListener || !e.params.passiveListeners) && { passive: !0, capture: !1 };
                    R.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove) } }, disable: function() { var e = this,
                    t = e.zoom; if (t.enabled) { e.zoom.enabled = !1; var a = !("touchstart" !== e.touchEvents.start || !R.passiveListener || !e.params.passiveListeners) && { passive: !0, capture: !1 };
                    R.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove) } } },
        q = { loadInSlide: function(e, l) { void 0 === l && (l = !0); var d = this,
                    p = d.params.lazy; if (void 0 !== e && 0 !== d.slides.length) { var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                        t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");!c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function(e, t) { var i = L(t);
                        i.addClass(p.loadingClass); var s = i.attr("data-background"),
                            r = i.attr("data-src"),
                            n = i.attr("data-srcset"),
                            o = i.attr("data-sizes");
                        d.loadImage(i[0], r || s, n, o, !1, function() { if (null != d && d && (!d || d.params) && !d.destroyed) { if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) { var e = c.attr("data-swiper-slide-index"); if (c.hasClass(d.params.slideDuplicateClass)) { var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                        d.lazy.loadInSlide(t.index(), !1) } else { var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        d.lazy.loadInSlide(a.index(), !1) } }
                                d.emit("lazyImageReady", c[0], i[0]) } }), d.emit("lazyImageLoad", c[0], i[0]) }) } }, load: function() { var i = this,
                    t = i.$wrapperEl,
                    a = i.params,
                    s = i.slides,
                    e = i.activeIndex,
                    r = i.virtual && a.virtual.enabled,
                    n = a.lazy,
                    o = a.slidesPerView;

                function l(e) { if (r) { if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0 } else if (s[e]) return !0; return !1 }

                function d(e) { return r ? L(e).attr("data-swiper-slide-index") : L(e).index() } if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function(e, t) { var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                    i.lazy.loadInSlide(a) });
                else if (1 < o)
                    for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
                else i.lazy.loadInSlide(e); if (n.loadPrevNext)
                    if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) { for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f); for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m) } else { var g = t.children("." + a.slideNextClass);
                        0 < g.length && i.lazy.loadInSlide(d(g)); var b = t.children("." + a.slidePrevClass);
                        0 < b.length && i.lazy.loadInSlide(d(b)) } } },
        W = { LinearSpline: function(e, t) { var a, i, s, r, n; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) { return e ? (n = function(e, t) { for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s; return a }(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0 }, this }, getInterpolateFunction: function(e) { var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new W.LinearSpline(t.slidesGrid, e.slidesGrid) : new W.LinearSpline(t.snapGrid, e.snapGrid)) }, setTranslate: function(e, t) { var a, i, s = this,
                    r = s.controller.control;

                function n(e) { var t = s.rtlTranslate ? -s.translate : s.translate; "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses() } if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof E && n(r[o]);
                else r instanceof E && t !== r && n(r) }, setTransition: function(t, e) { var a, i = this,
                    s = i.controller.control;

                function r(e) { e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && V.nextTick(function() { e.updateAutoHeight() }), e.$wrapperEl.transitionEnd(function() { s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd()) })) } if (Array.isArray(s))
                    for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof E && r(s[a]);
                else s instanceof E && e !== s && r(s) } },
        j = { makeElFocusable: function(e) { return e.attr("tabIndex", "0"), e }, addElRole: function(e, t) { return e.attr("role", t), e }, addElLabel: function(e, t) { return e.attr("aria-label", t), e }, disableEl: function(e) { return e.attr("aria-disabled", !0), e }, enableEl: function(e) { return e.attr("aria-disabled", !1), e }, onEnterKey: function(e) { var t = this,
                    a = t.params.a11y; if (13 === e.keyCode) { var i = L(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click() } }, notify: function(e) { var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e)) }, updateNavigation: function() { var e = this; if (!e.params.loop) { var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a)) } }, updatePagination: function() { var i = this,
                    s = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e, t) { var a = L(t);
                    i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1)) }) }, init: function() { var e = this;
                e.$el.append(e.a11y.liveRegion); var t, a, i = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey) }, destroy: function() { var e, t, a = this;
                a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey) } },
        U = { init: function() { var e = this; if (e.params.history) { if (!Y.history || !Y.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0); var t = e.history;
                    t.initialized = !0, t.paths = U.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || Y.addEventListener("popstate", e.history.setHistoryPopState)) } }, destroy: function() { this.params.history.replaceState || Y.removeEventListener("popstate", this.history.setHistoryPopState) }, setHistoryPopState: function() { this.history.paths = U.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1) }, getPathValues: function() { var e = Y.location.pathname.slice(1).split("/").filter(function(e) { return "" !== e }),
                    t = e.length; return { key: e[t - 2], value: e[t - 1] } }, setHistory: function(e, t) { if (this.history.initialized && this.params.history.enabled) { var a = this.slides.eq(t),
                        i = U.slugify(a.attr("data-history"));
                    Y.location.pathname.includes(e) || (i = e + "/" + i); var s = Y.history.state;
                    s && s.value === i || (this.params.history.replaceState ? Y.history.replaceState({ value: i }, null, i) : Y.history.pushState({ value: i }, null, i)) } }, slugify: function(e) { return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "") }, scrollToSlide: function(e, t, a) { var i = this; if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) { var n = i.slides.eq(s); if (U.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) { var o = n.index();
                            i.slideTo(o, e, a) } } else i.slideTo(0, e, a) } },
        K = { onHashCange: function() { var e = this,
                    t = f.location.hash.replace("#", ""); if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) { var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index(); if (void 0 === a) return;
                    e.slideTo(a) } }, setHash: function() { var e = this; if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && Y.history && Y.history.replaceState) Y.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else { var t = e.slides.eq(e.activeIndex),
                            a = t.attr("data-hash") || t.attr("data-history");
                        f.location.hash = a || "" } }, init: function() { var e = this; if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) { e.hashNavigation.initialized = !0; var t = f.location.hash.replace("#", ""); if (t)
                        for (var a = 0, i = e.slides.length; a < i; a += 1) { var s = e.slides.eq(a); if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) { var r = s.index();
                                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0) } }
                    e.params.hashNavigation.watchState && L(Y).on("hashchange", e.hashNavigation.onHashCange) } }, destroy: function() { this.params.hashNavigation.watchState && L(Y).off("hashchange", this.hashNavigation.onHashCange) } },
        _ = { run: function() { var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = V.nextTick(function() { e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) }, a) }, start: function() { var e = this; return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0) }, stop: function() { var e = this; return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0) }, pause: function(e) { var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run()))) } },
        Z = { setTranslate: function() { for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) { var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate); var r = 0;
                    e.isHorizontal() || (r = s, s = 0); var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({ opacity: n }).transform("translate3d(" + s + "px, " + r + "px, 0px)") } }, setTransition: function(e) { var a = this,
                    t = a.slides,
                    i = a.$wrapperEl; if (t.transition(e), a.params.virtualTranslate && 0 !== e) { var s = !1;
                    t.transitionEnd(function() { if (!s && a && !a.destroyed) { s = !0, a.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t]) } }) } } },
        Q = { setTranslate: function() { var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.params.cubeEffect,
                    p = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({ height: r + "px" })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e))); for (var h = 0; h < s.length; h += 1) { var v = s.eq(h),
                        f = h;
                    c && (f = parseInt(v.attr("data-swiper-slide-index"), 10)); var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && (m = -m, g = Math.floor(-m / 360)); var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0); var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)"; if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) { var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0)) } } if (i.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }), d.shadow)
                    if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else { var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            k = d.shadowScale,
                            z = d.shadowScale / M,
                            P = d.shadowOffset;
                        e.transform("scale3d(" + k + ", 1, " + z + ") translate3d(0px, " + (n / 2 + P) + "px, " + -n / 2 / z + "px) rotateX(-90deg)") }
                var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)") }, setTransition: function(e) { var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e) } },
        J = { setTranslate: function() { for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) { var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1)); var n = -180 * r,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        d = 0; if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) { var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0)) }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)") } }, setTransition: function(e) { var a = this,
                    t = a.slides,
                    i = a.activeIndex,
                    s = a.$wrapperEl; if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) { var r = !1;
                    t.eq(i).transitionEnd(function() { if (!r && a && !a.destroyed) { r = !0, a.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t]) } }) } } },
        ee = { setTranslate: function() { for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) { var v = i.eq(u),
                        f = r[u],
                        m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
                        g = o ? p * m : 0,
                        b = o ? 0 : p * m,
                        w = -c * Math.abs(m),
                        y = o ? 0 : n.stretch * m,
                        x = o ? n.stretch * m : 0;
                    Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0); var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)"; if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) { var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0) } }(R.pointerEvents || R.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%") }, setTransition: function(e) { this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) } },
        te = { init: function() { var e = this,
                    t = e.params.thumbs,
                    a = e.constructor;
                t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, V.extend(e.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), V.extend(e.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 })) : V.isObject(t.swiper) && (e.thumbs.swiper = new a(V.extend({}, t.swiper, { watchSlidesVisibility: !0, watchSlidesProgress: !0, slideToClickedSlide: !1 })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick) }, onThumbClick: function() { var e = this,
                    t = e.thumbs.swiper; if (t) { var a = t.clickedIndex; if (null != a) { var i; if (i = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) { var s = e.activeIndex;
                            e.slides.eq(s).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, s = e.activeIndex); var r = e.slides.eq(s).prevAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(),
                                n = e.slides.eq(s).nextAll('[data-swiper-slide-index="' + i + '"]').eq(0).index();
                            i = void 0 === r ? n : void 0 === n ? r : n - s < s - r ? n : r }
                        e.slideTo(i) } } }, update: function(e) { var t = this,
                    a = t.thumbs.swiper; if (a) { var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView; if (t.realIndex !== a.realIndex) { var s, r = a.activeIndex; if (a.params.loop) { a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, r = a.activeIndex); var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n } else s = t.realIndex;
                        a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1), a.slideTo(s, e ? 0 : void 0)) } var l = 1,
                        d = t.params.thumbs.slideThumbActiveClass; if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), a.slides.removeClass(d), a.params.loop)
                        for (var p = 0; p < l; p += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
                    else
                        for (var c = 0; c < l; c += 1) a.slides.eq(t.realIndex + c).addClass(d) } } },
        ae = [S, C, M, k, P, D, A, { name: "mousewheel", params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } }, create: function() { var e = this;
                V.extend(e, { mousewheel: { enabled: !1, enable: H.enable.bind(e), disable: H.disable.bind(e), handle: H.handle.bind(e), handleMouseEnter: H.handleMouseEnter.bind(e), handleMouseLeave: H.handleMouseLeave.bind(e), lastScrollTime: V.now() } }) }, on: { init: function() { this.params.mousewheel.enabled && this.mousewheel.enable() }, destroy: function() { this.mousewheel.enabled && this.mousewheel.disable() } } }, { name: "navigation", params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } }, create: function() { V.extend(this, { navigation: { init: B.init.bind(this), update: B.update.bind(this), destroy: B.destroy.bind(this) } }) }, on: { init: function() { this.navigation.init(), this.navigation.update() }, toEdge: function() { this.navigation.update() }, fromEdge: function() { this.navigation.update() }, destroy: function() { this.navigation.destroy() }, click: function(e) { var t = this.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;!this.params.navigation.hideOnClick || L(e.target).is(i) || L(e.target).is(a) || (a && a.toggleClass(this.params.navigation.hiddenClass), i && i.toggleClass(this.params.navigation.hiddenClass)) } } }, { name: "pagination", params: { pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: function(e) { return e }, formatFractionTotal: function(e) { return e }, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", modifierClass: "swiper-pagination-", currentClass: "swiper-pagination-current", totalClass: "swiper-pagination-total", hiddenClass: "swiper-pagination-hidden", progressbarFillClass: "swiper-pagination-progressbar-fill", progressbarOppositeClass: "swiper-pagination-progressbar-opposite", clickableClass: "swiper-pagination-clickable", lockClass: "swiper-pagination-lock" } }, create: function() { var e = this;
                V.extend(e, { pagination: { init: G.init.bind(e), render: G.render.bind(e), update: G.update.bind(e), destroy: G.destroy.bind(e), dynamicBulletIndex: 0 } }) }, on: { init: function() { this.pagination.init(), this.pagination.render(), this.pagination.update() }, activeIndexChange: function() { this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update() }, snapIndexChange: function() { this.params.loop || this.pagination.update() }, slidesLengthChange: function() { this.params.loop && (this.pagination.render(), this.pagination.update()) }, snapGridLengthChange: function() { this.params.loop || (this.pagination.render(), this.pagination.update()) }, destroy: function() { this.pagination.destroy() }, click: function(e) { var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass) } } }, { name: "scrollbar", params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } }, create: function() { var e = this;
                V.extend(e, { scrollbar: { init: N.init.bind(e), destroy: N.destroy.bind(e), updateSize: N.updateSize.bind(e), setTranslate: N.setTranslate.bind(e), setTransition: N.setTransition.bind(e), enableDraggable: N.enableDraggable.bind(e), disableDraggable: N.disableDraggable.bind(e), setDragPosition: N.setDragPosition.bind(e), onDragStart: N.onDragStart.bind(e), onDragMove: N.onDragMove.bind(e), onDragEnd: N.onDragEnd.bind(e), isTouched: !1, timeout: null, dragTimeout: null } }) }, on: { init: function() { this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate() }, update: function() { this.scrollbar.updateSize() }, resize: function() { this.scrollbar.updateSize() }, observerUpdate: function() { this.scrollbar.updateSize() }, setTranslate: function() { this.scrollbar.setTranslate() }, setTransition: function(e) { this.scrollbar.setTransition(e) }, destroy: function() { this.scrollbar.destroy() } } }, { name: "parallax", params: { parallax: { enabled: !1 } }, create: function() { V.extend(this, { parallax: { setTransform: X.setTransform.bind(this), setTranslate: X.setTranslate.bind(this), setTransition: X.setTransition.bind(this) } }) }, on: { beforeInit: function() { this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, init: function() { this.params.parallax && this.parallax.setTranslate() }, setTranslate: function() { this.params.parallax && this.parallax.setTranslate() }, setTransition: function(e) { this.params.parallax && this.parallax.setTransition(e) } } }, { name: "zoom", params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }, create: function() { var t = this,
                    a = { enabled: !1, scale: 1, currentScale: 1, isScaling: !1, gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 }, image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 } }; "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) { a[e] = F[e].bind(t) }), V.extend(t, { zoom: a }) }, on: { init: function() { this.params.zoom.enabled && this.zoom.enable() }, destroy: function() { this.zoom.disable() }, touchStart: function(e) { this.zoom.enabled && this.zoom.onTouchStart(e) }, touchEnd: function(e) { this.zoom.enabled && this.zoom.onTouchEnd(e) }, doubleTap: function(e) { this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e) }, transitionEnd: function() { this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd() } } }, { name: "lazy", params: { lazy: { enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }, create: function() { V.extend(this, { lazy: { initialImageLoaded: !1, load: q.load.bind(this), loadInSlide: q.loadInSlide.bind(this) } }) }, on: { beforeInit: function() { this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1) }, init: function() { this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load() }, scroll: function() { this.params.freeMode && !this.params.freeModeSticky && this.lazy.load() }, resize: function() { this.params.lazy.enabled && this.lazy.load() }, scrollbarDragMove: function() { this.params.lazy.enabled && this.lazy.load() }, transitionStart: function() { var e = this;
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load() }, transitionEnd: function() { this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load() } } }, { name: "controller", params: { controller: { control: void 0, inverse: !1, by: "slide" } }, create: function() { var e = this;
                V.extend(e, { controller: { control: e.params.controller.control, getInterpolateFunction: W.getInterpolateFunction.bind(e), setTranslate: W.setTranslate.bind(e), setTransition: W.setTransition.bind(e) } }) }, on: { update: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, resize: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, observerUpdate: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, setTranslate: function(e, t) { this.controller.control && this.controller.setTranslate(e, t) }, setTransition: function(e, t) { this.controller.control && this.controller.setTransition(e, t) } } }, { name: "a11y", params: { a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}" } }, create: function() { var t = this;
                V.extend(t, { a11y: { liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }), Object.keys(j).forEach(function(e) { t.a11y[e] = j[e].bind(t) }) }, on: { init: function() { this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation()) }, toEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, fromEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, paginationUpdate: function() { this.params.a11y.enabled && this.a11y.updatePagination() }, destroy: function() { this.params.a11y.enabled && this.a11y.destroy() } } }, { name: "history", params: { history: { enabled: !1, replaceState: !1, key: "slides" } }, create: function() { var e = this;
                V.extend(e, { history: { init: U.init.bind(e), setHistory: U.setHistory.bind(e), setHistoryPopState: U.setHistoryPopState.bind(e), scrollToSlide: U.scrollToSlide.bind(e), destroy: U.destroy.bind(e) } }) }, on: { init: function() { this.params.history.enabled && this.history.init() }, destroy: function() { this.params.history.enabled && this.history.destroy() }, transitionEnd: function() { this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex) } } }, { name: "hash-navigation", params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } }, create: function() { var e = this;
                V.extend(e, { hashNavigation: { initialized: !1, init: K.init.bind(e), destroy: K.destroy.bind(e), setHash: K.setHash.bind(e), onHashCange: K.onHashCange.bind(e) } }) }, on: { init: function() { this.params.hashNavigation.enabled && this.hashNavigation.init() }, destroy: function() { this.params.hashNavigation.enabled && this.hashNavigation.destroy() }, transitionEnd: function() { this.hashNavigation.initialized && this.hashNavigation.setHash() } } }, { name: "autoplay", params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } }, create: function() { var t = this;
                V.extend(t, { autoplay: { running: !1, paused: !1, run: _.run.bind(t), start: _.start.bind(t), stop: _.stop.bind(t), pause: _.pause.bind(t), onTransitionEnd: function(e) { t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop()) } } }) }, on: { init: function() { this.params.autoplay.enabled && this.autoplay.start() }, beforeTransitionStart: function(e, t) { this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop()) }, sliderFirstMove: function() { this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause()) }, destroy: function() { this.autoplay.running && this.autoplay.stop() } } }, { name: "effect-fade", params: { fadeEffect: { crossFade: !1 } }, create: function() { V.extend(this, { fadeEffect: { setTranslate: Z.setTranslate.bind(this), setTransition: Z.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("fade" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "fade"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        V.extend(e.params, t), V.extend(e.originalParams, t) } }, setTranslate: function() { "fade" === this.params.effect && this.fadeEffect.setTranslate() }, setTransition: function(e) { "fade" === this.params.effect && this.fadeEffect.setTransition(e) } } }, { name: "effect-cube", params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } }, create: function() { V.extend(this, { cubeEffect: { setTranslate: Q.setTranslate.bind(this), setTransition: Q.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("cube" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 };
                        V.extend(e.params, t), V.extend(e.originalParams, t) } }, setTranslate: function() { "cube" === this.params.effect && this.cubeEffect.setTranslate() }, setTransition: function(e) { "cube" === this.params.effect && this.cubeEffect.setTransition(e) } } }, { name: "effect-flip", params: { flipEffect: { slideShadows: !0, limitRotation: !0 } }, create: function() { V.extend(this, { flipEffect: { setTranslate: J.setTranslate.bind(this), setTransition: J.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("flip" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        V.extend(e.params, t), V.extend(e.originalParams, t) } }, setTranslate: function() { "flip" === this.params.effect && this.flipEffect.setTranslate() }, setTransition: function(e) { "flip" === this.params.effect && this.flipEffect.setTransition(e) } } }, { name: "effect-coverflow", params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } }, create: function() { V.extend(this, { coverflowEffect: { setTranslate: ee.setTranslate.bind(this), setTransition: ee.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0) }, setTranslate: function() { "coverflow" === this.params.effect && this.coverflowEffect.setTranslate() }, setTransition: function(e) { "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e) } } }, { name: "thumbs", params: { thumbs: { swiper: null, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-container-thumbs" } }, create: function() { V.extend(this, { thumbs: { swiper: null, init: te.init.bind(this), update: te.update.bind(this), onThumbClick: te.onThumbClick.bind(this) } }) }, on: { beforeInit: function() { var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0)) }, slideChange: function() { this.thumbs.swiper && this.thumbs.update() }, update: function() { this.thumbs.swiper && this.thumbs.update() }, resize: function() { this.thumbs.swiper && this.thumbs.update() }, observerUpdate: function() { this.thumbs.swiper && this.thumbs.update() }, setTransition: function(e) { var t = this.thumbs.swiper;
                    t && t.setTransition(e) }, beforeDestroy: function() { var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy() } } }]; return void 0 === E.use && (E.use = E.Class.use, E.installModule = E.Class.installModule), E.use(ae), E });
! function(t, e) { "function" == typeof define && define.amd ? define(function() { return e(t) }) : e(t) }(this, function(c) { var Uj, d = function() { var u, a, l, i, s, n, r = [],
            o = r.concat,
            h = r.filter,
            f = r.slice,
            p = c.document,
            d = {},
            e = {},
            m = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
            v = /^\s*<(\w+|!)[^>]*>/,
            g = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            j = /^(?:body|html)$/i,
            x = /([A-Z])/g,
            b = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            t = p.createElement("table"),
            $ = p.createElement("tr"),
            E = { tr: p.createElement("tbody"), tbody: t, thead: t, tfoot: t, td: $, th: $, "*": p.createElement("div") },
            w = /complete|loaded|interactive/,
            T = /^[\w-]*$/,
            S = {},
            C = S.toString,
            B = {},
            N = p.createElement("div"),
            O = { tabindex: "tabIndex", readonly: "readOnly", for: "htmlFor", class: "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
            P = Array.isArray || function(t) { return t instanceof Array };

        function D(t) { return null == t ? String(t) : S[C.call(t)] || "object" }

        function M(t) { return "function" == D(t) }

        function F(t) { return null != t && t == t.window }

        function L(t) { return null != t && t.nodeType == t.DOCUMENT_NODE }

        function A(t) { return "object" == D(t) }

        function Y(t) { return A(t) && !F(t) && Object.getPrototypeOf(t) == Object.prototype }

        function R(t) { var e = !!t && "length" in t && t.length,
                n = l.type(t); return "function" != n && !F(t) && ("array" == n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t) }

        function _(t) { return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() }

        function U(t) { return t in e ? e[t] : e[t] = new RegExp("(^|\\s)" + t + "(\\s|$)") }

        function k(t, e) { return "number" != typeof e || m[_(t)] ? e : e + "px" }

        function Z(t) { return "children" in t ? f.call(t.children) : l.map(t.childNodes, function(t) { if (1 == t.nodeType) return t }) }

        function V(t, e) { var n, i = t ? t.length : 0; for (n = 0; n < i; n++) this[n] = t[n];
            this.length = i, this.selector = e || "" }

        function z(t, e) { return null == e ? l(t) : l(t).filter(e) }

        function H(t, e, n, i) { return M(e) ? e.call(t, n, i) : e }

        function I(t, e, n) { null == n ? t.removeAttribute(e) : t.setAttribute(e, n) }

        function q(t, e) { var n = t.className || "",
                i = n && n.baseVal !== u; if (e === u) return i ? n.baseVal : n;
            i ? n.baseVal = e : t.className = e }

        function W(e) { try { return e ? "true" == e || "false" != e && ("null" == e ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? l.parseJSON(e) : e) : e } catch (t) { return e } } return B.matches = function(t, e) { if (!e || !t || 1 !== t.nodeType) return !1; var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector; if (n) return n.call(t, e); var i, r = t.parentNode,
                o = !r; return o && (r = N).appendChild(t), i = ~B.qsa(r, e).indexOf(t), o && N.removeChild(t), i }, s = function(t) { return t.replace(/-+(.)?/g, function(t, e) { return e ? e.toUpperCase() : "" }) }, n = function(n) { return h.call(n, function(t, e) { return n.indexOf(t) == e }) }, B.fragment = function(t, e, n) { var i, r, o; return g.test(t) && (i = l(p.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(y, "<$1></$2>")), e === u && (e = v.test(t) && RegExp.$1), e in E || (e = "*"), (o = E[e]).innerHTML = "" + t, i = l.each(f.call(o.childNodes), function() { o.removeChild(this) })), Y(n) && (r = l(i), l.each(n, function(t, e) {-1 < b.indexOf(t) ? r[t](e) : r.attr(t, e) })), i }, B.Z = function(t, e) { return new V(t, e) }, B.isZ = function(t) { return t instanceof B.Z }, B.init = function(t, e) { var n, i; if (!t) return B.Z(); if ("string" == typeof t)
                if ("<" == (t = t.trim())[0] && v.test(t)) n = B.fragment(t, RegExp.$1, e), t = null;
                else { if (e !== u) return l(e).find(t);
                    n = B.qsa(p, t) }
            else { if (M(t)) return l(p).ready(t); if (B.isZ(t)) return t; if (P(t)) i = t, n = h.call(i, function(t) { return null != t });
                else if (A(t)) n = [t], t = null;
                else if (v.test(t)) n = B.fragment(t.trim(), RegExp.$1, e), t = null;
                else { if (e !== u) return l(e).find(t);
                    n = B.qsa(p, t) } } return B.Z(n, t) }, (l = function(t, e) { return B.init(t, e) }).extend = function(e) { var n, t = f.call(arguments, 1); return "boolean" == typeof e && (n = e, e = t.shift()), t.forEach(function(t) {! function t(e, n, i) { for (a in n) i && (Y(n[a]) || P(n[a])) ? (Y(n[a]) && !Y(e[a]) && (e[a] = {}), P(n[a]) && !P(e[a]) && (e[a] = []), t(e[a], n[a], i)) : n[a] !== u && (e[a] = n[a]) }(e, t, n) }), e }, B.qsa = function(t, e) { var n, i = "#" == e[0],
                r = !i && "." == e[0],
                o = i || r ? e.slice(1) : e,
                a = T.test(o); return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : f.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e)) }, l.contains = p.documentElement.contains ? function(t, e) { return t !== e && t.contains(e) } : function(t, e) { for (; e && (e = e.parentNode);)
                if (e === t) return !0;
            return !1 }, l.type = D, l.isFunction = M, l.isWindow = F, l.isArray = P, l.isPlainObject = Y, l.isEmptyObject = function(t) { var e; for (e in t) return !1; return !0 }, l.isNumeric = function(t) { var e = Number(t),
                n = typeof t; return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1 }, l.inArray = function(t, e, n) { return r.indexOf.call(e, t, n) }, l.camelCase = s, l.trim = function(t) { return null == t ? "" : String.prototype.trim.call(t) }, l.uuid = 0, l.support = {}, l.expr = {}, l.noop = function() {}, l.map = function(t, e) { var n, i, r, o, a = []; if (R(t))
                for (i = 0; i < t.length; i++) null != (n = e(t[i], i)) && a.push(n);
            else
                for (r in t) null != (n = e(t[r], r)) && a.push(n); return 0 < (o = a).length ? l.fn.concat.apply([], o) : o }, l.each = function(t, e) { var n, i; if (R(t)) { for (n = 0; n < t.length; n++)
                    if (!1 === e.call(t[n], n, t[n])) return t } else
                for (i in t)
                    if (!1 === e.call(t[i], i, t[i])) return t; return t }, l.grep = function(t, e) { return h.call(t, e) }, c.JSON && (l.parseJSON = JSON.parse), l.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) { S["[object " + e + "]"] = e.toLowerCase() }), l.fn = { constructor: B.Z, length: 0, forEach: r.forEach, reduce: r.reduce, push: r.push, sort: r.sort, splice: r.splice, indexOf: r.indexOf, concat: function() { var t, e, n = []; for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = B.isZ(e) ? e.toArray() : e; return o.apply(B.isZ(this) ? this.toArray() : this, n) }, map: function(n) { return l(l.map(this, function(t, e) { return n.call(t, e, t) })) }, slice: function() { return l(f.apply(this, arguments)) }, ready: function(t) { return w.test(p.readyState) && p.body ? t(l) : p.addEventListener("DOMContentLoaded", function() { t(l) }, !1), this }, get: function(t) { return t === u ? f.call(this) : this[0 <= t ? t : t + this.length] }, toArray: function() { return this.get() }, size: function() { return this.length }, remove: function() { return this.each(function() { null != this.parentNode && this.parentNode.removeChild(this) }) }, each: function(n) { return r.every.call(this, function(t, e) { return !1 !== n.call(t, e, t) }), this }, filter: function(e) { return M(e) ? this.not(this.not(e)) : l(h.call(this, function(t) { return B.matches(t, e) })) }, add: function(t, e) { return l(n(this.concat(l(t, e)))) }, is: function(t) { return 0 < this.length && B.matches(this[0], t) }, not: function(e) { var n = []; if (M(e) && e.call !== u) this.each(function(t) { e.call(this, t) || n.push(this) });
                else { var i = "string" == typeof e ? this.filter(e) : R(e) && M(e.item) ? f.call(e) : l(e);
                    this.forEach(function(t) { i.indexOf(t) < 0 && n.push(t) }) } return l(n) }, has: function(t) { return this.filter(function() { return A(t) ? l.contains(this, t) : l(this).find(t).size() }) }, eq: function(t) { return -1 === t ? this.slice(t) : this.slice(t, +t + 1) }, first: function() { var t = this[0]; return t && !A(t) ? t : l(t) }, last: function() { var t = this[this.length - 1]; return t && !A(t) ? t : l(t) }, find: function(t) { var n = this; return t ? "object" == typeof t ? l(t).filter(function() { var e = this; return r.some.call(n, function(t) { return l.contains(t, e) }) }) : 1 == this.length ? l(B.qsa(this[0], t)) : this.map(function() { return B.qsa(this, t) }) : l() }, closest: function(n, i) { var r = [],
                    o = "object" == typeof n && l(n); return this.each(function(t, e) { for (; e && !(o ? 0 <= o.indexOf(e) : B.matches(e, n));) e = e !== i && !L(e) && e.parentNode;
                    e && r.indexOf(e) < 0 && r.push(e) }), l(r) }, parents: function(t) { for (var e = [], n = this; 0 < n.length;) n = l.map(n, function(t) { if ((t = t.parentNode) && !L(t) && e.indexOf(t) < 0) return e.push(t), t }); return z(e, t) }, parent: function(t) { return z(n(this.pluck("parentNode")), t) }, children: function(t) { return z(this.map(function() { return Z(this) }), t) }, contents: function() { return this.map(function() { return this.contentDocument || f.call(this.childNodes) }) }, siblings: function(t) { return z(this.map(function(t, e) { return h.call(Z(e.parentNode), function(t) { return t !== e }) }), t) }, empty: function() { return this.each(function() { this.innerHTML = "" }) }, pluck: function(e) { return l.map(this, function(t) { return t[e] }) }, show: function() { return this.each(function() { var t, e, n; "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = (t = this.nodeName, d[t] || (e = p.createElement(t), p.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), d[t] = n), d[t])) }) }, replaceWith: function(t) { return this.before(t).remove() }, wrap: function(e) { var n = M(e); if (this[0] && !n) var i = l(e).get(0),
                    r = i.parentNode || 1 < this.length; return this.each(function(t) { l(this).wrapAll(n ? e.call(this, t) : r ? i.cloneNode(!0) : i) }) }, wrapAll: function(t) { if (this[0]) { var e; for (l(this[0]).before(t = l(t));
                        (e = t.children()).length;) t = e.first();
                    l(t).append(this) } return this }, wrapInner: function(r) { var o = M(r); return this.each(function(t) { var e = l(this),
                        n = e.contents(),
                        i = o ? r.call(this, t) : r;
                    n.length ? n.wrapAll(i) : e.append(i) }) }, unwrap: function() { return this.parent().each(function() { l(this).replaceWith(l(this).children()) }), this }, clone: function() { return this.map(function() { return this.cloneNode(!0) }) }, hide: function() { return this.css("display", "none") }, toggle: function(e) { return this.each(function() { var t = l(this);
                    (e === u ? "none" == t.css("display") : e) ? t.show(): t.hide() }) }, prev: function(t) { return l(this.pluck("previousElementSibling")).filter(t || "*") }, next: function(t) { return l(this.pluck("nextElementSibling")).filter(t || "*") }, html: function(n) { return 0 in arguments ? this.each(function(t) { var e = this.innerHTML;
                    l(this).empty().append(H(this, n, t, e)) }) : 0 in this ? this[0].innerHTML : null }, text: function(n) { return 0 in arguments ? this.each(function(t) { var e = H(this, n, t, this.textContent);
                    this.textContent = null == e ? "" : "" + e }) : 0 in this ? this.pluck("textContent").join("") : null }, attr: function(e, n) { var t; return "string" != typeof e || 1 in arguments ? this.each(function(t) { if (1 === this.nodeType)
                        if (A(e))
                            for (a in e) I(this, a, e[a]);
                        else I(this, e, H(this, n, t, this.getAttribute(e))) }) : 0 in this && 1 == this[0].nodeType && null != (t = this[0].getAttribute(e)) ? t : u }, removeAttr: function(t) { return this.each(function() { 1 === this.nodeType && t.split(" ").forEach(function(t) { I(this, t) }, this) }) }, prop: function(e, n) { return e = O[e] || e, 1 in arguments ? this.each(function(t) { this[e] = H(this, n, t, this[e]) }) : this[0] && this[0][e] }, removeProp: function(t) { return t = O[t] || t, this.each(function() { delete this[t] }) }, data: function(t, e) { var n = "data-" + t.replace(x, "-$1").toLowerCase(),
                    i = 1 in arguments ? this.attr(n, e) : this.attr(n); return null !== i ? W(i) : u }, val: function(e) { return 0 in arguments ? (null == e && (e = ""), this.each(function(t) { this.value = H(this, e, t, this.value) })) : this[0] && (this[0].multiple ? l(this[0]).find("option").filter(function() { return this.selected }).pluck("value") : this[0].value) }, offset: function(o) { if (o) return this.each(function(t) { var e = l(this),
                        n = H(this, o, t, e.offset()),
                        i = e.offsetParent().offset(),
                        r = { top: n.top - i.top, left: n.left - i.left }; "static" == e.css("position") && (r.position = "relative"), e.css(r) }); if (!this.length) return null; if (p.documentElement !== this[0] && !l.contains(p.documentElement, this[0])) return { top: 0, left: 0 }; var t = this[0].getBoundingClientRect(); return { left: t.left + c.pageXOffset, top: t.top + c.pageYOffset, width: Math.round(t.width), height: Math.round(t.height) } }, css: function(t, e) { if (arguments.length < 2) { var n = this[0]; if ("string" == typeof t) { if (!n) return; return n.style[s(t)] || getComputedStyle(n, "").getPropertyValue(t) } if (P(t)) { if (!n) return; var i = {},
                            r = getComputedStyle(n, ""); return l.each(t, function(t, e) { i[e] = n.style[s(e)] || r.getPropertyValue(e) }), i } } var o = ""; if ("string" == D(t)) e || 0 === e ? o = _(t) + ":" + k(t, e) : this.each(function() { this.style.removeProperty(_(t)) });
                else
                    for (a in t) t[a] || 0 === t[a] ? o += _(a) + ":" + k(a, t[a]) + ";" : this.each(function() { this.style.removeProperty(_(a)) }); return this.each(function() { this.style.cssText += ";" + o }) }, index: function(t) { return t ? this.indexOf(l(t)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function(t) { return !!t && r.some.call(this, function(t) { return this.test(q(t)) }, U(t)) }, addClass: function(n) { return n ? this.each(function(t) { if ("className" in this) { i = []; var e = q(this);
                        H(this, n, t, e).split(/\s+/g).forEach(function(t) { l(this).hasClass(t) || i.push(t) }, this), i.length && q(this, e + (e ? " " : "") + i.join(" ")) } }) : this }, removeClass: function(e) { return this.each(function(t) { if ("className" in this) { if (e === u) return q(this, "");
                        i = q(this), H(this, e, t, i).split(/\s+/g).forEach(function(t) { i = i.replace(U(t), " ") }), q(this, i.trim()) } }) }, toggleClass: function(n, i) { return n ? this.each(function(t) { var e = l(this);
                    H(this, n, t, q(this)).split(/\s+/g).forEach(function(t) {
                        (i === u ? !e.hasClass(t) : i) ? e.addClass(t): e.removeClass(t) }) }) : this }, scrollTop: function(t) { if (this.length) { var e = "scrollTop" in this[0]; return t === u ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() { this.scrollTop = t } : function() { this.scrollTo(this.scrollX, t) }) } }, scrollLeft: function(t) { if (this.length) { var e = "scrollLeft" in this[0]; return t === u ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() { this.scrollLeft = t } : function() { this.scrollTo(t, this.scrollY) }) } }, position: function() { if (this.length) { var t = this[0],
                        e = this.offsetParent(),
                        n = this.offset(),
                        i = j.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset(); return n.top -= parseFloat(l(t).css("margin-top")) || 0, n.left -= parseFloat(l(t).css("margin-left")) || 0, i.top += parseFloat(l(e[0]).css("border-top-width")) || 0, i.left += parseFloat(l(e[0]).css("border-left-width")) || 0, { top: n.top - i.top, left: n.left - i.left } } }, offsetParent: function() { return this.map(function() { for (var t = this.offsetParent || p.body; t && !j.test(t.nodeName) && "static" == l(t).css("position");) t = t.offsetParent; return t }) } }, l.fn.detach = l.fn.remove, ["width", "height"].forEach(function(i) { var r = i.replace(/./, function(t) { return t[0].toUpperCase() });
            l.fn[i] = function(e) { var t, n = this[0]; return e === u ? F(n) ? n["inner" + r] : L(n) ? n.documentElement["scroll" + r] : (t = this.offset()) && t[i] : this.each(function(t) {
                    (n = l(this)).css(i, H(this, e, t, n[i]())) }) } }), ["after", "prepend", "before", "append"].forEach(function(e, a) { var s = a % 2;
            l.fn[e] = function() { var n, i, r = l.map(arguments, function(t) { var e = []; return "array" == (n = D(t)) ? (t.forEach(function(t) { return t.nodeType !== u ? e.push(t) : l.zepto.isZ(t) ? e = e.concat(t.get()) : void(e = e.concat(B.fragment(t))) }), e) : "object" == n || null == t ? t : B.fragment(t) }),
                    o = 1 < this.length; return r.length < 1 ? this : this.each(function(t, e) { i = s ? e : e.parentNode, e = 0 == a ? e.nextSibling : 1 == a ? e.firstChild : 2 == a ? e : null; var n = l.contains(p.documentElement, i);
                    r.forEach(function(t) { if (o) t = t.cloneNode(!0);
                        else if (!i) return l(t).remove();
                        i.insertBefore(t, e), n && function t(e, n) { n(e); for (var i = 0, r = e.childNodes.length; i < r; i++) t(e.childNodes[i], n) }(t, function(t) { if (!(null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src)) { var e = t.ownerDocument ? t.ownerDocument.defaultView : c;
                                e.eval.call(e, t.innerHTML) } }) }) }) }, l.fn[s ? e + "To" : "insert" + (a ? "Before" : "After")] = function(t) { return l(t)[e](this), this } }), B.Z.prototype = V.prototype = l.fn, B.uniq = n, B.deserializeValue = W, l.zepto = B, l }(); return c.Zepto = d, void 0 === c.$ && (c.$ = d),
        function(l) { var h, e = 1,
                u = Array.prototype.slice,
                f = l.isFunction,
                p = function(t) { return "string" == typeof t },
                d = {},
                o = {},
                n = "onfocusin" in c,
                i = { focus: "focusin", blur: "focusout" },
                m = { mouseenter: "mouseover", mouseleave: "mouseout" };

            function v(t) { return t._zid || (t._zid = e++) }

            function a(t, e, n, i) { if ((e = g(e)).ns) var r = (o = e.ns, new RegExp("(?:^| )" + o.replace(" ", " .* ?") + "(?: |$)")); var o; return (d[v(t)] || []).filter(function(t) { return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || v(t.fn) === v(n)) && (!i || t.sel == i) }) }

            function g(t) { var e = ("" + t).split("."); return { e: e[0], ns: e.slice(1).sort().join(" ") } }

            function y(t, e) { return t.del && !n && t.e in i || !!e }

            function j(t) { return m[t] || n && i[t] || t }

            function x(r, t, e, o, a, s, c) { var n = v(r),
                    u = d[n] || (d[n] = []);
                t.split(/\s/).forEach(function(t) { if ("ready" == t) return l(document).ready(e); var n = g(t);
                    n.fn = e, n.sel = a, n.e in m && (e = function(t) { var e = t.relatedTarget; if (!e || e !== this && !l.contains(this, e)) return n.fn.apply(this, arguments) }); var i = (n.del = s) || e;
                    n.proxy = function(t) { if (!(t = E(t)).isImmediatePropagationStopped()) { t.data = o; var e = i.apply(r, t._args == h ? [t] : [t].concat(t._args)); return !1 === e && (t.preventDefault(), t.stopPropagation()), e } }, n.i = u.length, u.push(n), "addEventListener" in r && r.addEventListener(j(n.e), n.proxy, y(n, c)) }) }

            function b(e, t, n, i, r) { var o = v(e);
                (t || "").split(/\s/).forEach(function(t) { a(e, t, n, i).forEach(function(t) { delete d[o][t.i], "removeEventListener" in e && e.removeEventListener(j(t.e), t.proxy, y(t, r)) }) }) }
            o.click = o.mousedown = o.mouseup = o.mousemove = "MouseEvents", l.event = { add: x, remove: b }, l.proxy = function(t, e) { var n = 2 in arguments && u.call(arguments, 2); if (f(t)) { var i = function() { return t.apply(e, n ? n.concat(u.call(arguments)) : arguments) }; return i._zid = v(t), i } if (p(e)) return n ? (n.unshift(t[e], t), l.proxy.apply(null, n)) : l.proxy(t[e], t); throw new TypeError("expected function") }, l.fn.bind = function(t, e, n) { return this.on(t, e, n) }, l.fn.unbind = function(t, e) { return this.off(t, e) }, l.fn.one = function(t, e, n, i) { return this.on(t, e, n, i, 1) }; var s = function() { return !0 },
                $ = function() { return !1 },
                r = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
                t = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };

            function E(i, r) { return !r && i.isDefaultPrevented || (r || (r = i), l.each(t, function(t, e) { var n = r[t];
                    i[t] = function() { return this[e] = s, n && n.apply(r, arguments) }, i[e] = $ }), i.timeStamp || (i.timeStamp = Date.now()), (r.defaultPrevented !== h ? r.defaultPrevented : "returnValue" in r ? !1 === r.returnValue : r.getPreventDefault && r.getPreventDefault()) && (i.isDefaultPrevented = s)), i }

            function w(t) { var e, n = { originalEvent: t }; for (e in t) r.test(e) || t[e] === h || (n[e] = t[e]); return E(n, t) }
            l.fn.delegate = function(t, e, n) { return this.on(e, t, n) }, l.fn.undelegate = function(t, e, n) { return this.off(e, t, n) }, l.fn.live = function(t, e) { return l(document.body).delegate(this.selector, t, e), this }, l.fn.die = function(t, e) { return l(document.body).undelegate(this.selector, t, e), this }, l.fn.on = function(e, r, n, o, a) { var s, c, i = this; return e && !p(e) ? (l.each(e, function(t, e) { i.on(t, r, n, e, a) }), i) : (p(r) || f(o) || !1 === o || (o = n, n = r, r = h), o !== h && !1 !== n || (o = n, n = h), !1 === o && (o = $), i.each(function(t, i) { a && (s = function(t) { return b(i, t.type, o), o.apply(this, arguments) }), r && (c = function(t) { var e, n = l(t.target).closest(r, i).get(0); if (n && n !== i) return e = l.extend(w(t), { currentTarget: n, liveFired: i }), (s || o).apply(n, [e].concat(u.call(arguments, 1))) }), x(i, e, o, n, r, c || s) })) }, l.fn.off = function(t, n, e) { var i = this; return t && !p(t) ? (l.each(t, function(t, e) { i.off(t, n, e) }), i) : (p(n) || f(e) || !1 === e || (e = n, n = h), !1 === e && (e = $), i.each(function() { b(this, t, e, n) })) }, l.fn.trigger = function(t, e) { return (t = p(t) || l.isPlainObject(t) ? l.Event(t) : E(t))._args = e, this.each(function() { t.type in i && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : l(this).triggerHandler(t, e) }) }, l.fn.triggerHandler = function(n, i) { var r, o; return this.each(function(t, e) {
                    (r = w(p(n) ? l.Event(n) : n))._args = i, r.target = e, l.each(a(e, n.type || n), function(t, e) { if (o = e.proxy(r), r.isImmediatePropagationStopped()) return !1 }) }), o }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) { l.fn[e] = function(t) { return 0 in arguments ? this.bind(e, t) : this.trigger(e) } }), l.Event = function(t, e) { p(t) || (t = (e = t).type); var n = document.createEvent(o[t] || "Events"),
                    i = !0; if (e)
                    for (var r in e) "bubbles" == r ? i = !!e[r] : n[r] = e[r]; return n.initEvent(t, i, !0), E(n) } }(d),
        function(Bh) { var Eh, Fh, Ch = +new Date,
                Dh = c.document,
                Gh = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                Hh = /^(?:text|application)\/javascript/i,
                Ih = /^(?:text|application)\/xml/i,
                Jh = "application/json",
                Kh = "text/html",
                Lh = /^\s*$/,
                Mh = Dh.createElement("a");

            function Oh(t, e, n, i) { if (t.global) return r = e || Dh, o = n, a = i, s = Bh.Event(o), Bh(r).trigger(s, a), !s.isDefaultPrevented(); var r, o, a, s }

            function Rh(t, e) { var n = e.context; if (!1 === e.beforeSend.call(n, t, e) || !1 === Oh(e, n, "ajaxBeforeSend", [t, e])) return !1;
                Oh(e, n, "ajaxSend", [t, e]) }

            function Sh(t, e, n, i) { var r = n.context,
                    o = "success";
                n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), Oh(n, r, "ajaxSuccess", [e, n, t]), Uh(o, e, n) }

            function Th(t, e, n, i, r) { var o = i.context;
                i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), Oh(i, o, "ajaxError", [n, i, t || e]), Uh(e, n, i) }

            function Uh(t, e, n) { var i, r = n.context;
                n.complete.call(r, e, t), Oh(n, r, "ajaxComplete", [e, n]), (i = n).global && !--Bh.active && Oh(i, null, "ajaxStop") }

            function Wh() {}

            function Yh(t, e) { return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?") }

            function $h(t, e, n, i) { return Bh.isFunction(e) && (i = n, n = e, e = void 0), Bh.isFunction(n) || (i = n, n = void 0), { url: t, data: e, success: n, dataType: i } }
            Mh.href = c.location.href, Bh.active = 0, Bh.ajaxJSONP = function(n, i) { if (!("type" in n)) return Bh.ajax(n); var r, o, t = n.jsonpCallback,
                    a = (Bh.isFunction(t) ? t() : t) || "Zepto" + Ch++,
                    s = Dh.createElement("script"),
                    u = c[a],
                    e = function(t) { Bh(s).triggerHandler("error", t || "abort") },
                    l = { abort: e }; return i && i.promise(l), Bh(s).on("load error", function(t, e) { clearTimeout(o), Bh(s).off().remove(), "error" != t.type && r ? Sh(r[0], l, n, i) : Th(null, e || "error", l, n, i), c[a] = u, r && Bh.isFunction(u) && u(r[0]), u = r = void 0 }), !1 === Rh(l, n) ? e("abort") : (c[a] = function() { r = arguments }, s.src = n.url.replace(/\?(.+)=\?/, "?$1=" + a), Dh.head.appendChild(s), 0 < n.timeout && (o = setTimeout(function() { e("timeout") }, n.timeout))), l }, Bh.ajaxSettings = { type: "GET", beforeSend: Wh, success: Wh, error: Wh, complete: Wh, context: null, global: !0, xhr: function() { return new c.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: Jh, xml: "application/xml, text/xml", html: Kh, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0, dataFilter: Wh }, Bh.ajax = function(Zi) { var aj, bj, ji, Yi, $i = Bh.extend({}, Zi || {}),
                    _i = Bh.Deferred && Bh.Deferred(); for (Eh in Bh.ajaxSettings) void 0 === $i[Eh] && ($i[Eh] = Bh.ajaxSettings[Eh]);
                (ji = $i).global && 0 == Bh.active++ && Oh(ji, null, "ajaxStart"), $i.crossDomain || ((aj = Dh.createElement("a")).href = $i.url, aj.href = aj.href, $i.crossDomain = Mh.protocol + "//" + Mh.host != aj.protocol + "//" + aj.host), $i.url || ($i.url = c.location.toString()), -1 < (bj = $i.url.indexOf("#")) && ($i.url = $i.url.slice(0, bj)), (Yi = $i).processData && Yi.data && "string" != Bh.type(Yi.data) && (Yi.data = Bh.param(Yi.data, Yi.traditional)), !Yi.data || Yi.type && "GET" != Yi.type.toUpperCase() && "jsonp" != Yi.dataType || (Yi.url = Yh(Yi.url, Yi.data), Yi.data = void 0); var cj = $i.dataType,
                    dj = /\?.+=\?/.test($i.url); if (dj && (cj = "jsonp"), !1 !== $i.cache && (Zi && !0 === Zi.cache || "script" != cj && "jsonp" != cj) || ($i.url = Yh($i.url, "_=" + Date.now())), "jsonp" == cj) return dj || ($i.url = Yh($i.url, $i.jsonp ? $i.jsonp + "=?" : !1 === $i.jsonp ? "" : "callback=?")), Bh.ajaxJSONP($i, _i); var kj, ej = $i.accepts[cj],
                    fj = {},
                    gj = function(t, e) { fj[t.toLowerCase()] = [t, e] },
                    hj = /^([\w-]+:)\/\//.test($i.url) ? RegExp.$1 : c.location.protocol,
                    ij = $i.xhr(),
                    jj = ij.setRequestHeader; if (_i && _i.promise(ij), $i.crossDomain || gj("X-Requested-With", "XMLHttpRequest"), gj("Accept", ej || "*/*"), (ej = $i.mimeType || ej) && (-1 < ej.indexOf(",") && (ej = ej.split(",", 2)[0]), ij.overrideMimeType && ij.overrideMimeType(ej)), ($i.contentType || !1 !== $i.contentType && $i.data && "GET" != $i.type.toUpperCase()) && gj("Content-Type", $i.contentType || "application/x-www-form-urlencoded"), $i.headers)
                    for (Fh in $i.headers) gj(Fh, $i.headers[Fh]); if (ij.setRequestHeader = gj, !(ij.onreadystatechange = function() { if (4 == ij.readyState) { ij.onreadystatechange = Wh, clearTimeout(kj); var oj, pj = !1; if (200 <= ij.status && ij.status < 300 || 304 == ij.status || 0 == ij.status && "file:" == hj) { if (cj = cj || ((Vi = $i.mimeType || ij.getResponseHeader("content-type")) && (Vi = Vi.split(";", 2)[0]), Vi && (Vi == Kh ? "html" : Vi == Jh ? "json" : Hh.test(Vi) ? "script" : Ih.test(Vi) && "xml") || "text"), "arraybuffer" == ij.responseType || "blob" == ij.responseType) oj = ij.response;
                                else { oj = ij.responseText; try { oj = function(t, e, n) { if (n.dataFilter == Wh) return t; var i = n.context; return n.dataFilter.call(i, t, e) }(oj, cj, $i), "script" == cj ? eval(oj) : "xml" == cj ? oj = ij.responseXML : "json" == cj && (oj = Lh.test(oj) ? null : Bh.parseJSON(oj)) } catch (t) { pj = t } if (pj) return Th(pj, "parsererror", ij, $i, _i) }
                                Sh(oj, ij, $i, _i) } else Th(ij.statusText || null, ij.status ? "error" : "abort", ij, $i, _i) } var Vi }) === Rh(ij, $i)) return ij.abort(), Th(null, "abort", ij, $i, _i), ij; var lj = !("async" in $i) || $i.async; if (ij.open($i.type, $i.url, lj, $i.username, $i.password), $i.xhrFields)
                    for (Fh in $i.xhrFields) ij[Fh] = $i.xhrFields[Fh]; for (Fh in fj) jj.apply(ij, fj[Fh]); return 0 < $i.timeout && (kj = setTimeout(function() { ij.onreadystatechange = Wh, ij.abort(), Th(null, "timeout", ij, $i, _i) }, $i.timeout)), ij.send($i.data ? $i.data : null), ij }, Bh.get = function() { return Bh.ajax($h.apply(null, arguments)) }, Bh.post = function() { var t = $h.apply(null, arguments); return t.type = "POST", Bh.ajax(t) }, Bh.getJSON = function() { var t = $h.apply(null, arguments); return t.dataType = "json", Bh.ajax(t) }, Bh.fn.load = function(t, e, n) { if (!this.length) return this; var i, r = this,
                    o = t.split(/\s/),
                    a = $h(t, e, n),
                    s = a.success; return 1 < o.length && (a.url = o[0], i = o[1]), a.success = function(t) { r.html(i ? Bh("<div>").html(t.replace(Gh, "")).find(i) : t), s && s.apply(r, arguments) }, Bh.ajax(a), this }; var _h = encodeURIComponent;
            Bh.param = function(t, e) { var n = []; return n.add = function(t, e) { Bh.isFunction(e) && (e = e()), null == e && (e = ""), this.push(_h(t) + "=" + _h(e)) },
                    function n(i, t, r, o) { var a, s = Bh.isArray(t),
                            c = Bh.isPlainObject(t);
                        Bh.each(t, function(t, e) { a = Bh.type(e), o && (t = r ? o : o + "[" + (c || "object" == a || "array" == a ? t : "") + "]"), !o && s ? i.add(e.name, e.value) : "array" == a || !r && "object" == a ? n(i, e, r, t) : i.add(t, e) }) }(n, t, e), n.join("&").replace(/%20/g, "+") } }(d), (Uj = d).fn.serializeArray = function() { var n, i, e = [],
                r = function(t) { if (t.forEach) return t.forEach(r);
                    e.push({ name: n, value: t }) }; return this[0] && Uj.each(this[0].elements, function(t, e) { i = e.type, (n = e.name) && "fieldset" != e.nodeName.toLowerCase() && !e.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || e.checked) && r(Uj(e).val()) }), e }, Uj.fn.serialize = function() { var e = []; return this.serializeArray().forEach(function(t) { e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value)) }), e.join("&") }, Uj.fn.submit = function(t) { if (0 in arguments) this.bind("submit", t);
            else if (this.length) { var e = Uj.Event("submit");
                this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit() } return this },
        function() { try { getComputedStyle(void 0) } catch (t) { var n = getComputedStyle;
                c.getComputedStyle = function(t, e) { try { return n(t, e) } catch (t) { return null } } } }(), d }),
function(s) { var c, u, l, h, f, p, d, m, v, g = {},
        y = !1;

    function j() { h = null, g.last && (g.el.trigger("longTap"), g = {}) }

    function x() { h && clearTimeout(h), h = null }

    function b() { c && clearTimeout(c), u && clearTimeout(u), l && clearTimeout(l), h && clearTimeout(h), c = u = l = h = null, g = {} }

    function $(t) { return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary }

    function E(t, e) { return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e }

    function t(t) { var e, n, i, r, o = 0,
            a = 0;
        y && (s(document).off(v.down, p).off(v.up, d).off(v.move, m).off(v.cancel, b), s(window).off("scroll", b), b(), y = !1), (v = t && "down" in t ? t : "ontouchstart" in document ? { down: "touchstart", up: "touchend", move: "touchmove", cancel: "touchcancel" } : "onpointerdown" in document ? { down: "pointerdown", up: "pointerup", move: "pointermove", cancel: "pointercancel" } : "onmspointerdown" in document && { down: "MSPointerDown", up: "MSPointerUp", move: "MSPointerMove", cancel: "MSPointerCancel" }) && ("MSGesture" in window && ((f = new MSGesture).target = document.body, s(document).bind("MSGestureEnd", function(t) { var e = 1 < t.velocityX ? "Right" : t.velocityX < -1 ? "Left" : 1 < t.velocityY ? "Down" : t.velocityY < -1 ? "Up" : null;
            e && (g.el.trigger("swipe"), g.el.trigger("swipe" + e)) })), p = function(t) {
            (r = E(t, "down")) && !$(t) || (i = r ? t : t.touches[0], t.touches && 1 === t.touches.length && g.x2 && (g.x2 = void 0, g.y2 = void 0), e = Date.now(), n = e - (g.last || e), g.el = s("tagName" in i.target ? i.target : i.target.parentNode), c && clearTimeout(c), g.x1 = i.pageX, g.y1 = i.pageY, 0 < n && n <= 250 && (g.isDoubleTap = !0), g.last = e, h = setTimeout(j, 750), f && r && f.addPointer(t.pointerId)) }, m = function(t) {
            (r = E(t, "move")) && !$(t) || (i = r ? t : t.touches[0], x(), g.x2 = i.pageX, g.y2 = i.pageY, o += Math.abs(g.x1 - g.x2), a += Math.abs(g.y1 - g.y2)) }, d = function(t) {
            (r = E(t, "up")) && !$(t) || (x(), g.x2 && 30 < Math.abs(g.x1 - g.x2) || g.y2 && 30 < Math.abs(g.y1 - g.y2) ? l = setTimeout(function() { var t, e, n, i;
                g.el && (g.el.trigger("swipe"), g.el.trigger("swipe" + (t = g.x1, e = g.x2, n = g.y1, i = g.y2, Math.abs(t - e) >= Math.abs(n - i) ? 0 < t - e ? "Left" : "Right" : 0 < n - i ? "Up" : "Down"))), g = {} }, 0) : "last" in g && (o < 30 && a < 30 ? u = setTimeout(function() { var t = s.Event("tap");
                t.cancelTouch = b, g.el && g.el.trigger(t), g.isDoubleTap ? (g.el && g.el.trigger("doubleTap"), g = {}) : c = setTimeout(function() { c = null, g.el && g.el.trigger("singleTap"), g = {} }, 250) }, 0) : g = {}), o = a = 0) }, s(document).on(v.up, d).on(v.down, p).on(v.move, m), s(document).on(v.cancel, b), s(window).on("scroll", b), y = !0) }["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) { s.fn[e] = function(t) { return this.on(e, t) } }), s.touch = { setup: t }, s(document).ready(t) }(Zepto);