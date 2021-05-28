// ページをロードしてきた時に実行するもの
export const initialize = async () => {
  console.log("init")
}

window.onload = async () => {
  await initialize();
};
