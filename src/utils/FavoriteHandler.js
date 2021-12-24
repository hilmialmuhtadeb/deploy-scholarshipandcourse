import axios from 'axios';

const addScholarshipToFavorite = (user, scholarship) => {
  axios.post('https://scholarshipandcourse.rizqisyahrendra.tech/v1/favorites', {
    username: user.username,
    scholarshipId: scholarship._id,
  });
}

const removeScholarshipFromFavorite = (user, scholarship) => {
    const username = user.username;
    const scholarshipId = scholarship._id;
    axios.delete(`https://scholarshipandcourse.rizqisyahrendra.tech/v1/favorites?username=${username}&scholarshipId=${scholarshipId}`);
}

const isFavoritedScholarship = async (user, scholarship, setIsFavorited) => {
  let response = await axios.get(`https://scholarshipandcourse.rizqisyahrendra.tech/v1/favorites?username=${user.username}&scholarshipId=${scholarship._id}`);
  if (response.data.favorite !== null) {
    setIsFavorited(true);
  } else {
    setIsFavorited(false);
  }
}

export {
  addScholarshipToFavorite,
  removeScholarshipFromFavorite,
  isFavoritedScholarship,
};