const guid = require('uuid/v4')

export default class Card {
    id;
    suit = null;
    rank = null;
    isUsed = false;

    constructor(o, store) {
        this.id = guid();
        this.suit = o.suit;
        this.rank = o.rank;
    }
}