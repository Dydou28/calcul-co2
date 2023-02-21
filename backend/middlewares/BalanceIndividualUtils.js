const db = require("../models");
const BalanceIndividual = db.balanceIndividual;

updateTotalBalance = async function (balanceId) {
    return new Promise(resultat => {
        BalanceIndividual.findOne({_id : balanceId}).exec(async(err, balance) => {
            if (err) {
                resultat('mongoDB error');
            } else if (!balance) {
                resultat('No Balance');
            } else {
                totalBalanceCarbon = 0
                for (let i = 0; i<balance.steps.length; i++){
                    totalBalanceCarbon += balance.steps[i].totalCarbon
                }
                BalanceIndividual.updateOne({_id: balanceId}, {totalBalance: totalBalanceCarbon }).exec((err, indices) => {
                    if (err) {
                    resultat('mongoDB error')
                    } else {
                        resultat(true)
                    }
                })
            }
        })
    })
}

const BalanceIndividualUtils = {
    updateTotalBalance
};
module.exports = BalanceIndividualUtils;