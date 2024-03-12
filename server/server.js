const express = require("express");
const {faker} = require('@faker-js/faker')
const app = express();
const port = 8000;

const createProduct = () => {
    const newfake = {
        name: faker.commerce.productName(),
        price: "$" + faker.commerce.price(),
        department: faker.commerce.department()
    };
    return newfake;
}
const createUser = () => {
    const fakeUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        last_name: faker.person.lastName(),
        first_name: faker.person.firstName(),
        _id: faker.string.uuid()
    };
    return fakeUser
}
const createCompany = () => {
    const fakeCompany = {
        _id: faker.string.uuid(),
        name: faker.company.name()
    }
    const fakeAddress = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
    }
    fakeCompany.address = fakeAddress
    return fakeCompany
}

// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// const newFakeProduct = createProduct();
// console.log(newFakeProduct)

// const newFakeUser = createUser();
// console.log(newFakeUser)

// const newFakeCompany = createCompany();
// console.log(newFakeCompany)

app.get("/api/user/new", (req, res) => {
    const newFakeUser = createUser();
    res.json( newFakeUser )
})

app.get("/api/companies/new", (req, res) => {
    const newFakeCompany = createCompany();
    res.json( newFakeCompany )
})

app.get("/api/user/company", (req, res) => {
    const newFakeUser = createUser();
    const newFakeCompany = createCompany();
    res.json( [newFakeUser, newFakeCompany] )
})

// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );
