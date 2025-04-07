import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    test("Constructor", () => {
        let category = new Category({
            name: "Movie",
            is_active: true,
            created_at: new Date()
        });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe("Movie");
        expect(category.description).toBeNull();
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);

        category = new Category({
            name: "Movie",
        });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe("Movie");
        expect(category.description).toBeNull();
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
    })
})

describe("Create and change commands", () => {
    test("Should create a new category", () => {
        const category = Category.create({
            name: "Movie",
        })

        expect(category.name).toBe("Movie");
        expect(category.description).toBeNull();
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
    })

    test("Should create a new category and change name", () => {
        const category = Category.create({
            name: "Movie",
        })

        category.changeName("Movies");

        expect(category.name).toBe("Movies");
    })

    test("Should create a new category and change description", () => {
        const category = Category.create({
            name: "Movie",
        })

        category.changeDescription("New description");

        expect(category.description).toBe("New description");
    })

    test("Should create a new category and change active", () => {
        const category = Category.create({
            name: "Movie",
            is_active: true
        })

        expect(category.is_active).toBe(true);

        category.deactivate();

        expect(category.is_active).toBe(false);

        category.activate();

        expect(category.is_active).toBe(true);
    })

})

describe("category_id field", () => {
    const arrange = [
        {category_id: null}, {category_id: undefined}, {category_id: new Uuid},
    ]

    test.each(arrange)("id = %j", ({category_id}) => {
        const category = new Category({
            name: "Movie",
            category_id: category_id as any
        })

        expect(category.category_id).toBeInstanceOf(Uuid);

        if(category_id instanceof Uuid){
            expect(category.category_id.id).toBe(category_id.id);
        }
    })
})