const { Category } = require('../../models')


class CategoryController {
    static async createCategory(req, res, next) {
        try {
            const category = await Category.create({
                ...req.body
            })
            
            res.status(201).json({ message: `${category.name} category created!`, category})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    static async listCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async editCategoryById(req, res, next) {
        try {
            const { id } = req.params;

            let { name } = req.body

            let category = await Category.findByPk(id);
            if (!category) {
                throw { name: 'Not Found Category' }
            }

            await Category.update(
                {
                    name
                },
                {
                    where: { id }
                }
            )

            let updatedCategory = await Category.findByPk(id);

            res.status(200).json({ message: `${category.name} updated to ${req.body.name}`, updatedCategory })
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            
            let category = await Category.findByPk(id)

            if (!category) {
                throw { name: 'Not Found Category' }
            }

            let deletedCategory = await Category.destroy(
                {
                    where: { id }
                }
            )

            res.status(200).json({ message: `${category.name} category deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController;