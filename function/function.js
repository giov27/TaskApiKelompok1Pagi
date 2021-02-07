function valid(find, user, elem, db) {
    if (find === undefined) {
        console.log("idmu ga ada");
    } else {
        db.forEach(element => {
            // console.log('element:', element);
            if (element.userId === user) {
                elem.push(element)
                return elem;
            }
        });
    }
}

// function validateLetter(username) {
//     let textInput = username;
//     var replacedInput = textInput.replace(/[^A-Za-z0-9]/g, "");
//     if (textInput != replacedInput) {
//         throw NonMatchError;
//     } else {
//         return username;
//     }
// }


module.exports = { valid }