class Item {
    constructor(name, id, url=null) {
        this.name = name;
        this.id = id;
        this.url = url;
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
        return this.url || `https://www2.hm.com/en_gb/productpage.${this.id}.html`;
    }
}

module.exports = Item;