const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const poll = require("../sequelize/models/polls");
var Sequelize = require("../sequelize");
const e = require("express");
const polls = require("../sequelize/models/polls");
const logger = require("../services/logger").logger;

exports.createPoll = asyncHandler(async (req,res,next) => {
    const {userid} = req.params
    const { question,startdate,expiredate, answer} = req.body
    if(!question || !startdate || !expiredate) {
        return res.status(400).json({
            success:false,
            message:"table is empty!!!",
        });
        }
    await poll.findOne({
        where: {
            [Op.and]: [{userid:userid},{question:question}]
        }
    })
        .then(async(result) =>{
            if(result == null){
                const new_poll = await poll.create({
                    userid: user.id,
                    question: question,
                    startdate: Date.now(),
                    expiredate: expiredate,
                  }).then(async (result) => {
                    let new_poll_id = new_poll.id
                    for(i in answer){
                        await poll.answers.create({
                            pollid: new_poll_id,
                            answername: answer[i]
                        });
                    }
                    return res.status(200).json({
                      success: true,
                      message: "poll added successfully",
                    });
                  });
            }else{
                res.status(500).json({
                    success: false, 
                    message: "service fault",
                });
            }
        });
    });
    
    

    //getAllpolls
    exports.getPolls = asyncHandler(async (req, res, next) => {
        try {
          const userid = req.params.userid; 
          const polls = await Polls.findAll({
            where: {
              userid: userId, 
            },
            order: [["id", "DESC"]],
            raw: true,
          });
      
          res.status(200).json(polls);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });
      