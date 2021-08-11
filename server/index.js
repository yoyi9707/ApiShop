const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//Upload img
const path = require('path');

// GraphQl
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const schema = require('./schema');
const resolvers = require('./resolvers');
//

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use(require('./routes/home.routes'));
app.use('/api/product',require('./routes/product.routes'));
app.use('/api/nomenclator',require('./routes/nomenclator.routes'));
app.use('/api/auth' ,require('./routes/auth.routes'));
app.use('/api/role',require('./routes/role.routes'));
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/email',require('./routes/email.routes'));
app.use('/api/sold',require('./routes/sold.routes'));


app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  //  rootValue: root,
  graphiql: true,
}));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});