const users = require("./users")
// @ponicode
describe("users.index", () => {
    test("0", () => {
        let callFunction = () => {
            users.index("https://api.telegram.org/bot", { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.index("https://croplands.org/app/a/confirm?t=", { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.index("http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.index("http://www.croplands.org/account/confirm?t=", { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.index("https://", { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.index(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("users.show", () => {
    test("0", () => {
        let callFunction = () => {
            users.show({ user: "user123", params: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } }, { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.show({ user: "user123", params: { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } }, { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.show({ user: "user name", params: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.show({ user: "user123", params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.show({ user: "user name", params: { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.show(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("users.create", () => {
    test("0", () => {
        let callFunction = () => {
            users.create({ body: "Anas" }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.create({ body: "George" }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.create({ body: "Edmond" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.create({ body: "George" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.create({ body: "Michael" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.create(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("users.update", () => {
    test("0", () => {
        let callFunction = () => {
            users.update({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" }, body: "Edmond" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.update({ params: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" }, body: "Edmond" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.update({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" }, body: "Jean-Philippe" }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.update({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" }, body: "Pierre Edouard" }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.update({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" }, body: "Michael" }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.update(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("users.destroy", () => {
    test("0", () => {
        let callFunction = () => {
            users.destroy({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.destroy({ params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.destroy({ params: { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.destroy({ params: { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.destroy({ params: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.destroy(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("users.authenticate", () => {
    test("0", () => {
        let callFunction = () => {
            users.authenticate({ body: { email: "user1+user2@mycompany.com", password: "!Lov3MyPianoPony" } }, { json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users.authenticate({ body: { email: "something.example.com", password: "NoWiFi4you" } }, { json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users.authenticate({ body: { email: "user1+user2@mycompany.com", password: "accessdenied4u" } }, { json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users.authenticate({ body: { email: "ponicode.com", password: "accessdenied4u" } }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users.authenticate({ body: { email: "something@example.com", password: "$p3onyycat" } }, { json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users.authenticate(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
