import React, { useState } from "react";
import {
  Textarea,
  Input,
  Button,
  Card,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { ToastSucess } from "../../Utils/Toast";
import {
  exclusiveApi,
  useGetCategoryQuery,
} from "../../Features/api/exclusive.api";
import { useDispatch } from "react-redux";
const Category = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, seloading] = useState(false);
  const { data, isLoading, isError } = useGetCategoryQuery();
  const TABLE_HEAD = ["Name", "Description", "Date", "Actions"];
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handleOpen = () => setOpen(!open);

  const onSubmit = async (data) => {
    seloading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image[0]);
      const response = await axios.post(
        "http://localhost:4000/api/v1/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct headers
          },
        }
      );
      if (response.data.data) {
        ToastSucess("category create sucessfull");
        dispatch(exclusiveApi.util.invalidateTags(["category"]));
      }
      console.log(response);
    } catch (error) {
      console.log("error from create category", error);
    } finally {
      seloading(false);
      reset();
    }
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          size="md"
          label=" Name"
          color="black"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500">This name is required</span>
        )}
        <input type="file" {...register("image", { required: true })} />
        {errors.image && (
          <span className="text-red-500">This image is required</span>
        )}
        <Button
          type="submit"
          variant="filled"
          color="green"
          loading={loading}
          className="w-[15%]"
        >
          Upload
        </Button>
      </form>

      {/* category list */}
      <Card className="h-[575px] mt-10 w-full overflow-y-scroll">
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
              .map(({ name, image, createdAt }, index) => {
                const isLast = index === data?.data.length - 1;
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
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <img src={image} alt="" className="w-[300px] h-[200px]" />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-x-3 justify-center">
                        <Button color="red">Delete</Button>
                        <Button color="green" onClick={handleOpen}>
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

      {/* dialouge box */}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="flex flex-col gap-y-5 p-10">
          <Input size="md" label=" Name" color="black" />
          <Textarea color="gray" label="Descrioption" />
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Category;
