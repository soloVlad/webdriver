class Item {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getPageUrl() {
        return `https://www2.hm.com/en_gb/productpage.${this.id}.html`;
    }
}

module.exports = Item;