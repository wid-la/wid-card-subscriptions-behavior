/**
   * Use `Polymer.WidCardWeightBehavior` to implement a card that can be used in a `wid-cards-grid` element.
   * @polymerBehavior
   */
'use strict';

Polymer.WidCardSubscriptionsBehavior = {

  properties: {
    /**
     * Channels the card must subscribe for
     * @type {{value: String; key: String; type?: String}[]}
     */
    subscriptions: {
      type: Array,
      value: function value() {
        return [];
      }
    },

    /**
     * Websocket configurations for the subscritions
     * @type {Array}
     */
    websockets: {
      type: Array,
      value: function value() {
        return [];
      }
    },

    /**
     * Authentification token
     * @type {String}
     */
    token: {
      type: String
    },

    /**
     * The server URL
     * @type {String}
     */
    url: {
      type: String
    }
  },

  observers: ['_subscriptionsChanged(subscriptions, token, url)'],

  /**
   * Each time the websocket receive some data. We bind it to the card model.
   * @param  {Event} e Event
   */
  _onData: function _onData(e) {
    this[e.model.ws.key] = e.detail.data;
  },

  /**
   * Each time the subscriions change, we recompute the websockets configuration.
   * @param  {{value: String; key: String; type?: String}[]} newVal Subscriptions configuration
   */
  _subscriptionsChanged: function _subscriptionsChanged(newSubscritpions, newToken, newUrl) {

    for (var i = 0; i < newSubscritpions.length; i++) {
      this.push('websockets', {
        token: newToken,
        subscription: newSubscritpions[i].value,
        key: newSubscritpions[i].key,
        url: newUrl
      });
    }
  }

};