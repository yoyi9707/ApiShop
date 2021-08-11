const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Query {
        hello: String 
        saluda(name: String!): String 
        saluda2(name: String!): String
        products: [Product]
    }

    type Product {
        _id: ID
        name: String!
        code: String!
        price: Float!
        weigth: Float!
        picture: String
        kind: String!
    }

    type Mutation {
        createProduct(input: ProductInput): Product
    }

    input ProductInput {
        name: String!
        code: String!
        price: Float!
        weigth: Float!
        picture: String
        kind: String!
    }
        
        `;

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

module.exports = schema;