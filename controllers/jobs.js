const Job = require('../models/Job');

//@desc Get all jobs
//@route Get /api/v1/jobs
//@access Public
exports.getJobs= async(req,res,next) =>{
    try{
        const jobs = await Job.find();
        res.status(200).json({success:true,count : jobs.length,data : jobs});
    }catch(err){
        res.status(400).json({success:false});
    }
    
}

//@desc Get single jobs
//@route Get /api/v1/hospitals/:id
//@access Public
exports.getJob=async(req,res,next) =>{
    try{
        const job = await Job.findById(req.params.id);

        if(!job)
            return res.status(400).json({success:false});

        res.status(200).json({success:true,data : job});
    }catch(err){
        res.status(400).json({success:false} );
    }
}

//@desc Create a jobs
//@route POST /api/v1/hospitals
//@access Private
exports.createJob= async(req,res,next) =>{
    const job = await Job.create(req.body);
    res.status(201).json({success:true,data:job});
}

//@desc Update single job
//@route PUT /api/v1/hospitals/:id
//@access Private
exports.updateJob=async(req,res,next) =>{
    try{
        const job = await Job.findByIdAndUpdate (req.params.id,req.body,{
            new : true,
            runValidators:true
        })
        if (!job)
            return res.status(400).json({success:false});

        res.status(200).json({success:true,data : job});
    }catch(err){
        res.status(400).json({success:false});
    }
    
}

//@desc Delete single job
//@route DELETE /api/v1/hospitals/:id
//@access Private
exports.deleteJob=async(req,res,next) =>{
    try{
        const job = await Job.findByIdAndDelete(req.params.id);
        if(!job)
            res.status(400).json({success:false});
        res.status(200).json({success:true , data : []});
    }catch(err){
        res.status(400).json({success:false});
    }
}