class SearchResult {
    constructor(searchQuery, searchPageUrl) {
        this.searchQuery = searchQuery;
        this.searchPageUrl = searchPageUrl;
    }

    getSearchQuery() {
        return this.searchQuery;
    }

    setSearchQuery(query) {
        this.searchQuery = query;
    }

    getSearchPageUrl() {
        return this.searchPageUrl;
    }

    setSearchPageUrl(url) {
        this.searchPageUrl = url;
    }
}

module.exports = SearchResult;