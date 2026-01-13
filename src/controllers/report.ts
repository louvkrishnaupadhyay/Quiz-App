import type { RequestHandler } from "express";
import Report from "../models/report.js";
import projectError from "../helper/error.js";


import type { returnResponse } from "../utils.js";

const getReport : RequestHandler = async (req, res, next) => {
    try {
        let report;
        if(!!req.params.reportId){
            const reportId = req.params.reportId;
            report = await Report.findById(reportId,{score:1, total:1, userId:1});

            if(!report){
                const err = new projectError("Report not found");
                err.statusCode = 404;
                throw err;
            }

            if(report.userId.toString() !== req.userId){
                const err = new projectError("You are not autharised");
                err.statusCode = 405;
                throw err;
            }
        }
        else{
            report = await Report.find({userId: req.userId});
        }
        
        const resp:returnResponse = {status:"success", message:"Report generated", data:{report}};
        res.status(201).send(resp);
    } catch (error) {
        next(error);
    }
}

export {getReport};