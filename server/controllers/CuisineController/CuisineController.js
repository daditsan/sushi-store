const { Cuisine, Category, User } = require("../../models");
const { v2: cloudinary } = require('cloudinary')
const { Op } = require('sequelize')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CuisineController {

  static async createCuisine(req, res, next) {
      try {
          const cuisine = await Cuisine.create({
              ...req.body,
              authorId: req.user.id
          })

          res.status(201).json({ message: `${req.body.name} created!`, cuisine})
      } catch (error) {
          next(error)
      }
  }

  static async listCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email", "role", "phoneNumber", "address"],
          },
        ],
      });
      res.status(200).json(cuisines);
    } catch (error) {
        next(error)
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      const { id } = req.params

      let cuisine = await Cuisine.findByPk(id);

      if (!cuisine) {
        throw { name: "Not Found Cuisine" }
      }

      res.status(200).json(cuisine)
    } catch (error) {
      next(error)
    }
  }

  static async editCuisineById(req, res, next) {
    try {
      const { id } = req.params;

      let { name, description, price, imgUrl, categoryId, authorId } = req.body;

      let cuisine = await Cuisine.findByPk(id);
      if(!cuisine) {
        throw { name: "Not Found Cuisine" }
      }

      await Cuisine.update(
        {
          name, description, price, imgUrl, categoryId, authorId
        },
        {
          where: { id }
        }
      )

      let updatedCuisine = await Cuisine.findByPk(id);

      res.status(200).json({ message: `${cuisine.name} updated to ${req.body.name}`, updatedCuisine})
    } catch (error) {
      next(error)
    }
  }

  static async replaceImageById(req, res, next) {
    try {
      if (!req.file) {
        throw { name: "Bad Request Image" }
      } 

      const base64 = Buffer.from(req.file.buffer).toString('base64');
      const base64string = `data:${req.file.mimetype};base64,${base64}`;

      let result = await cloudinary.uploader.upload(base64string);

      await Cuisine.update(
        {
          imgUrl: result.url
        },
        {
          where: { id: req.params.id }
        }
      )

      res.status(200).json({ message: "Image has been updated!" })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCuisineById(req, res, next) {
    try {
      const { id } = req.params;

      let cuisine = await Cuisine.findByPk(id)

      if (!cuisine) {
        throw { name: "Not Found Cuisine" }
      }
      
      let deleteCuisine = await Cuisine.destroy(
        {
          where: { id }
        }
      )

      res.status(200).json({ message: `${cuisine.name} deleted`})
    } catch (error) {
      next(error)
    }
  }

  static async pubListCuisines(req, res, next) {
    try {
      const { filter, sort, page, search } = req.query
      
      const paramsQuery = { include: { model: Category } }

      if (filter) {
        paramsQuery.where = { categoryId: filter }
      }

      if (sort) {
        const orderBy = sort[0] === '-' ? 'DESC' : 'ASC'
        const column = orderBy === 'DESC' ? sort.slice(1) : sort;

        paramsQuery.order = [[column, orderBy]]
      }

      let limit = 10
      let pageNumber = 1

      if (page) {
        if (page.size) {
          limit = +page.size
          paramsQuery.limit = limit
        }

        if (page.number) {
          pageNumber = +page.number
          paramsQuery.offset = limit * (pageNumber - 1)
        }
      }

      if (search) {
        paramsQuery.where = { name: { [Op.iLike]: `%${search}` }}
      }

      const { count, rows } = await Cuisine.findAndCountAll(paramsQuery)
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count/limit),
        dataPerPage: limit
      })
      
    } catch (error) {
        next(error)
    }
  }

  static async pubGetCuisineById(req, res, next) {
    try {
      const { id } = req.params;

      const cuisine = await Cuisine.findByPk(id);

      if(!cuisine) {
        throw { name: 'Not Found Cuisine'}
      }

      res.status(200).json(cuisine)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CuisineController;
