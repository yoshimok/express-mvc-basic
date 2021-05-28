import {} from "./fetchAPI";
import { initialize } from "./init";

export const handleChange = (file: File) => {
  console.log("CHANGE");
};

export const handleClick = () => {
  console.log("CLICK");
};

// handelerの追加
// document.getElementById(elements.sample1)?.addEventListener("change", handleChange, false);
// document.getElementById(elements.sample2)?.addEventListener("click", handleClick, false);
