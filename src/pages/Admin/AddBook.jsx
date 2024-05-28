import { Link } from "react-router-dom";
import "./dashboard.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "./Sidebar";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [grad, setGrad] = useState("");
  const [image, setImage] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const addNewExam = async (e) => {
    e.preventDefault();
    if (!title) {
      return toast.error("برجاء كتابة عنوان..!");
    }
    if (!grad) {
      return toast.error("برجاء اختيار الصف..!");
    }
    if (!image) {
      return toast.error("برجاء رفع الغلاف..!");
    }
    if (!book) {
      return toast.error("برجاء رفع التسجيل..!");
    }

    const examData = new FormData();
    examData.set("title", title);
    examData.set("grad", grad);
    examData.append("image", image);
    examData.append("book", book);

    try {
      setLoading(true);
      const response = await axios.post("/books", examData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded / total) * 100);
          setProgress(percentage);
        },
      });
      if (response.status === 200) {
        toast.success("تمت العملية بنجاح");
      }
    } catch (error) {
      toast.error("فشلت العملية..!");
      console.error(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };
  return (
    <div className="add-exam">
      <div className="container">
        <Sidebar />
        <div className="add-content">
          <form onSubmit={addNewExam}>
            <label>العنوان</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="العنوان"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label>السنة الدراسية</label>
            <div className="input-group">
              <select
                value={grad}
                onChange={(e) => setGrad(e.target.value)}
                defaultValue="choose"
              >
                <option value="choose" disabled hidden>
                  اختر الصف
                </option>
                <option value="prep" disabled>
                  المرحلة الاعدادية
                </option>
                <option value="الاول الاعدادي">الاول الاعدادي</option>
                <option value="الثاني الاعدادي">الثاني الاعدادي</option>
                <option value="الثالث الاعدادي">الثالث الاعدادي</option>
                <option value="sec" disabled>
                  المرحلة الثانوية
                </option>
                <option value="الاول الثانوي">الاول الثانوي</option>
                <option value="الثاني الثانوي">الثاني الثانوي</option>
                <option value="الثالث الثانوي">الثالث الثانوي</option>
              </select>
            </div>
            <label>الغلاف</label>
            <div className="input-group">
              <div className="upload-content">
                <i class="uil uil-image"></i>
              </div>
              <input
                style={{ height: "170px" }}
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <label>المذكرة</label>
            <div className="input-group">
              <div className="upload-content">
                <i class="uil uil-bookmark"></i>
              </div>
              <input
                style={{ height: "170px" }}
                type="file"
                accept="application/pdf"
                onChange={(e) => setBook(e.target.files[0])}
              />
            </div>
            <button disabled={loading}>
              {loading ? `جاري الرفع...` : "تاكيد"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
