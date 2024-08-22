const request = require('supertest')
const app = require('../app')

const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { queryInterface } = sequelize;

const adminInfo = {
    username: 'admin_test',
    email: 'admin_test@mail.com',
    password: '1234567',
    role: 'Admin',
    phoneNumber: '081234567890',
    address: 'Jakarta'
}

const staffInfo = {
    username: 'staff_test',
    email: 'staff_test@mail.com',
    password: '1234567',
    role: 'Staff',
    phoneNumber: '081234567890',
    address: 'Jakarta'
}

const adminUserLoginInfo = {
    email: 'admin_test@mail.com',
    password: '1234567',
}

const staffUserAddUserInfo = {
    username: 'another_staff_test',
    email: 'another_staff_test@mail.com',
    password: '1234567',
    phoneNumber: '081234567890',
    address: 'Jakarta'
}

let access_token;
let staff_access_token;

beforeAll(async () => {    
    await queryInterface.bulkInsert("Users", [
        {
            ...adminInfo,
            password: hashPassword(adminInfo.password),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ...staffInfo,
            password: hashPassword(staffInfo.password),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    
    const admin = await sequelize.models.User.findOne(
        {
            where: { email: adminInfo.email }
        }
    )

    const staff = await sequelize.models.User.findOne(
        {
            where: { email: staffInfo.email }
        }
    )

    access_token = signToken({ id: admin.id, role: admin.role })
    staff_access_token = signToken({ id: staff.id, role: staff.role })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe("Users", () => {
    describe("POST /login", () => {
        describe("Success", () => {
            test("Should be return access_token", async () => {
                let { body, status } = await request(app).post("/login").send(adminUserLoginInfo)

                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", expect.any(String))
            })
        })
        describe("Failed", () => {
            test("Should be return error when email is empty", async () => {
                let { body, status } = await request(app).post("/login").send({
                    email: "",
                    password: "1234567"
                })

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email cannot be empty");
            })
            test("Should be return error when password is empty", async () => {
                let { body, status } = await request(app).post("/login").send({
                    email: "admin_test@mail.com",
                    password: ""
                })

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password cannot be empty");
            })
            test("Should be return error when email is not registered", async () => {
                let { body, status } = await request(app).post("/login").send({
                    email: "nonexisted@mail.com",
                    password: "1234567",
                })

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Email or Password is incorrect");
            })
            test("Should be return error when password is not match", async () => {
                let { body, status } = await request(app).post("/login").send({
                    email: "admin_test@mail.com",
                    password: "wrongpassword"
                })

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Email or Password is incorrect")
            })
        })
    }),
    describe("POST /add-user", () => {
        describe("Success", () => {
            test("Should return new user posted id and email successfully", async () => {
                let { body, status } = await request(app).post("/add-user").set("Authorization", `Bearer ${access_token}`)
                .send(staffUserAddUserInfo)

                expect(status).toBe(201)
                expect(body).toHaveProperty("id", expect.any(Number))
            })
        })
        describe("Failed", () => {
            test("Should be return error when doing add-user request without login", async () => {
                let { body, status } = await request(app).post("/add-user")
                .send(staffUserAddUserInfo)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", expect.any(String))
            })
            test("Should be return error when is not user with Admin role doing this request", async () => {
                let { body, status } = await request(app).post("/add-user").set("Authorization", `Bearer ${staff_access_token}`)
                .send(staffUserAddUserInfo)

                expect(status).toBe(401)
                expect(body).toHaveProperty("message", expect.any(String))
            }),
            test("Should be return error when Email is empty", async () => {
                let { body, status } = await request(app).post("/add-user").set("Authorization", `Bearer ${access_token}`)
                .send({
                    username: 'staff_test',
                    email: '',
                    password: '1234567',
                    role: 'Staff',
                    phoneNumber: '081234567890',
                    address: 'Jakarta'
                })

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", expect.any(String))
            })
            test("Should be return error when Email is not filled with Email Format", async () => {
                let { body, status } = await request(app).post("/add-user").set("Authorization", `Bearer ${access_token}`)
                .send({
                    username: 'staff_test',
                    email: 'staff_test',
                    password: '1234567',
                    role: 'Staff',
                    phoneNumber: '081234567890',
                    address: 'Jakarta'
                })

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", expect.any(String))
            })
        })
    })
})