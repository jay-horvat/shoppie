async function urlChecker(url) {   
        //Initialize variables
        let referer = '';
        let productNameLocation = '';
        let productPriceLocation = '';
        let success = false;

        // Trim the URL and convert to lowercase for case-insensitive matching
        const cleanedUrl = url.trim().toLowerCase();

        //Check url to find the right website headers and setup

        //Have to do something with the succes variable aat some point!
        if (cleanedUrl.includes("hm")) {
            success = true;
            referer = 'https://www2.hm.com/';
            productNameLocation = 'h1.fa226d';
            productPriceLocation = 'span.edbe20';
        }
        else if (cleanedUrl.includes("walmart")) {
            success = true;
            referer = 'https://www.walmart.com/';
            productNameLocation = 'section.mh3 h1';
            productPriceLocation = '[data-testid="price-wrap"] span[itemprop="price"]';
        }

    return {
        success,
        referer,
        productNameLocation,
        productPriceLocation
    };
}

module.exports = { urlChecker };
