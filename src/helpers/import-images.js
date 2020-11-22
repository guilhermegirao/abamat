const importAll = r => {
  const images = {};
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item).default;
    return true;
  });

  return images;
};

export default importAll;
