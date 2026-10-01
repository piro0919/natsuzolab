"use client";
import { type JSX } from "react";
import ModalVideo, { ModalVideoProps } from "react-modal-video";

export type YouTubeModalProps = Pick<ModalVideoProps, "isOpen" | "onClose"> & {
  videoId: string;
};

export default function YouTubeModal({
  isOpen,
  onClose,
  videoId,
}: YouTubeModalProps): JSX.Element {
  return (
    <ModalVideo
      channel="youtube"
      isOpen={isOpen}
      onClose={onClose}
      videoId={videoId}
      youtube={{ autoplay: 1, controls: 1, fs: 0, modestbranding: 0, mute: 0 }}
    />
  );
}
