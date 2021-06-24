module.exports = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g,  product.productName); //  /_ _ _ /g <= regular expression global is used, all of these placeholders will get replaced
    output = output.replace(/{%ID%}/g,  product.id);
    output = output.replace(/{%IMAGE%}/g,  product.image);
    output = output.replace(/{%PRICE%}/g,  product.price);
    output = output.replace(/{%FROM%}/g,  product.from);
    output = output.replace(/{%NUTRIENTS%}/g,  product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,  product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,  product.description);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,  'not-organic'); //replace the placeholder of html class tag

    return output;
};