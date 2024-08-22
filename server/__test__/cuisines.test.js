const request = require('supertest')
const app = require('../app')

const { sequelize, User, Category, Cuisine } = require('../models')
const { hashPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { queryInterface } = sequelize;

const newCuisine = {
    name: 'New Cuisine',
    description: 'New cuisine description',
    price: 100000,
    imgUrl: 'http://example.com/new_cuisine.jpg',
    categoryId: 5
}

const editedCuisine = {
    name: 'Edited New Cuisine',
    description: 'Edited New cuisine description',
    price: 80000,
    imgUrl: 'http://example.com/edited_new_cuisine.jpg',
    categoryId: 5
}

const randomCategoryNumber = Math.floor(Math.random() * 5) + 1;
const randomPageSizeNumber = Math.floor(Math.random() * 30) + 1;
const randomCuisineId = Math.floor(Math.random() * 30) + 1;


let admin_access_token;
let staff_access_token;
let invalid_access_token;
let cuisineId;
let cuisineId2;

beforeAll(async () => {
        let users = require('../data/users.json').map(element => {
            delete element.id
            element.password = hashPassword(element.password),
            element.createdAt = new Date(),
            element.updatedAt = new Date()
            return element;
        })

        let categories = require('../data/categories.json').map(element => {
            delete element.id
            element.createdAt = new Date(),
            element.updatedAt = new Date()
            return element;
        })

        let cuisines = require('../data/cuisines.json').map(element => {
            delete element.id
            element.createdAt = new Date(),
            element.updatedAt = new Date()
            return element;
        })

        await queryInterface.bulkInsert("Users", users)

        const admin = await User.findOne(
            {
                where: { email: users[0].email }
            }
        )

        const staff = await User.findOne(
            {
                where: { email: users[1].email }
            }
        )

        admin_access_token = signToken({ id: admin.id })
        staff_access_token = signToken({ id: staff.id })
        invalid_access_token = "";

        await queryInterface.bulkInsert("Categories", categories)
        await queryInterface.bulkInsert("Cuisines", cuisines)

        const cuisine = await Cuisine.findOne(
            {
                where: { name: cuisines[0].name }
            }
        )

        const anotherCuisine = await Cuisine.findOne(
            {
                where: { name: cuisines[1].name }
            }
        )
        
        /* Cuisine with authorId = 1, or belongs to Admin User, for testing purpose. */
        cuisineId = cuisine.id 
        cuisineId2 = anotherCuisine.id
})

afterAll(async () => {
    await queryInterface.bulkDelete("Cuisines", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
    await queryInterface.bulkDelete("Categories", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
})

describe("Cuisines", () => {
    describe("POST /cuisines", () => {
        describe("Success", () => {
            test("Should be return posted cuisine name and the whole posted data", async () => {
                let { status, body } = await request(app).post("/cuisines").set("Authorization", `Bearer ${admin_access_token}`)
                .send(newCuisine)

                expect(status).toBe(201)
                expect(body).toHaveProperty("message", `${newCuisine.name} created!`)
                expect(body.cuisine).toHaveProperty("id", expect.any(Number))
                expect(body.cuisine).toHaveProperty("name", expect.any(String))
                expect(body.cuisine).toHaveProperty("description", expect.any(String))
                expect(body.cuisine).toHaveProperty("price", expect.any(Number))
                expect(body.cuisine).toHaveProperty("imgUrl", expect.any(String))
                expect(body.cuisine).toHaveProperty("categoryId", expect.any(Number))
                expect(body.cuisine).toHaveProperty("authorId", expect.any(Number))
            })
        }),
        describe("Failed", () => {
            test("Should be return error when doing this request without login", async () => {
                let { status, body } = await request(app).post("/cuisines")
                .send(newCuisine)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when the access_token is not valid", async () => {
                let { status, body } = await request(app).post("/cuisines").set("Authorization", `Bearer ${invalid_access_token}`)
                .send(newCuisine)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when request body validation requirement is not filled: Name empty", async () => {
                let { status, body } = await request(app).post("/cuisines").set("Authorization", `Bearer ${admin_access_token}`)
                .send(
                    {
                        ...newCuisine,
                        name: ''
                    }
                )

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Cuisine name is required")
            })
        })
    }),
    describe("PUT /cuisines", () => {
        describe("Success", () => {
            test("Should be succesfully updated the cuisine data by given params and will return update info", async () => {
                let { status, body } = await request(app).put(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${admin_access_token}`)
                .send(editedCuisine)

                expect(status).toBe(200)
                expect(body).toHaveProperty("message", expect.any(String))
                expect(body.updatedCuisine).toHaveProperty("id", expect.any(Number))
                expect(body.updatedCuisine).toHaveProperty("name", expect.any(String))
                expect(body.updatedCuisine).toHaveProperty("description", expect.any(String))
                expect(body.updatedCuisine).toHaveProperty("price", expect.any(Number))
                expect(body.updatedCuisine).toHaveProperty("imgUrl", expect.any(String))
                expect(body.updatedCuisine).toHaveProperty("categoryId", expect.any(Number))
                expect(body.updatedCuisine).toHaveProperty("authorId", expect.any(Number))
            })
        })
        describe("Failed", () => {
            test("Should be return error doing this request without login", async () => {
                let { status, body } = await request(app).put(`/cuisines/${cuisineId}`)
                .send(editedCuisine)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when the access_token is not valid", async () => {
                let { status, body } = await request(app).put(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${invalid_access_token}`)
                .send(editedCuisine)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when given entity id is not valid in the database", async () => {
                let { status, body } = await request(app).put(`/cuisines/9999`).set("Authorization", `Bearer ${admin_access_token}`)
                .send(editedCuisine)

                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Error cuisine not found")
            })
            test("Should be return error when user with Staff role tries to update an entity that's not belong to them", async () => {
                let { status, body } = await request(app).put(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${staff_access_token}`)
                .send(editedCuisine)

                expect(status).toBe(403)
                expect(body).toHaveProperty("message", "You are not authorized to do this request")
            })
            test("Should be return error when request body validation requirement is not filled: Name empty", async () => {
                let { status, body } = await request(app).put(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${admin_access_token}`)
                .send(
                    {
                        ...editedCuisine,
                        name: ''
                    }
                )

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Cuisine name is required")
            })
        })
    })
    describe("DELETE /cuisines", () => {
        describe("Success", () => {
            test("Should be successfully deleted the cuisine by given params id", async () => {
                let { status, body } = await request(app).delete(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${admin_access_token}`)

                expect(status).toBe(200)
                expect(body).toHaveProperty("message", expect.any(String))
            })
        })
        describe("Failed", () => {
            test("Should be return error when doing this request without login", async () => {
                let { status, body } = await request(app).delete(`/cuisines/${cuisineId}`)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when the access_token is not valid", async () => {
                let { status, body } = await request(app).delete(`/cuisines/${cuisineId}`).set("Authorization", `Bearer ${invalid_access_token}`)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("Should be return error when given entity id is not valid in the database", async () => {
                let { status, body } = await request(app).delete(`/cuisines/9999`).set("Authorization", `Bearer ${admin_access_token}`)

                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Error cuisine not found")
            })
            test("Should be return error when user with Staff role tries to delete an entity that's not belong to them", async () => {
                let { status, body } = await request(app).delete(`/cuisines/${cuisineId2}`).set("Authorization", `Bearer ${staff_access_token}`)

                expect(status).toBe(403)
                expect(body).toHaveProperty("message", "You are not authorized to do this request")
            })
        })
    })
    describe("GET /pub/cuisines", () => {
        describe("Success", () => {
            test("Should be return list of cuisines data without filter query parameter", async () => {
                let { status, body } = await request(app).get(`/pub/cuisines`)

                expect(status).toBe(200)
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPage", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
            })
            test("Should be return cuisine(s) data with 1 filter query parameter", async () => {
                let { status, body } = await request(app).get(`/pub/cuisines?filter=${randomCategoryNumber}`)

                expect(status).toBe(200)
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPage", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
            })
            test("Should be return cuisine(s) data including the page length size when set", async () => {
                let { status, body } = await request(app).get(`/pub/cuisines?page[size]=${randomPageSizeNumber}`)

                expect(status).toBe(200)
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPage", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
            })
        })
    })
    describe("GET /pub/cuisines/:id", () => {
        describe("Success", () => {
            test("Should be return a cuisine data by the given params id", async () => {
                let { status, body } = await request(app).get(`/pub/cuisines/${randomCuisineId}`)
                
                expect(status).toBe(200)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("description", expect.any(String))
                expect(body).toHaveProperty("price", expect.any(Number))
                expect(body).toHaveProperty("imgUrl", expect.any(String))
                expect(body).toHaveProperty("categoryId", expect.any(Number))
                expect(body).toHaveProperty("authorId", expect.any(Number))
            })
        })
        describe("Failed", () => {
            test("Should be return error because the given params id is not found in the database", async () => {
                let { status, body } = await request(app).get(`/pub/cuisines/9999`)
                
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Error cuisine not found")
            })
        })
    })
})