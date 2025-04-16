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
  Select,
  Option,
  useSelect,
} from "@material-tailwind/react";
import {
  exclusiveApi,
  useGetCategoryQuery,
  useGetsubCategoryQuery,
} from "../../Features/api/exclusive.api";
import axios from "axios";
import { ToastSucess } from "../../Utils/Toast";
import { useDispatch } from "react-redux";
const Subcategory = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading: catrgoryloading,
    isError: categorydataError,
  } = useGetCategoryQuery();
  const {
    data: subcategoryData,
    isLoading,
    isError,
  } = useGetsubCategoryQuery();

  const [open, setOpen] = React.useState(false);
  const TABLE_HEAD = ["Name", "Category", "Date", "Actions"];
  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
  ];
  const handleOpen = () => setOpen(!open);
  const [subcategoryinfo, setsubcategoryinfo] = useState({
    name: "",
    category: "",
  });
  const [loading, setloading] = useState(false);
  // onchange handeler
  const handleonchange = (event) => {
    if (typeof event === "string") {
      // This means it's from the <Select> component
      setsubcategoryinfo((prev) => ({
        ...prev,
        category: event, // Directly use the value
      }));
    } else {
      // Regular input field
      const { id, value } = event.target;
      setsubcategoryinfo((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // handleCreateSubcategory
  const handleCreateSubcategory = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/subcategory",
        {
          name: subcategoryinfo.name,
          category: subcategoryinfo.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.statusText == "OK") {
        ToastSucess("Subcategory create sucessfull");
        dispatch(exclusiveApi.util.invalidateTags(["subcategory"]));
      }
    } catch (error) {
      console.log("error form handleCreateSubcategory futnion ", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        size="md"
        id="name"
        label="SubCategory Name"
        color="black"
        onChange={handleonchange}
      />
      {catrgoryloading == false && (
        <Select
          color="purple"
          label="Select Category"
          id="category"
          onChange={handleonchange}
        >
          {data?.data.map((item) => (
            <Option value={item._id} key={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      )}

      <Button
        onClick={handleCreateSubcategory}
        variant="filled"
        color="green"
        loading={loading}
        className="w-[25%]"
      >
        Create
      </Button>

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
            {subcategoryData?.data?.map(
              ({ name, category, createdAt }, index) => {
                const isLast = index === subcategoryData?.data.length - 1;
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {category.name}
                      </Typography>
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
              }
            )}
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
          <Select color="purple" label="Select Category">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
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

export default Subcategory;
