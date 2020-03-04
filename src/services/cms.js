import axios from 'axios';

// TODO: Replace domains w/ env variables.

export const getJobs = async () => {
  try {
    const response = await axios.get('http://localhost:1337/app-jobs');
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAbout = async () => {
  try {
    const response = await axios.get('http://localhost:1337/app-abouts/1');
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {
  getJobs,
  getAbout,
};
