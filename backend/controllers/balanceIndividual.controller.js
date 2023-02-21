const db = require("../models");
const BalanceIndividual = db.balanceIndividual;
const middlewares = require("../middlewares");
const { findOne } = require("../models/users.model");
const { balanceIndividual } = require("../models");
const calcBalanceIndividual = middlewares.calcBalanceIndividual;
const BalanceIndividualUtils = middlewares.BalanceIndividualUtils

exports.newBalance = (req, res, next) => {
  const userId = req.params.id;
  
  BalanceIndividual.find({ userId: userId }).exec(async (err, balance) => {
    if (err) {
        res.message = "mongoDB error";
        res.status(400).json({
            status: false,
            message: "Error Database",
        });
    } else if (!balance) {
      balance = await BalanceIndividual.insertMany({
        userId: userId,
        steps: [],
        creationDate: new Date(),
      })
      res.status(200).json({
          status: true,
          message: 'New Balance initialized',
          terminated: true,
          balanceId: balance[0]._id,
      });
      res.message = "New Balance initialized";
      next();
    } else {
      let balanceIndex = null;
      await balance.map((b, i) => { if (b.terminated === false) balanceIndex = i; });
      
      if (balanceIndex || balanceIndex == 0) {
        res.status(201).json({
            status: true,
            message: 'Balance not terminated exist',
            terminated: false,
            balanceId: balance[balanceIndex]._id
        });
        res.message = "Balance not terminated exist";
        next();
      } else {
        newBalance = await BalanceIndividual.insertMany({
          userId: userId,
          steps: [],
          creationDate: new Date(),
        })
        res.status(200).json({
            status: true,
            message: 'New Balance initialized',
            terminated: true,
            balanceId: newBalance[0]._id,
        });
        res.message = "New Balance initialized";
        next();
      }
    }
  });
}

exports.restartBalance = (req, res, next) => {
  const userId = req.params.id;
  
  BalanceIndividual.find({ userId: userId }).exec(async (err, balance) => {
    if (err) {
        res.message = "mongoDB error";
        res.status(400).json({
            status: false,
            message: "Error Database",
        });
    } else if (!balance) {
      balance = await BalanceIndividual.insertMany({
        userId: userId,
        steps: [],
        creationDate: new Date(),
      })
      res.status(200).json({
          status: true,
          message: 'New Balance initialized',
          terminated: true,
          balanceId: balance[0]._id,
      });
      res.message = "New Balance initialized";
      next();
    } else {
      let balanceIndex = null;
      await balance.map((b, i) => { if (b.terminated === false) balanceIndex = i; });
      console.log(balanceIndex)
      if (balanceIndex || balanceIndex == 0) {
        BalanceIndividual.deleteOne({ _id: balance[balanceIndex]._id }).exec();
      }
      const newBalance = await BalanceIndividual.insertMany({
        userId: userId,
        steps: [],
        creationDate: new Date(),
      })
      res.status(200).json({
          status: true,
          message: 'New Balance initialized',
          terminated: true,
          balanceId: newBalance[0]._id,
      });
      res.message = "New Balance initialized";
      next();
    }
  });
}

exports.getStepBalance = (req, res, next) => {
  const stepName = req.params.stepName;
  const userId = req.params.id;
  
  BalanceIndividual.find({ userId: userId }).exec(async (err, balances) => {
    if (err) {
        res.message = "mongoDB error";
        res.status(400).json({
            status: false,
            message: "Error Database",
        });
    } else if (!balances) {
      res.status(201).json({
          status: false,
          message: 'No Balance',
          balanceId: '',
          balanceStep: {},
      });
      res.message = 'No Balance';
      next();
    } else {
      let balanceIndex = balances.map((b) => { if (b.terminated === false) return b._id });

      if (balanceIndex[balanceIndex.length-1] && balanceIndex.length > 0) {
        BalanceIndividual.findOne({ _id: balanceIndex[balanceIndex.length-1] }).exec((err, balance) => {
          res.status(200).json({
              status: true,
              message: 'get Balance ' + stepName,
              balanceStep: balance.steps,
              balanceId: balance.id,
          });
          res.message = 'get Balance ' + stepName;
          next();
        })
      } else {
        res.status(201).json({
            status: false,
            message: 'No Step',
            balanceId: '',
            balanceStep: {},
        });
        res.message = 'No Step';
        next();
      }
    }
  });
}

exports.updateStepBalance = (req, res, next) => {
  const form = req.body.form;
  const stepName = req.params.stepName;
  const balanceId = req.params.balanceId;
  const userId = req.params.id;
  
  BalanceIndividual.findOne({ _id: balanceId, userId: userId }).exec(async (err, balance) => {
    if (err) {
        res.message = "mongoDB error";
        res.status(400).json({
            status: false,
            message: "Error Database",
        });
    } else if (!balance) {
      res.status(201).json({
          status: false,
          message: 'No Balance',
      });
      res.message = 'No Balance';
      next();
    } else {
      let balanceStepIndex = balance.steps.map((s, i) => { if (s.label === stepName) return s.label }).indexOf(stepName);
      let resCalc;

      //faire les calcules pour stocker ensuite le total (les calcules sont a faire dans la focntions )
      if (stepName == 'workPlace'){
        resCalc = await calcBalanceIndividual.calcWorkplaceBalance(form);
      } else if (stepName == 'transport'){
        resCalc = await calcBalanceIndividual.calcTransportBalance(form, balanceStepIndex >= 0 ? balance.steps[balanceStepIndex].totalCarbon : 0);
      } else if (stepName == 'numerique'){
        resCalc = await calcBalanceIndividual.calcNumeriqueBalance(form);
      } else if (stepName == 'alimentation'){
        resCalc = await calcBalanceIndividual.calcAlimentationBalance(form);
      } else if (stepName == 'achat'){
        resCalc = await calcBalanceIndividual.calcAchatBalance(form);
      } else {
        res.message = "Wrong StepName";
        res.status(400).json({
            status: false,
            message: "Wrong StepNam",
            stepName
        });
        return;
      }
      let updateObject = [];
      if (balanceStepIndex >= 0) {
        updateObject = [{ _id: balanceId, "steps.label": stepName }, {
          $set: {
            terminated: stepName == 'achat' ? true : false,
            "steps.$.questions": resCalc.form,
            "steps.$.totalCarbon": resCalc.totalCarbon
          }
        }];
      } else {
        updateObject = [{ _id: balanceId }, {
          $set: { terminated: stepName == 'achat' ? true : false },
          $push: {
            steps: [{
              label: stepName,
              questions: resCalc.form,
              totalCarbon: resCalc.totalCarbon,
              terminated: true
            }]
          }
        }];
      }
      BalanceIndividual.updateOne(updateObject[0], updateObject[1]).exec(async (err, balance) => {
        if (err) {
          console.log(err)
            res.message = "mongoDB error";
            res.status(400).json({
                status: false,
                message: "Error Database",
            });
        } else {
          await BalanceIndividualUtils.updateTotalBalance(balanceId);
          res.status(200).json({
              status: true,
              message: 'Balance step '+stepName+' updated',
          });
          res.message = 'Balance step '+stepName+' updated';
          next();
        }
      })
    }
  });
}

 exports.getBalance = (req, res, next) => {
  const balanceId = req.params.balanceId;
  const userId = req.params.id;

  BalanceIndividual.findOne({_id : balanceId, userId: userId }).exec(async(err, balance) => {
    if (err) {
      res.status(400).json({
          status: false,
          message: "Error Database",
      });
    } else if (!balance) {
      res.status(200).json({
          status: false,
          message: "No Balance",
      });
    }else {
      res.status(200).json({
          status: true,
          message: "balance total carbon",
          balance,
      });
      res.message = "balance total carbon";
    
      next();
    }
 })
}

exports.getAllBalance = (req, res, next) => {
  const userId = req.params.id;

 BalanceIndividual.find({userId : userId}).exec(async(err, balance) => {
   if (err) {
     res.status(400).json({
         status: false,
         message: "Error Database",
     });
   } else if (!balance) {
     res.status(200).json({
         status: false,
         message: "No Balance",
     });
   }else {
     res.status(200).json({
         status: true,
         message: "all balance",
         balance,
     });
     res.message = "all balance";
   
     next();
   }
})
}


exports.getLastBalance = (req, res, next) => {
  const userId = req.params.id;

 BalanceIndividual.find({userId : userId}).sort([['creationDate', -1]]).limit(1).exec(async(err, balance) => {
   if (err) {
     res.status(400).json({
         status: false,
         message: "Error Database",
     });
     return;
   } else if (!balance) {
     res.status(200).json({
         status: false,
         message: "No Balance",
     });
     return;
   }else {
     res.status(200).json({
         status: true,
         message: "all balance",
         balance,
     });
     res.message = "all balance";
   
     return;
   }
})
}


exports.deleteRow = (req, res, next) => {
  const balanceId = req.params.balanceId;
  const questionId = req.params.questionId;
  const stepName = req.params.stepName;

  BalanceIndividual.findOne({_id : balanceId}).exec(async(err, balance) => {
   if (err) {
    res.status(400).json({
        status: false,
        message: "Error Database",
    });
  } else if (!balance) {
    res.status(200).json({
        status: false,
        message: "No Balance",
    });
   }else {
    var questionIndex=-1;
    var questionCarbon=0.0;
    let balanceStepIndex = balance.steps.map((s, i) => { if (s.label === stepName) return s.label }).indexOf(stepName);
    if (balanceStepIndex >= 0) {
      
    for (let i = 0; i < balance.steps[balanceStepIndex].questions.length; i++) {
      const element = balance.steps[balanceStepIndex].questions[i];
      if(element['_id'] == questionId){
        questionIndex =i;
        questionCarbon=element['totalCarbon'];
      }      
    }

    if(questionIndex>=0){
      balance.steps[balanceStepIndex].questions.splice(questionIndex, 1);
      BalanceIndividual.updateOne({ _id: balanceId, "steps.label": stepName }, {
                $set: {
                  "steps.$.questions": balance.steps[balanceStepIndex].questions,
                  "steps.$.totalCarbon": balance.steps[balanceStepIndex].totalCarbon - questionCarbon,
                }
              }).exec(async (err, balance) => {
                if (err) {
                  console.log(err)
                    res.message = "mongoDB error";
                    res.status(400).json({
                        status: false,
                        message: "Error Database",
                    });
                } else {
                  await BalanceIndividualUtils.updateTotalBalance(balanceId);
                  res.status(200).json({
                      status: true,
                      message: "row delete",
                      balance,
                  });
                  res.message = "row delete";
                
                  next();
                }
              })           
    }
    }
  }
  });
}