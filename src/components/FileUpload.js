import React, { useCallback, useEffect, useState } from "react";
import { Button, FormGroup, FormText, Label } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import {
  faCloudUploadAlt,
  faFileAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getFileStorageBaseUrl } from "../helper";

const FileUpload = ({
  accept,
  error,
  helperText,
  isRequired,
  label,
  maxFiles,
  maxSize,
  multiple,
  name,
  onChange,
  validationHandler,
  value,
}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setFiles(files);
        onChange(name, files);
        rejectedFiles.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === "file-invalid-type") {
              validationHandler(
                name,
                `Invalid file format. Only allow ${accept}`
              );
            } else if (err.code === "file-too-large") {
              // eslint-disable-next-line no-restricted-properties
              const sizeMb = Math.ceil(maxSize / Math.pow(1024, 2));
              validationHandler(name, `File is larger than ${sizeMb} Mb`);
            } else validationHandler(name, err.message);
          });
        });
      } else {
        const acceptedFile = files
          ? [
              ...files,
              ...acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              ),
            ]
          : [
              ...acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              ),
            ];
        if (acceptedFile.length > maxFiles) {
          validationHandler(name, `Maximum ${maxFiles} files allowed.`);
        } else {
          setFiles(acceptedFile);
          validationHandler(name, "");
          acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => alert("File reading was aborted");
            reader.onerror = () => alert("file reading has failed");
            reader.readAsDataURL(file);
            reader.onloadend = () => {};
          });
          onChange(name, acceptedFile);
        }
      }
    },
    [accept, maxSize, maxFiles, files, name, onChange, validationHandler]
  );

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const getFileName = (file) => {
    if (file) {
      if (file && file.name) return file.name;
      const extrctFileName = file.substr(file.lastIndexOf("/") + 1);
      return extrctFileName.replace(/\.[^/.]+$/, "");
    }
    return Math.floor(Math.random() * 1000001);
  };

  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      if (value.every((file) => !file.preview)) {
        let newFiles = [];
        value.forEach((file) => {
          if (!file.preview)
            newFiles = [
              ...newFiles,
              {
                preview: getFileStorageBaseUrl() + file,
                name: getFileName(file),
              },
            ];
        });
        setFiles(newFiles);
      }
    }
  }, [name, value]);

  const deleteFile = (e, file) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    if (newFiles.length > 0) {
      setFiles(newFiles);
      onChange(name, newFiles);
    } else {
      setFiles([]);
      onChange(name, []);
    }
  };

  const thumbs = files.map((file) => {
    return !(
      file.name.match(/\.(jpg|jpeg|png|gif)$/) ||
      file.preview.match(/\.(jpg|jpeg|png|gif)$/)
    ) ? (
      // eslint-disable-next-line react/jsx-indent
      <div key={file.name} className='position-relative thumb--document'>
        <FontAwesomeIcon
          icon={faFileAlt}
          className='text-secondary cursor-pointer'
          size='6x'
          onClick={() => window.open(file.preview)}
        />
        <Button
          className='trash-icon'
          color='danger'
          size='sm'
          onClick={(e) => deleteFile(e, file)}
        >
          <FontAwesomeIcon icon={faTrashAlt} size='sm' title='Delete' />
        </Button>
        <span className='thumb--document-name mt-2'>{`${file.name}`}</span>
      </div>
    ) : (
      <div key={file.name}>
        <div className='thumb position-relative' key={file.name + file.preview}>
          <img src={file.preview ? file.preview : file} alt={file.name} />
          <Button
            className='trash-icon'
            color='danger'
            size='sm'
            onClick={(e) => deleteFile(e, file)}
          >
            <FontAwesomeIcon icon={faTrashAlt} size='sm' title='Delete' />
          </Button>
        </div>
      </div>
    );
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: multiple ? maxFiles : 0,
    accept,
    onDrop,
    minSize: 0,
    maxSize,
    multiple,
  });

  return (
    <FormGroup className='file-input'>
      {label && (
        <Label htmlFor={name}>
          {label}
          {isRequired && <span className='text-danger'> * </span>}
          {maxFiles && (
            <span className='ml-2 text-secondory fs-12'>
              {`(Maximum ${maxFiles} files allowed)`}
            </span>
          )}
        </Label>
      )}
      {helperText && <FormText color='muted'>{helperText}</FormText>}
      <div
        {...getRootProps({
          className: "dropzone w-100 fs-20 d-flex align-items-center",
        })}
      >
        <input type='file' id={name} name={name} {...getInputProps()} />
        <FontAwesomeIcon
          icon={faCloudUploadAlt}
          size='sm'
          className='mr-1'
          title='Upload'
        />
        {isDragActive ? (
          <span className='fs-16'>Drop the files here ... </span>
        ) : (
          <span className='fs-16'>Select files </span>
        )}
      </div>
      {files && <aside className='thumbs-container'>{thumbs}</aside>}
      {error ? <span className='text-danger fs-12'>{error}</span> : null}
    </FormGroup>
  );
};

FileUpload.defaultProps = {
  accept: "image/*",
  error: "",
  helperText: "",
  isRequired: false,
  label: "",
  maxFiles: 1,
  maxSize: 5000000,
  multiple: false,
  validationHandler: () => {},
  value: null,
};

FileUpload.propTypes = {
  accept: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validationHandler: PropTypes.func,
  value: PropTypes.any,
};

export default FileUpload;
