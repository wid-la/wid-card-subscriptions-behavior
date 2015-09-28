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
      observer: '_subscriptionsChanged',
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
    }
  },

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
  _subscriptionsChanged: function _subscriptionsChanged(newVal) {

    for (var i = 0; i < newVal.length; i++) {
      this.push('websockets', {
        token: 'xxx',
        subscription: newVal[i].value,
        key: newVal[i].key
      });
    }
  }

};