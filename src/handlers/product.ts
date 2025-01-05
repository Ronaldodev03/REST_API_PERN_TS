import { Request, Response } from "express";
import Product from "../models/Product.model";
//import { check, validationResult } from "express-validator";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]], // order
      limit: 2, // limit
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude some props
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: "Producto No Encontrado",
      });
      return;
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  //validation in the handler:
  // await check("name")
  //   .notEmpty()
  //   .withMessage("El nombre de Producto no puede ir vacio")
  //   .run(req);
  // await check("price")
  //   .isNumeric()
  //   .withMessage("Valor no válido")
  //   .notEmpty()
  //   .withMessage("El precio de Producto no puede ir vacio")
  //   .custom((value) => value > 0)
  //   .withMessage("Precio no válido")
  //   .run(req);

  // let errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  // }

  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  // Actualizar
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  // Actualizar
  product.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  await product.destroy();
  res.json({ data: "Producto Eliminado" });
};
