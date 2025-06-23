import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Network/axiosinstance";
import { useNavigate } from "react-router-dom";
import FormFieldWrapper from "../Froms/FormFieldWrapper";
import Label from "../Froms/Label";
import SubmitButton from "../Froms/SubmitButton";
import SelectDropdown from "../Froms/SelectDropdown";
import ErrorMessage from "../Froms/ErrorMessage";
import MultiImageUploader from "../Froms/MultiImageUploader";
import Alert from "../alert";
import { FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import DateInput from "../Froms/DatePickerComponent";
import GradientButton from "../GradientButton";
import FormInput from "../Froms/FormInput";

const CreateProject = () => {
  document.title = "Create Project";
  
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

  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: "", visible: false });

  const showAlert = (msg) => {
    setAlert({ message: msg, visible: true });
    setTimeout(() => setAlert({ message: "", visible: false }), 4000);
  };

  const closeAlert = () => setAlert({ message: "", visible: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance
      .get("/accounts/API/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        if (!res.data.user.id) navigate("/login");
        else localStorage.setItem("user_id", res.data.user.id);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    axiosInstance.get("/Project/API/list/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => showAlert("Failed to load categories"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (form.tagInput.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (!user_id || !token) {
      navigate("/login");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("details", form.details);
    payload.append("target", form.total_target);
    payload.append("start_date", form.start_date);
    payload.append("end_date", form.end_date);
    payload.append("category_id", form.category_id);
    payload.append("user_id", user_id);

    form.tags.forEach((tag) => payload.append("tags", tag));
    form.images.forEach((img) => payload.append("images", img));
for (let [key, value] of payload.entries()) {
  console.log(`${key}:`, value);
}    try {
      const res = await axiosInstance.post("/Project/API/Create/", payload, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.id) {
        navigate(`/project/${res.data.id}`);
      } else {
        showAlert("Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      showAlert(err.response?.data?.error||"An error occurred while creating the project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#101827] p-8">
      <div className="max-w-4xl mx-auto mb-6">
        {alert.visible && <Alert message={alert.message} onClose={closeAlert} />}
      </div>

      <div className="max-w-4xl mx-auto mb-10 text-left">
        <h1 className="text-4xl font-bold text-white">Create New Project</h1>
        <p className="text-lg text-gray-300 mt-2">Launch your campaign</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-[#1e2937] text-white p-10 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold">Project Details</h2>

        <FormFieldWrapper>
          <Label htmlFor="title">Project Title</Label>
          <FormInput
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
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
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label htmlFor="category_id">Category</Label>
          <SelectDropdown
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
            placeholder="Select a category"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label htmlFor="total_target">Target Amount ($)</Label>
          <FormInput
            type="number"
            name="total_target"
            value={form.total_target}
            onChange={handleChange}
            className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label>Project Images</Label>
          <MultiImageUploader
            images={previewImages}
            onChange={(newFiles) => {
              setForm((prevForm) => ({
                ...prevForm,
                images: [...prevForm.images, ...newFiles],
              }));
              const previews = newFiles.map((file) => URL.createObjectURL(file));
              setPreviewImages((prev) => [...prev, ...previews]);
            }}
            onRemove={(idx) => {
              setForm((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== idx),
              }));
              setPreviewImages((prev) => prev.filter((_, i) => i !== idx));
            }}
          />
        </FormFieldWrapper>

        <FormFieldWrapper>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <FormInput
              type="text"
              value={form.tagInput}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, tagInput: e.target.value }))
              }
              className="flex-1 bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="w-auto px-3 py-2 rounded-lg bg-gradient-to-r from-[#905fe8] to-[#2862eb] text-white"
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
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((_, i) => i !== idx),
                    }))
                  }
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </FormFieldWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper>
            <Label>Campaign Start Date</Label>
            <div className="relative">
              <DateInput
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-2 border border-gray-600"
              />
              {/* <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Label>Campaign End Date</Label>
            <div className="relative">
              <DateInput
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-2 border border-gray-600"
              />
              {/* <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
            </div>
          </FormFieldWrapper>
        </div>

        {errors.submit && <ErrorMessage message={errors.submit} />}

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
