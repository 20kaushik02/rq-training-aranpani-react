import React, { FC, Fragment, useRef, useState } from "react";
import "./imageUpload.scss";

interface ImageUploadProps {
  onDelete: () => void;
  placeholderText?: string;
  large?: boolean;
  value?: string;
  onUpload: (file: File) => void;
}

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { placeholderText, large = false, onUpload, value, onDelete } = props;

  const [showDelete, setShowDelete] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    if (imageRef && imageRef?.current) {
      imageRef.current?.click();
    }
  };

  const handleFile = (event: any) => {
    onUpload(event.target.files[0])
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  if (value) {
    return (
      <div className="image-upload__wrapper">
        <img
          className={`image-upload ${large && "image-upload__large"}`}
          src={value}
        />
        <div className={`image-options ${large && "image-options__large"}`}>
          <div className="option">
            {showDelete ? (
              <div className="confirm-delete">
                <p>Confirm image deletion?</p>
                <div className="delete-options">
                  <h5 onClick={handleCloseDelete}>Cancel</h5>
                  <h5 onClick={() => {
                    onDelete();
                    handleCloseDelete();
                  }}>
                    Delete
                  </h5>
                </div>
              </div>
            ) : (
              <>
                <a href={value} target="_blank">
                  <i className="icon-view-password" />
                </a>
                <i className="icon-delete" onClick={handleDelete} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`image-upload ${large && "image-upload__large"}`}
        onClick={handleUploadImage}
      >
        <div className="dotted-border">
          <div className="upload-content">
            <i className="icon-upload"></i>
            <p>{placeholderText}</p>
          </div>
        </div>
        <input type="file"
          onChange={handleFile}
          ref={imageRef}
          hidden />
      </div>
    </>
  );
};

export default ImageUpload;
