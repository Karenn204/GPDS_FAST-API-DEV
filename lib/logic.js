const calculateValue = (price, stock) => {
    if (price < 0 || stock < 0) return 0;
    return price * stock + 10;
};

module.exports = { calculateValue };