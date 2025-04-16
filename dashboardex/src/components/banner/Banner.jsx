import {
  Button,
  Input,
  Card,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  useDeleteBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useUploadBannerMutation,
} from "../../Features/api/exclusive.api";
import { exclusiveApi } from "../../Features/api/exclusive.api";
import { ToastError, ToastSucess } from "../../Utils/Toast";
import { useDispatch } from "react-redux";
const TABLE_HEAD = ["Title", "Image", "Actions"];

const Banner = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = React.useState(false);

  const [tempdata, settempdata] = useState({});

  const handleOpen = (obj) => {
    settempdata(obj);
    setOpen(!open);
  };

  const [DeleteBanner, { isLoading: delelteLoading }] =
    useDeleteBannerMutation();
  const [uploadBanner, { isLoading, isError }] = useUploadBannerMutation();

  const {
    data,
    isError: bannerError,
    isLoading: bannerLoading,
  } = useGetAllBannerQuery();

  const handleBannerUpload = async (data) => {
    try {
      const fromdata = new FormData();
      fromdata.append("title", data.title);
      fromdata.append("image", data.image[0]);
      const reponse = await uploadBanner(fromdata);
      if (reponse?.data?.data) {
        ToastSucess("Banner UPloaded Sucesfull");
      }
    } catch (error) {
      ToastError("Banner Upload Failed/ same banner name");
      console.log("error from handlebanner upload", error);
    } finally {
      reset();
    }
  };

  // onchange handler
  const handlechange = (event) => {
    const { name, value, files } = event.target;

    settempdata((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value, // Store `File` object correctly
    }));
  };

  // handleRemoveTitle
  const handleRemoveTitle = () => {
    settempdata((prev) => {
      return {
        ...prev,
        title: "",
      };
    });
  };

  // handleUpdateBanner
  const handleUpdateBanner = async () => {
    try {
      if (!tempdata._id) {
        ToastError("Invalid banner data");
        return;
      }

      const formData = new FormData();
      formData.append("bannerId", tempdata._id);

      if (tempdata.title) {
        formData.append("title", tempdata.title);
      }

      if (tempdata.image instanceof File) {
        formData.append("image", tempdata.image);
      }

      const response = await axios.put(
        "http://localhost:4000/api/v1/banner",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data) {
        // 🔄 Invalidate banner cache to trigger a refetch
        dispatch(exclusiveApi.util.invalidateTags(["banner"]));
        ToastSucess("Banner Updated Successfully");
        setOpen(false);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      ToastError("Failed to update banner");
      console.warn("Error from handleUpdateBanner:", error);
    }
  };

  // handleDelteBanner
  const handleDelteBanner = async (id) => {
    try {
      const response = await DeleteBanner(id).unwrap();
      console.log(response);
    } catch (error) {
      console.log("error from handledelte funtion", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-5">
      <form
        action=""
        onSubmit={handleSubmit(handleBannerUpload)}
        className="flex flex-col gap-y-5"
      >
        <Input
          size="md"
          label="Banner Title"
          color="black"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">This field is required</span>
        )}

        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">This image is required</span>
            )}
          </label>
        </div>

        <Button
          variant="outlined"
          loading={isLoading}
          className="w-[14%]"
          type="submit"
        >
          Upload
        </Button>
      </form>
      {/* banner list */}

      <Card className="h-[460px] w-full overflow-y-scroll">
        <table className="w-full  text-center">
          <thead className="sticky top-0 z-10">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data
              ?.slice()
              .reverse()
              .map(({ title, image, _id }, index) => {
                const isLast = index === data?.data?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 text-center";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center">
                        <div className="w-[300px] h-auto">
                          <img
                            src={image}
                            alt={image}
                            className="w-full h-full object-cover rounded-lg shadow-xl"
                          />
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-x-3 justify-center">
                        <Button
                          color="red"
                          loading={delelteLoading}
                          onClick={() => handleDelteBanner(_id)}
                        >
                          Delete
                        </Button>
                        <Button
                          color="green"
                          onClick={() => handleOpen({ title, image, _id })}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="flex flex-col gap-y-5">
          <Input
            size="md"
            label=" Title"
            color="black"
            name="title"
            value={tempdata.title}
            onChange={handlechange}
            onClick={handleRemoveTitle}
          />
          <div class="flex items-center justify-center w-full">
            <div className="w-full h-full">
              {tempdata.image && (
                <img
                  src={
                    tempdata.image instanceof File
                      ? URL.createObjectURL(tempdata.image)
                      : tempdata.image
                  }
                  alt="Selected Banner"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              )}
            </div>
            <label
              for="dropzone-file2"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <input
                type="file"
                id="dropzone-file2"
                name="image"
                onChange={handlechange}
              />
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpdateBanner}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Banner;
