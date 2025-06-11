import React, { useState } from "react";
import { axiosInstance } from "../../Network/axiosinstance";
import FormFieldWrapper from "../Froms/FormFieldWrapper";
import Label from "../Froms/Label";
import SubmitButton from "../Froms/SubmitButton";
import SelectDropdown from "../Froms/SelectDropdown";
import ErrorMessage from "../Froms/ErrorMessage";
import { FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import { categories } from "../Froms/categories";
import { useNavigate } from "react-router-dom";
import MultiImageUploader from "../Froms/MultiImageUploader";

const CreateProject = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    details: "",
    category_id: "",
    total_target: "",
    tags: [],
    tagInput: "",
    start_date: "",
    end_date: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (form.tagInput.trim() !== "") {
      setForm({
        ...form,
        tags: [...form.tags, form.tagInput.trim()],
        tagInput: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("details", form.details);
    payload.append("category_id", form.category_id);
    payload.append("total_target", form.total_target);
    payload.append("start_date", form.start_date);
    payload.append("end_date", form.end_date);

    form.tags.forEach((tag) => payload.append("tags[]", tag));
    form.images.forEach((img) => payload.append("images[]", img));

    try {
      const res = await axiosInstance.post("/Project/API/Create/", payload);
      if (res.data.success) {
        navigate(`/project/${res.data.project_id}`);
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "An error occurred while creating the project." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <div className="min-h-screen w-full bg-[#101827] p-8">
            <div className="max-w-4xl mx-auto mb-10 text-left">
            <h1 className="text-4xl font-bold text-white">Create New Project</h1>
            <p className="text-lg text-gray-300 mt-2">Launch your crowdfunding campaign</p>
        </div>
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mx-auto bg-[#1e2937] text-white p-10 rounded-2xl shadow-lg space-y-6"
        >
            <h2 className="text-3xl font-bold">Project Details</h2>
        <FormFieldWrapper>
          <Label htmlFor="title">Project Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label htmlFor="details">Project Details</Label>
          <textarea
            name="details"
            id="details"
            value={form.details}
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label htmlFor="category_id">Category</Label>
          <SelectDropdown
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            options={categories}
            placeholder="Select a category"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label htmlFor="total_target">Target Amount ($)</Label>
          <input
            type="number"
            name="total_target"
            value={form.total_target}
            onChange={handleChange}
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
          />
        </FormFieldWrapper>

        {/*  Multi Image Upload */}
        <FormFieldWrapper>
          <Label>Project Images</Label>
          <MultiImageUploader
            images={previewImages}
            onChange={(files) => {
              setForm((prev) => ({ ...prev, images: files }));
              const previews = files.map((file) => URL.createObjectURL(file));
              setPreviewImages(previews);
            }}
            onRemove={(idx) => {
              const updatedImages = form.images.filter((_, i) => i !== idx);
              const updatedPreviews = previewImages.filter((_, i) => i !== idx);
              setForm({ ...form, images: updatedImages });
              setPreviewImages(updatedPreviews);
            }}
          />
        </FormFieldWrapper>

        {/*  Tags */}
        <FormFieldWrapper>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.tagInput}
              onChange={(e) =>
                setForm({ ...form, tagInput: e.target.value })
              }
              className="flex-1 bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#905fe8] to-[#2862eb] text-white"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#374252] px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    const updatedTags = form.tags.filter((_, i) => i !== idx);
                    setForm({ ...form, tags: updatedTags });
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </FormFieldWrapper>

        {/*  Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper>
                <Label>Campaign Start Date</Label>
                <div className="relative">
                    <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-10 border border-gray-600 appearance-none"
                    />
                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </FormFieldWrapper>
            <FormFieldWrapper>
            <Label>Campaign End Date</Label>
            <div className="relative">
                <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-10 border border-gray-600 appearance-none"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            </FormFieldWrapper>
        </div>

        {errors.submit && <ErrorMessage message={errors.submit} />}

        {/*  Submit */}
        <div className="flex gap-4 justify-between mt-6">
          <SubmitButton text="Create Project" isLoading={isLoading} />
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2 rounded-lg font-semibold bg-gray-600 text-white hover:opacity-90 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
