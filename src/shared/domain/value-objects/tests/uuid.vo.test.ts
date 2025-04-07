import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";


describe("UUID unit tests", () => {

    const valideteSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test("should run the validate function", () => {
        new Uuid();
        expect(valideteSpy).toHaveBeenCalledTimes(1);
    })

    test("should throw error if id is not a valid uuid", () => {
        expect(() => {
            new Uuid("test");
        }).toThrow(new InvalidUuidError());
    })

    test("should create a valid uuid", () => {
        const uuid = new Uuid();

        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBe(true);
    })

    test("should accept a valid uuid", () => {
        const validUuid = "123e4567-e89b-12d3-a456-426655440000";
        const uuid = new Uuid(validUuid);

        expect(uuid.id).toBe(validUuid);
    })

    
})