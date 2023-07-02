const queryStrings = {
  app_id: process.env.NEXT_PUBLIC_EDAMAM_APP_ID,
  app_key: process.env.NEXT_PUBLIC_EDAMAM_APP_KEY
}

export const fetchData = async (defaultQuery) => {
  const { app_id, app_key } = queryStrings;

  const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${defaultQuery}&nutrition-type=cooking`;

  // Debug log
  console.log('Request URL:', apiUrl); 

  try {
    const data = await fetch(apiUrl);
    const response = await data.json();

    // Debug log
    console.log('API response:', response); 

    return response;

  } catch (e) {
    console.log('Error fetching data:', e);
    return null;
  }
};
