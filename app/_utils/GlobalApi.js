const { gql, default: request } = require("graphql-request");

const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL

/**
 * Used to Make Get Cateogry API request
 * @returns 
 */
const GetCategory=async()=>{
    const query=gql`
    query Category {
  categories (first: 50) {
    id
    name
    slug
    icon {
      url
    }
  }
}
    `

    const result=await request(MASTER_URL, query);
    return result;
}

const GetFood=async(category)=>{
  const query=gql`
 query GetFood {
  foods(where:{ category: {slug: "`+category+`"}}) {
    description
    category {
      name
    }
    id
    name
    price
    slug
    foodType
  }
}
  `
const result=await request(MASTER_URL, query);
  return result;
}


const AddToCart=async(items)=>{
  const query=gql`
    mutation AddToCart {
  createUserCart(
    data: {email: "`+items?.email+`", foodName: "`+items?.name+`", price: `+items.price+`, 
    productDescription: "`+items.description+`", food: {connect: {slug:"`+items?.foodSlug+`"}}}
  ) {
    id
  }
  publishManyUserCartsConnection(to: PUBLISHED) {
    aggregate {
      count
    }
  }
}
  `
  const result=await request(MASTER_URL, query);
  return result;
}

const GetUserCart=async(email)=>{
  const query=gql`
  query GetUserCart {
  userCarts(where: {email: "`+email+`"}) {
    id
    price
    productDescription
    foodName
  }
}
  `
  const result=await request(MASTER_URL, query);
  return result;
}

const DisconnectFoodFromCartItem=async(id)=>{
  const query=gql`
  mutation DisconnectFoodFromCartItem {
  updateUserCart(data: {food: {disconnect: true}}, where: {id: "`+id+`"}) {
    id
  }
  publishManyUserCartsConnection {
    aggregate {
      count
    }
  }
}
  `
  const result = await request(
    MASTER_URL,
    query,
    {},
    {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
    }
  );
  return result;
}

const DeleteItemFromCart=async(id)=>{
  const query=gql`
  mutation DeleteCartItem {
  deleteUserCart(where: {id: "`+id+`"}) {
    id
    foodName
  }
}
  `
  const result = await request(
    MASTER_URL,
    query,
    {},
    {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
    }
  );
  return result;
}

const CreateNewOrder=async(data)=>{
  const query=gql`
  mutation CreateNewOrder {
  createOrder(
    data: {email: "`+data?.email+`", orderAmount: `+data?.orderAmount+`, username: "`+data?.username+`", address: "`+data?.address+`", 
    city: "`+data?.city+`", phone: "`+data?.phone+`", zipCode: "`+data?.zipCode+`"}
  ) {
    id
  }
}  
  `
  const result = await request(
    MASTER_URL,
    query,
    {},
    {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
    }
  );
  return result;
}

const UpdateOrderWithDetail = async (name, price, id, email) => {
  const query = gql`
    mutation updateOrderWithDetail {
      updateOrder(
        data: { orderDetail: { create: { OrderItem: { data: { name: "${name}", price: ${price} } } } } }
        where: { id: "${id}" }
      ) {
        id
      }
      publishManyOrdersConnection(to: PUBLISHED) {
        aggregate {
          count
        }
      }
      deleteManyUserCartsConnection(where: { email: "${email}" }) {
        aggregate {
          count
        }
      }
    }
  `
  const result = await request(
    MASTER_URL,
    query,
    {},
    {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
    }
  );
  return result;
};



export default {
    GetCategory,
    GetFood,
    AddToCart,
    GetUserCart,
    DisconnectFoodFromCartItem,
    DeleteItemFromCart,
    CreateNewOrder,
    UpdateOrderWithDetail,
  }
