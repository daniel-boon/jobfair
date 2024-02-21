//@desc Get all jobs
//@route Get /api/v1/jobs
//@access Public
exports.getJobs=(req,res,next) =>{
    res.status(200).json({success:true,msg:'Get all jobs'});
}

//@desc Get single jobs
//@route Get /api/v1/hospitals/:id
//@access Public
exports.getJob=(req,res,next) =>{
    res.status(200).json({success:true,msg:`Get job ${req.params.id}`});
}

