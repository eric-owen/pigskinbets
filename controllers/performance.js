// const mongoose = require('mongoose');
// // const Bet = require('../server');
// let Bet = mongoose.model('Bet', betSchema);




// exports.performance = (req, res) => {
//     // // let array = [
//     // //     { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
//     // //     { name: 'Tux', organization: "Linux", birth_year: 1996},
//     // //     { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
//     // //     ];
//     // Bet.find({}, (err, data) => {
//     //     if(err){
//     //         console.log(err);
//     //     }else{
//     //         console.log(data)
//     //         // res.render('performance', {
//     //         //     array: data,
//     //         //     user: req.user
//     //         // });
//     //     }
//     // });

//     // // res.render('performance',{
//     // //     array: array,
//     // //     name: 'Seahawks'
//     // // })
// };



// // exports.list = (req,res) => {
// //     app.use('/findSomeBetRoute', (req, res) => {
// //         try{
// //             Bet.find({}, (err, data) => {
// //                 if(err){
// //                     console.log(err);
// //                 }else{
// //                     console.log(data)
// //                     // res.render('performance', {
// //                     //     betResults: data,
// //                     //     user: req.user
// //                     // });
// //                 }
// //             });
// //         } catch( err ) {
// //             console.log(err)
// //         };
// //     });
// // }


// // res.render('data', {data});