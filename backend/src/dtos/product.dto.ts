export default class ProductDTO {
  private constructor() { }

  public static register(data: any) {
    const { brand, model, description, price, quantity } = data;
    if (!brand || !model || !description || !price || !quantity)
      return {
        error: {
          message: 'All fields are required: brand, model, description, price, image and quantity'
        }
      }

    if (typeof price !== 'number')
      return {
        error: {
          message: 'Invalid price, must be a number'
        }
      }

    if (typeof quantity !== 'number')
      return {
        error: {
          message: 'Invalid quantity, must be a number'
        }
      }

    return {
      error: null, value: {
        type: 'cellphone',
        brand,
        model,
        description,
        price,
        image: 'https://picsum.photos/200/300',
        quantity
      }
    }
  }

  public static update(data: any) {
    const { brand, model, description, price, quantity } = data;
    if (!brand && !model && !description && !price && !quantity)
      return {
        error: {
          message: 'No fields to update'
        }
      }

    const updatedData = {
      ...(brand !== undefined && { brand }),
      ...(model !== undefined && { model }),
      ...(description !== undefined && { description }),
      ...(typeof price === 'number' && { price }),
      ...(typeof quantity === 'number' && { quantity })
    };

    return {
      error: null, value: updatedData
    }
  }



}