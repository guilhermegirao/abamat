import views from '../data/views.json';

const viewExists = view => {
  return views.includes(view.toString().toLowerCase());
};

export default viewExists;
