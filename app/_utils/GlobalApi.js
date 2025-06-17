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

const GetFood = async (category) => {
  const query = gql`
    query GetFood {
      foods(where: { category: { slug: "`+category+`" } }) {
        foodDescription
        foodType
        name
        id
        slug
        category {
          name
        }
      }
    }
  `

  const result = await request(MASTER_URL, query);
  return result;
}


export default {
    GetCategory,
    GetFood
  }
