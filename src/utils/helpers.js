const shuffle = (items) => {
  const array = items;
  let m = items.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    i = Math.floor(Math.random() * (m -= 1));

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export default shuffle;
