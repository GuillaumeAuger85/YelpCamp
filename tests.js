const reviews = [{ rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 5 }]
const average = function () {
    let sum = 0;
    for (let review of reviews) { sum += review.rating };
    const average = sum / reviews.length;
    console.log(average)
}
const Average = function (array) {
    let sum = 0;
    for (let el of array) { sum += el.rating };
    const average = sum / reviews.length;
    console.log(average)
}


let index = 0;
function pullImgs(toRemove, container) {
    for (let el of container) {
        index = toRemove.indexOf(el);
        container.splice(index, 1)
    }
}