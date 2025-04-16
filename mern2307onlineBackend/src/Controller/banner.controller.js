const { ApiResponse } = require("../Utils/Apiresponse");
const { apiError } = require("../Utils/ApiErrorResponse");
const bannerModel = require("../Model/banner.model");
const {
  uploadImageCloudinary,
  deleteCloudinaryImage,
} = require("../helpers/cloudinary");

// create banner controller
const createbanner = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(401)
        .json(new apiError(false, `Banner title missing!!`, 401, null));
    }
    if (!req.files) {
      return res
        .status(401)
        .json(new apiError(false, `Banner image missing!!`, 401, null));
    }
    const isAlreadyExist = await bannerModel.find({ title: title });
    if (isAlreadyExist?.length) {
      return res
        .status(401)
        .json(new apiError(false, "Already Exist in this Banner", 401, null));
    }

    // now save the banner information into database

    const { secure_url } = await uploadImageCloudinary(
      req.files?.image[0]?.path
    );
    // save the banner information into database
    const banner = await new bannerModel({
      title: title,
      image: secure_url,
    }).save();
    console.log(banner);

    if (!banner) {
      return res
        .status(401)
        .json(new apiError(false, "Banner not upload", 401, null));
    }
    return res
      .status(200)
      .json(new ApiResponse(true, "Banner upload successfully", 200, banner));
  } catch (error) {
    return res
      .status(500)
      .json(
        new apiError(
          false,
          `Error from create banner   controller  ${error}`,
          501,
          null
        )
      );
  }
};

// get all banner
const getAllBanner = async (req, res) => {
  try {
    const banners = await bannerModel.find();
    if (!banners) {
      return res
        .status(401)
        .json(new apiError(false, "Banner not found", 401, null));
    }

    bannerModel.findOneAndUpdate(
      { _id: "123fsa23" },
      { title: "mern", image: "http" },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(true, "Banner found", 200, banners));
  } catch (error) {
    return res
      .status(500)
      .json(
        new apiError(
          false,
          `Error from get all banner   controller  ${error}`,
          501,
          null
        )
      );
  }
};

const updateBanner = async (req, res) => {
  try {
    const { bannerId, title } = req.body;

    if (!bannerId) {
      return res
        .status(400)
        .json(new apiError(false, "Banner ID is required", 400, null));
    }

    const banner = await bannerModel.findById(bannerId);
    if (!banner) {
      return res
        .status(404)
        .json(new apiError(false, "Banner not found", 404, null));
    }

    let updatedFields = {};

    if (title) {
      updatedFields.title = title;
    }

    if (req.files && req.files.image) {
      // Delete old image from Cloudinary
      const publicId = banner.image.split("/").pop().split(".")[0];

      await deleteCloudinaryImage(publicId);

      // Upload new image
      const { secure_url } = await uploadImageCloudinary(
        req.files.image[0].path
      );
      updatedFields.image = secure_url;
    }

    // Update the banner in database
    const updatedBanner = await bannerModel.findByIdAndUpdate(
      bannerId,
      { $set: updatedFields },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Banner updated successfully", 200, updatedBanner)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new apiError(false, `Error updating banner: ${error}`, 500, null));
  }
};

// delte banner

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res
        .status(400)
        .json(new apiError(false, "Banner ID is required", 400, null));
    }

    // Find the banner
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res
        .status(404)
        .json(new apiError(false, "Banner not found", 404, null));
    }

    // Optional: Delete the image from Cloudinary if necessary
    const imageUrl = banner.image;
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
      await deleteCloudinaryImage(publicId); // Call a function to delete from Cloudinary
    }

    // Delete the banner from database
    await bannerModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(true, "Banner deleted successfully", 200, null));
  } catch (error) {
    return res
      .status(500)
      .json(
        new apiError(
          false,
          `Error from deleteBanner controller: ${error}`,
          500,
          null
        )
      );
  }
};

module.exports = { createbanner, getAllBanner, updateBanner, deleteBanner };
