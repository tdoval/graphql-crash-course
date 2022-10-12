const { products, categories } = require("../db");
exports.Query = {
    hello: (parent, args, context) => "GraphQL" ,
    products: (parent, args, context) =>products,
    product: (parent, args, context) => {
        const { id } = args.id;
        return products.find(product => product.id === id);
    },
    categories: (parent, args, context) => categories,
    category: (parent, args, context) => {
        const { id } = args
        return categories.find((category) => category.id === id)
    }
}