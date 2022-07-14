import React, { FC, Fragment, useRef, useState } from "react";
import "./documentUpload.scss";

interface DocumentUploadProps {
  onDelete: () => void;
  placeholderText?: string;
  value?: string | boolean;
  onUpload: (file: File) => void;
}

const DocumentUpload: FC<DocumentUploadProps> = (props) => {
  const { placeholderText, onUpload, value, onDelete } = props;

  const [showDelete, setShowDelete] = useState(false);

  const docRef = useRef<HTMLInputElement>(null);

  const handleUploadDocument = () => {
    if (docRef && docRef?.current) {
      docRef.current?.click();
    }
  };

  const handleFile = (event: any) => {
    const image = event.target.files[0];
    onUpload(image);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  if (value && value !== true) {
    return (
      <div className="document-upload__wrapper">
        <iframe
          src={value}
          frameBorder="0"
        />
        <div className="document-control">
          <div className="option">
            {showDelete ? (
              <div className="confirm-delete">
                <p onClick={onDelete}>Are you sure to delete?</p>
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
              <Fragment>
                <a href={value} target={"_blank"}>
                  <i className="icon-view-password" />
                </a>
                <i className="icon-delete" onClick={handleDelete} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="document-upload"
      onClick={handleUploadDocument}
    >
      <div className="dotted-border">
        <div className="upload-content">
          <i className="icon-upload" />
          <p>{placeholderText}</p>
        </div>
      </div>
      <input type="file" ref={docRef} onChange={handleFile} hidden accept="application/pdf" />
    </div>
  );
};

export default DocumentUpload;
