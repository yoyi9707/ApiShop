const Product = require('./models/Product');

const resolvers = {
    Query: {
        hello: () => {
                return 'Hello world! Resolver';
        },
        saluda (root, {name}) {
            // console.log(args);
                return 'Hello' + name;
        },      
        saluda2: (root, args) => {
            // console.log(args);
                return 'Hello' + args.name;
        },  
        async products () {
           const Products = await Product.find();
           console.log(Products);
           return Products;
        } 
    },
    Mutation: {
        async createProduct (_, { input }) {
            const newProduct = Product(input);
            await newProduct.save();
            return newProduct;
        }
    }
}

var root = {
  hello: () => {
    return 'Hello world!';
  },
  prueba: () => {
    return 'prueba'
    // {items: 'Prueba!!'}
  },
};

module.exports = resolvers

// module.exports = root


