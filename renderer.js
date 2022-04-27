//テキストエリアの値変更時にメインプロセスへ入力内容を通知する
const textarea = document.querySelector('#memoarea textarea');
textarea.addEventListener('input', () => {
    const text = textarea.value;
    window.electronAPI.changeText(text);
});