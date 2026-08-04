// ==UserScript==
// @name         kianohub bypass painter
// @namespace    http://tampermonkey.net/
// @version      2.1
// @icon       https://res.cloudinary.com/dl2xajbfm/image/upload/v1770936867/kianohub_icon_1770928849208_xle90g.png
// @description  Intercept status-all response and return custom subscription states
// @author       @tp_1092s
// @match        https://www.kiano-shop.com/tools/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const url = args[0] instanceof Request ? args[0].url : args[0];
        if (typeof url === 'string' && url.includes('/api/subscriptions/status-all')) {
            const customResponseData = {
                "autopaint": {
                    "subscribed": true
                },
                "automusic": {
                    "subscribed": true
                },
                "photo_injector": {
                    "subscribed": true
                },
                "cookie_reroll": {
                    "subscribed": true
                }
            };
            return new Response(JSON.stringify(customResponseData), {
                status: 200,
                statusText: "OK",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return originalFetch.apply(this, args);
    };
})();
