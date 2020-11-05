import { getRepository } from "typeorm";
import { Product } from "./entity/product";



export async function runSeed() {
    const productRepository = getRepository(Product);
    
    let productoA = await productRepository.findOne({ where: { name: "Producto A" } });
    // creating status
    if (!productoA) {
        let product = productRepository.create({
            name: "Producto A",
            description:"",
            price:12.5
        });
        await productRepository.save(product);
    }


    let productoB = await productRepository.findOne({ where: { name: "Producto B" } });
    // creating status
    if (!productoB) {
        let product = productRepository.create({
            name: "Producto B",
            description:"",
            price:2.99
        });
        await productRepository.save(product);
    }

    let productoC = await productRepository.findOne({ where: { name: "Producto C" } });
    // creating status
    if (!productoC) {
        let product = productRepository.create({
            name: "Producto C",
            description:"",
            price:230.0
        });
        await productRepository.save(product);
    }

    let productoD = await productRepository.findOne({ where: { name: "Producto D" } });
    // creating status
    if (!productoD) {
        let product = productRepository.create({
            name: "Producto D",
            description:"",
            price:9.99
        });
        await productRepository.save(product);
    }

}