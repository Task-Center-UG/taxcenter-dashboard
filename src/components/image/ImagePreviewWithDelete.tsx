"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { X, Trash2 } from "lucide-react";

type ImagePreviewWithDeleteProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onDelete?: () => void;
  isDeleting?: boolean;
};

const modalStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "900px",
  bgcolor: "transparent",
  border: "none",
  boxShadow: 24,
  p: 1,
  outline: "none",
};

const ImagePreviewWithDelete: React.FC<ImagePreviewWithDeleteProps> = ({
  src,
  alt,
  caption,
  className,
  onDelete,
  isDeleting = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setIsModalOpen(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      {/* Clickable Thumbnail Image */}
      <Box
        onClick={() => setIsModalOpen(true)}
        className={className}
        sx={{
          position: "relative",
          cursor: "pointer",
          aspectRatio: "16 / 9",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            "& .preview-image": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        <Box
          component="img"
          className="preview-image"
          src={src}
          alt={alt}
          loading="lazy"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      {/* Modal for Preview */}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setShowDeleteConfirm(false);
        }}
        aria-labelledby="image-preview-modal-title"
        aria-describedby="image-preview-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backdropFilter: "blur(4px)" },
          },
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={modalStyle}>
            {/* Action Buttons */}
            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                display: "flex",
                gap: 1,
              }}
            >
              {onDelete && !showDeleteConfirm && (
                <IconButton
                  aria-label="delete"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(220, 38, 38, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(185, 28, 28, 0.9)",
                    },
                    "&:disabled": {
                      backgroundColor: "rgba(156, 163, 175, 0.5)",
                    },
                  }}
                >
                  <Trash2 size={20} />
                </IconButton>
              )}
              <IconButton
                aria-label="close"
                onClick={() => {
                  setIsModalOpen(false);
                  setShowDeleteConfirm(false);
                }}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <X />
              </IconButton>
            </Box>

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <Box
                sx={{
                  position: "absolute",
                  top: 40,
                  right: -10,
                  backgroundColor: "rgba(0, 0, 0, 0.85)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  minWidth: "250px",
                  zIndex: 10,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  Delete this image?
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(75, 85, 99, 0.8)",
                      fontSize: "12px",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "rgba(55, 65, 81, 0.9)",
                      },
                    }}
                  >
                    Cancel
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(220, 38, 38, 0.8)",
                      fontSize: "12px",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "rgba(185, 28, 28, 0.9)",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(156, 163, 175, 0.5)",
                      },
                    }}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </IconButton>
                </Box>
              </Box>
            )}

            {/* Image */}
            <Box
              component="img"
              src={src}
              alt={alt}
              sx={{
                width: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />

            {/* Caption */}
            {caption && (
              <Typography
                id="image-preview-modal-description"
                sx={{
                  textAlign: "center",
                  color: "white",
                  mt: 2,
                  textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                }}
              >
                {caption}
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImagePreviewWithDelete;
