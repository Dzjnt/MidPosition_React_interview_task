export const getRandomColor = () => {
  let tempArr = [];
  let len;
  let rand;
  let randColorName;

  const colours = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    // brown: "#a52a2a",
    // gray: "#808080",
    // green: "#008000",
    // lime: "#00ff00",
    // orange: "#ffa500",
    // pink: "#ffc0cb",
    // purple: "#800080",
    // red: "#ff0000",
    // silver: "#c0c0c0",
    // white: "#ffffff",
    // yellow: "#ffff00",
    // yellowgreen: "#9acd32",
  };

  for (var key in colours) if (colours.hasOwnProperty(key)) tempArr.push(key);

  len = tempArr.length;
  rand = Math.floor(Math.random() * len);
  randColorName = tempArr[rand];

  return randColorName;
};

  

