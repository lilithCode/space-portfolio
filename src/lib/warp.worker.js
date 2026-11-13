import { createWarp } from "./warp";

let warp = null;

self.onmessage = ({ data }) => {
  if (data.type === "init") {
    warp = createWarp(data.canvas, { reduce: data.reduce });
    warp.resize(data.w, data.h, data.dpr);
  } else if (data.type === "resize") {
    warp?.resize(data.w, data.h, data.dpr);
  } else if (data.type === "brake") {
    warp?.brake();
  }
};
