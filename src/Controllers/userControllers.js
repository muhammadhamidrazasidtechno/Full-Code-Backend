import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import user from "../Models/UserModels.js"
import uploadResult from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    try{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullname, email, username, password } = req.body

    
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const sameUserEmail = await user.findOne({ email })
    const sameUserName = await user.findOne({ username })
    
    if (sameUserEmail) {
        throw new ApiError(409, "Email already exists")
    } else if (sameUserName) {
        throw new ApiError(409, "Username already exists")
    }
    let avatorImage = ""
    if(
        req?.files && Array.isArray(req?.files?.avator) && req?.files?.avator[0]?.path
    ){

        avatorImage = req?.files?.avator[0]?.path 
    }
    // console.log(avatorImage);
    const coverImage = req?.files?.coverimage[0]?.path

    const avator = await uploadResult(avatorImage)
    const cover = await uploadResult(coverImage)

    const userDetailData = {
        fullname,
        email,
        username,
        password,
        coverimage: cover?.url || ""
    }
    
    if (avator != "" && avator?.url) {
        userDetailData.avator = avator.url;
    }
    const userdetail = await user.create(userDetailData);



    const createdUser =  await user.findById(userdetail._id).select(
        "-password -refreshtoken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something WEnt Wrong")
    }


    return res.status(201).json(
        new ApiResponse(200,userdetail,"user registered successfully")
    )
    }catch(e){
        throw new ApiError(500,e.message)
    }
})

const loginUser = asyncHandler( async (req, res) => {
// check email or username/
// check password
// token 
const {username,email,password} = req.body


if (!username || !email) {
    throw new ApiError(400,"username or email required")
}


const userExist = await user.findOne({
    $or : [{username},{email}]
})

})


export{
    registerUser
}

