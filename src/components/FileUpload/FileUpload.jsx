import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

const FileUpload = ({
  value = "",
  onChange,
  accept,
  fileType = "image", // image | pdf
}) => {
  const [isFileUploaded, setFileUploaded] = useState(false);
  const [preview, setPreview] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  const { editBook } = useSelector((state) => state.book);

  const handleFile = (file) => {
    if (!file) return;

    // Image
    if (file.type.startsWith("image")) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        setPreview(fileReader.result);
        setIsImage(true);
        setIsPdf(false);
        setFileUploaded(true);
      };
    }

    // PDF
    else if (file.type === "application/pdf") {
      const pdfUrl = URL.createObjectURL(file);

      setPreview(pdfUrl);
      setIsPdf(true);
      setIsImage(false);
      setFileUploaded(true);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    onChange(file);
    handleFile(file);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    accept,
    onDrop,
    multiple: false,
  });

  const handleRemove = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview("");
    setFileUploaded(false);
    setIsImage(false);
    setIsPdf(false);

    onChange(null);
  };

  useEffect(() => {
    if (!value) {
      setPreview("");
      setFileUploaded(false);
      setIsImage(false);
      setIsPdf(false);
      return;
    }

    // New file selected
    if (value instanceof File) {
      handleFile(value);
      return;
    }

    // Existing Cloudinary URL (Edit Mode)
    if (typeof value === "string") {
      setPreview(value);
      setFileUploaded(true);

      if (fileType === "pdf") {
        setIsPdf(true);
        setIsImage(false);
      } else {
        setIsImage(true);
        setIsPdf(false);
      }
    }
  }, [value, editBook, fileType]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <section
      className="container rounded-3 border border-1 px-4 py-3 d-flex justify-content-center align-items-center"
      style={{
        height: "310px",
        backgroundColor: "#F8F9FA",
      }}
    >
      {isFileUploaded ? (
        <div className="w-100">
          {/* IMAGE PREVIEW */}
          {isImage && (
            <div
              className="w-100 text-center"
              style={{ height: "270px" }}
            >
              <div
                className="w-100 overflow-hidden"
                style={{ height: "250px" }}
              >
                <img
                  src={preview}
                  alt="preview"
                  className="img-fluid h-100"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div
                className="text-decoration-underline"
                style={{
                  fontSize: "14px",
                  fontWeight: "300",
                  cursor: "pointer",
                }}
                onClick={handleRemove}
              >
                Cancel
              </div>
            </div>
          )}

          {/* PDF PREVIEW */}
          {isPdf && (
            <div
              className="w-100 text-center"
              style={{ height: "270px" }}
            >
              <iframe
                src={preview}
                title="PDF Preview"
                width="100%"
                height="250px"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />

              <div
                className="text-decoration-underline mt-2"
                style={{
                  fontSize: "14px",
                  fontWeight: "300",
                  cursor: "pointer",
                }}
                onClick={handleRemove}
              >
                Cancel
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone w-100 d-flex justify-content-center align-items-center",
            style: { height: "230px" },
          })}
        >
          <input {...getInputProps()} />

          <div className="w-50 d-flex flex-column align-items-center gap-1">
            <div
              className="rounded-circle bg-richblack-900 text-center overflow-hidden"
              style={{
                width: "50px",
                height: "50px",
              }}
            >
              <i className="bi bi-cloud-arrow-up text-warning fs-2"></i>
            </div>

            <div
              className="w-75 text-center small"
              style={{ fontSize: "14px" }}
            >
              Drag n Drop a file, or click on{" "}
              <span
                className="text-warning"
                style={{ cursor: "pointer" }}
                onClick={open}
              >
                Browse
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FileUpload;