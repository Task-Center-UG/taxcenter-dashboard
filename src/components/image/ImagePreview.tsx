// components/image/ImagePreview.tsx

"use client";

import React, { useState, useEffect, FC } from "react";
import { StaticImageData } from "next/image";
import { X } from "lucide-react";
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

type ImagePreviewProps = {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
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

const ImagePreview: FC<ImagePreviewProps> = ({
  src,
  alt,
  caption,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const imageUrl = typeof src === "string" ? src : src.src;

  return (
    <>
      {/* 1. The Clickable 16:9 Thumbnail Image */}
      <Box
        onClick={() => setIsModalOpen(true)}
        className={className}
        sx={{
          position: "relative", // Parent must be relative for the absolute child
          cursor: "pointer",
          aspectRatio: "16 / 9", // <-- KEY CHANGE: Enforce 16:9 aspect ratio
          borderRadius: "8px",
          overflow: "hidden", // Hide parts of the image that overflow
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            // Move hover effect to the image itself for a zoom effect
            "& .preview-image": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        <Box
          component="img"
          className="preview-image" // Add a class to target for hover effect
          src={imageUrl}
          alt={alt}
          loading="lazy"
          sx={{
            position: "absolute", // Position inside the parent
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // <-- KEY CHANGE: Cover the area, cropping if necessary
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      {/* 2. The MUI Modal for Previewing (No Changes Here) */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            <IconButton
              aria-label="close"
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <X />
            </IconButton>

            <Box
              component="img"
              src={imageUrl}
              alt={alt}
              sx={{
                width: "100%",
                maxHeight: "90vh",
                objectFit: "contain", // The modal view remains 'contain' to show the full image
                borderRadius: "4px",
              }}
            />

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

export default ImagePreview;
